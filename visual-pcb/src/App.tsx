import React, { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Plus, Play, RefreshCw, Info } from 'lucide-react'
import * as THREE from 'three'
import './App.css'

// Types for the living manifest state
interface DecisionNode {
  id: number
  label: string
  progress: number // 0-1 along its trace
  type: 'plan' | 'wave' | 'visual' | 'done'
}

interface Signal {
  id: number
  traceIndex: number
  progress: number
  speed: number
  color: string
}

interface ManifestState {
  decisions: DecisionNode[]
  activeWaves: number
  lastUpdate: string
}

// Sample data seeded from the cluster's SCOPE_AND_PLAN.md and previous artifacts
// In a real pipeline this would be parsed live from plans/, waves/, decisions/ etc.
const initialState: ManifestState = {
  decisions: [
    { id: 1, label: "Visual as Central Hub", progress: 0.9, type: 'visual' },
    { id: 2, label: "Copilot Lane Dispatch", progress: 0.7, type: 'wave' },
    { id: 3, label: "Phase→Wave→Swarm Contract", progress: 1.0, type: 'done' },
    { id: 4, label: "PCB Aesthetic Upgrade", progress: 0.4, type: 'plan' },
    { id: 5, label: "Three.js Adaptive Traces", progress: 0.85, type: 'visual' },
  ],
  activeWaves: 2,
  lastUpdate: new Date().toLocaleTimeString(),
}

// === GHOST IN THE SHELL x STAR TREK LCARS FUTURISTIC AESTHETIC ===
// GitS: cyberpunk rainy tech-noir, neon holographic projections, digital rain / data streams,
// high-contrast neon on pure black, translucent layers, "ghost" data echoes, cybernetic density,
// glitchy futurism, organic + tech fusion. The 3D "hologram" carries this vibe.
// LCARS: black console, bright segmented color blocks (orange #ff9900, cyan #00ccff, magenta #ff66cc,
// yellow #ffff66, purple #cc99ff), rounded-rect "touch" panels/buttons, uppercase tight-tracking
// geometric/monospace labels, horizontal/vertical bars, modular status readouts, flat high-contrast
// retro-futurist Starfleet dashboard. The 2D chrome (header, controls, HUD, detail) is pure LCARS framing
// the live holographic manifest inside the "viewer".
// Blend: LCARS is the control surface / dashboard. GitS is the living holographic content (rain, holo shells,
// neon data streams on the flows, ghost echoes). The functional model (3 skill nodes, FLOWS for data exchange,
// evidence beacons for every decision/stub/"done", live signals/particles that react instantly to state changes)
// is preserved exactly — Visual remains the emphasized central living heart of the manifest skill cluster.
// Prior Living Blueprint (Swiss grid + bioluminescent) provides the precision + vitality base; we remix the
// colors and treatment for the new sci-fi console + holo directive. Not literal PCB. Not static HTML replica.
const COLORS = {
  base: '#000000',            // Pure LCARS black for the holo deck / console void
  grid: '#00ccff',            // LCARS cyan — precision grid + data overlays (GitS rain influence)
  living: '#00ff41',          // GitS matrix green / LCARS green — bioluminescent living energy + data
  core: '#ff66cc',            // LCARS magenta — central Visual holo core (narrative heart)
  accent: '#ff9900',          // LCARS orange — premium alerts, highlights, evidence frames
  text: '#e5e7eb',            // Clean high-contrast for labels
  holo: '#cc99ff',            // LCARS purple — holographic shells, ghost layers
  gold: '#ffff66',            // LCARS yellow — secondary status, labels
  rain: '#ff00aa',            // Hot GitS magenta for digital rain variety
  cyan: '#00ccff',
  magenta: '#ff66cc',
}

