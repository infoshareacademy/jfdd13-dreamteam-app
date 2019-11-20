import React from 'react';
import { Grid, Image, Header, Pagination} from 'semantic-ui-react';

const imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

function TripContainer() {
  return (
  
    <div className="TripContainer">

      <Grid padded={true}>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header>Tutaj znajdziesz wszystkie nasze fantastyczne wycieczki</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3} >
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
        <Grid.Row columns={1} centered={true}>
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
    </div> 
  );
};

export default TripContainer;