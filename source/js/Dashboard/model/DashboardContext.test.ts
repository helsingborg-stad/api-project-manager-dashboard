import { createEmptyFilters } from "./filters"
import { createGraph } from "./graph"
import { DashboardFilter, DashboardProject } from "./types"

const createEmptyProject = (): DashboardProject => ({
    slug: '',
    summary: {
        title: '', created: new Date(), modified: new Date(), isCityWide: false, isChallengingCoreBusiness: false
    },
    challengeCategories: [],
    challenges: [],
    expectedImpacts: [],
    globalGoals: [],
    innovationPotentials: [],
    impactGoals: [],
    operations: [],
    organisations: [],
    participants: [],
    partners: [],
    sectors: [],
    status: [],
    technologies: [],
    
    fundsUsed: 0,
    fundsGranted: 0
})

const createFakeProject = (patch: Partial<DashboardProject>): DashboardProject => ({...createEmptyProject(), ...patch})

const createFakeFilters = (patch: Partial<DashboardFilter>): DashboardFilter => ({...createEmptyFilters(), ...patch})

const dashboardPropertyNames = Object.keys(createEmptyFilters())

describe('createGraph(<projects>, <filters>)', () => {
    test.each(dashboardPropertyNames.map(propertyName => [propertyName]))
        ('respects {%s}', propertyName => {
            const projects = [
                createFakeProject({slug: 'P1', [propertyName]: ['a', 'b', 'c']}),
                createFakeProject({slug: 'P2', [propertyName]: ['b', 'c']}),
                createFakeProject({slug: 'P3', [propertyName]: ['a', 'd']}),
                createFakeProject({slug: 'P4', [propertyName]: ['c', 'd', 'e']})
            ]
            const graph = createGraph(projects, createFakeFilters({[propertyName]: ['a']}))

            expect({...graph}[propertyName] as string[]).toEqual(['a', 'b', 'c', 'd'])
            expect(graph.projects.map(({slug}) => slug)).toEqual(['P1', 'P3'])
        })
})