// Refined nodes for the three skills (Living Blueprint style — elegant glowing cores, not literal chips)
const NODES = [
  { 
    id: 'swarm',
    name: 'SWARM', 
    full: 'swarm-architect-skill', 
    pos: [-6.5, 0.8, -1.5] as const, 
    desc: 'Phase → Wave → Swarm planning • Contracts • Memory' 
  },
  { 
    id: 'nextwave',
    name: 'NEXTWAVE', 
    full: 'github-next-wave-orchestrator', 
    pos: [6.5, 0.8, -1.5] as const, 
    desc: 'GitHub reality scan • Status • Prioritized waves + Copilot lanes' 
  },
  { 
    id: 'visual',
    name: 'VISUAL', 
    full: 'visual-manifest (the living heart)', 
    pos: [0, 1.6, 3.2] as const, 
    desc: 'Central living layer — every decision, stub, wave visualized & alive' 
  },
]

// Elegant living flow paths (curved for beauty, inspired by growing stems + narrative flows)
const FLOWS = [
  // Swarm planning & contracts flowing toward the living manifest
  { from: 0, to: 2, points: [[-6.5,0.6,-1.5], [-3.2,1.1,0.4], [0,1.3,2.5]], label: 'PLANS & CONTRACTS' },
  // NextWave reality & dispatch flowing in
  { from: 1, to: 2, points: [[6.5,0.6,-1.5], [3.2,1.1,0.4], [0,1.3,2.5]], label: 'WAVES & DISPATCH' },
  // Central living manifest loop / self-reinforcing energy (most alive)
  { from: 2, to: 2, points: [[-1.2,1.9,2.8], [-2.4,2.6,0.8], [0,3.0,-0.5], [2.4,2.6,0.8], [1.2,1.9,2.8]], label: 'LIVING MANIFEST' },
]

