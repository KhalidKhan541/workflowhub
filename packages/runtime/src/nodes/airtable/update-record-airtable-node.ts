import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * Airtable Update Record node implementation
 * Updates an existing record in an Airtable table
 */
export class UpdateRecordAirtableNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "update-record-airtable",
    name: "Update Record (Airtable)",
    type: "update-record-airtable",
    description: "Update an existing record in an Airtable table",
    tags: ["Database", "Airtable", "Update"],
    icon: "pencil",
    documentation:
      "This node updates an existing record in a specified Airtable table by record ID. Only the fields provided will be updated. Requires a connected Airtable integration with appropriate scopes.",
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
        name: "recordId",
        type: "string",
        description:
          "Record ID to update (e.g., 'recXXXXXXXXXXXXXX')",
        required: true,
      },
      {
        name: "fields",
        type: "json",
        description:
          "Fields to update as JSON object (e.g., {\"Status\": \"Done\"})",
        required: true,
      },
    ],
    outputs: [
      {
        name: "recordId",
        type: "string",
        description: "Updated record ID",
        hidden: false,
      },
      {
        name: "record",
        type: "json",
        description: "Full updated record object",
        hidden: false,
      },
      {
        name: "createdTime",
        type: "string",
        description: "Record creation timestamp",
        hidden: false,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const { integrationId, baseId, tableId, recordId, fields } =
        context.inputs;
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

      if (!recordId || typeof recordId !== "string") {
        return this.createErrorResult("Record ID is required");
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
        `https://api.airtable.com/v0/${baseId}/${tableId}/${recordId}`,
        {
          method: "PATCH",
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
          `Failed to update record via Airtable API: ${errorData}`
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
          : "Unknown error updating record in Airtable"
      );
    }
  }
}
