import { DashboardDataPropertyName, DashboardFilter, DashboardGraph, DashboardProject } from "./types"

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
            sectors: uniqueNames(p => p.sectors),
            status: uniqueNames(p => p.status),
            technologies: uniqueNames(p => p.technologies),
        }
        return graph
    }
    return createFilteredGraph(filterProjects(projects))
}
