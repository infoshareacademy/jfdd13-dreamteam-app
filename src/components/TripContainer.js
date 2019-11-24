import React, { useState, useEffect } from 'react';
import {Grid, Image, Header, Pagination as PaginationUI, Modal, Button } from 'semantic-ui-react';
import {data as trips} from '../data'
import Posts from'./Posts'
import Pagination from'./Pagination'

const imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

const TripContainer = () => {
  const [open, setOpen] = useState(false);
  const [favourites, setFavourites] = useState(false);
  // const trips = [imgSrc, imgSrc, imgSrc];
  const show = () => setOpen(true);
  const close = () => setOpen(false);



  const [posts, setPosts] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);


          // setPosts(trips);
          console.log(trips);

  const paginate = (pageNumber) => setPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = trips.slice(indexOfFirstPost, indexOfLastPost);


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
            return <Grid.Column key={trip.city}>
              <Image className="TripImage" onClick={show} src={trip.img}
              label={{
              ribbon: true,
              color: 'blue',
              content: `${trip.city}`
              }}
              centered={true}
              />
              <p>{trip.title}</p>

            </Grid.Column>
          }).slice(0,6)}
        </Grid.Row>
        <Grid.Row columns={1} centered={true} style={{ minHeight: '100px' }}>
          {/*//semantic pagination*/}
          {/*<Pagination*/}
          {/*    defaultActivePage={1}*/}
          {/*    firstItem={null}*/}
          {/*    lastItem={null}*/}
          {/*    pointing*/}
          {/*    secondary*/}
          {/*    totalPages={3}*/}
          {/*/>*/}

          <Posts posts={currentPosts}/>
          <Pagination postsPerPage={postsPerPage} totalPosts={trips.length} paginate={paginate}/>

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