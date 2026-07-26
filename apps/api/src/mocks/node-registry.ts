import {
  BaseNodeRegistry,
  FailingMultiStepNode,
  MultiStepAdditionNode,
} from "@workflowhub/runtime";
import { FormRequestNode } from "@workflowhub/runtime/nodes/form/form-request-node";
import { FormResponseNode } from "@workflowhub/runtime/nodes/form/form-response-node";
import { FormWebhookNode } from "@workflowhub/runtime/nodes/form/form-webhook-node";
import { NumberInputNode } from "@workflowhub/runtime/nodes/input/number-input-node";
import { ConditionalForkNode } from "@workflowhub/runtime/nodes/logic/conditional-fork-node";
import { ConditionalJoinNode } from "@workflowhub/runtime/nodes/logic/conditional-join-node";
import { CreateFeedbackFormNode } from "@workflowhub/runtime/nodes/logic/create-feedback-form-node";
import { CreateFormNode } from "@workflowhub/runtime/nodes/logic/create-form-node";
import { SwitchForkNode } from "@workflowhub/runtime/nodes/logic/switch-fork-node";
import { SwitchJoinNode } from "@workflowhub/runtime/nodes/logic/switch-join-node";
import { WaitForFormNode } from "@workflowhub/runtime/nodes/logic/wait-for-form-node";
import { AdditionNode } from "@workflowhub/runtime/nodes/math/addition-node";
import { AvgNode } from "@workflowhub/runtime/nodes/math/avg-node";
import { DivisionNode } from "@workflowhub/runtime/nodes/math/division-node";
import { MaxNode } from "@workflowhub/runtime/nodes/math/max-node";
import { MedianNode } from "@workflowhub/runtime/nodes/math/median-node";
import { MinNode } from "@workflowhub/runtime/nodes/math/min-node";
import { MultiplicationNode } from "@workflowhub/runtime/nodes/math/multiplication-node";
import { SubtractionNode } from "@workflowhub/runtime/nodes/math/subtraction-node";
import { SumNode } from "@workflowhub/runtime/nodes/math/sum-node";
import type { Bindings } from "../context";

/**
 * Mock Node Registry
 *
 * Lightweight node registry for testing that only includes basic math operations
 * and logic nodes.
 * Uses real node implementations but provides a minimal subset to avoid loading
 * heavy dependencies (like geotiff).
 *
 * Includes:
 * - Addition, Subtraction, Multiplication, Division
 * - Number Input
 * - Sum, Max, Min, Avg, Median
 * - Conditional Fork, Conditional Join, Create Form, Wait for Form
 * - Multi-Step Addition, Failing Multi-Step (test nodes)
 */
export class MockNodeRegistry extends BaseNodeRegistry<Bindings> {
  protected registerNodes(): void {
    this.registerImplementation(AdditionNode);
    this.registerImplementation(SubtractionNode);
    this.registerImplementation(MultiplicationNode);
    this.registerImplementation(DivisionNode);
    this.registerImplementation(NumberInputNode);
    this.registerImplementation(SumNode);
    this.registerImplementation(MaxNode);
    this.registerImplementation(MinNode);
    this.registerImplementation(AvgNode);
    this.registerImplementation(MedianNode);
    this.registerImplementation(ConditionalForkNode);
    this.registerImplementation(ConditionalJoinNode);
    this.registerImplementation(SwitchForkNode);
    this.registerImplementation(SwitchJoinNode);
    this.registerImplementation(CreateFormNode);
    this.registerImplementation(CreateFeedbackFormNode);
    this.registerImplementation(WaitForFormNode);
    this.registerImplementation(FormRequestNode);
    this.registerImplementation(FormWebhookNode);
    this.registerImplementation(FormResponseNode);
    this.registerImplementation(MultiStepAdditionNode);
    this.registerImplementation(FailingMultiStepNode);
  }
}
