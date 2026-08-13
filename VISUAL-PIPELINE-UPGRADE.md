# Visual Pipeline Upgrade — Manifest Skill Cluster (Taste-Locked)

**Status:** Historical pre-event-plane design exploration. The current live console is documented in [`README.md`](README.md) and [`docs/temperance-integration.md`](docs/temperance-integration.md); do not treat the simulated 3D interaction notes below as runtime behavior.

## Identified Aesthetic (locked for this circuit)

From the Design folder (primary sources: Color-Combos/Nakul-Color-Combos.md + Curios-Self-Quest-Miniapp/README.md + Amir-Mushich-50-Design-Prompts.md + Inspiration/Delightful-Details + Web-Design resources):

- **Palette (Tryambakam Noesis / LITE Protocol aligned "Living Blueprint")**:
  - Base / Board: Gunmetal `#00272B` (or deep Hunter Green `#14281D`) — dark, sophisticated, "encrypted" technical foundation.
  - Living / Bioluminescent energy (main traces, signals, "growing" elements): Electric Chartreuse `#E0FF4F` (high-contrast vitality, "Pichet" action state) + Mint `#D6FFF6` (clean cyber-clinical, high-density, "mint frames" for evidence / noesis beats).
  - Core / Narrative depth (central Visual, narrative engine): Russian Violet `#231651`.
  - Precision accents: Gold `#F4D03F` / warm copper `#B87333` for pads, vias, hierarchy details.
  - Overall: Dark sophisticated gunmetal/violet base with electric mint/chartreuse "living" pops. High contrast, technical yet luminous premium. Not raw hobbyist PCB.

- **Design language**:
  - "Living Blueprint": Swiss-grid precision holding bioluminescent / living elements (fractal maps, tree-ring cross-sections, continuous story feed in mint frames, evidence-gated layers).
  - "Cosmic Premium" (Amir-Mushich): Technological, clean, sophisticated — top-tier Apple / Wallpaper* / Dezeen editorial product photography. Hyper-tactile materials (bead-blasted titanium, frosted glass, carbon fiber, gold plating). Soft diffused studio lighting, sleek highlights, subsurface scattering, shallow DOF, clean negative space, knolling/isometric where appropriate.
  - Typography: Tight geometric sans (Euclid / Sprig class or Manrope Regular) — minimalist technical labels (aerospace style: batch codes, coordinates, 'SPACE GRADE'). Matte white or discreet monochrome on dark/clear surfaces.
  - Details & motion: Endless micro-craft (precise alignment, subtle growth/pulse, "you are here" on the living edge). High production value, intentional, layered (not noisy, not minimal Swiss — refined, high-density, almost sacred-technical).

The PCB concept is retained (your request for electrical circuit board aesthetics) but executed as a **premium "Living Blueprint Circuit"** — Swiss precision on a gunmetal board, elegant bioluminescent (chartreuse/mint) traces as "growing stems" or conductive living paths, refined IC chips with gold pins and clean technical labels, gold vias/pads, mint "evidence frames" around decision nodes, luminous signals as the manifesting current. The central Visual chip is the heart / narrative engine with extra mint frame and glow. Feels like a high-end aerospace protocol board or encrypted sacred system diagram for the Manifest of the three skills.

## Changes made in this pass
- Locked exact palette into `COLORS` in `visual-pcb/src/App.tsx` (gunmetal board, chartreuse/mint living traces & signals, violet core, gold pads, clean silkscreen).
- Updated `CircuitBoard` geometry: gunmetal board + subtle Swiss mint grid, refined chips with gold pin headers, layered elegant traces (main living color + copper hierarchy), gold vias at junctions, decision nodes with mint-frame emissive "evidence" treatment, glowing bioluminescent signals.
- Camera + lighting tuned for editorial 3/4 product shot (soft studio high-key + directional for sleek highlights + emissive living energy on the central core) — this fixes the previous black/empty canvas.
- Header polished to closely match your screenshot (exact status LED colors from the taste palette, button styling, "Living energy" subtitle callout) while feeling premium/editorial.
- Legend updated with taste color names and descriptions ("Chartreuse/Mint — Living energy (bioluminescent traces)", etc.).
- Scene now clearly shows the three skills as physical components on one living board, with flows converging on the central Visual (the heart, as required).

The old static HTMLs in `manifest/` remain as lightweight 2D references. This `visual-pcb/` (R3F) is the taste-elevated, truly visual, adaptive electrical circuit for the Manifest Skill Cluster.

## How to run
```bash
cd /Volumes/madara/2026/Projects/thoughtseed/manifest-skill-cluster/visual-pcb
npm run dev
```

Orbit with mouse, click nodes/chips, use the top controls to simulate planner changes (new decisions appear as physical nodes, waves spawn living signals, manifest update pulses the violet core). Resize the window — fully adaptive.

The canvas should now be a beautiful, visible, refined circuit instead of the black void in the current screenshot.

## Next (if desired)
- Real file watcher that ingests your actual plans/waves/decisions/stubs and dynamically adds traces/nodes/signals.
- More fractal/growth detail on the central chip or board (per Curios).
- Subtle post-processing bloom on the living elements.
- Export stills or glTF for the 2D docs.

This is now properly stuck to the style identified in the Design folder. The visual layer (this circuit) is the central living manifest of the three skills, executed with the right taste.