function CircuitBoard({ state, onNodeClick, signals }: { 
  state: ManifestState; 
  onNodeClick: (node: DecisionNode | null) => void;
  signals: Signal[];
}) {
  const groupRef = React.useRef<THREE.Group>(null!)
  const signalRefs = React.useRef<THREE.Group[]>([])

  // Animate signals along traces (the "electrical current" / live bioluminescent data per taste "Living Blueprint")
  useFrame((_, delta) => {
    signals.forEach((sig, i) => {
      const flow = FLOWS[sig.traceIndex % FLOWS.length]
      if (!flow) return

      const t = (sig.progress + sig.speed * delta * 0.75) % 1
      const pts = flow.points
      const seg = Math.floor(t * (pts.length - 1))
      const localT = (t * (pts.length - 1)) % 1

      const p1 = new THREE.Vector3(...pts[seg])
      const p2 = new THREE.Vector3(...pts[Math.min(seg + 1, pts.length - 1)])
      const pos = p1.lerp(p2, localT)

      if (signalRefs.current[i]) {
        signalRefs.current[i].position.copy(pos)
        const s = signalRefs.current[i].children[0] as THREE.Mesh
        if (s?.material && 'emissive' in s.material) {
          (s.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + Math.sin(Date.now() / 180) * 0.35
        }
      }
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() / 28000) * 0.004   // very subtle "power hum" / living board
    }
  })

  const handleNodeClick = (nodeIndex: number) => {
    const representative = state.decisions.find(d => 
      nodeIndex === 0 ? d.label.includes('Contract') || d.label.includes('Phase') : 
      nodeIndex === 1 ? d.label.includes('Copilot') || d.label.includes('Wave') : 
      d.label.includes('Visual') || d.label.includes('Hub') || d.label.includes('Manifest')
    ) || state.decisions[0]
    onNodeClick(representative)
  }

  return (
    <group ref={groupRef}>
      {/* === GIT S HOLO + LCARS DASHBOARD: FUTURISTIC CYBERPUNK BLUEPRINT === */}
      {/* GitS vibe inside the viewer: dark cyberpunk, neon holographic data, digital rain, glitchy high-tech density. */}
      {/* LCARS is the framing console around it. The 3D is the "main viewer" live holographic manifest. */}
      {/* Base plane + precision grid (remixed cyan for LCARS console grid + Swiss precision). */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI * 0.48, 0.015, 0]} receiveShadow>
        <planeGeometry args={[18.5, 12.2]} />
        <meshPhongMaterial 
          color={COLORS.base} 
          shininess={8} 
          specular="#1a2a2a"
        />
      </mesh>

      {/* Clean Swiss-precision grid in mint (high-density, elegant, "you are here on the living edge") */}
      {/* Horizontal lines */}
      {Array.from({ length: 11 }).map((_, i) => {
        const z = -5.8 + i * 1.16;
        return (
          <mesh key={`gridh-${i}`} position={[0, 0.07, z]} rotation={[-Math.PI * 0.48, 0.015, 0]}>
            <planeGeometry args={[17.8, 0.018]} />
            <meshBasicMaterial color={COLORS.grid} transparent opacity={0.28} />
          </mesh>
        );
      })}
      {/* Vertical lines */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = -9.2 + i * 1.31;
        return (
          <mesh key={`gridv-${i}`} position={[x, 0.07, 0]} rotation={[-Math.PI * 0.48, 0.015, 0]}>
            <planeGeometry args={[0.018, 11.6]} />
            <meshBasicMaterial color={COLORS.grid} transparent opacity={0.28} />
          </mesh>
        );
      })}

      {/* GitS cyberpunk digital rain / holographic data overlay (falling neon particles for rainy Tokyo vibe + data streams) */}
      {Array.from({ length: 35 }).map((_, i) => (
        <mesh 
          key={`gitrain-${i}`} 
          position={[-8.5 + (i % 17) * 1.05, 2.2 + ((i * 0.35) % 2.8), -5 + Math.floor(i / 17) * 5.5]}
        >
          <sphereGeometry args={[0.018]} />
          <meshBasicMaterial 
            color={i % 4 === 0 ? '#ff00aa' : (i % 3 === 0 ? '#00ff88' : '#00ccff')} 
            transparent 
            opacity={0.45 + (i % 5) * 0.05} 
          />
        </mesh>
      ))}

      {/* === THE THREE NODES — GitS Holographic Cyber Cores framed with LCARS console energy === */}
      {/* Outer transparent holo shell (GitS projection) + bright emissive core + inner data point (LCARS "active" readout) */}
      {NODES.map((node, i) => (
        <group key={i} position={node.pos} onClick={() => handleNodeClick(i)}>
          {/* Outer holographic shell — translucent GitS "ghost" layer */}
          <mesh>
            <sphereGeometry args={[i === 2 ? 1.18 : 0.90]} />
            <meshBasicMaterial 
              color={i === 2 ? COLORS.holo : COLORS.cyan} 
              transparent 
              opacity={i === 2 ? 0.18 : 0.12} 
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Main glowing orb — GitS neon emissive + LCARS vibrant */}
          <mesh>
            <sphereGeometry args={[i === 2 ? 0.72 : 0.55]} />
            <meshPhongMaterial 
              color={i === 2 ? '#220033' : '#001122'} 
              emissive={i === 2 ? COLORS.core : COLORS.living} 
              emissiveIntensity={i === 2 ? 0.95 : 0.7} 
              shininess={55}
            />
          </mesh>

          {/* Inner bright data core — LCARS "lit" console element */}
          <mesh>
            <sphereGeometry args={[i === 2 ? 0.26 : 0.20]} />
            <meshBasicMaterial color={i === 2 ? '#ffffff' : COLORS.living} transparent opacity={0.9} />
          </mesh>

          {/* LCARS "frame" rings on central Visual (magenta/cyan bars like classic LCARS panels) + GitS holo density */}
          {i === 2 && (
            <>
              <mesh>
                <torusGeometry args={[1.32, 0.026, 8, 40]} />
                <meshBasicMaterial color={COLORS.magenta} transparent opacity={0.65} />
              </mesh>
              <mesh>
                <torusGeometry args={[1.52, 0.016, 6, 34]} />
                <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.45} />
              </mesh>
            </>
          )}

          {/* LCARS / GitS hybrid uppercase technical labels */}
          <Text
            position={[0, i === 2 ? 1.65 : 1.32, 0]}
            fontSize={i === 2 ? 0.34 : 0.28}
            color={COLORS.text}
            anchorX="center"
            anchorY="middle"
          >
            {node.name}
          </Text>
          <Text
            position={[0, i === 2 ? 1.32 : 1.02, 0]}
            fontSize={0.10}
            color="#aaccff"
            anchorX="center"
            anchorY="middle"
          >
            {i === 2 ? 'HOLO CORE' : 'DATA NODE'}
          </Text>
        </group>
      ))}

      {/* === LIVING FLOWS — GitS neon data conduits + LCARS colored console traces === */}
      {/* Primary tube: emissive GitS holographic energy. Secondary: flat LCARS accent "panel" layer on the stream. */}
      {FLOWS.map((flow, fi) => {
        const pts = flow.points.map(p => new THREE.Vector3(...p));
        const curve = new THREE.CatmullRomCurve3(pts);
        const isCentral = fi === 2;

        return (
          <group key={fi}>
            {/* Main holographic data stream — GitS glowing conduit */}
            <mesh>
              <tubeGeometry args={[curve, 72, isCentral ? 0.08 : 0.055, 5, false]} />
              <meshPhongMaterial 
                color={isCentral ? '#112211' : '#001122'} 
                emissive={isCentral ? COLORS.living : COLORS.grid} 
                emissiveIntensity={isCentral ? 0.9 : 0.65} 
                shininess={30}
              />
            </mesh>

            {/* LCARS accent "bar" layer (magenta on the central manifest loop, cyan on the planner inflows) */}
            <mesh>
              <tubeGeometry args={[curve, 72, isCentral ? 0.026 : 0.020, 4, false]} />
              <meshBasicMaterial 
                color={isCentral ? COLORS.magenta : COLORS.cyan} 
                transparent 
                opacity={0.4} 
              />
            </mesh>
          </group>
        );
      })}

      {/* === EVIDENCE / DECISION BEACONS — Precise glowing "noesis beats" on the blueprint === */}
      {state.decisions.map((dec, di) => {
        const flow = FLOWS[di % FLOWS.length]
        const curve = new THREE.CatmullRomCurve3(flow.points.map(p => new THREE.Vector3(...p)))
        const pos = curve.getPointAt(Math.min(Math.max(dec.progress, 0.12), 0.88))

        const isDone = dec.type === 'done'
        const isVisual = dec.label.toLowerCase().includes('visual') || dec.label.toLowerCase().includes('manifest') || dec.label.toLowerCase().includes('hub')

        return (
          <group key={di} position={pos} onClick={() => onNodeClick(dec)}>
            {/* Small glowing evidence beacon — clean, precise, with mint "frame" (from Curios) */}
            <mesh>
              <sphereGeometry args={[0.155]} />
              <meshPhongMaterial 
                color={isDone ? '#0e3a2e' : (isVisual ? COLORS.core : '#1a2a2f')} 
                emissive={isDone ? COLORS.grid : (isVisual ? COLORS.living : COLORS.grid)} 
                emissiveIntensity={isDone || isVisual ? 0.65 : 0.32} 
              />
            </mesh>

            {/* Delicate mint "frame" ring around the beacon (evidence / noesis beat) */}
            <mesh>
              <torusGeometry args={[0.28, 0.018, 5, 22]} />
              <meshBasicMaterial color={COLORS.grid} transparent opacity={0.48} />
            </mesh>

            {/* Clean floating label (technical yet elegant) */}
            <Text
              position={[0, 0.58, 0]}
              fontSize={0.115}
              color={COLORS.text}
              anchorX="center"
              anchorY="bottom"
            >
              {dec.label.length > 17 ? dec.label.slice(0,15) + '…' : dec.label}
            </Text>
          </group>
        )
      })}

      {/* === LIVE BIOLUMINESCENT PARTICLES — Energy moving through the living blueprint (the "when changes are happening") === */}
      {signals.map((sig, si) => {
        const flow = FLOWS[sig.traceIndex % FLOWS.length]
        const curve = new THREE.CatmullRomCurve3(flow.points.map(p => new THREE.Vector3(...p)))
        const pos = curve.getPointAt(sig.progress)

        return (
          <group key={si} ref={(el) => { if (el) signalRefs.current[si] = el }}>
            {/* Core living particle */}
            <mesh>
              <sphereGeometry args={[0.075]} />
              <meshBasicMaterial color={sig.color} />
            </mesh>
            {/* Soft glowing halo for bioluminescent quality */}
            <mesh>
              <sphereGeometry args={[0.135]} />
              <meshBasicMaterial color={sig.color} transparent opacity={0.16} />
            </mesh>
          </group>
        );
      })}
    </group>
  )
}

