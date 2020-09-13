import React, {Fragment} from 'react'
import {Button, Header, Image, Modal} from "semantic-ui-react";

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

const TripModal = ({selectedTrip, setSelectedTrip}) => {
    if (selectedTrip != null) {
        const {title, city, continent, date, price, description, tripImageUrl} = selectedTrip
        return (
            <Modal
                dimmer={'blurring'}
                open={selectedTrip !== null}
                onClose={() => setSelectedTrip(null)}
            >
                {<Fragment>
                    <Modal.Header>{title}</Modal.Header>
                    <Modal.Content image>
                        <Image
                            wrapped
                            size={'large'}
                            src={tripImageUrl || defaultImg}
                        />
                        <Modal.Description>
                            <Header>{city}</Header>
                            <ul>
                                <li>{continent}</li>
                                <li>Cena za dobę za osobę: {price} PLN</li>
                                <li>Data wyjazdu: {date}</li>
                                <li>Opis: {description}</li>
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
        );
    }
    return null
}

export default TripModal