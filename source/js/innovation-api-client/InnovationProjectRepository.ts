import { RootObject } from "./types";

export type WPProject = RootObject
export interface InnovationProjectRepository {
    loadInnovationProjects: () => Promise<WPProject[]>
}

const uniq = <T>(getKey: (item: T) => string) => {
    let s = new Set<string>()
    return (item: T) => {
        const key = getKey(item)
        if (s.has(key)) {
            return false
        }
        s.add(key)
        return true
    }
}
 
export function createInnovationProjectRepository (endpoint: string): InnovationProjectRepository {
    const throwOnResponseError = (response: Response) => {
        if (response.ok) {
            return response
        }
        throw new Error(`Fetching data from ${endpoint} failed with HTTP status ${response.status} ${response.statusText}`)
    }
    const makePagedEndpoint = (offset: number) => {
        const url = new URL(endpoint)
        url.searchParams.set('offset', offset.toString())
        url.searchParams.set('per_page', '100')
        return url.toString()
    }
    return {
        loadInnovationProjects: async () => {
            let projects: WPProject[] = []
            let more = true
            while (more) {
                const url = makePagedEndpoint(projects.length)
                console.log(url)
                const page = await fetch(url, {method: "GET"})
                    .then(throwOnResponseError)
                    .then(response => response.json())
                more = page.length > 0
                projects = projects.concat(page)
            }
            return projects.filter(uniq(p => p.slug))
        }
    }
}