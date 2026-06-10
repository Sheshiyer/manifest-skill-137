# Manifest Skill Cluster — Scope, Vision, and Plan

**Date:** 2026-06-10 (approx from session)
**Goal:** Bundle three capabilities into a coordinated "manifest" experience where the **visual layer is the living, single source of manifested truth** for every architecture decision, every stub, every "done", every plan element, and every dispatch.

## What I Understand (Current State)

### The Two Skills We Reviewed

1. **github-next-wave-orchestrator** (madara source, on `feat/copilot-dispatch-awareness`)
   - Lean, specialized skill (only ~10 tracked files).
   - Core: GitHub repo reality scan → concise Status Report (issues, PRs, CI, velocity, deterministic Green/Yellow/Red readiness) → prioritized Next Wave plan using a strict 5-tier heuristic.
   - Strong support for explicit lanes: every wave item is assigned a worker lane (`human` or GitHub Copilot autonomous dispatch (`copilot-swe-agent[bot]`) as one optional explicit lane).
   - Dispatch is label-based (`agent-ready`). The skill never holds the PAT; the target repo's workflow does the assignment.
   - Ships the **canonical 6-file bootstrap bundle** (under `templates/.github/`) that any target repo must have to receive autonomous GitHub Copilot coding agent work (one optional dispatch target).
   - SKILL.md is the full protocol + guardrails + pinned constants.

2. **swarm-architect-skill** (madara source, on `feat/copilot-agent-dispatch`, VERSION 0.1.1)
   - Mature, broad multi-agent planning framework (phase → wave → swarm, contract-first, discovery, GitHub sync, worker bootstrap packets, OpenViking memory, verification gates, etc.).
   - Recently extended with first-class support for routing well-scoped tasks to GitHub Copilot autonomous dispatch (one optional explicit lane):
     - New `playbooks/copilot-coding-agent.md` (GitHub Copilot autonomous dispatch eligibility, preflight, quirks — one optional explicit lane).
     - New `runbooks/route-to-copilot-agent.md` (the handoff after `plan-to-github`).
     - `templates/copilot-agent-bootstrap/` (vendored copy of the bootstrap bundle).
     - Schema updates (`copilot_eligible`, `copilot_role`).
     - Updated SKILL.md and README that explicitly cross-reference the sibling `github-next-wave-orchestrator` for pinned constants and bootstrap source of truth.
   - Still supports the older "Copilot as human + IDE assist" in the four-agent stack.

**Are they "the same and nothing has changed"?**

**No.** 

- Compared to the earlier craft-agent workspace install (which matched the then-published GitHub at 0.1.1), the madara sources show **active, substantial evolution** on the Copilot / autonomous dispatch / "next wave from real GitHub state" feature.
- The two madara directories are **coordinated siblings**, not duplicates:
  - Next-wave-orchestrator owns the specialized "scan → report → wave with lanes" logic and the canonical bootstrap templates.
  - Swarm Architect is the comprehensive planner that has been wired to produce large plans and delegate eligible work to Copilot (using the shared constants and a vendored bootstrap copy).
- The "new feature" (GitHub Copilot autonomous dispatch-aware next-wave grounding + explicit lanes) is being built across both right now on these feature branches. The visual layer is the missing third leg that will make all of it visible and living.

### The Third Piece (Visual Documentation Skills 1.1.0)

Path: `/Users/sheshnarayaniyer/.claude/plugins/cache/mhattingpete-claude-skills/visual-documentation-skills/1.1.0/`

- A **collection of 5 sub-skills** (no single top-level SKILL.md; installed as a plugin).
- Each produces **beautiful, self-contained, single-file HTML** (embedded CSS + SVG, modern gradient design, responsive, WCAG-friendly, no external dependencies — perfect for git, email, or static serving).
  - `architecture-diagram-creator`: business objectives, data flows (SVG), processing pipeline, system layers, features (functional + non-functional), deployment.
  - `flowchart-creator`: processes, decisions, swimlanes, error paths.
  - `dashboard-creator`: KPI cards, SVG charts (bar/pie/line), progress, status (green/yellow/red).
  - `timeline-creator`: phases, milestones, Gantt-style bars, progress.
  - `technical-doc-creator`: API/workflows, code examples, embedded diagrams, contracts.
- Invocation style: natural language prompts in the agent session ("Create an architecture diagram for [rich context]", "Create a timeline for the current wave...").
- Outputs are high-quality and immediately useful. The package already has test-outputs showing real HTML.

This is **exactly** the "most crucial visual piece" the user described: the place where every architecture decision, every stub, every "done", every plan/wave/contract becomes visible and first-class.

## Vision for the "Manifest Skill" Cluster

**Name ideas:** `manifest-skill`, `thoughtseed-manifest`, `manifest-cluster`.

**Core idea:**
The cluster treats the **visual layer as the primary manifestation / living truth source**.

