# Static Manifest Artifacts

This directory contains portable, self-contained HTML artifacts for sharing and archival review. It is not the live operational console.

## Use it for

- a frozen architecture, timeline, flow, or dashboard snapshot;
- an artifact that needs to travel with a repository or review package;
- visual context when the local bridge is intentionally unavailable.

## Do not use it for

- current agent, provider, route, approval, or delivery state;
- authorization to approve or execute work;
- a substitute for the live event plane.

For current project-scoped state, run the bridge-backed `visual-pcb` console described in the repository [README](../README.md). It exposes freshness and evidence boundaries instead of simulating a changing system.

When adding a static artifact, include its source inputs and generation timestamp in the document itself. Mark any synthetic examples clearly, and never include raw prompts, tool output, credentials, or private local paths.
