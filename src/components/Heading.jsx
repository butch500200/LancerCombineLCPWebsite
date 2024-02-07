import React from 'react';
import { Grid, Typography } from '@mui/material';

function Heading(props) {
  return (
    <Grid
      item
      xs={7}
      justifyContent="center"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="h2">
        {' '}
        Combine LCP Files
      </Typography>
    </Grid>
  );
}

export default Heading;
