# Credits

This project builds on several tools and ideas:

- **Pi coding agent** by Earendil Works — extension APIs, slash commands, model tools, session state, and event hooks.
- **[GoalBuddy](https://github.com/tolibear/goalbuddy)** by tolibear — local file-backed goal boards using `goal.md`, `state.yaml`, and `notes/`.
- **[pi-vs-claude-code](https://github.com/disler/pi-vs-claude-code)** by IndyDevDan / disler — Pi-to-Pi communication extensions (`coms.ts`, `coms-net.ts`) that enable peer agents to list, message, poll, and await one another.
- **OpenAI Codex CLI goal behavior** — inspiration for persistent thread goals, continuation turns, and explicit completion checks.
- **[open-computer-use](https://github.com/iFurySt/open-codex-computer-use)** — optional desktop screenshot/accessibility tooling exposed through MCP when users install the CLI.
- **cmux** — terminal/browser workspace used to open the local child-agent panels and GoalBuddy boards.

The bundled `extensions/pi-vs-claude-code-coms/` files are adapted from `pi-vs-claude-code` at commit `3ce16391a1f4d244f9204578833506580273fe20`; see that directory's `LICENSE` for the upstream MIT license notice.

No endorsement by these projects is implied.