- Planners (Swarm + Next-Wave) produce the invisible structure (plans, waves, contracts, decisions, stubs, dispatch status, "done" evidence).
- The manifest layer automatically turns those artifacts into a coherent, beautiful, **live visual experience**.
- You (and agents) primarily look at / interact with the visuals as the single pane of glass for "what we decided, what we are building, what is done, what the next wave looks like, who is doing what (human vs GitHub Copilot autonomous dispatch as one optional explicit lane)".
- "Run the manifest" for a project → planners ensure the plan/wave reality is up to date → visuals are (re)generated → local server serves the living site.
- Changes anywhere (new decision in a doc, new stub, updated plan, wave dispatch, test evidence) → concurrent update of the relevant visuals.

**Why this cluster matters:**
- Makes the high-ceremony planning (Swarm) and the GitHub-grounded execution waves (Next-Wave) **tangible and reviewable**.
- Every stub and architecture decision gets a visual home immediately.
- The local server + watcher turns the whole thing into a living dashboard of the current work (not static docs that go stale).
- Natural home for explicit dispatch lane awareness (including GitHub Copilot autonomous dispatch as one optional lane) — the dashboard can prominently show the lane split and dispatch status.

**What "success" looks like:**
- `manifest run [project]` or similar produces/updates a set of high-quality HTML visuals and starts (or refreshes) a local server.
- The server index shows at-a-glance: Current Architecture, Current Wave (with human/copilot lanes), Timeline of Phases/Waves, Dispatch Dashboard, Key Contracts/Stubs.
- As you (or agents) edit plans, write stubs, record decisions, or mark things done, the visuals update without manual intervention.
- The visuals are check-in-able artifacts (self-contained HTML) that live alongside the plans.

## Scope (What Is In / Out)

**In scope for the cluster:**
- Thin coordinating "manifest" skill / entrypoint that understands the artifact formats from the two planners.
- Mapping rules: "when this type of artifact changes (phase plan, ranked-wave.md, architecture decision doc, stub, dispatch log, done evidence) → invoke these visual creator(s) with this constructed rich prompt/context".
- A local dev server experience (static + index + live-reload / watcher).
- Watcher / regeneration engine that keeps things concurrent.
- Documentation, examples, and "how to wire a new project" guide (including how to make your target repo ready for GitHub Copilot autonomous dispatch as an optional lane as part of the manifest).
- Packaging story so the three capabilities feel like one cluster (dependency declaration, shared constants, recommended directory layout for outputs, one command to "run the manifest").
- Demonstration / dogfooding on the current thoughtseed work itself (visualize the integration of these three skills).

**Out of scope (for v1):**
- Rewriting the visual generators (reuse the excellent existing ones).
- Building a full web app with backend state (keep it simple: generated self-contained HTML + simple server).
- Automatic PR creation or bot actions from the manifest (the planners already handle dispatch).
- Supporting every possible visual (start with the 5 + one "master manifest index/dashboard").
- Cloud hosting (local server first; the HTMLs can be published anywhere later).

**New "wiring" work (the actual new feature beyond the Copilot dispatch already in progress):**
- Automatic, artifact-driven invocation of the visual creators from planner outputs.
- The live server + watcher loop.
- The cluster-level SKILL.md / orchestrator that presents the unified "manifest" experience.
- Shared conventions (e.g., standard locations for `plans/`, `waves/`, `decisions/`, `stubs/`, `manifest/` output dir).
- Possibly a small amount of prompt engineering / context extraction so the visuals are high-fidelity to the actual plans (not generic).

## High-Level Components of the Cluster

1. **Planners (dependencies / cooperating skills)**
   - swarm-architect-skill (for large structured plans, contracts, multi-wave coordination, GitHub sync, memory).
   - github-next-wave-orchestrator (for GitHub-grounded status + prioritized next wave with explicit lanes + dispatch).

2. **Visual Engine (the heart)**
   - The existing visual-documentation-skills/1.1.0 (the 5 creators).
   - Possibly a thin wrapper skill that provides "manifest-aware" prompts (e.g., "manifest-architecture-diagram" that knows how to pull the current wave/plan context).

3. **Manifest Wiring / Orchestrator (the new glue)**
   - New skill or set of runbooks/scripts that:
     - Know the output formats of the planners.
     - On demand or on change, extract context and call the right visual creators.
     - Manage a `manifest/` output directory with consistent naming (e.g., `current-architecture.html`, `current-wave-dashboard.html`, `phase-1-timeline.html`, `dispatch-status.html`).
     - Provide the "run manifest" entrypoint.

4. **Live Server + Watcher (the concurrent experience)**
   - Simple server (e.g. Python `http.server` + directory index, or `npx serve`, or a small custom one with a nice manifest landing page).
   - Watcher (Node chokidar / Python watchdog / or a skill that launches one) on the planner artifact directories.
   - On relevant change → re-generate affected visual(s) → notify / trigger reload.
   - Bonus: a "master manifest index" HTML that embeds or prominently links the key live views and shows last-updated times.

