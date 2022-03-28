import { DashboardGraph, DashboardProject } from "../model/types";
import { mapGraphData } from "./chart-utils";

export function mapRadarData (
    label: string,
    graph: DashboardGraph,
    getKeys: (project: DashboardProject) => string[]) {
    const {keys, values} = mapGraphData(graph, getKeys)

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scale: {
        ticks: {
          beginAtZero: true,
          callback: (value: number) => `${value}           `,
          min: -0.001,
          max: 100
        }
      },
      plugins: {
        legend: {
          position: 'right' as const,
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
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    return {data, options}
}
