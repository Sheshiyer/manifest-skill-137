# Manifest Console Gap Register

This is the acceptance backlog for the live operator console. `[addressed]` means the current pass wires the capability in the local visual surface; `[next]` means the read model or runtime contract still needs a subsequent slice. Each item names a concrete probe or owner so the list can be maintained from evidence.

## Navigation, scope, and interaction

1. `[addressed]` Overview is a distinct live projection; probe: select `OVERVIEW` and compare `/snapshot` counts.
2. `[addressed]` Planning is a distinct live projection; probe: select `PLANNING` and inspect waves/projects.
3. `[addressed]` Execution is a distinct live projection; probe: select `EXECUTION` and inspect agents/routes.
4. `[addressed]` Evidence is a distinct live projection; probe: select `EVIDENCE` and inspect filters/inspector.
5. `[addressed]` Ops / Delivery is a distinct live projection; probe: select `OPS / DELIVERY` and inspect health/source mix.
6. `[next]` Deep links do not yet encode the active view; owner: visual shell, add URL hash or route state.
7. `[next]` Browser back/forward does not restore page selection; owner: visual shell, add history synchronization.
8. `[addressed]` Project scope persists in local storage and rebinds snapshot/SSE; probe: reload after selecting Cambium.
9. `[addressed]` Aggregate event rows identify their project; probe: select ALL PROJECTS and inspect recent events.
10. `[addressed]` Mobile navigation collapses to a rail drawer; probe: 560px viewport with keyboard and pointer.
11. `[addressed]` Keyboard users have a skip link and native controls; probe: Tab from page load to main content.
12. `[next]` Page title and document-level route announcements are not updated; owner: visual shell, set title and live region.

## Telemetry contract and freshness

13. `[addressed]` Snapshot and health are fetched separately; probe: stop bridge and observe OFFLINE/error state.
14. `[addressed]` SSE snapshot events update the active projection; probe: send a real Cambium hook and watch event count.
15. `[addressed]` Manifest events trigger project/health/snapshot reload; probe: sync an external project log while console is open.
16. `[addressed]` Fresh, stale, empty, and offline states remain explicit; probe: wait past bridge stale threshold.
17. `[next]` SSE reconnect backoff and last-event cursor are browser defaults only; owner: runtime hook and bridge contract.
18. `[next]` Dropped-event and reconnect counters are not exposed; owner: bridge health schema.
19. `[next]` Event schema/version is not visible to operators; owner: manifest contract, add envelope version display.
20. `[next]` Clock skew between sources is not surfaced; owner: bridge reducer, add source-time versus ingest-time.
21. `[addressed]` Event rows are bounded and redacted at the boundary; probe: inspect payload and confirm no raw prompt.
22. `[addressed]` Source and session correlation are visible in rows and inspector; probe: inspect a Cambium session event.
23. `[next]` Read-model generation age is not distinct from last-event age; owner: bridge snapshot schema.
24. `[next]` External sync origin and replay status are not shown as first-class telemetry; owner: bridge metadata projection.

## Page and component depth

25. `[addressed]` Planning renders project rails, waves, sessions, and planning events; probe: select Cambium.
26. `[addressed]` Execution renders agent lanes, sessions, routes, and execution events; probe: inspect live fleet.
27. `[addressed]` Evidence renders status/source filters and an inspector; probe: change both filters and select an event.
28. `[addressed]` Ops renders health, project readiness, source mix, alerts, and proof stream; probe: compare with `/health`.
29. `[addressed]` Shared metric strips, status pills, event tables, empty states, and inspectors are reused across pages.
30. `[addressed]` Event selection can be cleared without losing the live snapshot; probe: open and close inspector.
31. `[next]` Wave history needs explicit artifact diff and task drill-down; owner: planning projection.
32. `[next]` Agent lanes need agent detail and parent-session drill-down; owner: execution projection.
33. `[next]` Route rows need provider/model evidence and failure history; owner: route reducer and execution page.
34. `[next]` Evidence pointers need clickable safe paths/URLs and line navigation; owner: evidence policy and inspector.
35. `[next]` Alerts need acknowledgement, severity, and lifecycle state; owner: alert contract and ops page.
36. `[next]` Cross-project compare mode is absent; owner: aggregate projection and planning page.

## Quality, security, and accessibility

37. `[addressed]` Reduced-motion CSS disables non-essential animation; probe: `prefers-reduced-motion: reduce`.
38. `[addressed]` Semantic buttons, selects, headings, and labels back the main interactions; probe: keyboard-only pass.
39. `[next]` No automated contrast audit exists; owner: visual QA, run axe or Lighthouse against live view.
40. `[next]` No `aria-live` region announces connection/freshness changes; owner: visual shell.
41. `[addressed]` Long IDs and paths ellipsize instead of expanding the layout; probe: inject a long project/event ID fixture.
42. `[addressed]` The UI states that raw prompt/tool bodies are never rendered; probe: inspect event payload mapping.
43. `[next]` Error boundaries are absent around page projections; owner: visual shell, isolate a malformed record fixture.
44. `[next]` Loading skeletons are absent; owner: visual components, add first-load and scope-change states.
45. `[addressed]` Empty and no-telemetry states are explicit on every projection; probe: load a project with no events.
46. `[next]` Automated visual regression fixtures are absent; owner: visual QA, add deterministic snapshot fixtures.

## Operations, performance, and delivery

47. `[next]` Event tables are client-limited but not server-paginated; owner: bridge API, add cursor/retention contract.
48. `[next]` Retention, compaction, durable replay cursors, API compatibility, and a runbook need formal ownership; owner: bridge/runtime maintainers.

## Current verification anchors

- Visual build: `npm run build` passes.
- Visual lint: `npm run lint` passes.
- Bridge tests: `bun test` passes 13/13 with 50 assertions.
- Cambium mapping: `/Volumes/madara/2026/Projects/thoughtseed/cambium/.temperance/manifest.json` maps to `cambium-4cfc2f7087`.
- Live Cambium probe: scoped snapshot reached 39 events, fresh, with a real `SessionStart` hook observation (`ALGORITHM/E3`) and no raw prompt body.
