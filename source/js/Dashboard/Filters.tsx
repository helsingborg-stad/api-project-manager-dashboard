import { Autocomplete, Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import DashboardContext from "./model/DashboardContext";
import { DashboardProject } from "./model/types";

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

    const select = (label: string, value: string, values: string[], getTaxonomy: (p: DashboardProject) => string[], setValue: (value: string) => unknown) => {
        const projectCountByOptionValue = graph.lookupBy(getTaxonomy)
        const options = values.map(v => ({
            label: `${v} (${(projectCountByOptionValue[v] || []).length})`,
            value: v
        }))
        const option = value ? {label: value, value} : {label: '', value: ''}
        return (
            <Grid item xs={1}>
                <Autocomplete
                    value={option}
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    onChange={(event, newValue) => setValue(newValue?.value || '')}
                    renderInput={(params) => <FilterTextField 
                        {...params}
                        label={`${label} (${values?.length || 0})`}
                        variant="outlined"
                        />}
                    />
            </Grid>)
        }

    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1">FILTRERA</Typography>
                <Box sx={{ flex: 1 }} />
                <Button variant="text" onClick={() => resetFilter()}>RENSA FILTER</Button>
            </Box>
            <Grid container columns={{ xs: 1, sm: 3 }} direction="row" columnSpacing={{ xs: '1rem' }}>
                {select(
                    'Organisation',
                    filters.organisations,
                    graph.organisations, 
                    p => p.organisations,
                    v => applyFilter({organisations: v}))}
                {select(
                    'Status på initiativ',
                    filters.status,
                    graph.status,
                    p => p.status,
                    v => applyFilter({status: v}))}
                {select(
                    'Teknologier',
                    filters.technologies,
                    graph.technologies,
                    p => p.technologies,
                    v => applyFilter({technologies: v}))}
            </Grid>
        </Fragment>)
}