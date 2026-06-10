# Manifest Output Directory

This is the live output for the **Manifest Skill Cluster**.

## Current Contents
- `index.html` — The main landing page / single pane of truth for the cluster (architecture decisions, waves, timeline, dispatch status, stubs).
- (More HTML files will appear here as you generate them.)

## How to Generate / Update Visuals

The visuals are produced by the **visual-documentation-skills** (architecture-diagram-creator, timeline-creator, flowchart-creator, dashboard-creator, technical-doc-creator).

### Recommended Prompts (copy-paste into your agent that has the visual skills loaded)

**1. Architecture of the Manifest Cluster itself**
```
Create a comprehensive architecture diagram for the Thoughtseed Manifest Skill Cluster.

Context:
- Three cooperating skills: swarm-architect-skill (broad phase→wave→swarm planner with contract-first and GitHub sync), github-next-wave-orchestrator (GitHub reality scan → status report → prioritized next wave with explicit human vs copilot-swe-agent[bot] lanes + label-based dispatch), and visual-documentation-skills/1.1.0 (the 5 HTML generators that turn plans, waves, decisions and stubs into living visuals).
- The visual layer is the heart: every architecture decision, every stub, every "done", every wave, and the explicit dispatch lane split (including GitHub Copilot autonomous dispatch as one optional explicit lane) must be visualized.
- New wiring: the manifest orchestrator feeds planner artifacts into the visual creators automatically.
- Live local server + watcher keeps everything concurrent.
- Pinned constants for GitHub Copilot autonomous dispatch (one optional explicit lane) are shared between the first two skills.
- Location: the two planners live under thoughtseed/ on madara; visuals under the visual-documentation plugin; this cluster glues them.

Include:
- Business objectives of the cluster (make every decision and stub visible and living)
- Data / artifact flow (planner outputs → manifest wiring → visual generators → self-contained HTML + index)
- System architecture layers (planners, wiring/orchestrator, visual engine, server + watcher)
- The five visual output types (architecture, timeline, flowchart, dashboard, technical docs)
- Deployment (local dev server on port 8765, generated HTML checked into the cluster)
- Key integrations and the explicit dispatch lane awareness (GitHub Copilot autonomous dispatch as one optional lane) that flows through all three
```

**2. Timeline of the Current Integration Work (Copilot + Next Wave + Manifest)**
```
Create a project timeline / roadmap for the Thoughtseed Manifest Skill Cluster and the explicit dispatch lane integration feature (GitHub Copilot autonomous dispatch as one optional explicit lane).

Key phases and milestones (use real dates where known, group logically):
- Initial review of swarm-architect-skill installed version vs GitHub
- Discovery and review of the two madara source trees (swarm-architect-skill + github-next-wave-orchestrator)
- Recognition that they are coordinated siblings on feature branches adding deep Copilot autonomous agent support
- Identification of the third piece: visual-documentation-skills/1.1.0 as the crucial visual manifestation layer
- Decision to bundle the three into a new "manifest skill" cluster where visuals are the living truth
- Creation of SCOPE_AND_PLAN.md and initial manifest/ directory with index
- Launch of local server (port 8765)
- First real generated visuals from the actual artifacts (plans, waves, decisions, stubs)
- Wiring of automatic regeneration + watcher for concurrent updates
- Packaging and dogfooding of the full cluster (including the live 3D visual-pcb)

Show completed work in green, current/in-progress in yellow/blue, future in gray. Include the 5-tier priority thinking from next-wave-orchestrator where relevant. Make it look like a real development timeline.
```

