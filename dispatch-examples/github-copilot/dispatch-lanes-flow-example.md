# Dispatch Lanes Flow Example (GitHub Copilot Autonomous Dispatch as One Optional Explicit Lane)

This is a standalone, reusable version of the dispatch flowchart prompt/example extracted from the Manifest cluster docs.

## Prompt (for use with visual generators)

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
```

## Notes for the Manifest Cluster
- This is an **optional explicit lane** example.
- The detailed implementation lives in the source skills (swarm-architect-skill and github-next-wave-orchestrator).
- The visual layer (both static generators and the live visual-pcb) makes the lane splits visible and concurrent.
