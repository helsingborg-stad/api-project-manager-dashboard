import { useLayoutEffect, useState } from "react";
import { createInnovationProjectRepository } from "../innovation-api-client/InnovationProjectRepository";
import DashboardContext, { useDashboard } from "./DashboardContext";
import Charts from "./Charts";
import Filters from "./Filters";
import ProjectList from "./ProjectList";


export interface DashboardPropsType {
    endpoint: string
}
export default function Dashboard ({endpoint}: DashboardPropsType): JSX.Element {
    const [repository] = useState(createInnovationProjectRepository(endpoint))
    const provider = useDashboard(repository)

    useLayoutEffect(() => provider.requestLoadProjects())

    return <DashboardContext.Provider value={provider}>
        <Filters />
        <ProjectList />
        <Charts />
    </DashboardContext.Provider>
}