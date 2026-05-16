#!/usr/bin/env node
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const repoRoot = resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const jitiPath = require.resolve("/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent/node_modules/jiti/lib/jiti.mjs");
const { createJiti } = await import(pathToFileURL(jitiPath));
const jiti = createJiti(import.meta.url, { moduleCache: false });
const mod = await jiti.import(resolve(repoRoot, "extensions/goal/index.ts"));

const calls = [];
const pi = {
  registerTool(tool) { calls.push(["tool", typeof tool === "string" ? tool : tool.name]); },
  registerCommand(nameOrCommand) { calls.push(["command", typeof nameOrCommand === "string" ? `/${nameOrCommand}` : nameOrCommand.name]); },
  registerMessageRenderer(name) { calls.push(["renderer", name]); },
  on(name) { calls.push(["event", name]); },
  appendEntry() {},
  sendMessage() {},
  exec() {}
};

mod.default(pi);
const required = ["/goal", "/goal-prep", "/goalbuddy", "get_goal", "create_goal", "update_goal", "prepare_goalbuddy_board"];
const seen = new Set(calls.map(([, name]) => name));
for (const item of required) {
  if (!seen.has(item)) throw new Error(`Missing registration: ${item}`);
}
console.log("Extension smoke test passed");
