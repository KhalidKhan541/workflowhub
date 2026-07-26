import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * Airtable Create Record node implementation
 * Creates a new record in an Airtable table
 */
export class CreateRecordAirtableNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "create-record-airtable",
    name: "Create Record (Airtable)",
    type: "create-record-airtable",
    description: "Create a new record in an Airtable table",
    tags: ["Database", "Airtable", "Create"],
    icon: "plus",
    documentation:
      "This node creates a new record in a specified Airtable table. Requires a connected Airtable integration with appropriate scopes.",
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
        name: "fields",
        type: "json",
        description:
          "Record fields as JSON object (e.g., {\"Name\": \"Task 1\", \"Status\": \"Todo\"})",
        required: true,
      },
    ],
    outputs: [
      {
        name: "recordId",
        type: "string",
        description: "Created record ID",
        hidden: false,
      },
      {
        name: "record",
        type: "json",
        description: "Full created record object",
        hidden: false,
      },
      {
        name: "createdTime",
        type: "string",
        description: "Timestamp when the record was created",
        hidden: false,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const { integrationId, baseId, tableId, fields } = context.inputs;
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

      if (!fields || typeof fields !== "object") {
        return this.createErrorResult(
          "Fields are required and must be a JSON object"
        );
      }

      if (!organizationId || typeof organizationId !== "string") {
        return this.createErrorResult("Organization ID is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "User-Agent": "WorkflowHub/1.0",
          },
          body: JSON.stringify({ fields }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Failed to create record via Airtable API: ${errorData}`
        );
      }

      const data = (await response.json()) as {
        id: string;
        createdTime: string;
        fields: Record<string, unknown>;
      };

      return this.createSuccessResult({
        recordId: data.id,
        record: data.fields,
        createdTime: data.createdTime,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error creating record in Airtable"
      );
    }
  }
}
