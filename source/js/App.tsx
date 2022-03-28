import { Container } from '@mui/material';
import Dashboard from './Dashboard/Dashboard';
import DashboardConfigContext from './Dashboard/DashboardConfigContext';

export interface AppProps {
  apiEndpoint: string,
  contentEndpoint: string
}

function App({apiEndpoint, contentEndpoint}: AppProps) {
  return (
    <Container>
      <DashboardConfigContext.Provider value={{ apiEndpoint, contentEndpoint }}>
        <Dashboard/>
      </DashboardConfigContext.Provider>
    </Container>)
 }

export default App;
