import React, {useState, useEffect} from 'react';
import {Grid, Image, Header, Pagination as PaginationUI, Modal, Button} from 'semantic-ui-react';
import {data as trips} from '../data'
import Posts from './Posts'
import Pagination from './Pagination'

const TripContainer = () => {
    const [open, setOpen] = useState(false);
    const [favourites, setFavourites] = useState(false);
    const show = () => setOpen(true);
    const close = () => setOpen(false);
    const [currentPage, setPage] = useState(1);
    const [tripsPerPage, setTripsPerPage] = useState(6);
    const paginate = (pageNumber) => setPage(pageNumber);
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
    const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

    return (
        <div>
            <Grid container
                  style={{flex: 1, justifyContent: 'center', flexDirection: 'column', margin: 'auto !important'}}>
                <Grid.Row columns={1} style={{flex: 0}}>
                    <Grid.Column>
                        <Header>Tutaj znajdziesz wszystkie nasze fantastyczne wycieczki</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3} style={{flex: 1}}>
                  <Posts allTrips={currentTrips}/>
                  <Pagination tripsPerPage={tripsPerPage} totalTrips={trips.length} paginate={paginate}/>
                </Grid.Row>
            </Grid>

        </div>
    );
}

export default TripContainer;