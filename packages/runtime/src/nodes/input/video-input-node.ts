import type { NodeContext } from "@workflowhub/runtime";
import { ExecutableNode } from "@workflowhub/runtime";
import type { NodeExecution, NodeType } from "@workflowhub/types";

/**
 * VideoInput node implementation
 * This node provides a video input widget that outputs a video reference.
 */
export class VideoInputNode extends ExecutableNode {
  public static readonly nodeType: NodeType = {
    id: "video-input",
    name: "Video Input",
    type: "video-input",
    description: "A video input widget for uploading video files",
    tags: ["Widget", "Video", "Input"],
    icon: "video",
    documentation:
      "This node provides a video input widget for uploading video files.",
    inlinable: true,
    inputs: [
      {
        name: "value",
        type: "video",
        description: "Current video value",
        hidden: true,
      },
    ],
    outputs: [
      {
        name: "value",
        type: "video",
        description: "The uploaded video",
      },
    ],
  };

  async execute(context: NodeContext): Promise<NodeExecution> {
    try {
      const value = context.inputs.value;

      if (!value) {
        return this.createErrorResult("No video provided");
      }

      return this.createSuccessResult({
        value,
      });
    } catch (error) {
      return this.createErrorResult(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
}
