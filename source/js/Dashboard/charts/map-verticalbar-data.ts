import { DashboardGraph, DashboardProject } from "../model/types"
import { getBackgroundColors, mapGraphData } from "./chart-utils"

export function mapVerticalBarData (
    label: string,
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const {keys, values} = mapGraphData(graph, getKeys)
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right' as const,
            display: false
          },
          title: {
            display: false,
            text: label
          },
        }
    }
    const data = {
        labels: keys,
        datasets: [
          {
            label,
            data: values,
            backgroundColor: getBackgroundColors(),
          }
        ],
      }
    return {
        data, options
    }
}
