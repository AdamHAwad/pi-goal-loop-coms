# Release checklist

Use this before publishing a new version or pushing a release branch.

## Local checks

- [ ] Run `npm run check`.
- [ ] Run `npm run doctor`.
- [ ] Run `git diff --check`.
- [ ] Install locally with `npm run install:local`.
- [ ] Reload Pi with `/reload`.

## Goal team smoke tests

- [ ] Prepare a small board:

  ```text
  /goal-prep Make a tiny documentation improvement. Success means a GoalBuddy board is created and no unrelated files are changed.
  ```

- [ ] Start the printed handoff command:

  ```text
  /goal Follow docs/goals/<slug>/goal.md.
  ```

- [ ] Confirm `cmux` is installed and opens four child Pi panels.
- [ ] Confirm `docs/goals/<slug>/team.yaml` exists.
- [ ] Confirm `docs/goals/<slug>/notes/agent-prompts/*.md` exists.
- [ ] Confirm `docs/goals/<slug>/notes/agent-status/*.json` exists after children run.
- [ ] Run `/goal team-status` and confirm the parent loop is inactive.
- [ ] Confirm no child is stuck `active` after useful role output.
- [ ] Run `/goal team-stop` and confirm child processes stop.

## Coms checks

- [ ] Confirm `extensions/pi-vs-claude-code-coms/README.md` names the upstream commit.
- [ ] Confirm `extensions/pi-vs-claude-code-coms/LICENSE` is present.
- [ ] Confirm same-machine coms tools register in `npm run check`.
- [ ] If network coms changed, test it separately and document the security assumptions.

## GoalBuddy checks

- [ ] Confirm the GoalBuddy board opens from `/goal-prep`.
- [ ] Confirm `/goalbuddy open` reopens the board.
- [ ] Confirm `/goal-prep` text after the command is used in hidden prep context.
- [ ] Confirm no hidden control text appears in visible chat.

## Computer-use checks

- [ ] Confirm `extensions/open-computer-use/mcp.json` is valid JSON.
- [ ] Confirm `npm run install:local` preserves existing MCP servers.
- [ ] If `open-computer-use` is installed locally, confirm `npm run doctor` detects it.

## Documentation checks

- [ ] README install steps work from a fresh clone.
- [ ] README command examples match the extension behavior.
- [ ] README names the repo/workflow around goal loops plus multi-agent coms, not computer-use.
- [ ] README treats cmux as required for the local multi-agent workflow.
- [ ] README makes computer-use optional, not the central feature.
- [ ] README credits `disler/pi-vs-claude-code` for Pi-to-Pi coms.
- [ ] `extensions/open-computer-use/README.md` matches the shipped MCP config.
- [ ] `SECURITY.md`, `CONTRIBUTING.md`, and `CREDITS.md` are current.

## Suggested GitHub description

> Pi extensions for Golden Goal Prep, durable goal loops, and flat local multi-agent coms teams; optional computer-use tools included.
