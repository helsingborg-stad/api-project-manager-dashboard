import { Box } from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import InnovationProjectsContext from "../innovation-api-client/InnovationProjectsContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { InnovationProject } from "../innovation-api-client/types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts(): JSX.Element {
    const {dimensions} = useContext(InnovationProjectsContext)

    const createDataSet = useCallback((label: string, getKeys: (project: InnovationProject) => string[]) => {
        const lookup = dimensions.lookupBy(getKeys)
        return {
            labels: Object.keys(lookup),
            datasets: [{
                label,
                data: Object.values(lookup).map(l => l.length),
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
                }],
        }
    }, [dimensions])

    const organisation = useMemo(() => createDataSet('Organisationer', p => p.organisation?.map(t => t.name) || []), [createDataSet])
    const technology = useMemo(() => createDataSet('Teknologier', p => p.technology?.map(t => t.name) || []), [createDataSet])
    const sector = useMemo(() => createDataSet('Sektor', p => p.sector?.map(t => t.name) || []), [createDataSet])

    const doughnut = (data: ChartData<"doughnut", number[], string>) => 
        <Box sx={{ 
            height: '150px',
            flex: '0 0 auto'
         }}>
            <Doughnut data={data}/>
        </Box>
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {doughnut(organisation)}
            {doughnut(technology)}
            {doughnut(sector)}
        </Box>)
}