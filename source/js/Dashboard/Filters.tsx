import { Autocomplete, Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import DashboardContext from "./DashboardContext";

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
            </Grid>
        </Fragment>)
}