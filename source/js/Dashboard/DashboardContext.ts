import { createContext, useCallback, useMemo, useReducer, useState } from "react";
import { InnovationProjectRepository, WPProject } from "../innovation-api-client/InnovationProjectRepository";
import {decode as htmlDecode} from 'he'

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
    // | 'platforms'
    // | 'residentInvolvments'
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
    requestLoadProjects: () => void,
    applyFilter: (filter: Partial<DashboardFilter>) => void,
    resetFilter: () => void
}

export const createEmptyFilters = (): DashboardFilter => ({
    challengeCategories: '',
    expectedImpacts: '',
    globalGoals: '',
    impactGoals: '',
    innovationPotentials: '',
    organisations: '',
    participants: '',
    partners: '',
    // platforms: '',
    // residentInvolvments: '',
    sectors: '',
    status: '',
    technologies: '',
    challenges: ''
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
        Object
            .keys(filters)
            .map(key => key as DashboardDataPropertyName)
            .every(key => match(filters[key], p[key])))

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
            challenges: uniqueNames(p => p.challenges),
            expectedImpacts: uniqueNames(p => p.expectedImpacts),
            globalGoals: uniqueNames(p => p.globalGoals),
            innovationPotentials: uniqueNames(p => p.innovationPotentials),
            impactGoals: uniqueNames(p => p.impactGoals),
            organisations: uniqueNames(p => p.organisations),
            participants: uniqueNames(p => p.participants),
            partners: uniqueNames(p => p.partners),
            // platforms: uniqueNames(p => p.platforms),
            // residentInvolvments: uniqueNames(p => p.residentInvolvments),
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
    const reset = (projects: WPProject[], error: Error|null) => patch(state => updateGraph({
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

export function mapInnovationProjectToDashboardProject (project: WPProject): DashboardProject {
    interface Taxonomy {
        term_id: number;
        name: string;
        slug: string;
        term_group: number;
        term_taxonomy_id: number;
        taxonomy: string;
        description: string;
        parent: number;
        count: number;
        filter: string;
    }

    // const htmlDecode = (name: string) => name.replace('&amp;', '&')

    const names = <T>(list: T[]|undefined, getName: (item: T) => string): string[] =>
        (list || [])
        .map(item => getName(item))
        .filter(v => v)
        .map(v => htmlDecode(v))

    const taxonomyNames = (list: Taxonomy[]|undefined): string[] => names(list, t => t.name)
    const singleName = (name: string | undefined): string[] => name ? [htmlDecode(name)] : []
    const sumFunds = (amounts: string[]|undefined) => (amounts || []).map(amount => Number(amount)).filter(amount => amount).reduce((sum, amount) => sum + amount, 0)

    return {
        slug: project.slug,
        summary: {
            title: htmlDecode(project.title.rendered),
            created: new Date(project.date),
            modified: new Date(project.modified),
            isCityWide: project.city_wide_initiative,
            isChallengingCoreBusiness: project.challenging_the_core_business
        },

        challengeCategories: taxonomyNames(project.challenge_category),
        challenges: singleName(project.challenge?.post_title),
        expectedImpacts: taxonomyNames(project.expected_impact),
        globalGoals: taxonomyNames(project.global_goal),
        impactGoals: names(project.impact_goals, g => g.impact_goal),
        innovationPotentials: taxonomyNames(project.innovation_potential),
        organisations: taxonomyNames(project.organisation),
        participants: taxonomyNames(project.participants),
        partners: taxonomyNames(project.partner),
        // platforms: taxonomyNames(project.platforms),
        // residentInvolvments: names(project.resident_involvement, ri => ri.description),
        sectors: taxonomyNames(project.sector),
        status: names(project.status, s => s.name),
        technologies: taxonomyNames(project.technology),

        fundsGranted: sumFunds(project.funds_granted?.map(g => g.amount)),
        fundsUsed: sumFunds(project.funds_used?.map(g => g.amount))
    }
}
