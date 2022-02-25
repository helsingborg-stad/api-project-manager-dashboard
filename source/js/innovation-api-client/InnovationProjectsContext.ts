import { createContext, useCallback, useMemo, useReducer, useState } from "react";
import { InnovationProjectRepository } from "./InnovationProjectRepository";
import { InnovationProject, Taxonomy } from "./types";

interface InnovationProjectAxisNames {
    challengeCategories: 'placeholder name for axis in data and filters';
    technologies: 'placeholder name for axis in data and filters',
    sectors: 'placeholder name for axis in data and filters',
    organisations: 'placeholder name for axis in data and filters',
    globalGoals: 'placeholder name for axis in data and filters',
    partners: 'placeholder name for axis in data and filters',
    impactGoals: 'placeholder name for axis in data and filters',
    residentInvolvments: 'placeholder name for axis in data and filters',
    challenges: 'placeholder name for axis in data and filters',
    platforms: 'placeholder name for axis in data and filters'
}

export type InnovationProjectsFilters = {
    [Property in keyof InnovationProjectAxisNames]?: string;
}


export type InnovationProjectsDimensions = {
    [Property in keyof InnovationProjectAxisNames]?: string[];
} & {
    projects: InnovationProject[],
    lookupBy: (getKeys: (project: InnovationProject) => string[]) => Record<string, InnovationProject[]>
}

export interface InnovationProjectContextType {
    error: Error|null,
    projects: InnovationProject[],
    filters: InnovationProjectsFilters,
    dimensions: InnovationProjectsDimensions,
    requestLoadProjects: () => void,
    applyFilter: (filter: Partial<InnovationProjectsFilters>) => void,
    resetFilter: () => void
}

const InnovationProjectsContext = createContext<InnovationProjectContextType>({
    error: null,
    projects: [],
    filters: {},
    dimensions: createDimensions([], {}),
    requestLoadProjects: () => undefined,
    applyFilter: () => undefined,
    resetFilter: () => undefined
})

export default InnovationProjectsContext

interface InnovationProjectsReducerState {
    error: Error | null,
    projects: InnovationProject[],
    filters: InnovationProjectsFilters,
    dimensions: InnovationProjectsDimensions
}
type InnovationProjectsReducerAction = (state: InnovationProjectsReducerState) => InnovationProjectsReducerState

const innovationProjectsReducer = (state: InnovationProjectsReducerState, mutate: InnovationProjectsReducerAction): InnovationProjectsReducerState => mutate(state)


function getTaxonomyNames (projects: InnovationProject[], getTaxonomy: (p: InnovationProject) => Taxonomy[]): string[] {
    const s = new Set<string>() 
    projects.forEach(p => getTaxonomy(p).forEach(t => s.add(t.name))) 
    let names = Array.from(s.values())
    names.sort()
    return names
}

function createDimensions (projects: InnovationProject[], filters: InnovationProjectsFilters) {
    const matchTaxonomy = (value: string|undefined, taxonomies: Taxonomy[]|undefined) => !value || taxonomies?.some(t => t.name === value)
    const filterProjects = (projects: InnovationProject[]) => projects.filter(p => 
        matchTaxonomy(filters.challengeCategories, p.challenge_category)
        && matchTaxonomy(filters.globalGoals, p.global_goal)
        && matchTaxonomy(filters.organisations, p.organisation)
        && matchTaxonomy(filters.partners, p.partner)
        && matchTaxonomy(filters.sectors, p.sector)
        && matchTaxonomy(filters.technologies, p.technology)
    )
    const createFilteredDimensions = (projects: InnovationProject[]) => {
        const lookupBy = (getKeys: (project: InnovationProject) => string[]): Record<string, InnovationProject[]> => 
            projects
                .map(project => ({project, keys: getKeys(project).filter(v => v)}))
                .reduce((memo, {project, keys}) => {
                    keys?.forEach(key => {
                        if (!Array.isArray(memo[key])) {
                            memo[key] = []
                        }
                        memo[key].push(project)
                    })
                    return memo
                }, {} as Record<string, InnovationProject[]>)

        let dimensions: InnovationProjectsDimensions = {
            lookupBy,
            projects,
            challengeCategories: getTaxonomyNames(projects, p => p.challenge_category || []),
            globalGoals: getTaxonomyNames(projects, p => p.global_goal || []),
            organisations: getTaxonomyNames(projects, p => p.organisation || []),
            partners: getTaxonomyNames(projects, p => p.partner || []),
            sectors: getTaxonomyNames(projects, p => p.sector || []),
            technologies: getTaxonomyNames(projects, p => p.technology || [])
        }
        return dimensions
    }
    return createFilteredDimensions(filterProjects(projects))
}

function createActions (dispatch: (mutator: InnovationProjectsReducerAction) => void) {
    const patch = (patch: InnovationProjectsReducerAction) => dispatch(patch)

    const calculateDimensions = (state: InnovationProjectsReducerState): InnovationProjectsReducerState => {
        return {
            ...state,
            dimensions: createDimensions(state.projects, state.filters)
        }
    }
    const reset = (projects: InnovationProject[], error: Error|null) => patch(state => calculateDimensions({
        ...state,
        error,
        projects
    }))
    const applyFilter = (f: Partial<InnovationProjectsFilters>) => patch(state => calculateDimensions({
        ...state,
        filters: {...state.filters, ...f}
    }))
    const resetFilter = () => patch(state => calculateDimensions({
        ...state,
        filters: {}
    }))

    return {
        reset,
        applyFilter,
        resetFilter
    }
}

export function useInnovationProjects (repository: InnovationProjectRepository): InnovationProjectContextType {
    const [{projects, error, filters, dimensions}, dispatch] = useReducer(innovationProjectsReducer, {error: null, projects: [], filters: {}, dimensions: createDimensions([], {})})
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
        dimensions,
        requestLoadProjects,
        applyFilter: (f) => actions.applyFilter(f),
        resetFilter: () => actions.resetFilter()
    }
}

