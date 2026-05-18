# How it works

This page explains what the installer changes and how the pieces fit together.

## Installed files

Running `npm run install:local` writes to your Pi config directory:

```text
~/.pi/agent/extensions/goal/index.ts
~/.pi/agent/extensions/pi-vs-claude-code-coms/coms.ts
~/.pi/agent/extensions/pi-vs-claude-code-coms/coms-net.ts
~/.pi/agent/extensions/pi-vs-claude-code-coms/scripts/coms-net-server.ts
~/.pi/agent/extensions/pi-vs-claude-code-coms/themeMap.ts
~/.pi/agent/mcp.json
```

The installer preserves existing MCP servers and replaces/merges only the `open-computer-use` entry when needed.

## Golden Goal Prep

`/goal-prep <objective>` starts a short intake conversation. When the goal is clear, Pi creates a file-backed GoalBuddy board in:

```text
docs/goals/<slug>/
```

Important files:

```text
goal.md                  human-readable goal charter
state.yaml               board state and task list
notes/prep-grounding.md  initial repo/context notes
notes/                   durable receipts and follow-up notes
```

The `/goal-prep` command keeps the text after the command in hidden prep context, so the assistant should not ask the user to restate details already provided.

## `/goal` launcher

When run from a normal parent Pi session, `/goal <objective>` is launcher/control-surface behavior:

1. resolve the GoalBuddy root when the objective references `docs/goals/<slug>/goal.md`
2. ensure the local coms extension is installed
3. resolve `cmux` (required for the local multi-agent workflow)
4. create role prompts under `docs/goals/<slug>/notes/agent-prompts/` or `.pi/goal-agent-prompts/<project>/`
5. write `team.yaml`
6. open a `cmux` workspace with four child-agent terminal panels
7. when a GoalBuddy board URL is known, add a full-height browser panel on the right side of that same workspace
8. start four child Pi processes
9. clear the parent goal loop so the parent session does not continue autonomously

The parent then provides control commands:

```text
/goal team-status
/goal team-open
/goal team-stop
```

## Child agents

Each child Pi process is launched with both extensions:

```bash
pi --no-extensions \
  -e ~/.pi/agent/extensions/goal/index.ts \
  -e ~/.pi/agent/extensions/pi-vs-claude-code-coms/coms.ts \
  --goal-team-child \
  --goal-role <role> \
  --goal-root docs/goals/<slug> \
  --goal-project goal-<slug> \
  --name <role> \
  --project goal-<slug> \
  --purpose "<role purpose>" \
  @docs/goals/<slug>/notes/agent-prompts/<role>.md \
  "Read the attached role prompt and begin the goal loop."
```

Child agents create their own durable role-specific goal and receive GoalBuddy/team/lifecycle context before each run.

## Role selection

The launcher creates four specialized peer roles. Role names adapt to the objective:

- UI/frontend goals: `ux-scout`, `ui-planner`, `ui-worker`, `a11y-verifier`
- migration/API/parity goals: `source-scout`, `target-scout`, `migration-worker`, `parity-verifier`
- bug/regression goals: `repro-scout`, `fix-planner`, `bugfix-worker`, `regression-verifier`
- default: `scout`, `planner`, `worker`, `verifier`

The planner/steward may maintain board coherence, but it is not an orchestrator. Any peer may message any other peer.

## Peer communication

Same-machine coms uses local sockets/pipes and registry files under:

```text
~/.pi/coms/projects/<project>/agents/
```

The important tools are:

```text
coms_list   discover peers
coms_send   send a prompt to a peer
coms_get    poll a response without blocking
coms_await  wait for a response, capped in goal children to reduce deadlock risk
```

The goal extension prompts children to prefer `send → keep working → poll later` over symmetric blocking waits.

## Lifecycle control

Child agents can call:

```text
goal_agent_status({
  status: "active" | "idle" | "blocked" | "done",
  summary?: string,
  wake_on_coms?: boolean,
  receipt_paths?: string[]
})
```

Only `active` children auto-continue after `agent_end`. `idle`, `blocked`, and `done` children still receive inbound coms/user context, but they do not keep burning turns on their own.

Status files are written to:

```text
docs/goals/<slug>/notes/agent-status/<role>.json
```

or the fallback prompt directory when no GoalBuddy root exists.

## Board UI

The extension starts the local GoalBuddy board with:

```bash
npx --yes goalbuddy@0.3.6 board docs/goals/<slug>
```

The default board URL is:

```text
http://127.0.0.1:41737/<slug>/
```

When `/goal` launches from a GoalBuddy-backed goal and a board URL is known, the `cmux` workspace layout embeds that URL as a full-height browser panel on the right. The four child-agent terminals stay in a 2×2 grid on the left. Standalone board commands such as `/goalbuddy open` still use the board-opening path, which prefers `cmux browser open` and falls back to the system browser/link notification if needed.

## Computer use

`extensions/open-computer-use/mcp.json` defines the optional Pi MCP server for desktop control:

```bash
open-computer-use mcp
```

The repository provides configuration only; the `open-computer-use` CLI and operating-system permissions are managed separately.

## What is not installed

This repository does not install or bundle:

- Pi itself
- cmux
- the `open-computer-use` binary
- private app bundles
- macOS Accessibility or Screen Recording permissions
- API keys, credentials, or secrets

Use `npm run doctor` to check the local setup.
