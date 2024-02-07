import React from 'react';
import { Container, Grid } from '@mui/material';
import ImportFileContainer from './components/ImportFileContainer.jsx';
import Heading from './components/Heading.jsx';

function App(props) {
  return (
    <div className="App">
      <Container>
        <Grid container justifyContent="center">
          <Heading />
          <ImportFileContainer />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
