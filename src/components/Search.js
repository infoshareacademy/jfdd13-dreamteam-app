import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import TripContainer from './TripContainer';

function Search() {
  return (
  
    <div className="Search">
      <h1>what R You looking for?</h1>

  <Grid>
    <Grid.Row columns={1}>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={3}>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>

    </Grid.Row>

  </Grid>



    </div> 
  );
};

export default Search;

