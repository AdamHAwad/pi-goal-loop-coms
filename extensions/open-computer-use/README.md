# Open Computer Use for Pi

This directory contains the MCP configuration that lets Pi start `open-computer-use` as a tool server.

## What is included

- [`mcp.json`](./mcp.json) — the Pi MCP server entry for `open-computer-use mcp`
- this guide — setup, permissions, and smoke tests

The binary is not bundled in this repository. You must install `open-computer-use` separately.

## Install the MCP config

From the repository root:

```bash
npm run install:local
```

Then reload Pi:

```text
/reload
```

The installer merges this entry into `~/.pi/agent/mcp.json`:

```json
{
  "mcpServers": {
    "open-computer-use": {
      "command": "open-computer-use",
      "args": ["mcp"],
      "lifecycle": "lazy",
      "directTools": true
    }
  }
}
```

Existing MCP servers are preserved.

## Install the CLI

If `open-computer-use` is not already installed, install it using your preferred provider instructions. For the npm package:

```bash
npm install -g open-computer-use
```

Verify it is on your PATH:

```bash
open-computer-use version
```

## macOS permissions

Computer-use tools need OS permissions before they can inspect or operate apps.

Open **System Settings → Privacy & Security** and grant the controlling terminal/app permissions for:

- Accessibility
- Screen Recording

Restart the terminal/app after changing permissions.

You can also run:

```bash
open-computer-use doctor
```

## Smoke test in Pi

After reloading Pi, ask for a harmless UI check, for example:

```text
List the running apps with computer use, then inspect my browser window without clicking anything.
```

Expected result: Pi can see running apps and can retrieve a screenshot/accessibility tree.

## What tools this enables

Depending on the host and permissions, Pi may be able to:

- list running or recently used apps
- inspect an app screenshot and accessibility tree
- click, drag, scroll, type, and press keys
- set values in accessible UI elements

## Troubleshooting

Run:

```bash
npm run doctor
```

Common issues:

- `open-computer-use` not found: install the CLI or fix your PATH.
- Permission errors: grant Accessibility and Screen Recording, then restart the controlling app.
- Tools do not appear in Pi: run `/reload` after installing, then check `~/.pi/agent/mcp.json`.
- Sensitive apps are visible: close them before using computer-use tools.
