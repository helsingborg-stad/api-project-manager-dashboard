import { Box, Grid, styled, Typography } from "@mui/material";
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

  const CounterBox = styled(Box)({
      borderRadius: '2rem',
      borderColor: 'gray',
      borderWidth: '1px',
      borderStyle: 'solid',
      padding: '3rem',
      /*
      marginTop: 0,
      marginLeft: 0,
      marginRight: '1rem',
      marginBottom: '2rem',
      */
      textAlign: 'center'
  })
export default function Charts(): JSX.Element {
    const {graph} = useContext(DashboardContext)

    console.log(graph)

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
    
    const counter = (label: string, count: string | number) =>
        <CounterBox>
            <Typography variant="caption">{label}</Typography>
            <Typography variant="h5">{count}</Typography>
        </CounterBox>
    
    return <Grid container columns={{ xs: 1, sm: 3 }} direction="row" columnSpacing={{ xs: '1rem' }} rowSpacing={{ xs: 'rem' }}>
        <Grid item xs={3} sm={1} direction="column">
            {counter('Antal initiativ', graph.projects.length) }
            {counter('Summa beviljade medel', '(kompletteras)') }
            {counter('Summa använda medel', '(kompletteras)') }
            {counter('Antal stadsgemnsamma initiativ', '(kompletteras)') }
            {counter('Antal som utmanar kärnverksamhet', '(kompletteras)') }
        </Grid>
        <Grid item xs={3} sm={2}>
            {doughnutChart('Initiativ kopplade till utmaningar', p => p.challengeCategories)}
            {doughnutChart('Förväntad effekt', p => p.impactGoals)}
            {polarAreaChart('Innovationshöjd', p => p.partners)}
            {polarAreaChart('Kategorier', p => p.sectors)}

        </Grid>
    </Grid>

    return <Box sx={{ 
        display: 'flex' 
        }}>
        <Box sx={{ flex: 1, flexDirection: 'column' }}>
            {counter('Antal initiativ', graph.projects.length) }
            {counter('Summa beviljade medel', '(kompletteras)') }
            {counter('Summa använda medel', '(kompletteras)') }
            {counter('Antal stadsgemnsamma initiativ', '(kompletteras)') }
            {counter('Antal som utmanar kärnverksamhet', '(kompletteras)') }
        </Box>
        <Box sx={{ flex: 2, flexDirection: 'column' }}></Box>
    </Box>


    /*
    return (
        <Fragment>
            <ChartBoxContainer>
                {polarAreaChart('Organisation', p => p.organisations)}
                {polarAreaChart('Teknologi', p => p.technologies)}
                {polarAreaChart('Sektor', p => p.sectors)}
            </ChartBoxContainer>
            <ChartBoxContainer>
                {radarChart('Status', p => p.status)}
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
    */
}
