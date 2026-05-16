# Contributing

Thanks for improving this Pi extension pack.

## Local development

1. Make your changes.
2. Run the extension smoke test:

   ```bash
   npm run check
   ```

3. Install the local copy into Pi:

   ```bash
   npm run install:local
   ```

4. Reload Pi:

   ```text
   /reload
   ```

5. Smoke test a low-risk goal:

   ```text
   /goal Say tick, then mark the goal complete.
   ```

6. If you changed GoalBuddy behavior, also test:

   ```text
   /goal-prep Make a tiny documentation improvement.
   ```

7. If you changed computer-use config, run:

   ```bash
   npm run doctor
   ```

## Project expectations

- Keep the install path simple: users should be able to run `npm run install:local` and `/reload`.
- Preserve existing user MCP servers when editing `~/.pi/agent/mcp.json`.
- Do not vendor `open-computer-use` binaries, private app bundles, or OS permissions.
- Keep GoalBuddy useful but optional.
- Prefer clear user-facing documentation over implementation notes in the README.
- Do not mark a goal complete unless current evidence proves the requested outcome is done.

## Pull request checklist

Before submitting:

- [ ] `npm run check` passes.
- [ ] `npm run doctor` is still useful and accurate.
- [ ] New commands or config changes are documented in `README.md`.
- [ ] Security-sensitive behavior is documented in `SECURITY.md` if needed.
