import { createContext, useCallback, useMemo, useReducer, useState } from "react";
import { InnovationProjectRepository } from "../../innovation-api-client/InnovationProjectRepository";
import { DashboardContextType } from "./types";
import { DashboardReducer } from "./reducer";
import { createActions } from "./actions";
import { createGraph } from "./graph";
import { createEmptyFilters } from "./filters";

const DashboardContext = createContext<DashboardContextType>({
    error: null,
    projects: [],
    filters: createEmptyFilters(),
    graph: createGraph([], createEmptyFilters()),
    requestLoadProjects: () => Promise.reject(new Error('DashboardContext is not initialized')),
    applyFilter: () => undefined,
    resetFilter: () => undefined
})

export default DashboardContext

export function useDashboard (repository: InnovationProjectRepository): DashboardContextType {
    const [{projects, error, filters, graph}, dispatch] = useReducer(DashboardReducer, {error: null, projects: [], filters: createEmptyFilters(), graph: createGraph([], createEmptyFilters())})
    const [loadPromise, setLoadPromise] = useState<Promise<void>|null>(null)    
    const actions = useMemo(() => createActions(dispatch), [])

    const requestLoadProjects = useCallback((): Promise<void> => {
        const load = loadPromise || repository
            .loadInnovationProjects()
            .then(projects => actions.reset(projects, null))
            .catch(error => {
                actions.reset([], error)
                throw error
            })
        setLoadPromise(load)
        return load
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
