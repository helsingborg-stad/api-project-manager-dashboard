import { Box } from "@mui/material";
import { Fragment, useCallback, useContext, useMemo } from "react";
import InnovationProjectsContext, { InnovationProjectsDimensions } from "../innovation-api-client/InnovationProjectsContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { InnovationProject, Taxonomy } from "../innovation-api-client/types";
import { mapDoughnutData } from "./charts/chart-data-adapter";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts(): JSX.Element {
    const {dimensions} = useContext(InnovationProjectsContext)

    const createDoughnutData = useCallback((label, getTaxonomy) => mapDoughnutData(label, dimensions, getTaxonomy), [dimensions])

    const doughnutChart = (label: string, getTaxonomy: (project: InnovationProject) => Taxonomy[] | undefined) => (
        <Box sx={{ 
            height: '150px',
            flex: '0 0 auto'
         }}>
            <Doughnut {...createDoughnutData(label, getTaxonomy)}/>
        </Box>)

    return (
        <Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {doughnutChart('Organisation', p => p.organisation)}
                {doughnutChart('Teknologi', p => p.technology)}
                {doughnutChart('Sektor', p => p.sector)}
            </Box>
        </Fragment>)
}
