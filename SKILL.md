---
name: "Manifest Skill Cluster"
description: "The living visual manifest of the three-skill bundle: Swarm Architect (planner), GitHub Next-Wave Orchestrator (reality + dispatch), and Visual Documentation Skills (the central living truth layer). Every architecture decision, stub, wave, contract, and 'done' is visualized and kept concurrent on a local server."
globs:
  - "manifest/**/*"
  - "plans/**/*.md"
  - "waves/**/*.md"
  - "**/architecture*.md"
  - "**/*-stub*"
requiredSources:
  - github
  - local-files
---

# Manifest Skill Cluster

This is the **coordinating skill cluster** that treats the **visual layer as the central living manifest**.

## The Three Skills It Bundles

1. **swarm-architect-skill** — Broad multi-agent planner (phase → wave → swarm, contracts, GitHub sync, OpenViking memory, with optional GitHub Copilot autonomous dispatch routing for eligible tasks).
2. **github-next-wave-orchestrator** — Specialized GitHub-grounded engine: repo scan → status report → prioritized next wave with explicit human vs GitHub Copilot autonomous dispatch (one optional explicit lane) + label-based dispatch.
3. **visual-documentation-skills (1.1.0)** — The heart. Five generators (architecture, timeline, flowchart, dashboard, technical docs) that turn every planner artifact into beautiful, self-contained, check-in-ready HTML.

## Core Principle

**The visual layer is not an afterthought — it is the single source of manifested truth.**

When you run the manifest:
- The planners produce structure (plans, waves, decisions, stubs, dispatch status).
- The manifest wiring feeds those artifacts into the visual generators.
- You get a living set of visuals served locally.
- A watcher keeps everything concurrent as the underlying work changes.

## When to Use

- You are building or reviewing a multi-skill system and want every decision and stub to be immediately visible.
- You want a "living manifesto" of the current state of a project that includes both high-level planning and grounded execution waves.
- You are doing work with GitHub Copilot autonomous dispatch (one optional explicit lane) and want the lane splits and dispatch status visualized alongside the architecture and timeline.
- You want self-contained, git-friendly visuals (including the live interactive 3D experience) that can be served live during development.

## Mandatory Companion Files (from the three skills)

- From swarm: playbooks, runbooks, schemas, templates (including optional GitHub Copilot autonomous dispatch support)
- From next-wave: the 6 bootstrap templates + SKILL.md protocol
- From visual: the 5 static generators (architecture, timeline, flowchart, dashboard, technical-doc) **plus the live interactive visual-pcb** (the GitS + LCARS 3D R3F experience for concurrent "when changes are happening" visualization)

## Output Contract

A Manifest run produces (in the `manifest/` directory):

1. `cluster-architecture.html` — Full system + cluster architecture with visual layer highlighted as central hub.
2. `cluster-timeline.html` — Development / integration timeline with status.
3. `cluster-flow.html` — Flowchart of how the three skills feed the visual manifest.
4. `cluster-dashboard.html` — Readiness, component status, dispatch snapshot, visual generation health.
5. `index.html` — The living hub (links + overview).

All outputs are self-contained single-file HTML (no external dependencies).

## How to Run

```bash
# 1. Ensure the three skills are available in your runtime
# 2. (Optional) Run the planners to produce fresh artifacts
# 3. Generate / refresh the visuals (use the prompts in manifest/README.md or the manifest orchestrator)
# 4. Serve
cd manifest-skill-cluster/manifest
python3 -m http.server 8765
# Open http://127.0.0.1:8765/
```

For concurrent updates, add a watcher that monitors planner outputs and re-triggers the relevant visual generators. The live 3D visual-pcb (under visual-pcb/) demonstrates true real-time adaptivity when decisions, waves, or dispatches change.

## Definition of Done

- The four core visual pages exist and are linked from the index.
- The visual layer is visibly the central element in architecture and flow diagrams.
- Local server serves the manifest.
- Basic watcher instructions or script are present.
- The cluster SKILL.md exists and correctly describes the bundle with visual as the heart.

## Adjacent Skills

- `using-superpowers`
- `executing-plans`
- `dispatching-parallel-agents`
- The visual sub-skills (the 5 static generators) + the custom live visual-pcb (GitS futurist + Star Trek LCARS interactive 3D hologram) that makes the manifest truly concurrent and visual.

This cluster makes the invisible visible and keeps it alive.