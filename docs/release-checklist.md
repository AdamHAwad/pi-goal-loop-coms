# Release checklist

Use this before publishing a new version or pushing a release branch.

## Local checks

- [ ] Run `npm run check`.
- [ ] Run `npm run doctor`.
- [ ] Run `git diff --check`.
- [ ] Install locally with `npm run install:local`.
- [ ] Reload Pi with `/reload`.

## Smoke tests

- [ ] Start a simple goal:

  ```text
  /goal Say tick, then mark the goal complete.
  ```

- [ ] Prepare a small board:

  ```text
  /goal-prep Make a tiny documentation improvement.
  ```

- [ ] Confirm the GoalBuddy board opens.
- [ ] Confirm `/goalbuddy open` reopens the board.
- [ ] Confirm `/goal pause`, `/goal resume`, and `/goal clear` work.
- [ ] Confirm no hidden control text appears in visible chat.

## Computer-use checks

- [ ] Confirm `extensions/open-computer-use/mcp.json` is valid JSON.
- [ ] Confirm `npm run install:local` preserves existing MCP servers.
- [ ] If `open-computer-use` is installed locally, confirm `npm run doctor` detects it.

## Documentation checks

- [ ] README install steps work from a fresh clone.
- [ ] README command examples match the extension behavior.
- [ ] `extensions/open-computer-use/README.md` matches the shipped MCP config.
- [ ] `SECURITY.md`, `CONTRIBUTING.md`, and `CREDITS.md` are current.

## Suggested GitHub description

> Pi extension pack for persistent goal loops, GoalBuddy planning boards, and optional open-computer-use desktop tools.
