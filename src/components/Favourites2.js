import React, { Component } from "react";
import {
    Grid,
    Input,
    Dropdown,
    Form,
    Image,
    Icon,
    Modal,
    Header,
    Button
} from 'semantic-ui-react'
import { fetchTrips, fetchFromFavorites } from "../services/TripService";
import firebase from "../firebase";

class Favourites2 extends Component {

    state = {
        results: [],
        favourites: [],
        selectedTrip: null,
    };

    async componentDidMount() {
        const fav = await fetchFromFavorites()
        const allTrips = await fetchTrips();
        this.setState({
            results: allTrips.filter((t) => fav.indexOf(t.id) !== -1)
        })
    }

    handleFavIcon(tripId) {
        const { favourites: prevfavourites } = this.state
        if (prevfavourites.includes(tripId)) {
            const nextFavourites = prevfavourites.filter(id => id !== tripId);
            this.setState({
                favourites: nextFavourites
            }, async () => {
                const userId = await firebase.auth().currentUser.uid
                console.log(userId)
                await firebase.database().ref(`/favorites/${userId}`).set(
                    nextFavourites
                )
                localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
                console.log(this.state.favourites)
            })
        } else {
            const nextFavourites = [...prevfavourites, tripId];
            this.setState({
                favourites: nextFavourites
            }, async () => {
                // localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
                const userId = await firebase.auth().currentUser.uid
                console.log(userId)
                await firebase.database().ref(`/favorites/${userId}`).set(
                    nextFavourites
                )
            })
        }
    }

    render() {
        return (
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
                    {trips.map(trip => (
                        <div key={trip.id} className={'tripContainer'}>
                            <Grid.Column
                                style={{ padding: '0 2rem' }}
                                onClick={() => {
                                    this.setState({
                                        selectedTrip: trip
                                    })
                                }}>
                                <div style={{ position: 'relative' }}>
                                    <Image
                                        className="TripImage"
                                        // onClick={() => rangeValue(trip.id)}
                                        src={trip.tripImageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s'}
                                        label={{
                                            ribbon: true,
                                            color: "blue",
                                            content: `${trip.city}`
                                        }}
                                        centered={true}
                                    >
                                    </Image>
                                    <Icon
                                        className={'iconFavourites'}
                                        size={'large'}
                                        inverted
                                        // name={this.state.favourites.includes(trip.id) ? 'heart' : 'heart outline'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            this.handleFavIcon(trip.id)
                                        }} />
                                </div>
                                <p>{trip.title}</p>
                            </Grid.Column>
                            <Modal dimmer={"blurring"} open={open} onClose={close}>
                                <Modal.Header>{trip.title}</Modal.Header>
                                <Modal.Content image>
                                    <Image
                                        wrapped
                                        size="large"
                                        src={trip.tripImageUrl}
                                    />
                                    <Modal.Description>
                                        <Header>{trip.city}</Header>
                                        <ul style={{ padding: "0 0 0 1.5rem" }}>
                                            <li>{trip.continent}</li>
                                            <li>Cena za dobę za osobę: {trip.price} PLN</li>
                                            <li>Data wyjazdu: {trip.date}</li>
                                            <li>Opis: {trip.description}</li>
                                        </ul>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={close}>
                                        Wyjdź
                      </Button>
                                </Modal.Actions>
                            </Modal>

                        </div>
                    ))}
                </Grid.Row>
            </Grid>
        )
    }
}

export default Favourites2;
