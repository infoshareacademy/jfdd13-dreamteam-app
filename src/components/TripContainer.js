import React from 'react';
import { Grid, Image, Header, Container, Pagination} from 'semantic-ui-react';

const imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

function TripContainer() {
  return (
      <Grid container style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', margin:'auto !important' }}>
        <Grid.Row columns={1} style={{flex: 0}}>
          <Grid.Column>
            <Header>Tutaj znajdziesz wszystkie nasze fantastyczne wycieczki</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3} style={{ flex: 1 }}>
          <Grid.Column>
            <Image src={imgSrc} centered={true}/>
          </Grid.Column>
          <Grid.Column>
            <Image src={imgSrc} centered={true}/>
          </Grid.Column>
          <Grid.Column>
            <Image src={imgSrc} centered={true}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} centered={true} style={{ minHeight: '100px' }}>
          <Pagination
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={3}
          />
        </Grid.Row>
      </Grid>
  );
};

export default TripContainer;