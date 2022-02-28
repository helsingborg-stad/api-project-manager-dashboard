import { Box, styled } from "@mui/material";
import { Fragment, useCallback, useContext, useMemo } from "react";
import DashboardContext, { DashboardGraph, DashboardProject } from "./DashboardContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { InnovationProject, Taxonomy } from "../innovation-api-client/types";
import { mapDoughnutData, mapPolarData, mapRadarData, mapVerticalBarData } from "./charts/chart-data-adapter";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const ChartBoxContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-around'
    },
  }))
  const ChartBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        flex: '1 1 auto'
    },
  }))

export default function Charts(): JSX.Element {
    const {graph} = useContext(DashboardContext)

    const createDoughnutData = useCallback((label, getTaxonomy) => mapDoughnutData(label, graph, getTaxonomy), [graph])
    const createCreateVerticalbartData = useCallback((label, getTaxonomy) => mapVerticalBarData(label, graph, getTaxonomy), [graph])
    const createRadarData = useCallback((label, getTaxonomy) => mapRadarData(label, graph, getTaxonomy), [graph])
    const createPolarData = useCallback((label, getTaxonomy) => mapPolarData(label, graph, getTaxonomy), [graph])

    const doughnutChart = (label: string, getTaxonomy: (project: DashboardProject) => string[]) => (
        <ChartBox>
            <Doughnut {...createDoughnutData(label, getTaxonomy)}/>
        </ChartBox>)

    const verticalBarChart = (label: string, getTaxonomy: (project: DashboardProject) => string[]) => (
        <ChartBox>
            <Bar {...createCreateVerticalbartData(label, getTaxonomy)}/>
        </ChartBox>)
    const radarChart = (label: string, getTaxonomy: (project: DashboardProject) => string[]) => (
        <ChartBox>
            <Radar {...createRadarData(label, getTaxonomy)}/>
        </ChartBox>)
    const polarAreaChart = (label: string, getTaxonomy: (project: DashboardProject) => string[]) => (
        <ChartBox>
            <PolarArea {...createPolarData(label, getTaxonomy)}/>
        </ChartBox>)
    
    return (
        <Fragment>
            <ChartBoxContainer>
                {polarAreaChart('Organisation', p => p.organisations)}
                {polarAreaChart('Teknologi', p => p.technologies)}
                {polarAreaChart('Sektor', p => p.sectors)}
            </ChartBoxContainer>
            <ChartBoxContainer>
                {radarChart('Platform', p => p.platforms)}
                {radarChart('Teknologi', p => p.technologies)}
                {radarChart('Sektor', p => p.sectors)}
            </ChartBoxContainer>
            <ChartBoxContainer>
                {doughnutChart('Organisation', p => p.organisations)}
                {doughnutChart('Teknologi', p => p.technologies)}
                {doughnutChart('Sektor', p => p.sectors)}
            </ChartBoxContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {verticalBarChart('Globala mål', p => p.globalGoals)}
                {verticalBarChart('Partner', p => p.partners)}
                {verticalBarChart('Plattform', p => p.platforms)}
            </Box>
        </Fragment>)
}
