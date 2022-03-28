import { useContext, useLayoutEffect, useState } from "react";
import { createInnovationProjectRepository } from "../innovation-api-client/InnovationProjectRepository";
import DashboardContext, { useDashboard } from "./model/DashboardContext";
import Charts from "./Charts";
import Filters from "./Filters";
import ProjectList from "./ProjectList";
import { Alert, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import DashboardConfigContext from "./DashboardConfigContext";


export default function Dashboard (): JSX.Element {
    const {apiEndpoint} = useContext(DashboardConfigContext)
    const [repository] = useState(createInnovationProjectRepository(apiEndpoint))
        const provider = useDashboard(repository)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error|null>(null)

    useLayoutEffect(() => {
        provider
            .requestLoadProjects()
            .then(() => setLoading(false))
            .catch(e => setError(e))
    }, [])

    const loadingScreen = () => (
        <Card key="loadingScreen">
            <CardContent>
                <Typography variant="h5" component="div">
                    Laddar data...
                </Typography>
                <LinearProgress />
            </CardContent>
        </Card>)

    const dashboardScreen = () => (
        <>
            <Filters key="filters"/>
            <ProjectList key="projectList"/>
            <Charts key="charts"/>
        </>)

    const errorScreen = () => (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Något gick fel när data skulle laddas. Vänligen försök igen senare.</Alert>
        </Stack>
    )
    
    return (
        <DashboardContext.Provider value={provider}>
            {error ? errorScreen() : loading ? loadingScreen() : dashboardScreen()}
        </DashboardContext.Provider>)
}