**3. Dispatch / Wave Flowchart (the Copilot lane decision process)**
```
Create a detailed flowchart showing the end-to-end "next wave + dispatch lanes" process across the cluster (GitHub Copilot autonomous dispatch as one optional explicit lane).

Flow:
1. GitHub Next Wave Orchestrator scans the repo (issues, PRs, CI, velocity) → produces Status Report + Readiness Score + Ranked Next Wave with explicit lanes (human vs GitHub Copilot autonomous dispatch (`copilot-swe-agent[bot]`))
2. For items marked copilot_eligible (well-scoped, one-branch, no secrets, repo is bootstrapped, second reviewer exists):
   - Apply `agent-ready` label (via runbooks/route-to-copilot-agent.md or equivalent)
3. Target repo's copilot-agent-dispatch.yml fires (using COPILOT_ASSIGN_PAT)
4. `copilot-swe-agent[bot]` is assigned
5. Bot opens draft PR
6. Human reviewer (not the issue creator) gives feedback via @copilot comments or approves
7. All of the above is visualized in the Manifest (dashboard shows lane split, flowchart shows the path, timeline shows progress, architecture shows the integration)

Use swimlanes or clear color coding for "human lane" vs "GitHub Copilot autonomous dispatch lane". Show decision diamonds for eligibility checks and the agent-blocked opt-out. Make error paths visible. Use the exact pinned constants (bot login, labels, PAT secret, required issue body sections).

This example is also available as a standalone file under dispatch-examples/github-copilot/dispatch-flow-example.md for easy reuse.
```

**4. Dashboard (Readiness + Dispatch Status for the cluster work)**
```
Create a monitoring-style dashboard for the Thoughtseed Manifest Skill Cluster and the active explicit dispatch lane work (GitHub Copilot autonomous dispatch as one optional explicit lane).

Include these sections with plausible but grounded values based on the session:
- Cluster Health / Readiness Score (Green/Yellow/Red with the exact criteria from next-wave-orchestrator)
- Dispatch Split: X human tasks, Y GitHub Copilot autonomous dispatch-eligible tasks, Z blocked or not-yet-bootstrapped
- Current Wave Progress (how many items from the latest next wave are done / in progress)
- Key Visuals Last Regenerated (timestamps for architecture, timeline, dispatch dashboard, etc.)
- Open Risks / Blockers (e.g. "bootstrap templates duplicated — decide on canonical source", "watcher not yet implemented", "need first real generated visuals")
- Recent Activity (plan created, server launched, SCOPE_AND_PLAN.md written, etc.)

Use KPI cards, progress bars, and a small status table. Color-code human vs GitHub Copilot autonomous dispatch lanes. Make it look like a real engineering delivery dashboard.
```

Save the generated HTML files directly into this `manifest/` directory with clear names (`current-architecture.html`, `integration-timeline.html`, `dispatch-dashboard.html`, `dispatch-lanes-flow.html`, `technical-manifest.html`, etc.).

Then refresh http://127.0.0.1:8765/ (or the index) to see them appear.

## Making It Live / Concurrent (Next Step)

Once we have a few real generated files:

- Implement a simple watcher (Node chokidar or Python watchdog) that monitors the planner output locations (plans/, waves/, architecture docs, stub directories, decision logs, etc.).
- On change, re-run the appropriate prompt(s) above (or a scripted version) to regenerate only the affected HTML.
- The index.html can be updated to show "last regenerated" times.
- For even better UX, use a tool like `live-server` or inject a small reload script.

This turns the directory into a true living manifest.

## How the Three Skills Work Together Here

- **swarm-architect-skill** → produces the big plans, phases, waves, contracts, task schemas, ownership model.
- **github-next-wave-orchestrator** → grounds the work in actual GitHub state and produces the prioritized, lane-aware next wave + the dispatch mechanics (GitHub Copilot autonomous dispatch as one optional explicit lane).
- **visual-documentation-skills** (the 5 static generators) + the custom live visual-pcb (GitS + LCARS 3D) → turns all of the above (plus decisions and stubs) into self-contained HTML + a truly concurrent interactive 3D experience that lives in this cluster and can be served live.

The new manifest wiring + server is the "bundle" that makes the visual piece the central, always-up-to-date experience.

---

Run the prompts above (or improved versions with more context from your current files) and drop the resulting .html files here. The index will become the real living view of the cluster.