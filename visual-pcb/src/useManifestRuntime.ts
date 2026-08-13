import { useCallback, useEffect, useState } from 'react'
import { EMPTY_HEALTH, EMPTY_SNAPSHOT, type BridgeHealth, type ConnectionState, type ManifestSnapshot, type ProjectSummary } from './manifest'

const BRIDGE_URL = (import.meta.env.VITE_MANIFEST_BRIDGE_URL || 'http://127.0.0.1:8766').replace(/\/$/, '')

export interface ManifestRuntime {
  bridgeUrl: string
  snapshot: ManifestSnapshot
  projects: ProjectSummary[]
  health: BridgeHealth
  connection: ConnectionState
  connectionError: string | null
  activeProjectId: string
  setActiveProjectId: (projectId: string) => void
  refresh: () => Promise<void>
  approve: (input: { project_id: string; plan_id: string; option_id: string; approval_id: string }) => Promise<void>
}

export function useManifestRuntime(): ManifestRuntime {
  const [snapshot, setSnapshot] = useState<ManifestSnapshot>(EMPTY_SNAPSHOT)
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [health, setHealth] = useState<BridgeHealth>(EMPTY_HEALTH)
  const [activeProjectId, setActiveProjectIdState] = useState('all')
  const [connection, setConnection] = useState<ConnectionState>('OFFLINE')
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const setActiveProjectId = useCallback((projectId: string) => {
    setActiveProjectIdState(projectId)
    window.localStorage.setItem('manifest.activeProject', projectId)
  }, [])

  const loadProjects = useCallback(async () => {
    const response = await fetch(`${BRIDGE_URL}/projects`, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`project registry returned HTTP ${response.status}`)
    const value = await response.json() as { projects: ProjectSummary[] }
    const nextProjects = value.projects || []
    setProjects(nextProjects)
    const saved = window.localStorage.getItem('manifest.activeProject')
    if (saved && (saved === 'all' || nextProjects.some((project) => project.project_id === saved))) setActiveProjectIdState(saved)
  }, [])

  const loadHealth = useCallback(async () => {
    const response = await fetch(`${BRIDGE_URL}/health`, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`bridge health returned HTTP ${response.status}`)
    setHealth(await response.json() as BridgeHealth)
  }, [])

  const loadSnapshot = useCallback(async () => {
    const query = activeProjectId === 'all' ? '' : `?project_id=${encodeURIComponent(activeProjectId)}`
    const response = await fetch(`${BRIDGE_URL}/snapshot${query}`, { headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`bridge returned HTTP ${response.status}`)
    const next = await response.json() as ManifestSnapshot
    setSnapshot(next)
    setConnection(next.freshness.status === 'stale' ? 'STALE' : 'LIVE')
    setConnectionError(null)
  }, [activeProjectId])

  const refresh = useCallback(async () => {
    try {
      await Promise.all([loadProjects(), loadHealth(), loadSnapshot()])
    } catch (error) {
      setConnection('OFFLINE')
      setConnectionError(error instanceof Error ? error.message : 'bridge unavailable')
    }
  }, [loadHealth, loadProjects, loadSnapshot])

  const approve = useCallback(async (input: { project_id: string; plan_id: string; option_id: string; approval_id: string }) => {
    const response = await fetch(`${BRIDGE_URL}/approvals`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) })
    if (!response.ok) { const value = await response.json().catch(() => ({})) as { error?: string }; throw new Error(value.error || `approval returned HTTP ${response.status}`) }
    await refresh()
  }, [refresh])

  useEffect(() => {
    const timer = window.setTimeout(() => { void refresh() }, 0)
    return () => window.clearTimeout(timer)
  }, [refresh])

  useEffect(() => {
    const query = activeProjectId === 'all' ? '' : `?project_id=${encodeURIComponent(activeProjectId)}`
    const stream = new EventSource(`${BRIDGE_URL}/events${query}`)
    const onSnapshot = (message: MessageEvent<string>) => {
      try {
        const next = JSON.parse(message.data) as ManifestSnapshot
        setSnapshot(next)
        setConnection(next.freshness.status === 'stale' ? 'STALE' : 'LIVE')
        setConnectionError(null)
      } catch { setConnectionError('invalid bridge snapshot') }
    }
    const onManifest = () => { void Promise.all([loadSnapshot(), loadProjects(), loadHealth()]) }
    const onError = () => setConnection((state) => state === 'STALE' ? state : 'OFFLINE')
    stream.addEventListener('snapshot', onSnapshot as EventListener)
    stream.addEventListener('manifest', onManifest as EventListener)
    stream.addEventListener('error', onError as EventListener)
    return () => {
      stream.removeEventListener('snapshot', onSnapshot as EventListener)
      stream.removeEventListener('manifest', onManifest as EventListener)
      stream.removeEventListener('error', onError as EventListener)
      stream.close()
    }
  }, [activeProjectId, loadHealth, loadProjects, loadSnapshot])

  useEffect(() => {
    const interval = window.setInterval(() => { void Promise.all([loadProjects(), loadHealth()]) }, 15_000)
    return () => window.clearInterval(interval)
  }, [loadHealth, loadProjects])

  return { bridgeUrl: BRIDGE_URL, snapshot, projects, health, connection, connectionError, activeProjectId, setActiveProjectId, refresh, approve }
}
