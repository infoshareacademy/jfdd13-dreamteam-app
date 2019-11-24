import React, {useState} from 'react'
import {Grid, Image, Modal, Header, Button} from "semantic-ui-react";

const Posts = ({allTrips}) => {
    const [open, setOpen] = useState(false);
    const show = () => setOpen(true);
    const [favourites, setFavourites] = useState(false);
    const close = () => setOpen(false);

    return allTrips.map(trip => (
      <div>
        <Grid.Column key={trip.city}>
          <Image
            className="TripImage"
            onClick={show}
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
        <Modal dimmer={"blurring"} open={open} onClose={close}>
          <Modal.Header>Tytuł</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s"
            />
            <Modal.Description>
              <Header>Miasto</Header>
              <ul style={{ padding: "0 0 0 1.5rem" }}>
                <li>Kontynent</li>
                <li>Cena za dobę za osobę</li>
                <li>Data wyjazdu</li>
                <li>Opis</li>
              </ul>
              <p>Możesz polubić</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={close}>
              Wyjdź
            </Button>
            <Button
              positive
              icon={`heart ${favourites ? "" : "outline"}`}
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
    ));
};
export default Posts