# manifest-skill-cluster — Project Status

> Maintained runtime-status note · refreshed 2026-08-13

## Current delivery state

- **Repository:** https://github.com/Sheshiyer/manifest-skill-137
- **Branch:** `main`
- **Current delivery:** bridge-backed five-page operator console in `visual-pcb/`.
- **Runtime dependency:** the local Manifest Bridge in the separate `temperance_engine` repository.
- **Verification:** `cd visual-pcb && npm run build && npm run lint`.

## What is observed versus controlled

The console displays a read model of project, planning, execution, evidence, and delivery facts. It can show proposal/approval/dispatch observations but does not approve, claim, or launch work. Temperance owns that control path.

## Current gaps

The maintained backlog is [CONSOLE_GAP_REGISTER.md](CONSOLE_GAP_REGISTER.md). The principal remaining release work is explicit swarm eligibility/blockers, worker receipts, terminal closure, lifecycle projection, deep links, and automated visual accessibility/regression coverage.

## Operator pickup

Read `PROJECT.md`, `AGENTS.md`, `CLAUDE.md`, and `docs/temperance-integration.md` before changing the repository. Keep the bridge URL configurable, preserve the projection-only boundary, and do not add local paths, credentials, raw prompts, or tool bodies to the repository.
