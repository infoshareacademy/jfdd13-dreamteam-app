import React, {Fragment, useState} from 'react'
import {Grid, Image, Modal, Header, Button} from "semantic-ui-react";
                            
const Posts = ({allTrips}) => {
    const [openId, setOpenId] = useState(null);
    const show = (openId) => setOpenId(openId);
    const [favourites, setFavourites] = useState([]);
    const close = () => setOpenId(null);
    const trip = allTrips.find(trip => trip.id === openId);
    console.log(favourites)

    return <Fragment>
        {allTrips.map(trip => (
            <div>
                <Grid.Column key={trip.id} style={{padding: '0 2rem'}}>
                    <Image
                        className="TripImage"
                        onClick={() => show(trip.id)}
                        src={trip.img}
                        label={{
                            ribbon: true,
                            color: "blue",
                            content: `${trip.city}`
                        }}
                        centered={true}
                    />
                    <p>{trip.title}</p>
                </Grid.Column>
            </div>
        ))}
        <Modal dimmer={"blurring"} open={openId != null} onClose={close}>
            {trip != null && <Fragment>
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
                        icon={`heart ${favourites.includes(trip.id) ? "" : "outline"}`}
                        labelPosition="right"
                        content={`${favourites.includes(trip.id) ? "Ulubione" : "Dodaj do ulubionych"}`}
                        onClick={() => {
                            if(favourites.includes(trip.id)){
                               setFavourites(favourites.filter(id => id !== trip.id))
                            } else {
                                setFavourites([...favourites, trip.id]);
                            };
                        }}
                    />
                </Modal.Actions>
            </Fragment>}
        </Modal>
    </Fragment>;
};
export default Posts