import { DashboardGraph, DashboardProject } from "../model/types"
import { mapGraphData } from "./chart-utils"

export function mapDoughnutData (
    label: string,
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const {keys, values} = mapGraphData(graph, getKeys)
    return {
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right' as const,
            },
            title: {
              display: false,
              text: label
            },
          }
        },
        data: {
            labels: keys,
            datasets: [{
                label,
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        }
    }
}
