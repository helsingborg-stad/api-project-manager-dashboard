import { WPProject } from "../../innovation-api-client/InnovationProjectRepository"
import { createEmptyFilters } from "./filters"
import { createGraph } from "./graph"
import { mapInnovationProjectToDashboardProject } from "./mappers"
import { DashboardReducerAction, DashboardReducerState } from "./reducer"
import { DashboardFilter } from "./types"

export function createActions (dispatch: (mutator: DashboardReducerAction) => void) {
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
