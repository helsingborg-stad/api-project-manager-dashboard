import { Fragment, useLayoutEffect, useState } from "react";
import { createInnovationProjectRepository } from "../innovation-api-client/InnovationProjectRepository";
import DashboardContext, { useDashboard } from "./DashboardContext";
import Charts from "./Charts";
import Filters from "./Filters";
import ProjectList from "./ProjectList";
import { Card, CardContent, LinearProgress, Typography } from "@mui/material";


export interface DashboardPropsType {
    endpoint: string
}
export default function Dashboard ({endpoint}: DashboardPropsType): JSX.Element {
    const [repository] = useState(createInnovationProjectRepository(endpoint))
    const provider = useDashboard(repository)
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        provider
            .requestLoadProjects()
            .then(() => setLoading(false))
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
        <Fragment>
            <Filters key="filters"/>
            <ProjectList key="projectList"/>
            <Charts key="charts"/>
        </Fragment>)
    
    return (
        <DashboardContext.Provider value={provider}>
            {loading ? loadingScreen() : dashboardScreen()}
        </DashboardContext.Provider>)
}