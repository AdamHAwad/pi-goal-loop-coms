# Security

This project enables persistent agent work, local peer-to-peer agent messaging, and optional desktop interaction. Treat it like automation with access to your local machine.

## Report a security issue

Please report security issues privately to the repository owner. Do not open a public issue with exploit details or secrets.

## Installation and secrets

The installer is designed to copy extension files and merge MCP config. It should not need to read secrets.

Before installing or asking an agent to install it:

- do not paste API keys, passwords, tokens, private keys, or cookies into prompts
- do not ask the agent to inspect `.env`, keychains, browser profiles, SSH keys, or password-manager exports
- review `git diff` before sharing logs or generated `docs/goals/` folders
- keep unrelated local config out of scope

## Safe use guidelines

- Start with small, explicit goals.
- Prefer `/goal-prep` for larger work so the board contains constraints and proof requirements.
- Monitor child agents with `/goal team-status`.
- Stop child agents with `/goal team-stop` when finished or if behavior is unexpected.
- Review GoalBuddy notes before trusting long-running work.
- Close sensitive windows before using computer-use tools.
- Do not expose passwords, tokens, private messages, customer data, or financial information in visible apps.

## Agent-to-agent coms

`/goal` uses same-machine coms by default. Registry and message state live under:

```text
~/.pi/coms/
```

The bundled network coms files are included for advanced cross-device use, but they are not used by `/goal` by default. Only use network coms after reviewing and adapting the security model for your network.

Peer agents may summarize or transmit information to each other. If your repo or task involves secrets, credentials, PII, production data, or private customer information, put explicit redaction rules in the goal and verify the notes before sharing.

## Computer-use permissions

If you enable `open-computer-use`, your operating system controls whether the tool can see or operate apps. On macOS, review:

- System Settings → Privacy & Security → Accessibility
- System Settings → Privacy & Security → Screen Recording

Remove those permissions if you no longer want desktop-control tools available.

## What this repo does not do

This repository does not:

- install Pi itself
- bundle the `open-computer-use` binary
- grant macOS Accessibility or Screen Recording permissions
- bypass OS permission prompts
- intentionally collect telemetry
- intentionally read or exfiltrate secrets
