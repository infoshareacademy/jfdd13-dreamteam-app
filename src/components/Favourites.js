import React, { useState, useEffect } from "react";
import { Header, Grid, Image } from "semantic-ui-react";
import { fetchTrips } from "../services/TripService";
import firebase from "../firebase";

const Favourites = (props) => {
  const [trips, setTrips] = useState([]);

  useEffect (() =>{
    fetchTrips().then(trips => {
      setTrips(trips)
    })
  },[])

  return (<div trips={trips}>
        <Header>dane z firebase dla usera {firebase.auth().currentUser.uid} </Header>
      {console.log(trips)}
      {trips.map(trip => (
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
            <li>kontynent: {trip.continent}</li>
            <li>data: {trip.date}</li>
            <li>cena: {trip.price} PLN</li>
            <li>opis: {trip.description}</li>
            <li>kontakt: {trip.email}</li>
          </ul>
        </Grid.Column>))}
      </div>
    )
} 

export default Favourites;
