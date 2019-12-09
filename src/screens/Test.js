import React from 'react';
import {Grid, Header, Image} from 'semantic-ui-react';
import {data} from '../data'

const localSdata = JSON.parse(localStorage.getItem('favourites')) || [];
const dataFromLocalStorage = (localSdata) ? localSdata : console.log('Test failed');

const Test = () => {

    return (
        <div>
            {
                data.filter(item => item.id === dataFromLocalStorage.find(el => el === item.id))

                    .map(trip => (
                        <Grid.Column style={{padding: "0 2rem"}}>
                            <Image
                                className="TripImage"
                                // onClick={() => show(trip.id)}
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s'
                                label={{
                                    ribbon: true,
                                    color: "blue",
                                    content: `${trip.city}`
                                }}
                                centered={true}
                            />
                            <ul style={{'listStyleType': 'none'}}>
                                <li>{trip.title}</li>
                                <li>miasto: {trip.city}</li>
                                <li>kontynent: {trip.continent}</li>
                                <li>data: {trip.date}</li>
                                <li>cena: {trip.price} PLN</li>
                                <li>opis: {trip.description}</li>
                                <li>kontakt: {trip.email}</li>
                            </ul>
                        </Grid.Column>))
            }
        </div>
    )
}
export default Test;