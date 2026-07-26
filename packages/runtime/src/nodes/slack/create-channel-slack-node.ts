import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * Slack Create Channel node implementation
 * Creates new Slack channels using Slack Web API with OAuth integration
 */
export class CreateChannelSlackNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "create-channel-slack",
    name: "Create Channel (Slack)",
    type: "create-channel-slack",
    description: "Create a new Slack channel",
    tags: ["Social", "Slack", "Channel", "Create"],
    icon: "plus-circle",
    documentation:
      "This node creates new channels in a Slack workspace using the Slack Web API. Requires a connected Slack integration from your organization's integrations.",
    usage: 10,
    subscription: true,
    asTool: true,
    inputs: [
      {
        name: "integrationId",
        type: "integration",
        provider: "slack",
        description: "Slack integration to use",
        hidden: true,
        required: true,
      },
      {
        name: "name",
        type: "string",
        description: "Channel name (lowercase, no spaces, max 80 characters)",
        required: true,
      },
      {
        name: "isPrivate",
        type: "boolean",
        description: "Whether to create a private channel (default: false)",
        required: false,
      },
    ],
    outputs: [
      {
        name: "channelId",
        type: "string",
        description: "ID of the created channel",
        hidden: true,
      },
      {
        name: "name",
        type: "string",
        description: "Name of the created channel",
        hidden: true,
      },
      {
        name: "ok",
        type: "boolean",
        description: "Whether the API call was successful",
        hidden: true,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const { integrationId, name, isPrivate } = context.inputs;

      if (!integrationId || typeof integrationId !== "string") {
        return this.createErrorResult(
          "Integration ID is required. Please select a Slack integration."
        );
      }

      if (!name || typeof name !== "string") {
        return this.createErrorResult("Channel name is required");
      }

      const channelName = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (channelName.length === 0) {
        return this.createErrorResult(
          "Channel name must contain at least one alphanumeric character"
        );
      }

      if (channelName.length > 80) {
        return this.createErrorResult("Channel name must be 80 characters or less");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      const payload: Record<string, unknown> = {
        name: channelName,
      };

      if (isPrivate === true) {
        payload.is_private = true;
      }

      const response = await fetch("https://slack.com/api/conversations.create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Failed to create channel via Slack API: ${errorData}`
        );
      }

      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        channel?: {
          id: string;
          name: string;
        };
      };

      if (!data.ok) {
        return this.createErrorResult(
          `Slack API error: ${data.error ?? "unknown error"}`
        );
      }

      return this.createSuccessResult({
        channelId: data.channel?.id ?? "",
        name: data.channel?.name ?? channelName,
        ok: true,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error creating channel via Slack"
      );
    }
  }
}
