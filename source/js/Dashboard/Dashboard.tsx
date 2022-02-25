import { Box } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { createInnovationProjectRepository } from "../innovation-api-client/InnovationProjectRepository";
import InnovationProjectsContext, { useInnovationProjects } from "../innovation-api-client/InnovationProjectsContext";
import Charts from "./Charts";
import Filters from "./Filters";


export interface DashboardPropsType {
    endpoint: string
}
export default function Dashboard ({endpoint}: DashboardPropsType): JSX.Element {
    const [repository] = useState(createInnovationProjectRepository(endpoint))
    const provider = useInnovationProjects(repository)

    useLayoutEffect(() => provider.requestLoadProjects())

    return <InnovationProjectsContext.Provider value={provider}>
        <Filters />
        <Charts />
    </InnovationProjectsContext.Provider>
}