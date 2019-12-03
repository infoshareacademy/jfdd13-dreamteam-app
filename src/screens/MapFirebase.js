import React, { useState, useEffect } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import firebase from '../firebase';

const MapFirebase = (props) => {
  return (
    <div>
      <Header>dane z firebase dla usera {firebase.auth().currentUser.uid} </Header>
      {props.trips.map(trip => (
        <Grid.Column  style={{ padding: "0 2rem" }}>
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
          <ul style={{'listStyleType':'none'}}>
            <li>{trip.title}</li>
            <li>miasto: {trip.city}</li>
          </ul>
        </Grid.Column>))}
      </div>
    )
}
export default MapFirebase;