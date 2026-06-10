# Manifest Visual — PCB Circuit (Three.js + R3F)

This is the **elevated visual pipeline** for the Manifest Skill Cluster.

## Why this exists
- Previous visuals (static HTML + SVG from the old visual-documentation-skills) were good inspiration but felt like "bare-bone replicas".
- We followed the **taste** from `skill-clusters/taste` (Codrops high-craft experimental references + Tryambakam-Noesis layered, intentional, luminous aesthetics) and the **design** cluster principles (research first, anti-slop, premium craft).
- Result: A truly 3D, interactive, adaptive **electrical circuit board** experience.
  - PCB solder-mask green/black board, copper traces, gold pads/vias, neon signal activity.
  - The three skills rendered as physical components on the board.
  - Traces = data flows (Plans from Swarm, Waves/Dispatch from Next-Wave, Manifest energy looping in the center).
  - Nodes = real decisions, stubs, "dones".
  - Live animated signals = concurrent changes as planners produce new artifacts.
  - Fully reactive to "changes happening" via the UI buttons (simulates live pipeline ingestion).

## Run it (local server + hot updates)
```bash
cd visual-pcb
npm install          # only needed once
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

- Orbit the 3D board with mouse.
- Click chips or decision nodes for details.
- Use the top controls:
  - **Add Decision** → injects a new node on the traces (like a fresh architecture decision or stub from the planners).
  - **Dispatch Wave** → spawns more live electrical signals traveling the board.
  - **Manifest Update** → pulses the central Visual layer (the heart) and adds manifest-loop activity.
  - **PAUSE / RESUME LIVE** → toggles the constant signal animation.

Resize the window — the canvas and UI adapt.

## How it follows taste + electrical aesthetics
- **Circuit board diagram**: Classic PCB language (traces as thick copper runs, vias as gold cylinders, chips as IC packages with pins, solder mask color, silkscreen labels).
- **Taste influence**: High-craft detail (subtle material shininess, layered glows, refined color story: deep board green, warm copper, mystical purple for the Visual core, neon activity). Not Swiss-minimal, not loud cyber — intentional, luminous, layered "noesis circuit" feeling drawn from the taste corpus philosophy.
- **Three.js + Three Fiber**: Real 3D (not projected SVGs). Tube traces have thickness and depth. Signals are volumetric glowing orbs. Orbit + lighting create the "inspect the board" feeling.
- **Adaptive & living**: State-driven. Adding decisions/waves mutates the 3D scene live. In a production visual pipeline this would watch the `plans/`, `waves/`, `decisions/`, and `stubs/` folders (or the generated JSON from the other two skills) and instantiate exact geometry + signals.

## Data & pipeline
Currently seeded with representative content from `SCOPE_AND_PLAN.md` and the cluster artifacts.

Real usage (future extension):
- The visual pipeline skill would parse planner outputs (the same way the old HTML generators did) and feed a `manifest-state.json` or live messages.
- New phases/waves = new traces or denser via patterns.
- New decisions/stubs = new physical nodes appearing on the board.
- "Done" evidence = nodes turning green and stopping their signals.

## Relation to the old visual-documentation-skills
We used the old package (architecture/timeline/flow/dashboard generators) as **inspiration for structure and information density**, not as a template to copy. This version is the "next taste iteration" — 3D, electrical, adaptive, and central to the Manifest Skill Cluster.

## Files of interest
- `src/App.tsx` — the entire experience (3D scene + UI + live mutation logic).
- The three "chips" and trace paths are explicitly mapped to the three skills in the cluster.

This is now the recommended way to **see** the Manifest Skill Cluster. The static HTMLs in the sibling `manifest/` folder remain as lightweight 2D fallbacks or for git-embedded docs.

Run it. Orbit it. Add decisions. Watch the circuit come alive as the work changes.
