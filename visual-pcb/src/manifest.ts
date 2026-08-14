export const PHASES = ['OBSERVE', 'THINK', 'PLAN', 'BUILD', 'EXECUTE', 'VERIFY', 'LEARN'] as const
export type Phase = typeof PHASES[number]
export type ConnectionState = 'LIVE' | 'STALE' | 'OFFLINE'
export type ViewId = 'OVERVIEW' | 'PLANNING' | 'EXECUTION' | 'EVIDENCE' | 'OPS / DELIVERY'

export interface EvidencePointer {
  label: string
  path?: string
  url?: string
  line?: number
}

export interface ManifestEvent {
  id: string
  ts: string
  kind: string
  status: 'observed' | 'derived' | 'synthetic' | 'stale' | 'failed'
  source: string
  project_id?: string
  session_id?: string
  correlation_id?: string
  agent_id?: string
  phase?: Phase
  payload: Record<string, unknown>
  evidence?: EvidencePointer[]
}

export interface ManifestSnapshot {
  generated_at: string
  last_event_at: string | null
  event_count: number
  freshness: { status: 'empty' | 'fresh' | 'stale'; age_ms: number | null; stale_after_ms: number }
  projects: Record<string, Record<string, unknown>>
  sessions: Record<string, Record<string, unknown>>
  agents: Record<string, Record<string, unknown>>
  waves: Record<string, Record<string, unknown>>
  plans: Record<string, Record<string, unknown>>
  approvals: Record<string, Record<string, unknown>>
  skills: Record<string, Record<string, unknown>>
  dispatches: Record<string, Record<string, unknown>>
  reports: Record<string, Record<string, unknown>>
  routes: Record<string, Record<string, unknown>>
  evidence: Record<string, Record<string, unknown>>
  alerts: Array<Record<string, unknown>>
  recent_events: ManifestEvent[]
}

export interface ProjectSummary {
  project_id: string
  name: string
  cwd: string | null
  initialized: boolean
  event_count: number
  last_event_at: string | null
  freshness: { status: 'empty' | 'fresh' | 'stale'; age_ms: number | null; stale_after_ms: number }
}

export interface BridgeHealth {
  ok: boolean
  status: 'empty' | 'fresh' | 'stale'
  age_ms: number | null
  event_count: number
}

export const EMPTY_SNAPSHOT: ManifestSnapshot = {
  generated_at: '',
  last_event_at: null,
  event_count: 0,
  freshness: { status: 'empty', age_ms: null, stale_after_ms: 30_000 },
  projects: {}, sessions: {}, agents: {}, waves: {}, plans: {}, approvals: {}, skills: {}, dispatches: {}, reports: {}, routes: {}, evidence: {}, alerts: [], recent_events: [],
}

export const EMPTY_HEALTH: BridgeHealth = { ok: false, status: 'empty', age_ms: null, event_count: 0 }

export function recordString(record: Record<string, unknown> | undefined, key: string, fallback = '—'): string {
  const value = record?.[key]
  return typeof value === 'string' && value.trim() ? value : fallback
}

export function recordNumber(record: Record<string, unknown> | undefined, key: string, fallback = 0): number {
  const value = record?.[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function formatTime(value: string | null | undefined): string {
  if (!value) return 'NO SAMPLE'
  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function formatAge(age: number | null | undefined): string {
  if (age == null || Number.isNaN(age)) return 'NO SAMPLE'
  if (age < 1000) return 'NOW'
  if (age < 60_000) return `${Math.round(age / 1000)}s AGO`
  if (age < 3_600_000) return `${Math.round(age / 60_000)}m AGO`
  return `${Math.round(age / 3_600_000)}h AGO`
}

export function formatEventAge(ts: string | undefined): string {
  return ts ? formatAge(Date.now() - Date.parse(ts)) : 'NO SAMPLE'
}

export function basename(value: string): string {
  const pieces = value.split('/').filter(Boolean)
  return pieces.at(-1) || value
}

export function currentPhase(snapshot: ManifestSnapshot): Phase {
  const eventPhase = [...snapshot.recent_events].reverse().find((event) => event.phase)?.phase
  if (eventPhase && PHASES.includes(eventPhase)) return eventPhase
  const sessionPhase = Object.values(snapshot.sessions).map((session) => session.phase).find((phase): phase is Phase => typeof phase === 'string' && PHASES.includes(phase as Phase))
  return sessionPhase || 'OBSERVE'
}

export function phaseIndex(phase: Phase): number {
  return PHASES.indexOf(phase)
}

export function eventLabel(event: ManifestEvent): string {
  const description = typeof event.payload.description === 'string' ? event.payload.description : ''
  const tool = typeof event.payload.tool_name === 'string' ? event.payload.tool_name : ''
  const detail = description || tool
  return `${event.kind.replace(/[._-]+/g, ' ').toUpperCase()}${detail ? ` · ${detail}` : ''}`
}

export function eventTone(event: ManifestEvent): 'cyan' | 'orange' | 'magenta' | 'violet' | 'mint' {
  if (event.status === 'failed' || event.kind.includes('alert')) return 'orange'
  if (event.kind.includes('decision') || event.kind.includes('prompt') || event.kind.includes('algorithm')) return 'magenta'
  if (event.kind.includes('route') || event.source === 'omniroute') return 'violet'
  if (event.kind.includes('agent') || event.kind.includes('wave')) return 'mint'
  return 'cyan'
}

export function projectDisplay(projects: ProjectSummary[], projectId?: string): string {
  return projects.find((project) => project.project_id === projectId)?.name || (projectId ? basename(projectId) : 'GLOBAL')
}

export function projectScopeLabel(activeProjectId: string, projects: ProjectSummary[]): string {
  return activeProjectId === 'all' ? `ALL PROJECTS · ${projects.length}` : projectDisplay(projects, activeProjectId)
}
