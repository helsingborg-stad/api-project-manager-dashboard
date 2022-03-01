import { Container } from '@mui/material';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (<Container>
    <Dashboard endpoint='https://beta.api.helsingborg.se/innovation/wp-json/wp/v2/project' />
  </Container>)
 }

export default App;
