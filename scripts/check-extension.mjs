#!/usr/bin/env node
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire, Module } from "node:module";

const repoRoot = resolve(import.meta.dirname, "..");
const piNodeModules = "/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent/node_modules";
process.env.NODE_PATH = process.env.NODE_PATH ? `${piNodeModules}:${process.env.NODE_PATH}` : piNodeModules;
Module._initPaths();
const require = createRequire(import.meta.url);
const jitiPath = require.resolve(`${piNodeModules}/jiti/lib/jiti.mjs`);
const { createJiti } = await import(pathToFileURL(jitiPath));
const jiti = createJiti(import.meta.url, { moduleCache: false });

function makePiHarness() {
  const calls = [];
  const flags = new Map();
  return {
    calls,
    pi: {
      registerFlag(name, options = {}) { flags.set(name, options.default); calls.push(["flag", name]); },
      getFlag(name) { return flags.get(name); },
      registerTool(tool) { calls.push(["tool", typeof tool === "string" ? tool : tool.name]); },
      registerCommand(nameOrCommand) { calls.push(["command", typeof nameOrCommand === "string" ? `/${nameOrCommand}` : nameOrCommand.name]); },
      registerMessageRenderer(name) { calls.push(["renderer", name]); },
      on(name) { calls.push(["event", name]); },
      appendEntry() {},
      sendMessage() {},
      exec: async () => ({ code: 0, stdout: "", stderr: "" }),
    },
  };
}

async function loadExtension(relativePath, required) {
  const mod = await jiti.import(resolve(repoRoot, relativePath));
  const { pi, calls } = makePiHarness();
  await mod.default(pi);
  const seen = new Set(calls.map(([, name]) => name));
  for (const item of required) {
    if (!seen.has(item)) throw new Error(`${relativePath} missing registration: ${item}`);
  }
}

await loadExtension("extensions/goal/index.ts", [
  "/goal",
  "/goal-prep",
  "/goalbuddy",
  "get_goal",
  "create_goal",
  "update_goal",
  "prepare_goalbuddy_board",
  "goal_agent_status",
  "goal-team-child",
]);

await loadExtension("extensions/pi-vs-claude-code-coms/coms.ts", [
  "/coms",
  "coms_list",
  "coms_send",
  "coms_get",
  "coms_await",
  "name",
  "project",
]);

console.log("Extension smoke test passed");
