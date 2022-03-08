import { createContext } from "react";

export interface DashboardConfigContextType {
    apiEndpoint: string,
    contentEndpoint: string
 }
const DashboardConfigContext = createContext<DashboardConfigContextType>({
    apiEndpoint: 'https://www.example.com',
    contentEndpoint: 'https://www.example.com'
})

export default DashboardConfigContext