import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";
import { z } from "zod";
import { zodErrorMessage } from "../../utils/zod";

export class CreatePageNotionNode extends ExecutableNode {
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
    properties: z
      .string({ error: "Properties JSON is required" })
      .min(1, { error: "Properties JSON is required" }),
    title: z.string().optional(),
    parentType: z.string().optional(),
  });

  public static readonly nodeType: NodeType = {
    id: "create-page-notion",
    name: "Create Page (Notion)",
    type: "create-page-notion",
    description: "Create a new page in a Notion database",
    tags: ["Productivity", "Notion", "Page", "Create"],
    icon: "file-plus",
    documentation:
      "This node creates a new page in a Notion database. Provide properties as a JSON object where keys are property names and values are Notion property value objects. Requires a connected Notion integration with access to the target database.",
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
        name: "properties",
        type: "string",
        description:
          'Page properties as JSON object (e.g. {"Name": {"title": [{"text": {"content": "My Page"}}]}})',
        required: true,
      },
      {
        name: "title",
        type: "string",
        description: "Optional page title (used if database has a title property)",
        required: false,
      },
      {
        name: "parentType",
        type: "string",
        description: "Parent type: 'database_id' (default) or 'page_id'",
        required: false,
      },
    ],
    outputs: [
      {
        name: "pageId",
        type: "string",
        description: "Created page ID",
        hidden: false,
      },
      {
        name: "url",
        type: "string",
        description: "URL of the created page",
        hidden: false,
      },
      {
        name: "createdAt",
        type: "string",
        description: "Timestamp when the page was created",
        hidden: true,
      },
      {
        name: "page",
        type: "json",
        description: "Full page data returned by Notion API",
        hidden: true,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const parsed = CreatePageNotionNode.inputSchema.safeParse(
        context.inputs
      );
      if (!parsed.success) {
        return this.createErrorResult(zodErrorMessage(parsed.error));
      }
      const { integrationId, databaseId, properties, title, parentType } =
        parsed.data;
      const { organizationId } = context;

      if (!organizationId || typeof organizationId !== "string") {
        return this.createErrorResult("Organization ID is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      let propertiesObj: Record<string, unknown>;
      try {
        propertiesObj = JSON.parse(properties);
      } catch {
        return this.createErrorResult(
          "Invalid properties JSON. Must be a valid JSON object."
        );
      }

      if (typeof propertiesObj !== "object" || Array.isArray(propertiesObj)) {
        return this.createErrorResult(
          "Properties must be a JSON object, not an array or primitive."
        );
      }

      const resolvedParentType = parentType || "database_id";

      let parent: Record<string, string>;
      if (resolvedParentType === "page_id") {
        parent = { page_id: databaseId };
      } else {
        parent = { database_id: databaseId };
      }

      const body: Record<string, unknown> = {
        parent,
        properties: propertiesObj,
      };

      if (title && !propertiesObj.Title && !propertiesObj.Name) {
        body.children = [
          {
            object: "block",
            type: "heading_2",
            heading_2: {
              rich_text: [{ type: "text", text: { content: title } }],
            },
          },
        ];
      }

      const response = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Notion API error (${response.status}): ${errorData}`
        );
      }

      const page = (await response.json()) as {
        id: string;
        url: string;
        created_time: string;
      };

      return this.createSuccessResult({
        pageId: page.id,
        url: page.url,
        createdAt: page.created_time,
        page,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error creating Notion page"
      );
    }
  }
}
