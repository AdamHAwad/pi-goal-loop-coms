# How it works

This page is for users who want to know what the installer changes and how the pieces fit together.

## Installed files

Running `npm run install:local` writes to your Pi config directory:

```text
~/.pi/agent/extensions/goal/index.ts   /goal, /goal-prep, and /goalbuddy
~/.pi/agent/mcp.json                   merged open-computer-use MCP server entry
```

The installer preserves existing MCP servers and replaces only the `open-computer-use` entry when needed.

## Goal loop

`/goal <objective>` creates an active goal for the current Pi thread. After each assistant run, Pi queues a follow-up turn so the assistant can continue making progress without you restating the objective.

The loop stops when one of these happens:

- the assistant proves the objective is complete
- you run `/goal pause`
- you run `/goal clear`
- a configured token budget is reached
- the Pi session ends

Use `/goal resume` to continue a paused goal.

## GoalBuddy boards

`/goal-prep <objective>` starts a short intake conversation. When the goal is clear, Pi creates a file-backed GoalBuddy board in:

```text
docs/goals/<slug>/
```

Important files:

```text
goal.md                  human-readable goal charter
state.yaml               board state and task list
notes/prep-grounding.md  initial repo/context notes
notes/                   longer receipts and follow-up notes
```

When you start `/goal Follow docs/goals/<slug>/goal.md.`, the goal loop treats `state.yaml` as the board source of truth.

## Board UI

The extension starts the local GoalBuddy board with:

```bash
npx --yes goalbuddy@0.3.6 board docs/goals/<slug>
```

The default board URL is:

```text
http://127.0.0.1:41737/<slug>/
```

If `cmux` is installed, the extension tries to open the board there. Otherwise it opens the system browser and prints the link.

## Computer use

`extensions/open-computer-use/mcp.json` defines the Pi MCP server for desktop control:

```bash
open-computer-use mcp
```

When installed, Pi can expose those tools directly to the assistant. The repository provides configuration only; the `open-computer-use` CLI and operating-system permissions are managed separately.

## What is not installed

This repository does not install or bundle:

- Pi itself
- the `open-computer-use` binary
- private app bundles
- macOS Accessibility or Screen Recording permissions

Use `npm run doctor` to check the local setup.
