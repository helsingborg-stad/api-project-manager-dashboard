import { DashboardFilter, DashboardGraph, DashboardProject } from "./types"

export interface DashboardReducerState {
    error: Error | null,
    projects: DashboardProject[],
    filters: DashboardFilter,
    graph: DashboardGraph
}

export type DashboardReducerAction = (state: DashboardReducerState) => DashboardReducerState

export const dashboardReducer = (state: DashboardReducerState, mutate: DashboardReducerAction): DashboardReducerState => mutate(state)
