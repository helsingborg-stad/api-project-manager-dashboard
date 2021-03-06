import { DashboardDataPropertyName, DashboardFilter, DashboardGraph, DashboardProject } from "./types"

// const matchesFilter = (value: string|undefined, values: string[]) => !value || values.includes(value)

const matchesFilter = (selected: string[]|undefined, values: string[]) => selected ? selected.length > 0 ? selected.some(s => values.includes(s)) : true : true

const filterProjects = (projects: DashboardProject[], filters: DashboardFilter) => projects.filter(p => 
    Object
        .keys(filters)
        .map(key => key as DashboardDataPropertyName)
        .every(key => matchesFilter(filters[key], p[key])))


export function createGraph (sourceProjects: DashboardProject[], sourceFilters: DashboardFilter): DashboardGraph {
    const lookupBy = (projects: DashboardProject[], getKeys: (project: DashboardProject) => string[]): Record<string, DashboardProject[]> => 
        projects
            .map(project => ({project, keys: getKeys(project)}))
            .reduce((memo, {project, keys}) => {
                keys.forEach(key => {
                    memo[key] = [...memo[key] || [], project]
                })
                return memo
            }, {} as Record<string, DashboardProject[]>)

    const projects = filterProjects(sourceProjects, sourceFilters)

    const uniqueNames = (getNamesByProject:(project: DashboardProject) => string[]): string[] => {
        const names = new Set<string>()
        projects.forEach(project => getNamesByProject(project).forEach(name => names.add(name)))
        return Array.from(names)
    } 

    return {
        lookupBy: (getKeys: (project: DashboardProject) => string[]) => lookupBy(projects, getKeys),
        derive: (filters: Partial<DashboardFilter>) => createGraph(sourceProjects, {...sourceFilters,...filters}),
        projects: projects,
        challengeCategories: uniqueNames(p => p.challengeCategories),
        challenges: uniqueNames(p => p.challenges),
        expectedImpacts: uniqueNames(p => p.expectedImpacts),
        globalGoals: uniqueNames(p => p.globalGoals),
        innovationPotentials: uniqueNames(p => p.innovationPotentials),
        impactGoals: uniqueNames(p => p.impactGoals),
        operations: uniqueNames(p => p.operations),
        operationDomains: uniqueNames(p => p.operationDomains),
        organisations: uniqueNames(p => p.organisations),
        participants: uniqueNames(p => p.participants),
        partners: uniqueNames(p => p.partners),
        sectors: uniqueNames(p => p.sectors),
        status: uniqueNames(p => p.status),
        technologies: uniqueNames(p => p.technologies),
    }
}
