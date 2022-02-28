import { Autocomplete, Box, FormControl, Link, TextField, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import DashboardContext from "./DashboardContext";

export default function Filters () {
    const {
        graph: dimensions,
        filters,
        applyFilter,
        resetFilter
    } = useContext(DashboardContext)

    const select = (label: string, value: string|undefined, values: string[]|undefined, setValue: (value: string) => unknown) => (
        <FormControl fullWidth sx={{ margin: '0.5em' }}>
            <Autocomplete
                value={value || ''}
                disablePortal
                id="combo-box-demo"
                options={values||[]}
                renderInput={(params) => <TextField {...params} label={`${label} (${values?.length || 0})`} />}
                onChange={(event, newValue) => setValue(newValue || '')}
                />
            </FormControl>)

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
}