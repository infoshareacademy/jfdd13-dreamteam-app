import React, { Component, Fragment } from "react";
import {
    Grid,
    Image,
    Icon,
    Modal,
    Header,
    Button
} from 'semantic-ui-react'
import { fetchTrips, fetchFromFavorites, toggleFavorite } from "../services/TripService";
import firebase from "../firebase";

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

class Favourites2 extends Component {
    state = {
        results: [],
        selectedTrip: null,
        favourites: {}
    };
    
    async componentDidMount() {
        const favourites = await fetchFromFavorites()
        const allTrips = await fetchTrips();
        const favouritesList = allTrips.filter((trip) => favourites[trip.id] !== undefined)
        this.setState({
            results: favouritesList,
            favourites
        })
    }
​
    async handleFavIcon(tripId) {
      await toggleFavorite(tripId);
      const favourites = await fetchFromFavorites();
      this.setState({ favourites })
    }
​
    queryOutput() {
        return (this.state.results.map(trip => (
            <div key={trip.id} className={'tripContainer'}>
                <Grid.Column style={{ padding: '0 2rem' }} onClick={() => {
                    this.setState({
                        selectedTrip: trip
                    })
                }}>
                    <div style={{ position: 'relative' }}>
                        <Image
                            className="TripImage"
                            src={trip.tripImageUrl || defaultImg}
                            label={{
                                ribbon: true,
                                color: "blue",
                                content: `${trip.city}`
                            }}
                            centered={true}
                            style={{ cursor: 'pointer' }}
                        >
                        </Image>
                        <Icon
                            className={'iconFavourites'}
                            size={'large'}
                            inverted
                            name={this.state.favourites[trip.id] ? 'heart' : 'heart outline'}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.handleFavIcon(trip.id)
                            }} />
                    </div>
                    <p>{trip.title}</p>
                </Grid.Column>
            </div>
        ))
        )
    }
​
    handleChange = (e, { name, value }) => this.setState({ [name]: value });
​
    render() {
        const { selectedTrip } = this.state
        return (
            <div className="search">
                <Grid container
                    style={
                        {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            height: '100%',
                            margin: 'auto !important'
                        }
                    }>
                    <Grid.Row
                        columns={3} style={{ display: 'flex', height: '100%' }}
                    >
                        {this.queryOutput()}
                    </Grid.Row>
                </Grid>
                <Modal
                    dimmer={"blurring"}
                    open={this.state.selectedTrip != null}
                >
                    {selectedTrip != null && <Fragment>
                        <Modal.Header>{selectedTrip.title}</Modal.Header>
                        <Modal.Content image>
                            <Image
                                wrapped
                                size="large"
                                src={selectedTrip.tripImageUrl || defaultImg}
                            />
                            <Modal.Description>
                                <Header>{selectedTrip.city}</Header>
                                <ul style={{ padding: "0 0 0 1.5rem" }}>
                                    <li>{selectedTrip.continent}</li>
                                    <li>Cena za dobę za osobę: {selectedTrip.price} PLN</li>
                                    <li>Data wyjazdu: {selectedTrip.date}</li>
                                    <li>Opis: {selectedTrip.description}</li>
                                </ul>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black"
                                onClick={() => {
                                    this.setState({
                                        selectedTrip: null
                                    })
                                }}
                            >
                                Wyjdź
                            </Button> 
                        </Modal.Actions>
                    </Fragment>}
                </Modal>
            </div>
        );
    };
}
​
export default Favourites2