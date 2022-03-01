import { Autocomplete, Box, FormControl, Grid, Link, styled, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import DashboardContext from "./DashboardContext";

const FilterContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-around'
    },
  }))

const FilterItem = styled(FormControl)(({ theme }) => ({
[theme.breakpoints.up('md')]: {
    flex: 1,
    padding: '1em'
},
}))

const FilterTextField = styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '2em',
    },
  }))

export default function Filters () {
    const {
        graph,
        filters,
        applyFilter,
        resetFilter
    } = useContext(DashboardContext)

    const select = (label: string, value: string, values: string[], setValue: (value: string) => unknown) => (
        <Grid item xs={1}>
            <Autocomplete
                value={value || ''}
                disablePortal
                id="combo-box-demo"
                options={values||[]}
                onChange={(event, newValue) => setValue(newValue || '')}
                renderInput={(params) => <FilterTextField 
                    {...params}
                    label={`${label} (${values?.length || 0})`}
                    variant="outlined"
                    />}
                />
        </Grid>)

    return (
        <Grid container columns={{ xs: 1, sm: 3 }} direction="row" columnSpacing={{ xs: '1em' }}>
            {select(
                'Organisation',
                filters.organisations,
                graph.organisations, 
                v => applyFilter({organisations: v}))}
            {select(
                'Status på initiativ',
                filters.status,
                graph.status,
                v => applyFilter({status: v}))}
            {select(
                'Teknologier',
                filters.technologies,
                graph.technologies,
                v => applyFilter({technologies: v}))}

            {select(
                'Innovationshöjd',
                filters.innovationPotentials,
                graph.innovationPotentials,
                v => applyFilter({innovationPotentials: v}))}
            {select(
                'Förväntad effekt',
                filters.expectedImpacts,
                graph.expectedImpacts,
                v => applyFilter({expectedImpacts: v}))}

        </Grid>)
    return <FilterContainer>
        <FilterItem>
            {select(
                'Organisation',
                filters.organisations,
                graph.organisations, 
                v => applyFilter({organisations: v}))}
        </FilterItem>
        <FilterItem>
            {select(
                'Status på initiativ',
                filters.status,
                graph.status,
                v => applyFilter({status: v}))}
        </FilterItem>
        <FilterItem>
            {select(
                'Teknologier',
                filters.technologies,
                graph.technologies,
                v => applyFilter({technologies: v}))}
        </FilterItem>
    </FilterContainer>
/*
    return (
        <Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Filtrera</Typography>
                <Typography>
                    <Link component="button" onClick={() => resetFilter()}>
                        Rensa alla filter
                    </Link>
                </Typography>
            </Box>
    
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {select('Organisation', filters.organisations, dimensions.organisations, v => applyFilter({organisations: v}))}
                {select('Teknologi', filters.technologies, dimensions.technologies, v => applyFilter({technologies: v}))}
                {select('Sektor', filters.sectors, dimensions.sectors, v => applyFilter({sectors: v}))}
            </Box>
            <Box sx={{ display: 'flex' }}>
                {select('Partner', filters.partners, dimensions.partners, v => applyFilter({partners: v}))}
                {select('Globala mål', filters.globalGoals, dimensions.globalGoals, v => applyFilter({globalGoals: v}))}
                {select('Utmaning', filters.challengeCategories, dimensions.challengeCategories, v => applyFilter({challengeCategories: v}))}
            </Box>
            <Box sx={{ display: 'flex' }}>
                {select('Platform', filters.platforms, dimensions.platforms, v => applyFilter({platforms: v}))}
                {select('Engagemang', filters.residentInvolvments, dimensions.residentInvolvments, v => applyFilter({residentInvolvments: v}))}
                {select('Påverkansmål', filters.impactGoals, dimensions.impactGoals, v => applyFilter({impactGoals: v}))}
            </Box>
        </Fragment>)
*/
}