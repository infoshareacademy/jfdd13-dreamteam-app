import React, { useState } from 'react';
import { Grid, Image, Header, Container, Pagination, Modal, Button } from 'semantic-ui-react';
import {data as trips} from '../data'

const imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

function TripContainer() {
  const [open, setOpen] = useState(false);
  const [favourites, setFavourites] = useState(false);
  // const trips = [imgSrc, imgSrc, imgSrc];
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  return (
      <div>
      <Grid container style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', margin:'auto !important' }}>
        <Grid.Row columns={1} style={{flex: 0}}>
          <Grid.Column>
            <Header>Tutaj znajdziesz wszystkie nasze fantastyczne wycieczki</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3} style={{ flex: 1 }}>
          {(trips).map(trip => {
            return <Grid.Column key={trip}>
              <Image onClick={show} src={trip.img} centered={true}/>
            </Grid.Column>
          })}
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
      <Modal dimmer={'blurring'} open={open} onClose={close}>
      <Modal.Header>Tytuł</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s'
        />
        <Modal.Description>
          <Header>Miasto</Header>
          <ul style={{padding: '0 0 0 1.5rem'}}>
            <li>Kontynent</li>
            <li>Cena za dobę za osobę</li>
            <li>Data wyjazdu</li>
            <li>Opis</li>

          </ul>
          <p>Możesz polubić</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>
          Wyjdź
        </Button>
        <Button
          positive
          icon={`heart ${favourites ? '' : 'outline'}`}
          labelPosition='right'
          content = {favourites ? "Ulubione" : "Dodaj do ulubionych"}
          // content="Ulubione"
          onClick={() => {setFavourites(!favourites)}}

          />

      </Modal.Actions>
    </Modal>
    </div>
  );
}

export default TripContainer;