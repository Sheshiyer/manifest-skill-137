---
name: "Manifest Skill Cluster"
description: "Render bounded, project-scoped Temperance and PAI evidence as a live visual operator console and portable static review artifacts."
globs:
  - "manifest/**/*"
  - "visual-pcb/**/*"
  - "plans/**/*.md"
  - "waves/**/*.md"
  - "**/architecture*.md"
  - "**/*-stub*"
requiredSources:
  - local-files
  - manifest-bridge
---

# Manifest Skill Cluster

Manifest is the visual projection layer for planning and operations. It makes bounded facts legible; it does not create a second planning, routing, approval, or execution authority.

## Runtime roles

1. **Temperance Engine / PAI** — owns phase flow, project initialization, next-wave proposal construction, routing policy, and approval-gated swarm safeguards.
2. **Manifest Bridge** — owns redaction, bounded event normalization, JSONL persistence, materialized snapshots, and named SSE events.
3. **Manifest visual console** — owns the five live projections: Overview, Planning, Execution, Evidence, and Ops / Delivery.
4. **Static artifact directory** — owns portable HTML snapshots for review; it is never live runtime truth.

The planning skills that produce proposals and waves are upstream sources. Their output becomes visible only after it is projected through the bridge or deliberately captured as a static artifact.

## When to use

- An operator needs to understand the current flow across planning, execution, operations, delivery, and evidence.
- A project has a real Temperance/PAI event source and needs a local, project-scoped visual read model.
- A review needs a frozen architecture or timeline artifact, clearly labelled as a snapshot.
- A plan has options and approval observations that must be visible without letting the visual surface start work.

## Operating contract

1. Initialize and sync the project through Temperance first.
2. Start one local Manifest Bridge; it owns port `8766` and can serve many project scopes.
3. Start `visual-pcb` against that bridge URL.
4. Render fresh, stale, offline, and empty state explicitly.
5. Keep raw prompts, tool bodies, credentials, and provider secrets out of the event and UI contracts.
6. Treat approval, claim, and worker lifecycle data as observations unless the Temperance control service has committed them.

## Local run

```bash
export TEMPERANCE_ROOT=/path/to/temperance_engine
export MANIFEST_ROOT=/path/to/manifest-skill-137

cd "$TEMPERANCE_ROOT/package/manifest-bridge"
bun run src/cli.ts serve --all --port 8766

cd "$MANIFEST_ROOT/visual-pcb"
VITE_MANIFEST_BRIDGE_URL=http://127.0.0.1:8766 npm run dev -- --host 127.0.0.1
```

See [README.md](README.md) and [docs/temperance-integration.md](docs/temperance-integration.md) for full setup and boundary details.

## Definition of done

- The relevant project is visible through a deterministic project scope.
- The console reads only the bridge snapshot and SSE contract.
- Freshness, absence, and source provenance remain explicit.
- Static artifacts identify their source and timestamp.
- No visual path can approve a plan or initiate a swarm.
