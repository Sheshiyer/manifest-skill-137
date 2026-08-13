import { useState } from 'react'
import { Activity, ChevronRight, Eye, Menu, Radio, RefreshCw, ShieldCheck, Target, X, Zap } from 'lucide-react'
import './App.css'
import { PHASES, currentPhase, phaseIndex, projectScopeLabel, type ManifestEvent, type ViewId } from './manifest'
import { EvidencePage, ExecutionPage, OpsDeliveryPage, OverviewPage, PlanningPage } from './pages'
import { useManifestRuntime } from './useManifestRuntime'

const NAV_ITEMS: Array<{ id: ViewId; icon: typeof Eye; label: string }> = [
  { id: 'OVERVIEW', icon: Eye, label: 'OVERVIEW' },
  { id: 'PLANNING', icon: Target, label: 'PLANNING' },
  { id: 'EXECUTION', icon: Zap, label: 'EXECUTION' },
  { id: 'EVIDENCE', icon: ShieldCheck, label: 'EVIDENCE' },
  { id: 'OPS / DELIVERY', icon: Radio, label: 'OPS / DELIVERY' },
]

const PAGE_META: Record<ViewId, { eyebrow: string; title: string; emphasis: string; subtitle: string }> = {
  OVERVIEW: { eyebrow: 'LIVING MANIFEST / EXECUTION', title: 'Operational reality,', emphasis: 'in view.', subtitle: 'Planning, execution, operations, and delivery joined by evidence.' },
  PLANNING: { eyebrow: 'LIVING MANIFEST / PLANNING', title: 'Make the next move,', emphasis: 'legible.', subtitle: 'Project rails, waves, phases, and session intent from observed artifacts.' },
  EXECUTION: { eyebrow: 'LIVING MANIFEST / EXECUTION', title: 'See the fleet,', emphasis: 'as it moves.', subtitle: 'Agents, sessions, routes, and lifecycle signals without invented health.' },
  EVIDENCE: { eyebrow: 'LIVING MANIFEST / EVIDENCE', title: 'Trust the trace,', emphasis: 'not the story.', subtitle: 'Every visible claim resolves to a bounded event or source pointer.' },
  'OPS / DELIVERY': { eyebrow: 'LIVING MANIFEST / OPS / DELIVERY', title: 'Keep the plane,', emphasis: 'honest.', subtitle: 'Freshness, source mix, alerts, and delivery readiness for the operator.' },
}

function PhaseStrip({ phase }: { phase: ReturnType<typeof currentPhase> }) {
  const position = phaseIndex(phase)
  return <div className="phase-strip" aria-label="Algorithm phases">{PHASES.map((item, index) => { const state = index < position ? 'complete' : index === position ? 'current' : 'pending'; return <div className={`phase-segment ${state}`} key={item}><span className="phase-index">0{index + 1}</span><span>{item}</span>{state === 'current' && <span className="phase-live">NOW</span>}</div> })}</div>
}

