# pi-vs-claude-code Pi-to-Pi coms install

Installed from https://github.com/disler/pi-vs-claude-code at commit 3ce16391a1f4d244f9204578833506580273fe20.

Only the Pi-to-Pi communication files were installed:
- `coms.ts` — same-machine peer messaging (`coms_*` tools)
- `coms-net.ts` — HTTP/SSE hub client (`coms_net_*` tools)
- `scripts/coms-net-server.ts` — network hub server
- `themeMap.ts` — helper imported by the two extensions

This directory intentionally has no `index.ts`, so Pi will not auto-load these extensions into every session. Load them explicitly with `pi -e` when you want agent-to-agent communication.
