import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * Slack List Channels node implementation
 * Lists channels in a Slack workspace using Slack Web API with OAuth integration
 */
export class ListChannelsSlackNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "list-channels-slack",
    name: "List Channels (Slack)",
    type: "list-channels-slack",
    description: "List channels in a Slack workspace",
    tags: ["Social", "Slack", "Channel", "List"],
    icon: "list",
    documentation:
      "This node lists channels in a Slack workspace using the Slack Web API. Returns a JSON array of channel objects with id, name, and other metadata. Requires a connected Slack integration from your organization's integrations.",
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
        name: "types",
        type: "string",
        description:
          "Filter by channel types: public_channel,private_channel,mpim,im (comma-separated, default: public_channel)",
        required: false,
      },
      {
        name: "limit",
        type: "number",
        description: "Maximum number of channels to return (default: 100, max: 1000)",
        required: false,
      },
    ],
    outputs: [
      {
        name: "channels",
        type: "json",
        description: "JSON array of channel objects with id, name, and metadata",
      },
      {
        name: "count",
        type: "number",
        description: "Number of channels returned",
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
      const { integrationId, types, limit } = context.inputs;

      if (!integrationId || typeof integrationId !== "string") {
        return this.createErrorResult(
          "Integration ID is required. Please select a Slack integration."
        );
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      const channelTypes = types && typeof types === "string"
        ? types
        : "public_channel";

      const maxLimit = Math.min(
        typeof limit === "number" && limit > 0 ? limit : 100,
        1000
      );

      const allChannels: Array<{ id: string; name: string; [key: string]: unknown }> = [];
      let cursor: string | undefined;

      do {
        const params = new URLSearchParams({
          types: channelTypes,
          limit: String(Math.min(maxLimit - allChannels.length, 200)),
          exclude_archived: "true",
        });

        if (cursor) {
          params.set("cursor", cursor);
        }

        const response = await fetch(
          `https://slack.com/api/conversations.list?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          return this.createErrorResult(
            `Failed to list channels via Slack API: ${errorData}`
          );
        }

        const data = (await response.json()) as {
          ok: boolean;
          error?: string;
          channels?: Array<{ id: string; name: string; [key: string]: unknown }>;
          response_metadata?: {
            next_cursor?: string;
          };
        };

        if (!data.ok) {
          return this.createErrorResult(
            `Slack API error: ${data.error ?? "unknown error"}`
          );
        }

        if (data.channels) {
          allChannels.push(...data.channels);
        }

        cursor = data.response_metadata?.next_cursor;
      } while (cursor && allChannels.length < maxLimit);

      const resultChannels = allChannels.slice(0, maxLimit);

      return this.createSuccessResult({
        channels: resultChannels,
        count: resultChannels.length,
        ok: true,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error listing channels via Slack"
      );
    }
  }
}
