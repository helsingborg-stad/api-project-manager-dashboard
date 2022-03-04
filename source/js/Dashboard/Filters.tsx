import { Autocomplete, Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import DashboardContext from "./model/DashboardContext";
import { DashboardDataPropertyName, DashboardProject } from "./model/types";

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

    const select = (label: string, property: DashboardDataPropertyName) => {
        const graphWithoutThisFilterSet = graph.derive({[property]: ''})
        const value = filters[property]
        const projectsByValue = graphWithoutThisFilterSet.lookupBy(p => p[property])
        const options = graphWithoutThisFilterSet[property].map(value => ({
            value,
            label: `${value} (${projectsByValue[value].length})`
        }))

        return (
            <Grid item xs={1}>
                <Autocomplete
                    isOptionEqualToValue={(o, v) => o.value === v.value}
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    onChange={(event, newValue) => applyFilter({[property]: newValue?.value || ''})}
                    renderInput={(params) => <FilterTextField 
                        {...params}
                        label={`${label}`}
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
                {select('Organisation', 'organisations')}
                {select('Status på initiativ', 'status')}
                {select('Teknologier', 'technologies')}
            </Grid>
        </Fragment>)
}