# Security

This project enables persistent agent work and, when configured, desktop interaction. Treat it like automation with access to your local machine.

## Report a security issue

Please report security issues privately to the repository owner. Do not open a public issue with exploit details or secrets.

## Safe use guidelines

- Start with small, explicit goals.
- Keep `/goal pause` handy.
- Review GoalBuddy boards before letting a long goal continue unattended.
- Close sensitive windows before using computer-use tools.
- Do not expose passwords, tokens, private messages, or financial information in visible apps.
- Review generated files before sharing logs, sessions, or `docs/goals/` folders.

## What this repo does not do

This repository does not:

- install Pi itself
- bundle the `open-computer-use` binary
- grant macOS Accessibility or Screen Recording permissions
- bypass OS permission prompts
- intentionally collect telemetry

## Computer-use permissions

If you enable `open-computer-use`, your operating system controls whether the tool can see or operate apps. On macOS, review:

- System Settings → Privacy & Security → Accessibility
- System Settings → Privacy & Security → Screen Recording

Remove those permissions if you no longer want desktop-control tools available.