export default function ManifestCircuit() {
  const [state, setState] = useState<ManifestState>(initialState)
  const [signals, setSignals] = useState<Signal[]>([
    { id: 101, traceIndex: 0, progress: 0.2, speed: 0.6, color: COLORS.living },   // GitS matrix green data
    { id: 102, traceIndex: 1, progress: 0.65, speed: 0.45, color: COLORS.cyan },   // LCARS cyan
  ])
  const [selected, setSelected] = useState<DecisionNode | null>(null)
  const [isLive, setIsLive] = useState(true)

  // Simulate "concurrent changes when the planners/stubs update"
  const simulateChange = (type: 'decision' | 'wave' | 'manifest') => {
    setState(prev => {
      const now = new Date().toLocaleTimeString()
      if (type === 'decision') {
        const newDec: DecisionNode = {
          id: Date.now(),
          label: ['New Architecture Decision', 'Stub Generated', 'Wave Checkpoint Passed', 'Copilot Dispatch Logged'][Math.floor(Math.random()*4)],
          progress: 0.15 + Math.random() * 0.3,
          type: Math.random() > 0.6 ? 'visual' : Math.random() > 0.5 ? 'wave' : 'plan'
        }
        return { ...prev, decisions: [...prev.decisions.slice(0,4), newDec], lastUpdate: now }
      }
      if (type === 'wave') {
        return { ...prev, activeWaves: Math.min(5, prev.activeWaves + 1), lastUpdate: now }
      }
      // manifest update — pulse central
      return { ...prev, lastUpdate: now }
    })

    // Spawn visual signals (the "electrical" manifestation) — GitS data streams + LCARS accent bursts
    if (type === 'manifest' || type === 'wave') {
      const newSig: Signal = {
        id: Date.now(),
        traceIndex: type === 'manifest' ? 2 : 1,
        progress: 0.05,
        speed: 0.7 + Math.random() * 0.4,
        color: type === 'manifest' ? COLORS.core : COLORS.living,  // magenta holo core or matrix green
      }
      setSignals(s => [...s.slice(-3), newSig])
    }
  }

  // Continuous live signal animation + cleanup
  React.useEffect(() => {
    if (!isLive) return
    const iv = setInterval(() => {
      setSignals(prev => 
        prev
          .map(s => ({ ...s, progress: (s.progress + s.speed * 0.018) % 1 }))
          .filter(s => s.progress > 0.01) // keep a few alive
      )
    }, 80)
    return () => clearInterval(iv)
  }, [isLive])

  const handleNodeClick = (node: DecisionNode | null) => {
    setSelected(node)
    // "focus" effect by temporarily boosting a related signal (GitS holo pulse on selection)
    if (node) {
      const relatedTrace = node.type === 'visual' ? 2 : node.type === 'wave' ? 1 : 0
      setSignals(s => [...s, { 
        id: Date.now(), 
        traceIndex: relatedTrace, 
        progress: 0.1, 
        speed: 1.1, 
        color: COLORS.holo   // LCARS purple holo ghost
      }])
    }
  }

  return (
    <div className="pcb-app">
      {/* LCARS + GitS Futuristic Dashboard Header */}
      <div className="lcars-header">
        <div className="lcars-bar" style={{ background: 'var(--lcars-orange)' }}></div>
        <div className="lcars-header-content">
          <div className="brand">
            <Zap size={16} style={{ color: 'var(--lcars-green)' }} />
            <div>
              <div className="title" style={{ color: 'var(--lcars-cyan)' }}>GHOST SHELL // LCARS</div>
              <div className="subtitle" style={{ color: 'var(--muted)', fontSize: '9px' }}>MANIFEST PROTOCOL v2.3 • CYBERPUNK HOLO + STARFLEET DASHBOARD</div>
            </div>
          </div>

          <div className="lcars-status">
            <div className="lcars-status-item">
              <span className="lcars-led green"></span> VISUAL LIVE
            </div>
            <div className="lcars-status-item">
              <span className="lcars-led purple"></span> {state.activeWaves} WAVES
            </div>
            <div className="lcars-status-item">
              <span className="lcars-led orange"></span> {state.decisions.length} EVIDENCE
            </div>
          </div>

          <div className="lcars-controls">
            <button onClick={() => simulateChange('decision')} className="lcars-button">+ ADD DECISION</button>
            <button onClick={() => simulateChange('wave')} className="lcars-button cyan">DISPATCH WAVE</button>
            <button onClick={() => simulateChange('manifest')} className="lcars-button purple">MANIFEST UPDATE</button>
            <button onClick={() => setIsLive(!isLive)} className={`lcars-button green ${isLive ? 'active' : ''}`}>{isLive ? 'PAUSE LIVE' : 'RESUME LIVE'}</button>
          </div>
        </div>
        <div className="lcars-bar" style={{ background: 'var(--lcars-cyan)' }}></div>
      </div>

      <div className="canvas-wrap">
        <Canvas
          camera={{ position: [-4, 9, 16], fov: 38 }}   // Editorial 3/4 product shot angle (Amir-Mushich cosmic premium)
          style={{ background: COLORS.background }}
          gl={{ 
            alpha: true, 
            antialias: true, 
            preserveDrawingBuffer: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.9
          }}
        >
          {/* Premium studio lighting per taste (soft high-key + directional for sleek highlights + emissive living energy) */}
          <ambientLight intensity={0.28} color="#e8f0ed" />
          <directionalLight position={[-18, 22, -12]} intensity={0.85} color="#f5f7f6" castShadow />
          <directionalLight position={[14, 16, 10]} intensity={0.55} color="#d4e8e0" />
          {/* Subtle rim / living energy light on the central Visual core */}
          <pointLight position={[0, 4, 6]} color={COLORS.traceLiving} intensity={0.9} />

          <CircuitBoard 
            state={state} 
            onNodeClick={handleNodeClick} 
            signals={signals} 
          />

          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={6}
            maxDistance={32}
            target={[0.5, 1.2, 0.8]}
            enableDamping
            dampingFactor={0.12}
          />
        </Canvas>

        {/* Adaptive overlay HUD — follows taste for premium, readable tech UI */}
        <div className="hud">
          <AnimatePresence>
            {selected && (
              <motion.div 
                className="node-detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="detail-header">
                  <Info size={16} /> {selected.label}
                  <button onClick={() => setSelected(null)}>×</button>
                </div>
                <div className="detail-body">
                  <div>Type: <strong>{selected.type.toUpperCase()}</strong></div>
                  <div>Progress on trace: <strong>{Math.round(selected.progress * 100)}%</strong></div>
                  <div className="hint">This node represents a real artifact from the planners. In production the visual pipeline would ingest live plans/waves/stubs and instantiate exact geometry.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="legend" style={{ background: 'rgba(0,39,43,0.9)', border: '1px solid #1a3c34', padding: '8px 12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
              <span style={{ width: '14px', height: '2.5px', background: '#E0FF4F', borderRadius: '1px' }} /> Chartreuse/Mint — Living energy (bioluminescent traces)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
              <span style={{ width: '14px', height: '2.5px', background: '#B87333', borderRadius: '1px' }} /> Copper — Precision hierarchy (Swiss grid)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
              <span style={{ width: '14px', height: '2.5px', background: '#231651', borderRadius: '1px' }} /> Russian Violet — Central Visual / Narrative core
            </div>
          </div>
        </div>
      </div>

      <div className="footer-note">
        Built with taste from skill-clusters/taste (Codrops corpus + Tryambakam-Noesis layering) • PCB electrical aesthetics • Not a static SVG replica • Fully 3D, interactive, data-reactive
        <br />
        <strong>Visual pipeline for the Manifest Skill Cluster</strong> — the three skills now rendered as a living circuit board.
      </div>
    </div>
  )
}
