import BookOpen from "lucide-react/icons/book-open";

import type { ProviderConfig } from "../types";

export const notionProvider: ProviderConfig = {
  id: "notion",
  name: "Notion",
  description:
    "Connect your Notion workspace to manage pages, databases, and content",
  icon: BookOpen,
  supportsOAuth: true,
  oauthEndpoint: "/oauth/notion/connect",
  successMessage: "Notion integration connected successfully",
};