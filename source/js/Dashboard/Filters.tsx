import { Autocomplete, Box, Button, Chip, Grid, styled, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import DashboardContext from "./model/DashboardContext";
import { DashboardDataPropertyName } from "./model/types";

const FilterTextField = styled(TextField)(() => ({
    '& fieldset': {
      borderRadius: '2em',
    },
  }))

export default function Filters () {
    type Option = {
        label: string,
        value: string
    }

    const {
        graph,
        filters,
        applyFilter,
        resetFilter
    } = useContext(DashboardContext)

    const select = (label: string, property: DashboardDataPropertyName) => {
        const graphWithoutThisFilterSet = graph.derive({[property]: []})
        const projectsByValue = graphWithoutThisFilterSet.lookupBy(p => p[property])
        const options: Option[] = graphWithoutThisFilterSet[property].map(value => ({
            value,
            label: `${value} (${projectsByValue[value].length})`
        }))
        const selectedOptions = options
            .filter(o => filters[property]?.includes(o.value))
        return (
            <Grid item xs={1}>
                <Autocomplete
                    multiple
                    isOptionEqualToValue={(o, v) => o.value === v.value}
                    value={selectedOptions}
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    onChange={(event, newValue) => applyFilter({[property]: newValue.map(v => v.value)})}
                    renderInput={(params) => <FilterTextField 
                        {...params}
                        label={`${label}`}
                        variant="outlined"
                    />}
                    renderTags={(value: Option[], getTagProps: (_: any) => any) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                        ))
                        }
                    />
            </Grid>)
    }

    return (
        <>
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
        </>)
}