5. **Shared Assets / Contracts**
   - Pinned constants (already happening between 1 and 2) now also influence visual styling (e.g., colors for human vs copilot lanes, status for waves).
   - Recommended project layout for manifest outputs.
   - Example "manifest run" that dogfoods the cluster on itself.

## Proposed Phased Plan (Actionable Roadmap)

**Phase 0 — Alignment & Inventory (now / immediate)**
- Confirm the exact current state of the three sources (done in this session for the two + visual).
- Decide canonical locations (madara thoughtseed for the two planners; the visual plugin is already in .claude/plugins).
- Create the `manifest-skill-cluster/` directory (done) and this plan doc.
- Document the shared pinned constants + artifact formats that the wiring will consume (plan structure, wave format, how `copilot_eligible` appears, where decisions/stubs live).

**Phase 1 — Core Wiring (the new feature)**
- Create a thin `manifest-orchestrator` skill (or extend an existing entry) whose SKILL.md describes the cluster and the "run manifest" flow.
- Implement (or script) the mapping:
  - Full plan / phase map → architecture-diagram-creator + timeline-creator (phases as timeline groups).
  - Ranked next wave (with lanes) → dashboard-creator (readiness + dispatch split) + flowchart-creator (wave execution + decision points for lanes).
  - Architecture decisions / major stubs / contracts → technical-doc-creator + architecture refresh.
  - "Done" evidence + progress → update indicators in timelines/dashboards.
- Produce a first set of real visuals from the current work (the integration of these three skills themselves) as dogfood.

**Phase 2 — Live Server + Concurrent Updates**
- Ship a small watcher + server component (script + instructions, or a new tiny sub-skill).
- Watcher watches standard locations (`plans/`, `waves/`, `architecture/`, `stubs/`, `decisions/`, task outputs, etc.).
- On change, intelligently re-invokes only the affected visual creator(s).
- Server serves the `manifest/` dir with a nice index page (Current Architecture, Current Wave Status, Timeline, Dispatch Dashboard, etc.) and supports easy refresh (or add simple live-reload via a small injected script or external tool like `live-server`).
- Command UX: `manifest serve` or `run the manifest server for this project` (launches watcher + server).

**Phase 3 — Polish, Examples, Packaging**
- High-quality landing page / index for the manifest that tells the story of the current work.
- Examples: "manifest for a new feature", "manifest after a wave dispatch", "manifest showing Copilot lane usage".
- Cluster packaging: how someone installs the three + the manifest glue (marketplace.json updates, a root SKILL.md or README that says "this cluster depends on X, Y, Z").
- Documentation of the wiring points so future features (new types of decisions, new stub kinds) are easy to visualize.
- Dogfood: use the cluster to visualize its own development (this plan itself becomes a timeline + architecture visual).

**Phase 4 — Advanced / Future**
- Deeper integration (e.g., the visual dashboard can surface "ready for next wave" and invoke the next-wave-orchestrator directly).
- Export/publish flows (static site, embed in wiki, etc.).
- Performance / incremental updates for very large plans.
- Theming consistent with any existing brand (the visual package already supports some customization via prompt).

## Immediate Next Actions (Recommended)

1. Review this plan with the user and refine name, commands, watched paths, and success criteria.
2. Create the first wiring prototype: take one concrete artifact from the current work (e.g., the ranked wave or a phase description, or the SKILL.md of one of the planners) and manually invoke the relevant visual creators to produce real HTML (e.g., a timeline of the Copilot integration work + a flowchart of the dispatch process + an architecture diagram of the cluster itself).
3. Decide on the watcher/server tech (keep it tiny — one small script is fine).
4. Write the cluster-level SKILL.md or orchestrator skill that describes the unified experience.
5. Set up the directory layout under `manifest-skill-cluster/` (e.g., `wiring/`, `server/`, `examples/`, `shared-constants.md`).
6. Generate an initial "manifest" for the thoughtseed Copilot integration work itself as the first deliverable.

## Open Questions for User

- Preferred name for the cluster and top-level commands (`manifest run`, `manifest serve`, etc.)?
- Where should generated manifest visuals live by default for a project (`.manifest/`, `docs/manifest/`, repo root, etc.)?
- Any preferred tech for the watcher/server (Node, Python, something already in the environment)?
- Should the cluster also produce a "master manifest index" HTML that composes multiple visuals on one page, or is a directory of individual high-quality pages + a simple index sufficient?
- Do we want the visual layer to be invocable both "manually" (the existing sub-skills) and "automatically" via the cluster wiring?
- Any constraints on where the cluster itself lives (new thoughtseed repo, inside one of the existing, as a new plugin)?

This gives us a clear, scoped, phased path to turn the three powerful pieces into a cohesive "manifest" experience where the visuals are not an afterthought but the central, living representation of the work.

Ready to start Phase 1 wiring and first visual generation demo. Just confirm or adjust the scope above.