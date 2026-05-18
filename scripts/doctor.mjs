#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve } from "node:path";

const exec = promisify(execFile);
async function command(name, args = ["--version"]) {
  try {
    const { stdout, stderr } = await exec(name, args, { timeout: 10_000 });
    return { ok: true, text: (stdout || stderr).trim().split("\n")[0] };
  } catch (error) {
    return { ok: false, text: error.message };
  }
}
async function file(path) {
  try { await access(path, constants.R_OK); return true; } catch { return false; }
}
async function mcpConfig(path) {
  try {
    const parsed = JSON.parse(await readFile(path, "utf8"));
    const server = parsed?.mcpServers?.["open-computer-use"];
    const ok = server?.command === "open-computer-use" && Array.isArray(server.args) && server.args[0] === "mcp";
    return { ok, text: ok ? `${path}: open-computer-use -> open-computer-use mcp` : `${path}: missing open-computer-use server` };
  } catch (error) {
    return { ok: false, text: error.message };
  }
}

const home = process.env.HOME || ".";
const checks = [];
checks.push(["pi", await command("pi", ["--version"])]);
checks.push(["node", await command("node", ["--version"])]);
checks.push(["GoalBuddy", await command("npx", ["--yes", "goalbuddy@0.3.6", "--version"])]);
checks.push(["cmux (required for /goal team)", await command("cmux", ["--help"])]);
checks.push(["installed goal extension", { ok: await file(resolve(home, ".pi/agent/extensions/goal/index.ts")), text: "~/.pi/agent/extensions/goal/index.ts" }]);
checks.push(["installed same-machine coms", { ok: await file(resolve(home, ".pi/agent/extensions/pi-vs-claude-code-coms/coms.ts")), text: "~/.pi/agent/extensions/pi-vs-claude-code-coms/coms.ts" }]);
checks.push(["installed network coms", { ok: await file(resolve(home, ".pi/agent/extensions/pi-vs-claude-code-coms/coms-net.ts")), text: "~/.pi/agent/extensions/pi-vs-claude-code-coms/coms-net.ts" }]);
checks.push(["open-computer-use CLI (optional)", await command("open-computer-use", ["version"])]);
checks.push(["open-computer-use MCP config (optional)", await mcpConfig(resolve(home, ".pi/agent/mcp.json"))]);

for (const [name, result] of checks) {
  console.log(`${result.ok ? "✓" : "?"} ${name}: ${result.text}`);
}
