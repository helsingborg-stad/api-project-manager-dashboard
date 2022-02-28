import { InnovationProjectsDimensions } from "../../innovation-api-client/InnovationProjectsContext";
import { InnovationProject, Taxonomy } from "../../innovation-api-client/types";

export function mapVerticalBarData (
    label: string,
    dimensions: InnovationProjectsDimensions,
    getTaxonomy: (project: InnovationProject) => Taxonomy[] | undefined) {
    const {keys, values} = mapDimensionData(dimensions, getTaxonomy)
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      }
    return {
        data, options
    }
}
export function mapDoughnutData (
    label: string,
    dimensions: InnovationProjectsDimensions,
    getTaxonomy: (project: InnovationProject) => Taxonomy[] | undefined) {
    const {keys, values} = mapDimensionData(dimensions, getTaxonomy)
    return {
        options: {
            responsive: true
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



function mapDimensionData (
    dimensions: InnovationProjectsDimensions,
    getTaxonomy: (project: InnovationProject) => Taxonomy[] | undefined) {
    
    const lookup = dimensions.lookupBy(project => (getTaxonomy(project) || []).map(t => t.name))
    return {
        keys: Object.keys(lookup),
        values: Object.values(lookup).map(projects => projects.length)
    }
}
