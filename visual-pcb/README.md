# Manifest Visual Console

The visual-pcb package is the live operator surface for the local Manifest Bridge. It is intentionally a projection layer: Temperance Engine, PAI hooks, project watchers, and OmniRoute remain the source owners; this app reads the bridge snapshot and SSE event plane.

## Run it

```bash
cd /Users/sheshnarayaniyer/.temperance_engine/integrations/manifest-skill-137/visual-pcb
npm install
npm run dev
```

For the persistent local operator surface, install the supervised console
service from the Temperance checkout instead of leaving a terminal running:

```bash
export TEMPERANCE_ROOT=/path/to/temperance_engine
export MANIFEST_CONSOLE_ROOT="$(pwd)"
bash "$TEMPERANCE_ROOT/scripts/temperance-manifest-console-launchd.sh" install
```

It serves this UI on `http://127.0.0.1:5173`, points it at the loopback bridge,
and restarts it on login/crash. The API bridge at `http://127.0.0.1:8766`
redirects browser root requests here; `/health`, `/snapshot`, and `/events`
remain bridge API endpoints.

The default bridge is `http://127.0.0.1:8766`. Override it with:

```bash
VITE_MANIFEST_BRIDGE_URL=http://127.0.0.1:8766 npm run dev
```

Start the bridge separately from `manifest-bridge`:

```bash
bun run src/cli.ts serve --all --port 8766
```

Inspect the two services independently:

```bash
bash "$TEMPERANCE_ROOT/scripts/temperance-manifest-bridge-launchd.sh" status
bash "$TEMPERANCE_ROOT/scripts/temperance-manifest-console-launchd.sh" status
cd "$TEMPERANCE_ROOT/package/manifest-bridge" && bun run doctor --verbose
```

## Operator pages

- **Overview** — topology, phase rail, attention, live events, and evidence selection.
- **Planning** — project registry, materialized next waves, sessions, and planning events.
- **Execution** — observed agent lanes, sessions, routes, and execution events.
- **Evidence** — filtered event plane, provenance inspector, and source-pointer registry.
- **Ops / Delivery** — bridge freshness, project readiness, source mix, alerts, and proof stream.

All pages share one project selector, one runtime hook, one event vocabulary, and one bounded evidence inspector. The selector persists locally and rebinds both snapshot and SSE scope.

## Runtime boundary

The client calls:

- `GET /projects` for the live project registry;
- `GET /health` for bridge health and aggregate freshness;
- `GET /snapshot` or `GET /snapshot?project_id=...` for the materialized read model;
- `GET /events` or `GET /events?project_id=...` for named SSE updates.

The UI does not fabricate provider health, agent activity, wave state, or completion. Missing telemetry is rendered as an explicit empty state. Event payloads are bounded at the bridge boundary and raw prompt/tool bodies are not rendered.

## Design language

The console follows LCARS-like operational segmentation with a restrained Swiss grid: dark instrument panels, one-pixel rules, mono telemetry labels, cyan live flow, orange attention, magenta decision state, violet routing, and mint healthy flow. Motion is limited to signal drift and status pulses, with a reduced-motion override.

## Verification

```bash
npm run build
npm run lint
```

The broader integration checks live in the sibling `manifest-bridge` package. The maintained 48-item backlog is [CONSOLE_GAP_REGISTER.md](../CONSOLE_GAP_REGISTER.md).

## Source map

- `src/App.tsx` — shell, navigation, scope selector, shared freshness/footer surfaces.
- `src/useManifestRuntime.ts` — snapshot, health, project, and SSE lifecycle.
- `src/manifest.ts` — typed read model and presentation helpers.
- `src/pages.tsx` — five live page projections and shared components.
- `src/App.css` — LCARS/Swiss tokens, responsive layout, and accessibility states.
