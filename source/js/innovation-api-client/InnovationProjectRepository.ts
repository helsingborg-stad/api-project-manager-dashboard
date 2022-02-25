import { InnovationProject } from "./types";

export interface InnovationProjectRepository {
    loadInnovationProjects: () => Promise<InnovationProject[]>
}

export function createInnovationProjectRepository (endpoint: string): InnovationProjectRepository {
    const throwOnResponseError = (response: Response) => {
        if (response.ok) {
            return response
        }
        throw new Error(`Fetching data from ${endpoint} failed with HTTP status ${response.status} ${response.statusText}`)
    }
    return {
        loadInnovationProjects: () => fetch(endpoint, {method: "GET"})
            .then(throwOnResponseError)
            .then(response => response.json())
    }
}