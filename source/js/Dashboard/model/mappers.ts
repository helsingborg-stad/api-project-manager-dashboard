import {decode as htmlDecode} from 'he'
import { WPProject } from '../../innovation-api-client/InnovationProjectRepository'
import { DashboardProject } from './types'

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
        wp: project,
        challengeCategories: taxonomyNames(project.challenge_category),
        challenges: singleName(project.challenge?.post_title),
        expectedImpacts: taxonomyNames(project.expected_impact),
        globalGoals: taxonomyNames(project.global_goal),
        impactGoals: names(project.impact_goals, g => g.impact_goal),
        innovationPotentials: taxonomyNames(project.innovation_potential),
        operations: taxonomyNames(project.operation),
        operationDomains: taxonomyNames(project.operation_domain),
        organisations: taxonomyNames(project.organisation),
        participants: taxonomyNames(project.participants),
        partners: taxonomyNames(project.partner),
        sectors: taxonomyNames(project.sector),
        status: names(project.status, s => s.name),
        technologies: taxonomyNames(project.technology),

        fundsGranted: sumFunds(project.funds_granted?.map(g => g.amount)),
        fundsUsed: sumFunds(project.funds_used?.map(g => g.amount))
    }
}
