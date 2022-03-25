import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Autocomplete, Box, Button, Chip, Grid, styled, TextField } from "@mui/material";
import { useContext, useState } from "react";
import DashboardContext from "./model/DashboardContext";
import { DashboardDataPropertyName } from "./model/types";

// what we need to know for displaying a filter/select on screeen
type FilterInfo = {
    label: string, 
    property: DashboardDataPropertyName,
    important?: boolean
}
// utility for creating info
const makeFilterInfo = (label: string, property: DashboardDataPropertyName, important?: boolean): FilterInfo => ({label, property, important}) 

// actual list of filters/selects shown on page
const configuredFilters: FilterInfo[] = [
    makeFilterInfo('Organisation', 'organisations', true),
    makeFilterInfo('Status på initiativ', 'status', true),
    makeFilterInfo('Teknologier', 'technologies', true),
    makeFilterInfo('Verksamhetsområde', 'operationDomains'),
    makeFilterInfo('Verksamhet', 'operations'),
    makeFilterInfo('Kategori', 'sectors'),
    // makeFilterInfo('Utmaningar', 'challenges'),
    // makeFilterInfo('Innovationshöjd', 'innovationPotentials'),
    // makeFilterInfo('Globala mål', 'globalGoals'),
    // makeFilterInfo('Effekt', 'impactGoals')
] 

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
    const [expanded, setExpanded] = useState(false)
    const toggleExpanded = () => setExpanded(!expanded)

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
            <Grid item xs={1} key={property}>
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

    const header = () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="text" onClick={toggleExpanded}>
                {expanded ? <ExpandLess /> : <ExpandMore />}
                {expanded ? 'VISA FÄRRE FILTER' : 'VISA FLER FILTER'}
            </Button>
            
            <Box sx={{ flex: 1 }} />
            <Button variant="text" onClick={() => resetFilter()}>RENSA FILTER</Button>
        </Box>)


    return (
        <>
            {header()}
            <Grid container columns={{ xs: 1, sm: 3 }} direction="row" columnSpacing={{ xs: '1rem' }} rowSpacing={{ xs: '1rem' }}>
                {configuredFilters.filter(({important}) => important).map(({label, property}) => select(label, property))}
                {expanded && configuredFilters.filter(({important}) => !important).map(({label, property}) => select(label, property))}
            </Grid>
        </>)
}