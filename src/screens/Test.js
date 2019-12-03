import React from 'react';
import {Grid, Header, Image} from 'semantic-ui-react';

const localSdata = JSON.parse(localStorage.getItem('form'));
const dataFromLocalStorage = (localSdata)? localSdata : [];

const Test = () => {

    return (
        <div>
            <Header>tu renderujemy dane z wypełnionego Formularza (zapis do localStorage) </Header>
            {[dataFromLocalStorage].map(trip => (
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
                </Grid.Column>))}
        </div>
    );
}

{/* {testData.map(obj => {
                const [city, continent, data, description, email, price, terms, title] = obj;

        return [obj.city, obj.continent, obj.data, obj.description, obj.email, obj.price, obj.terms, obj.title];
     }).catch(err => console.log(err))
    } */
}

export default Test;