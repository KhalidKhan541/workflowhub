import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * GitHub Create Issue node implementation
 * Creates a new issue in a GitHub repository
 */
export class CreateIssueGithubNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "create-issue-github",
    name: "Create Issue (GitHub)",
    type: "create-issue-github",
    description: "Create a new issue in a GitHub repository",
    tags: ["Social", "GitHub", "Issue", "Create"],
    icon: "alert-circle",
    documentation:
      "This node creates a new issue in a specified GitHub repository. Supports labels, assignees, and milestones. Requires a connected GitHub integration with repo scope.",
    usage: 10,
    subscription: true,
    asTool: true,
    inputs: [
      {
        name: "integrationId",
        type: "integration",
        provider: "github",
        description: "GitHub integration to use",
        hidden: true,
        required: true,
      },
      {
        name: "owner",
        type: "string",
        description: "Repository owner (username or organization)",
        required: true,
      },
      {
        name: "repo",
        type: "string",
        description: "Repository name",
        required: true,
      },
      {
        name: "title",
        type: "string",
        description: "Issue title",
        required: true,
      },
      {
        name: "body",
        type: "string",
        description: "Issue body (markdown supported)",
        required: false,
      },
      {
        name: "labels",
        type: "string",
        description: "Comma-separated list of label names",
        required: false,
      },
      {
        name: "assignees",
        type: "string",
        description: "Comma-separated list of usernames to assign",
        required: false,
      },
      {
        name: "milestone",
        type: "number",
        description: "Milestone number to assign",
        required: false,
      },
    ],
    outputs: [
      {
        name: "issueId",
        type: "number",
        description: "Issue number",
        hidden: false,
      },
      {
        name: "issue",
        type: "json",
        description: "Full issue object",
        hidden: false,
      },
      {
        name: "url",
        type: "string",
        description: "Issue URL",
        hidden: false,
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const {
        integrationId,
        owner,
        repo,
        title,
        body,
        labels,
        assignees,
        milestone,
      } = context.inputs;
      const { organizationId } = context;

      if (!integrationId || typeof integrationId !== "string") {
        return this.createErrorResult(
          "Integration ID is required. Please select a GitHub integration."
        );
      }

      if (!owner || typeof owner !== "string") {
        return this.createErrorResult("Repository owner is required");
      }

      if (!repo || typeof repo !== "string") {
        return this.createErrorResult("Repository name is required");
      }

      if (!title || typeof title !== "string") {
        return this.createErrorResult("Issue title is required");
      }

      if (!organizationId || typeof organizationId !== "string") {
        return this.createErrorResult("Organization ID is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      // Build payload
      const payload: Record<string, unknown> = { title };

      if (body && typeof body === "string") {
        payload.body = body;
      }

      if (labels && typeof labels === "string") {
        payload.labels = labels
          .split(",")
          .map((l: string) => l.trim())
          .filter(Boolean);
      }

      if (assignees && typeof assignees === "string") {
        payload.assignees = assignees
          .split(",")
          .map((a: string) => a.trim())
          .filter(Boolean);
      }

      if (milestone && typeof milestone === "number") {
        payload.milestone = milestone;
      }

      // Create issue via GitHub API
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "WorkflowHub/1.0",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return this.createErrorResult(
          `Failed to create issue via GitHub API: ${errorData}`
        );
      }

      const data = (await response.json()) as {
        number: number;
        title: string;
        body: string;
        html_url: string;
        state: string;
        labels: Array<{ name: string; color: string }>;
        assignees: Array<{ login: string }>;
        created_at: string;
        updated_at: string;
      };

      return this.createSuccessResult({
        issueId: data.number,
        issue: {
          number: data.number,
          title: data.title,
          body: data.body,
          state: data.state,
          labels: data.labels.map((l) => ({ name: l.name, color: l.color })),
          assignees: data.assignees.map((a) => a.login),
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
        url: data.html_url,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error creating issue on GitHub"
      );
    }
  }
}
