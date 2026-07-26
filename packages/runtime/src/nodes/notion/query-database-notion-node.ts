import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";
import { z } from "zod";
import { zodErrorMessage } from "../../utils/zod";

export class QueryDatabaseNotionNode extends ExecutableNode {
  private static readonly inputSchema = z.object({
    integrationId: z
      .string({
        error:
          "Integration ID is required. Please select a Notion integration.",
      })
      .min(1, {
        error:
          "Integration ID is required. Please select a Notion integration.",
      }),
    databaseId: z
      .string({ error: "Database ID is required" })
      .min(1, { error: "Database ID is required" }),
    filter: z.string().optional(),
    sorts: z.string().optional(),
    pageSize: z.number().optional(),
    startCursor: z.string().optional(),
  });

  public static readonly nodeType: NodeType = {
    id: "query-database-notion",
    name: "Query Database (Notion)",
    type: "query-database-notion",
    description: "Query a Notion database with filters and sorts",
    tags: ["Productivity", "Notion", "Database", "Query"],
    icon: "search",
    documentation:
      "This node queries a Notion database and returns matching pages. Optionally filter results by property values and sort by specific properties. Returns up to 100 results per page with pagination support.",
    usage: 10,
    subscription: true,
    asTool: true,
    inputs: [
      {
        name: "integrationId",
        type: "integration",
        provider: "notion",
        description: "Notion integration to use",
        hidden: true,
        required: true,
      },
      {
        name: "databaseId",
        type: "string",
        description: "Notion database ID (32-character hex string)",
        required: true,
      },
      {
        name: "filter",
        type: "string",
        description:
          'Optional filter JSON (e.g. {"property": "Status", "select": {"equals": "Done"}})',
        required: false,
      },
      {
        name: "sorts",
        type: "string",
        description:
          'Optional sorts JSON array (e.g. [{"property": "Created", "direction": "descending"}])',
        required: false,
      },
      {
        name: "pageSize",
        type: "number",
        description: "Number of results per page (1-100, default 100)",
        required: false,
      },
      {
        name: "startCursor",
        type: "string",
        description: "Pagination cursor from previous query (next_cursor)",
        required: false,
      },
    ],
    outputs: [
      {
        name: "results",
        type: "json",
        description: "Array of page objects matching the query",
        hidden: false,
      },
      {
        name: "hasMore",
        type: "boolean",
        description: "Whether there are more results available",
        hidden: false,
      },
      {
        name: "nextCursor",
        type: "string",
        description: "Cursor for next page of results (if hasMore is true)",
        hidden: true,
      },
      {
        name: "resultCount",
        type: "number",
        description: "Number of results returned",
        hidden: false,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const parsed = QueryDatabaseNotionNode.inputSchema.safeParse(
        context.inputs
      );
      if (!parsed.success) {
        return this.createErrorResult(zodErrorMessage(parsed.error));
      }
      const { integrationId, databaseId, filter, sorts, pageSize, startCursor } =
        parsed.data;
      const { organizationId } = context;

      if (!organizationId || typeof organizationId !== "string") {
        return this.createErrorResult("Organization ID is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      const body: Record<string, unknown> = {};

      if (filter) {
        let filterObj: unknown;
        try {
          filterObj = JSON.parse(filter);
        } catch {
          return this.createErrorResult(
            "Invalid filter JSON. Must be a valid JSON object."
          );
        }
        if (typeof filterObj !== "object" || filterObj === null || Array.isArray(filterObj)) {
          return this.createErrorResult(
            "Filter must be a JSON object, not an array or primitive."
          );
        }
        body.filter = filterObj;
      }

      if (sorts) {
        let sortsObj: unknown;
        try {
          sortsObj = JSON.parse(sorts);
        } catch {
          return this.createErrorResult(
            "Invalid sorts JSON. Must be a valid JSON array."
          );
        }
        if (!Array.isArray(sortsObj)) {
          return this.createErrorResult("Sorts must be a JSON array.");
        }
        body.sorts = sortsObj;
      }

      if (pageSize !== undefined && pageSize !== null) {
        const size = Math.min(Math.max(Math.floor(Number(pageSize)), 1), 100);
        body.page_size = size;
      }

      if (startCursor) {
        body.start_cursor = startCursor;
      }

      const response = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Notion API error (${response.status}): ${errorData}`
        );
      }

      const data = (await response.json()) as {
        results: unknown[];
        has_more: boolean;
        next_cursor: string | null;
      };

      return this.createSuccessResult({
        results: data.results,
        hasMore: data.has_more,
        nextCursor: data.next_cursor ?? "",
        resultCount: data.results.length,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error querying Notion database"
      );
    }
  }
}
