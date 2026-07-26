/**
 * Worker Runtime
 *
 * Factory for creating a WorkerRuntime wired with Cloudflare production
 * dependencies. Used for synchronous (non-durable) workflow execution
 * where results are returned inline to the caller.
 */

import { WorkerRuntime } from "@workflowhub/runtime";

import type { Bindings } from "../context";
import { buildDependencies } from "./cloudflare-runtime-dependencies";

export { WorkerRuntime } from "@workflowhub/runtime";

export function createWorkerRuntime(env: Bindings): WorkerRuntime<Bindings> {
  const noopMonitoring = { async sendUpdate() {} };
  return new WorkerRuntime(env, buildDependencies(env, noopMonitoring));
}
