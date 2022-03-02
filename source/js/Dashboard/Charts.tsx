import { Box, Grid, styled, Typography } from "@mui/material";
import { Fragment, useCallback, useContext, useMemo } from "react";
import DashboardContext, { DashboardGraph, DashboardProject } from "./DashboardContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, CategoryScale, LinearScale, BarElement, Title, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import { mapDoughnutData, mapPolarData, mapRadarData, mapVerticalBarData } from "./charts/chart-data-adapter";
import { formatFunds } from "./formatting";

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
    
    const fundsText = (amounts: number[]) => formatFunds(amounts.reduce((sum, amount) => sum + amount, 0))
    
    return (
        <Fragment>
            <Grid container columns={{ xs: 1, sm: 3 }} direction="row" columnSpacing={{ xs: '1rem' }} rowSpacing={{ xs: 'rem' }}>
                <Grid item xs={3} sm={1}>
                    {counter('Antal initiativ', graph.projects.length) }
                    {counter('Summa beviljade medel', fundsText(graph.projects.map(p => p.fundsGranted))) }
                    {counter('Summa använda medel', fundsText(graph.projects.map(p => p.fundsUsed))) }
                    {counter('Antal stadsgemnsamma initiativ', graph.projects.filter(p => p.summary.isCityWide).length) }
                    {counter('Antal som utmanar kärnverksamhet', graph.projects.filter(p => p.summary.isChallengingCoreBusiness).length) }
                </Grid>
                <Grid item xs={3} sm={2}>
                    {doughnutChart('Initiativ kopplade till utmaningar', p => p.challenges)}
                    {doughnutChart('Förväntad effekt', p => p.expectedImpacts)}
                    {polarAreaChart('Innovationshöjd', p => p.innovationPotentials)}
                    {polarAreaChart('Kategorier', p => p.sectors)}
                </Grid>
            </Grid>
        </Fragment>)
}