export default function ManifestCircuit() {
  const runtime = useManifestRuntime()
  const [activeView, setActiveView] = useState<ViewId>('OVERVIEW')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ManifestEvent | null>(null)
  const meta = PAGE_META[activeView]
  const phase = currentPhase(runtime.snapshot)

  const navigate = (view: ViewId) => {
    setActiveView(view)
    setMobileMenu(false)
  }
  const selectProject = (projectId: string) => {
    runtime.setActiveProjectId(projectId)
    setSelectedEvent(null)
  }

  const pageProps = {
    snapshot: runtime.snapshot,
    projects: runtime.projects,
    activeProjectId: runtime.activeProjectId,
    onScopeChange: selectProject,
    onNavigate: navigate,
    onSelectEvent: setSelectedEvent,
    onApprove: runtime.approve,
    selectedEvent,
  }

  return <div className="manifest-shell"><a className="skip-link" href="#main-content">Skip to live console</a><aside className={`command-rail ${mobileMenu ? 'open' : ''}`}><div className="rail-brand"><span className="brand-mark"><span></span><span></span><span></span></span><span><strong>MANIFEST</strong><small>CONTROL SURFACE</small></span></div><button type="button" className="rail-close" aria-label="Close navigation" onClick={() => setMobileMenu(false)}><X size={16} /></button><div className="rail-section-label">OPERATE</div><nav className="rail-nav" aria-label="Operator pages">{NAV_ITEMS.map(({ id, icon: Icon, label }) => <button type="button" key={id} className={activeView === id ? 'selected' : ''} aria-current={activeView === id ? 'page' : undefined} onClick={() => navigate(id)}><Icon size={15} /><span>{label}</span>{activeView === id && <ChevronRight size={13} className="nav-caret" />}</button>)}</nav><div className="rail-section-label phase-label">PHASE TRACK</div><div className="phase-rail">{PHASES.map((item, index) => { const state = index < phaseIndex(phase) ? 'complete' : index === phaseIndex(phase) ? 'current' : 'pending'; return <div className={`phase-rail-row ${state}`} key={item}><span className="phase-dot">{state === 'complete' ? '✓' : index + 1}</span><span>{item}</span></div> })}</div><div className="rail-foot"><div className="rail-foot-line"><Radio size={13} /> LOCAL EVENT PLANE</div><small>Projection only · source ownership remains with the runtime.</small></div></aside><section className="manifest-workspace"><header className="topbar"><button type="button" className="mobile-menu" aria-label="Open navigation" aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}><Menu size={18} /></button><div className="topbar-context"><span className="topbar-kicker">OPERATOR VIEW</span><select className="project-selector" value={runtime.activeProjectId} onChange={(event) => selectProject(event.target.value)} aria-label="Project scope"><option value="all">ALL PROJECTS · {runtime.projects.length}</option>{runtime.projects.map((project) => <option value={project.project_id} key={project.project_id}>{project.name}{project.initialized ? '' : ' · UNINITIALIZED'}</option>)}</select><ChevronRight size={13} /><span className="topbar-muted">LOCAL RUNTIME</span></div><div className="topbar-actions"><span className={`connection-chip ${runtime.connection.toLowerCase()}`}><span className="connection-dot"></span>{runtime.connection}</span><span className="topbar-event-count"><Activity size={13} /> {String(runtime.snapshot.event_count).padStart(3, '0')} EVENTS</span><button type="button" className="icon-button" aria-label="Refresh live telemetry" onClick={() => void runtime.refresh()}><RefreshCw size={14} /></button></div></header><main id="main-content" className="content-area"><div className="page-intro"><div><div className="section-kicker"><span className="kicker-rule"></span>{meta.eyebrow} / {projectScopeLabel(runtime.activeProjectId, runtime.projects)}</div><h1>{meta.title} <em>{meta.emphasis}</em></h1><p>{meta.subtitle}</p></div><div className="freshness-card"><span className="section-kicker">LAST OBSERVED</span><strong>{runtime.snapshot.last_event_at ? new Date(runtime.snapshot.last_event_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'NO SAMPLE'}</strong><small>{runtime.connectionError || `${runtime.connection} · ${runtime.bridgeUrl}`}</small></div></div><PhaseStrip phase={phase} />{activeView === 'OVERVIEW' && <OverviewPage {...pageProps} />} {activeView === 'PLANNING' && <PlanningPage {...pageProps} />} {activeView === 'EXECUTION' && <ExecutionPage {...pageProps} />} {activeView === 'EVIDENCE' && <EvidencePage {...pageProps} />} {activeView === 'OPS / DELIVERY' && <OpsDeliveryPage {...pageProps} />}</main><footer className="workspace-footer"><span><span className="footer-led"></span> MANIFEST BRIDGE / {runtime.connection}</span><span>PROJECTION LAYER · SOURCE OWNERSHIP REMAINS WITH RUNTIME</span><span>HEALTH {runtime.health.status.toUpperCase()} · LAST UPDATE {runtime.snapshot.generated_at ? new Date(runtime.snapshot.generated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'NO SAMPLE'}</span></footer></section></div>
}
