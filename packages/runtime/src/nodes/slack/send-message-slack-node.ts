import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * Slack Send Message node implementation
 * Sends messages to Slack channels using Slack Web API with OAuth integration
 */
export class SendMessageSlackNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "send-message-slack",
    name: "Send Message (Slack)",
    type: "send-message-slack",
    description: "Send a message to a Slack channel",
    tags: ["Social", "Slack", "Message", "Send"],
    icon: "message-circle",
    documentation:
      "This node sends messages to Slack channels using the Slack Web API. Requires a connected Slack integration from your organization's integrations.",
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
        name: "channelId",
        type: "string",
        description: "Slack channel ID to send the message to",
        required: true,
      },
      {
        name: "text",
        type: "string",
        description: "Message text",
        required: true,
      },
      {
        name: "threadTs",
        type: "string",
        description: "Thread timestamp to reply in a thread (optional)",
        required: false,
      },
    ],
    outputs: [
      {
        name: "channelId",
        type: "string",
        description: "Channel ID where the message was sent",
        hidden: true,
      },
      {
        name: "messageTs",
        type: "string",
        description: "Timestamp of the sent message (unique ID)",
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
      const { integrationId, channelId, text, threadTs } = context.inputs;

      if (!integrationId || typeof integrationId !== "string") {
        return this.createErrorResult(
          "Integration ID is required. Please select a Slack integration."
        );
      }

      if (!channelId || typeof channelId !== "string") {
        return this.createErrorResult("Channel ID is required");
      }

      if (!text || typeof text !== "string") {
        return this.createErrorResult("Message text is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      const payload: Record<string, string> = {
        channel: channelId,
        text,
      };

      if (threadTs && typeof threadTs === "string") {
        payload.thread_ts = threadTs;
      }

      const response = await fetch("https://slack.com/api/chat.postMessage", {
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
          `Failed to send message via Slack API: ${errorData}`
        );
      }

      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        channel?: string;
        ts?: string;
      };

      if (!data.ok) {
        return this.createErrorResult(
          `Slack API error: ${data.error ?? "unknown error"}`
        );
      }

      return this.createSuccessResult({
        channelId: data.channel ?? channelId,
        messageTs: data.ts ?? "",
        ok: true,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error sending message via Slack"
      );
    }
  }
}
