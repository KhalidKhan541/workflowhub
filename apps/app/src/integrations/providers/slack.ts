import Hash from "lucide-react/icons/hash";

import type { ProviderConfig } from "../types";

export const slackProvider: ProviderConfig = {
  id: "slack",
  name: "Slack",
  description:
    "Connect your Slack workspace to send messages, create channels, and manage communications",
  icon: Hash,
  supportsOAuth: true,
  oauthEndpoint: "/oauth/slack/connect",
  successMessage: "Slack integration connected successfully",
};