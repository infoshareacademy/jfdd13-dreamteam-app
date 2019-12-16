import React, {Fragment} from 'react'
import {Grid, Button, Header, Image, Modal} from "semantic-ui-react";

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

export class PopModal extends React.Component {

    state = {
        selectedTrip: []
    }
    render() {
        const { selectedTrip } = this.state

        return (
            <Modal
                dimmer={"blurring"}
                open={this.state.selectedTrip != null}
                onClose={() => {
                    this.setState({
                        selectedTrip: null
                    })
                }}
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
                            <ul style={{padding: "0 0 0 1.5rem"}}>
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
        )

    }
}