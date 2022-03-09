import { DashboardFilter } from "./types";

export const createEmptyFilters = (): DashboardFilter => ({
    challengeCategories: [],
    expectedImpacts: [],
    globalGoals: [],
    impactGoals: [],
    innovationPotentials: [],
    organisations: [],
    participants: [],
    partners: [],
    sectors: [],
    status: [],
    technologies: [],
    challenges: []
})
