import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";
import { z } from "zod";
import { zodErrorMessage } from "../../utils/zod";

export class UpdatePageNotionNode extends ExecutableNode {
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
    pageId: z
      .string({ error: "Page ID is required" })
      .min(1, { error: "Page ID is required" }),
    properties: z
      .string({ error: "Properties JSON is required" })
      .min(1, { error: "Properties JSON is required" }),
  });

  public static readonly nodeType: NodeType = {
    id: "update-page-notion",
    name: "Update Page (Notion)",
    type: "update-page-notion",
    description: "Update properties of an existing Notion page",
    tags: ["Productivity", "Notion", "Page", "Update"],
    icon: "edit",
    documentation:
      "This node updates properties of an existing Notion page. Provide properties as a JSON object where keys are property names and values are Notion property value objects. Requires a connected Notion integration with edit access to the target page.",
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
        name: "pageId",
        type: "string",
        description: "Notion page ID (32-character hex string)",
        required: true,
      },
      {
        name: "properties",
        type: "string",
        description:
          'Page properties as JSON object (e.g. {"Status": {"select": {"name": "Done"}}})',
        required: true,
      },
    ],
    outputs: [
      {
        name: "pageId",
        type: "string",
        description: "Updated page ID",
        hidden: false,
      },
      {
        name: "url",
        type: "string",
        description: "URL of the updated page",
        hidden: false,
      },
      {
        name: "updatedAt",
        type: "string",
        description: "Timestamp when the page was last updated",
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
      const parsed = UpdatePageNotionNode.inputSchema.safeParse(
        context.inputs
      );
      if (!parsed.success) {
        return this.createErrorResult(zodErrorMessage(parsed.error));
      }
      const { integrationId, pageId, properties } = parsed.data;
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

      const response = await fetch(
        `https://api.notion.com/v1/pages/${pageId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify({ properties: propertiesObj }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Notion API error (${response.status}): ${errorData}`
        );
      }

      const page = (await response.json()) as {
        id: string;
        url: string;
        last_edited_time: string;
      };

      return this.createSuccessResult({
        pageId: page.id,
        url: page.url,
        updatedAt: page.last_edited_time,
        page,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error updating Notion page"
      );
    }
  }
}
