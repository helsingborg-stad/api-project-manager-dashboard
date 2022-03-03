/**
 * Common layout for projects and filters
 */

 export type DashboardDataPropertyName = 
    'challengeCategories'
    | 'expectedImpacts'
    | 'globalGoals'
    | 'impactGoals'
    | 'innovationPotentials'
    | 'organisations'
    | 'participants'
    | 'partners'
    | 'sectors'
    | 'status'
    | 'technologies'
    | 'challenges'

export interface DashboardProjectDataProps<T> extends Record<DashboardDataPropertyName, T> {}

// Mapped from project in WP
export interface DashboardProject extends DashboardProjectDataProps<string[]> {
    slug: string,
    fundsGranted: number,
    fundsUsed: number,
    summary: DashboardProjectSummary
}

export interface DashboardProjectSummary {
    title: string,
    created: Date,
    modified: Date,
    isCityWide: boolean,
    isChallengingCoreBusiness: boolean
}

// Contains user selected filter values 
export interface DashboardFilter extends DashboardProjectDataProps<string> {
}

// Given a selection from filters, contains all reachable projects and 
// filtervalues used by those projects
export interface DashboardGraph extends DashboardProjectDataProps<string[]> {
    projects: DashboardProject[],
    // group projects by dimension
    lookupBy: (getKeys: (project: DashboardProject) => string[]) => Record<string, DashboardProject[]>
}

export interface DashboardContextType {
    error: Error|null,
    // all loaded projects
    projects: DashboardProject[],
    // current filter values
    filters: DashboardFilter,
    // reachable projects and filter values given current filter values
    graph: DashboardGraph,
    requestLoadProjects: () => Promise<void>,
    applyFilter: (filter: Partial<DashboardFilter>) => void,
    resetFilter: () => void
}
