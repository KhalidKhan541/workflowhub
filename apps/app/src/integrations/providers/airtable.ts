import Table from "lucide-react/icons/table";

import type { ProviderConfig } from "../types";

export const airtableProvider: ProviderConfig = {
  id: "airtable",
  name: "Airtable",
  description:
    "Connect your Airtable account to manage bases, tables, and records",
  icon: Table,
  supportsOAuth: true,
  oauthEndpoint: "/oauth/airtable/connect",
  successMessage: "Airtable integration connected successfully",
};