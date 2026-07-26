import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * Airtable Search Records node implementation
 * Searches for records in an Airtable table using filter formulas
 */
export class SearchRecordsAirtableNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "search-records-airtable",
    name: "Search Records (Airtable)",
    type: "search-records-airtable",
    description: "Search for records in an Airtable table with filter conditions",
    tags: ["Database", "Airtable", "Search"],
    icon: "search",
    documentation:
      "This node searches for records in an Airtable table using filter formulas or a search query. Supports Airtable's filterByFormula syntax. Requires a connected Airtable integration with appropriate scopes.",
    usage: 10,
    subscription: true,
    asTool: true,
    inputs: [
      {
        name: "integrationId",
        type: "integration",
        provider: "airtable",
        description: "Airtable integration to use",
        hidden: true,
        required: true,
      },
      {
        name: "baseId",
        type: "string",
        description:
          "Airtable base ID (e.g., 'appXXXXXXXXXXXXXX')",
        required: true,
      },
      {
        name: "tableId",
        type: "string",
        description:
          "Table ID or name (e.g., 'tblXXXXXXXXXXXXXX' or 'Tasks')",
        required: true,
      },
      {
        name: "filterFormula",
        type: "string",
        description:
          "Airtable filter formula (e.g., '{Status} = \"Done\"'). Leave empty to fetch all records.",
        required: false,
      },
      {
        name: "sortField",
        type: "string",
        description: "Field name to sort by",
        required: false,
      },
      {
        name: "sortDirection",
        type: "string",
        description: "Sort direction: 'asc' or 'desc' (default: 'asc')",
        required: false,
      },
      {
        name: "maxRecords",
        type: "number",
        description: "Maximum number of records to return (max 100)",
        required: false,
      },
      {
        name: "view",
        type: "string",
        description: "View ID or name to use",
        required: false,
      },
    ],
    outputs: [
      {
        name: "records",
        type: "json",
        description: "Array of matching records",
        hidden: false,
      },
      {
        name: "count",
        type: "number",
        description: "Number of records returned",
        hidden: false,
      },
      {
        name: "offset",
        type: "string",
        description:
          "Offset token for pagination (empty if no more results)",
        hidden: true,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const {
        integrationId,
        baseId,
        tableId,
        filterFormula,
        sortField,
        sortDirection,
        maxRecords,
        view,
      } = context.inputs;
      const { organizationId } = context;

      if (!integrationId || typeof integrationId !== "string") {
        return this.createErrorResult(
          "Integration ID is required. Please select an Airtable integration."
        );
      }

      if (!baseId || typeof baseId !== "string") {
        return this.createErrorResult("Base ID is required");
      }

      if (!tableId || typeof tableId !== "string") {
        return this.createErrorResult("Table ID is required");
      }

      if (!organizationId || typeof organizationId !== "string") {
        return this.createErrorResult("Organization ID is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      // Build query parameters
      const params = new URLSearchParams();

      if (filterFormula && typeof filterFormula === "string") {
        params.append("filterByFormula", filterFormula);
      }

      if (sortField && typeof sortField === "string") {
        const sort = JSON.stringify([
          {
            field: sortField,
            direction:
              sortDirection === "desc" ? "desc" : "asc",
          },
        ]);
        params.append("sort", sort);
      }

      if (maxRecords && typeof maxRecords === "number") {
        params.append("maxRecords", Math.min(maxRecords, 100).toString());
      }

      if (view && typeof view === "string") {
        params.append("view", view);
      }

      const queryString = params.toString();
      const url = `https://api.airtable.com/v0/${baseId}/${tableId}${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "WorkflowHub/1.0",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Failed to search records via Airtable API: ${errorData}`
        );
      }

      const data = (await response.json()) as {
        records: Array<{
          id: string;
          createdTime: string;
          fields: Record<string, unknown>;
        }>;
        offset?: string;
      };

      const records = data.records.map((record) => ({
        id: record.id,
        createdTime: record.createdTime,
        fields: record.fields,
      }));

      return this.createSuccessResult({
        records,
        count: records.length,
        offset: data.offset ?? "",
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error searching records in Airtable"
      );
    }
  }
}
