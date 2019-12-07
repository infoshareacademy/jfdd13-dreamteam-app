import React, {useState, useEffect} from "react";
import {Grid, Input, Dropdown, Form, Image, Icon, Modal, Header, Button} from 'semantic-ui-react'
import {fetchTrips} from "../services/TripService";

const Favourites = () => {
    const [trips, setTrips] = useState([]);
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    const [favourites, setFavourites] = useState(false);
    const close = () => setOpen(false);

    useEffect(() => {
        fetchTrips().then(trips => {
            setTrips(trips)
        })
    }, []);

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
                columns={3} style={{display: 'flex', height: '100%'}}
            >
                {trips.map(trip => (
                    <div key={trip.id} className={'tripContainer'}>
                        <Grid.Column
                            style={{padding: '0 2rem'}}
                            onClick={() => {
                                // this.setState({
                                   show(trip.id)
                                // })
                            }}>
                            <div style={{position: 'relative'}}>
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
                                    }}/>
                            </div>
                            <p>{trip.title}</p>
                        </Grid.Column>

                        <Modal dimmer={"blurring"} open={open} onClose={close}>
                            <Modal.Header>{trip.title}</Modal.Header>
                            <Modal.Content image>
                                <Image
                                    wrapped
                                    size="large"
                                    src={trip.img}
                                />
                                <Modal.Description>
                                    <Header>{trip.city}</Header>
                                    <ul style={{padding: "0 0 0 1.5rem"}}>
                                        <li>{trip.continent}</li>
                                        <li>Cena za dobę za osobę: {trip.price} PLN</li>
                                        <li>Data wyjazdu: {trip.date}</li>
                                        <li>Opis: {trip.description}</li>
                                    </ul>
                                    {/* <p>Możesz polubić</p> */}
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={close}>
                                    Wyjdź
                                </Button>
                                <Button
                                    positive
                                    icon={`heart${favourites ? "" : " outline"}`}
                                    labelPosition="right"
                                    content={favourites ? "Ulubione" : "Dodaj do ulubionych"}
                                    // content="Ulubione"
                                    onClick={() => {
                                        setFavourites(!favourites);
                                    }}
                                />
                            </Modal.Actions>
                        </Modal>

                    </div>
                ))}
            </Grid.Row>
        </Grid>

    )
}

export default Favourites;
