#!/usr/bin/env node
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const home = process.env.HOME || ".";
const source = resolve(repoRoot, "extensions/goal/index.ts");
const target = resolve(home, ".pi/agent/extensions/goal/index.ts");
const sourceMcp = resolve(repoRoot, "extensions/open-computer-use/mcp.json");
const targetMcp = resolve(home, ".pi/agent/mcp.json");

async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return fallback;
  }
}

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
console.log(`Installed goal extension to ${target}`);

const computerUseConfig = await readJson(sourceMcp, {});
const existingMcpConfig = await readJson(targetMcp, {});
const mergedMcpConfig = {
  ...existingMcpConfig,
  settings: {
    ...(computerUseConfig.settings ?? {}),
    ...(existingMcpConfig.settings ?? {}),
  },
  mcpServers: {
    ...(existingMcpConfig.mcpServers ?? {}),
    ...(computerUseConfig.mcpServers ?? {}),
  },
};
await mkdir(dirname(targetMcp), { recursive: true });
await writeFile(targetMcp, `${JSON.stringify(mergedMcpConfig, null, 2)}\n`, "utf8");
console.log(`Installed open-computer-use MCP config to ${targetMcp}`);
console.log("Run /reload inside Pi.");
