import { ExecutableNode, type NodeContext } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * GitHub Create Pull Request node implementation
 * Creates a new pull request in a GitHub repository
 */
export class CreatePullRequestGithubNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "create-pull-request-github",
    name: "Create Pull Request (GitHub)",
    type: "create-pull-request-github",
    description: "Create a new pull request in a GitHub repository",
    tags: ["Social", "GitHub", "Pull Request", "Create"],
    icon: "git-pull-request",
    documentation:
      "This node creates a new pull request in a specified GitHub repository. Supports specifying head and base branches, body text, draft status, and reviewers. Requires a connected GitHub integration with repo scope.",
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
        description: "Pull request title",
        required: true,
      },
      {
        name: "head",
        type: "string",
        description:
          "Head branch (source). Prefix with 'owner:' if from a fork.",
        required: true,
      },
      {
        name: "base",
        type: "string",
        description: "Base branch (target, e.g., 'main')",
        required: true,
      },
      {
        name: "body",
        type: "string",
        description: "Pull request body (markdown supported)",
        required: false,
      },
      {
        name: "draft",
        type: "boolean",
        description: "Create as draft pull request",
        required: false,
      },
      {
        name: "reviewers",
        type: "string",
        description: "Comma-separated list of reviewer usernames",
        required: false,
      },
      {
        name: "labels",
        type: "string",
        description: "Comma-separated list of label names",
        required: false,
      },
    ],
    outputs: [
      {
        name: "prNumber",
        type: "number",
        description: "Pull request number",
        hidden: false,
      },
      {
        name: "pullRequest",
        type: "json",
        description: "Full pull request object",
        hidden: false,
      },
      {
        name: "url",
        type: "string",
        description: "Pull request URL",
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
        head,
        base,
        body,
        draft,
        reviewers,
        labels,
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
        return this.createErrorResult("Pull request title is required");
      }

      if (!head || typeof head !== "string") {
        return this.createErrorResult("Head branch is required");
      }

      if (!base || typeof base !== "string") {
        return this.createErrorResult("Base branch is required");
      }

      if (!organizationId || typeof organizationId !== "string") {
        return this.createErrorResult("Organization ID is required");
      }

      const integration = await context.getIntegration(integrationId);
      const accessToken = integration.token;

      // Build payload
      const payload: Record<string, unknown> = {
        title,
        head,
        base,
      };

      if (body && typeof body === "string") {
        payload.body = body;
      }

      if (draft === true) {
        payload.draft = true;
      }

      // Create pull request via GitHub API
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls`,
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
          `Failed to create pull request via GitHub API: ${errorData}`
        );
      }

      const data = (await response.json()) as {
        number: number;
        title: string;
        body: string;
        html_url: string;
        state: string;
        draft: boolean;
        head: { ref: string; repo: { full_name: string } | null };
        base: { ref: string };
        labels: Array<{ name: string; color: string }>;
        created_at: string;
        updated_at: string;
      };

      // Add reviewers if requested
      if (reviewers && typeof reviewers === "string") {
        const reviewerList = reviewers
          .split(",")
          .map((r: string) => r.trim())
          .filter(Boolean);

        if (reviewerList.length > 0) {
          await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${data.number}/requested_reviewers`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
                "User-Agent": "WorkflowHub/1.0",
              },
              body: JSON.stringify({ reviewers: reviewerList }),
            }
          );
        }
      }

      // Add labels if requested
      if (labels && typeof labels === "string") {
        const labelList = labels
          .split(",")
          .map((l: string) => l.trim())
          .filter(Boolean);

        if (labelList.length > 0) {
          await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues/${data.number}/labels`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
                "User-Agent": "WorkflowHub/1.0",
              },
              body: JSON.stringify({ labels: labelList }),
            }
          );
        }
      }

      return this.createSuccessResult({
        prNumber: data.number,
        pullRequest: {
          number: data.number,
          title: data.title,
          body: data.body,
          state: data.state,
          draft: data.draft,
          head: data.head.ref,
          base: data.base.ref,
          labels: data.labels.map((l) => ({ name: l.name, color: l.color })),
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
        url: data.html_url,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error
          ? error.message
          : "Unknown error creating pull request on GitHub"
      );
    }
  }
}
