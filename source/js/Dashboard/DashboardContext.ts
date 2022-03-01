import { createContext, useCallback, useMemo, useReducer, useState } from "react";
import { InnovationProjectRepository } from "../innovation-api-client/InnovationProjectRepository";
import { InnovationProject, Taxonomy } from "../innovation-api-client/types";

/**
 * Common layout for projects and filters
 */

export type DashboardDataPropertyName = 
    'challengeCategories'
    | 'globalGoals'
    | 'impactGoals'
    | 'organisations'
    | 'partners'
    | 'platforms'
    | 'residentInvolvments'
    | 'sectors'
    | 'status'
    | 'technologies'

export interface DashboardProjectDataProps<T> extends Record<DashboardDataPropertyName, T> {}
    

// Mapped from project in WP
export interface DashboardProject extends DashboardProjectDataProps<string[]> {
    slug: string
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
    requestLoadProjects: () => void,
    applyFilter: (filter: Partial<DashboardFilter>) => void,
    resetFilter: () => void
}

export const createEmptyFilters = (): DashboardFilter => ({
    challengeCategories: '',
    globalGoals: '',
    impactGoals: '',
    organisations: '',
    partners: '',
    platforms: '',
    residentInvolvments: '',
    sectors: '',
    status: '',
    technologies: ''      
})

const DashboardContext = createContext<DashboardContextType>({
    error: null,
    projects: [],
    filters: createEmptyFilters(),
    graph: createGraph([], createEmptyFilters()),
    requestLoadProjects: () => undefined,
    applyFilter: () => undefined,
    resetFilter: () => undefined
})

export default DashboardContext

interface DashboardReducerState {
    error: Error | null,
    projects: DashboardProject[],
    filters: DashboardFilter,
    graph: DashboardGraph
}
type DashboardReducerAction = (state: DashboardReducerState) => DashboardReducerState

const dashboardReducer = (state: DashboardReducerState, mutate: DashboardReducerAction): DashboardReducerState => mutate(state)


export function createGraph (projects: DashboardProject[], filters: DashboardFilter) {
    const match = (value: string|undefined, values: string[]) => !value || values.includes(value)
    const filterProjects = (projects: DashboardProject[]) => projects.filter(p => 
        match(filters.challengeCategories, p.challengeCategories)
        && match(filters.globalGoals, p.globalGoals)
        && match(filters.impactGoals, p.impactGoals)
        && match(filters.organisations, p.organisations)
        && match(filters.partners, p.partners)
        && match(filters.platforms, p.platforms)
        && match(filters.residentInvolvments, p.residentInvolvments)
        && match(filters.sectors, p.sectors)
        && match(filters.status, p.status)
        && match(filters.technologies, p.technologies)
    )

    const createFilteredGraph = (projects: DashboardProject[]) => {
        const uniqueNames = (getNamesByProject:(project: DashboardProject) => string[]): string[] => {
            const names = new Set<string>()
            projects.forEach(project => getNamesByProject(project).forEach(name => names.add(name)))
            return Array.from(names)
        } 
        const lookupBy = (getKeys: (project: DashboardProject) => string[]): Record<string, DashboardProject[]> => 
            projects
                .map(project => ({project, keys: getKeys(project)}))
                .reduce((memo, {project, keys}) => {
                    keys.forEach(key => {
                        if (!Array.isArray(memo[key])) {
                            memo[key] = []
                        }
                        memo[key].push(project)
                    })
                    return memo
                }, {} as Record<string, DashboardProject[]>)

        let graph: DashboardGraph = {
            lookupBy,
            projects,
            challengeCategories: uniqueNames(p => p.challengeCategories),
            globalGoals: uniqueNames(p => p.globalGoals),
            impactGoals: uniqueNames(p => p.impactGoals),
            organisations: uniqueNames(p => p.organisations),
            partners: uniqueNames(p => p.partners),
            platforms: uniqueNames(p => p.platforms),
            residentInvolvments: uniqueNames(p => p.residentInvolvments),
            sectors: uniqueNames(p => p.sectors),
            status: uniqueNames(p => p.status),
            technologies: uniqueNames(p => p.technologies),
        }
        return graph
    }
    return createFilteredGraph(filterProjects(projects))
}

function createActions (dispatch: (mutator: DashboardReducerAction) => void) {
    const patch = (patch: DashboardReducerAction) => dispatch(patch)

    const updateGraph = (state: DashboardReducerState): DashboardReducerState => {
        return {
            ...state,
            graph: createGraph(state.projects, state.filters)
        }
    }
    const reset = (projects: InnovationProject[], error: Error|null) => patch(state => updateGraph({
        ...state,
        error,
        projects: projects.map(mapInnovationProjectToDashboardProject)
    }))
    const applyFilter = (f: Partial<DashboardFilter>) => patch(state => updateGraph({
        ...state,
        filters: {...state.filters, ...f}
    }))
    const resetFilter = () => patch(state => updateGraph({
        ...state,
        filters: createEmptyFilters()
    }))

    return {
        reset,
        applyFilter,
        resetFilter
    }
}

export function useDashboard (repository: InnovationProjectRepository): DashboardContextType {
    const [{projects, error, filters, graph: graph}, dispatch] = useReducer(dashboardReducer, {error: null, projects: [], filters: createEmptyFilters(), graph: createGraph([], createEmptyFilters())})
    const [loadPromise, setLoadPromise] = useState<Promise<unknown>|null>(null)    

    const actions = useMemo(() => createActions(dispatch), [])

    const requestLoadProjects = useCallback((): void => {
        if (loadPromise) {
            return
        }
        const load = repository
            .loadInnovationProjects()
            .then(projects => actions.reset(projects, null))
            .catch(error => actions.reset([], error))
        setLoadPromise(load)
    }, [actions, loadPromise, repository])

    return {
        projects,
        error,
        filters,
        graph,
        requestLoadProjects,
        applyFilter: (f) => actions.applyFilter(f),
        resetFilter: () => actions.resetFilter()
    }
}

export function mapInnovationProjectToDashboardProject (project: InnovationProject): DashboardProject {
    const decodeName = (name: string) => name.replace('&amp;', '&')

    const names = <T>(list: T[]|undefined, getName: (item: T) => string): string[] =>
        (list || [])
        .map(getName)
        .filter(v => v)
        .map(decodeName)

    const taxonomyNames = (list: Taxonomy[]|undefined): string[] => names(list, t => t.name)

    return {
        slug: project.slug,
        challengeCategories: taxonomyNames(project.challenge_category),
        globalGoals: taxonomyNames(project.global_goal),
        impactGoals: names(project.impact_goals, g => g.impact_goal),
        organisations: taxonomyNames(project.organisation),
        partners: taxonomyNames(project.partner),
        platforms: taxonomyNames(project.platforms),
        residentInvolvments: names(project.resident_involvement, ri => ri.description),
        sectors: taxonomyNames(project.sector),
        status: names(project.status, s => s.name),
        technologies: taxonomyNames(project.technology),
    }
}

