import { DashboardGraph, DashboardProject } from "../model/types"

export const getBackgroundColors = () => [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ]
  
export function mapGraphData (
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const lookup = graph.lookupBy(project => (getKeys(project) || []))
    return {
        keys: Object.keys(lookup),
        values: Object.values(lookup).map(projects => projects.length)
    }
}
