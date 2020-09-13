import React, {Fragment} from 'react'
import {Button, Header, Image, Modal} from "semantic-ui-react";
const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

const TripModal = ({ selectedTrip, setSelectedTrip}) => (
    <Modal
        dimmer={'blurring'}
        open={selectedTrip != null}
        onClose={() => setSelectedTrip(null)}
    >
        {selectedTrip != null && <Fragment>
            <Modal.Header>{selectedTrip.title}</Modal.Header>
            <Modal.Content image>
                <Image
                    wrapped
                    size={'large'}
                    src={selectedTrip.tripImageUrl || defaultImg}
                />
                <Modal.Description>
                    {/*todo destructure following values*/}
                    <Header>{selectedTrip.city}</Header>
                    <ul>
                        <li>{selectedTrip.continent}</li>
                        <li>Cena za dobę za osobę: {selectedTrip.price} PLN</li>
                        <li>Data wyjazdu: {selectedTrip.date}</li>
                        <li>Opis: {selectedTrip.description}</li>
                    </ul>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color={'black'}
                    onClick={() => setSelectedTrip(null)}
                >
                    Wyjdź
                </Button>
                <Button
                    positive
                    labelPosition="right"
                />
            </Modal.Actions>
        </Fragment>}
    </Modal>
)

export default TripModal