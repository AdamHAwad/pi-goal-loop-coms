# Pi Goal Loop + Computer Use

Pi extension pack for persistent coding goals, GoalBuddy planning boards, and optional desktop UI tools through `open-computer-use`.

[Install](#install) · [Quick start](#quick-start) · [Commands](#commands) · [Computer use](#computer-use-setup) · [Troubleshooting](#troubleshooting) · [Security](#security)

## What it does

- Adds `/goal` for a durable objective that can continue across assistant turns.
- Adds `/goal-prep` to turn a rough request into a GoalBuddy board before starting the loop.
- Adds `/goalbuddy` helpers for opening and managing local GoalBuddy boards.
- Ships a real Pi MCP config for `open-computer-use mcp`.

Use it when a coding task needs more than one response and you want a visible plan, task receipts, and optional UI verification.

## Requirements

| Requirement | Notes |
|---|---|
| [Pi coding agent](https://github.com/earendil-works/pi-coding-agent) | Required |
| Node.js and npm | Required for install scripts and `npx` |
| [GoalBuddy](https://github.com/tolibear/goalbuddy) | Run automatically with `npx --yes goalbuddy@0.3.6` |
| [`open-computer-use`](https://github.com/iFurySt/open-codex-computer-use) | Optional, only needed for desktop UI tools |
| `cmux` | Optional, used to open the GoalBuddy board inside cmux when available |

## Install

```bash
git clone https://github.com/AdamHAwad/pi-goal-computer-use.git
cd pi-agent-goal-computer-use
npm run install:local
```

Reload Pi:

```text
/reload
```

Check the setup:

```bash
npm run doctor
```

The installer copies the goal extension to `~/.pi/agent/extensions/goal/index.ts` and merges the `open-computer-use` MCP server into `~/.pi/agent/mcp.json` without removing your other MCP servers.

## Quick start

Start a persistent goal directly:

```text
/goal Refactor the auth flow and verify the login tests pass.
```

For larger or unclear work, prepare a board first:

```text
/goal-prep Refactor the auth flow and verify the login tests pass.
```

Pi will ask any needed follow-up questions, create `docs/goals/<slug>/`, open a GoalBuddy board, and print a handoff command:

```text
/goal Follow docs/goals/<slug>/goal.md.
```

Run that command to start the goal loop from the board.

## Commands

### Goal loop

| Command | Purpose |
|---|---|
| `/goal <objective>` | Start or replace the active goal |
| `/goal` | Show current goal status |
| `/goal pause` | Pause automatic continuation |
| `/goal resume` | Resume automatic continuation |
| `/goal edit` | Edit the current objective |
| `/goal clear` | Stop tracking the current goal |

### Goal prep

| Command | Purpose |
|---|---|
| `/goal-prep <objective>` | Start conversational GoalBuddy intake |
| `/goal --goalbuddy <objective>` | Prepare a board and start the goal flow from `/goal` |

`/goal-prep` creates:

```text
docs/goals/<slug>/goal.md
docs/goals/<slug>/state.yaml
docs/goals/<slug>/notes/prep-grounding.md
docs/goals/<slug>/notes/
```

### GoalBuddy board

| Command | Purpose |
|---|---|
| `/goalbuddy install` | Install/check GoalBuddy agent helpers |
| `/goalbuddy doctor` | Run GoalBuddy diagnostics |
| `/goalbuddy board docs/goals/<slug>` | Start a board for an existing goal folder |
| `/goalbuddy open` | Reopen the last board URL |
| `/goalbuddy stop-board` | Stop the board process started by this extension |

## Computer-use setup

This repo includes the Pi MCP config for `open-computer-use`:

```text
extensions/open-computer-use/mcp.json
```

After `npm run install:local`, Pi can start the MCP server with:

```bash
open-computer-use mcp
```

The `open-computer-use` binary is not bundled. Install it separately, grant the required OS permissions, then reload Pi. See [extensions/open-computer-use/README.md](extensions/open-computer-use/README.md).

## What this does not do

- Does not install Pi itself.
- Does not bundle the `open-computer-use` binary.
- Does not grant macOS Accessibility or Screen Recording permissions.
- Does not remove your existing MCP servers during install.
- Does not replace normal review: you should still inspect changes before trusting long-running goals.

## Troubleshooting

| Problem | Try this |
|---|---|
| Slash commands do not appear | Run `/reload` in Pi after `npm run install:local` |
| `open-computer-use` tools do not appear | Check `~/.pi/agent/mcp.json`, then run `/reload` |
| `open-computer-use` is not found | Install the CLI or fix your shell PATH |
| Computer-use cannot see or operate apps | Grant Accessibility and Screen Recording permissions, then restart the controlling app |
| GoalBuddy board does not open | Run `/goalbuddy board docs/goals/<slug>` or use the printed board URL |
| Setup status is unclear | Run `npm run doctor` |

## Security

Goal loops can keep taking actions after each assistant turn. Start with clear objectives, keep the GoalBuddy board visible for larger work, and pause when needed:

```text
/goal pause
```

Computer-use tools can interact with real apps. Close sensitive windows before using them. See [SECURITY.md](SECURITY.md).

## Development

```bash
npm run check
npm run doctor
```

## Repository layout

```text
extensions/goal/index.ts               Pi extension for /goal, /goal-prep, /goalbuddy
extensions/open-computer-use/mcp.json  MCP config for open-computer-use
scripts/install.mjs                    Local installer
scripts/doctor.mjs                     Setup diagnostics
scripts/check-extension.mjs            Extension smoke test
docs/architecture.md                   What gets installed and how it works
docs/release-checklist.md              Maintainer release checklist
```

## Credits

See [CREDITS.md](CREDITS.md).
