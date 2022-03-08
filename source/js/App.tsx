import { Container } from '@mui/material';
import Dashboard from './Dashboard/Dashboard';
import DashboardConfigContext from './Dashboard/DashboardConfigContext';

const getExternalConfigurationValue = (dataKey: string) => Array.from(document.querySelectorAll(`[${dataKey}]`))
  .map(element => element.getAttribute(dataKey))
  .find(value => value)

function App() {
  const apiEndpoint = getExternalConfigurationValue('data-dashboard-api-endpoint') || 'https://beta.api.helsingborg.se/innovation/wp-json/wp/v2/project'
  const contentEndpoint = getExternalConfigurationValue('data-dashboard-content-endpoint') || 'https://innovation.hbgtest.se/initiativ'

  return (
    <Container>
      <DashboardConfigContext.Provider value={{ apiEndpoint, contentEndpoint }}>
        <Dashboard/>
      </DashboardConfigContext.Provider>
    </Container>)
 }

export default App;
