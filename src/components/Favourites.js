import React, { useState, useEffect } from "react";
import {Grid, Icon, Image} from "semantic-ui-react";
import { fetchTrips } from "../services/TripService";

const Favourites = () => {
  const [trips, setTrips] = useState([]);

  useEffect (() =>{
    fetchTrips().then(trips => {
      setTrips(trips)
    })
  },[]);

  return (trips.map(trip => (
      <div key={trip.id}>
        <Grid.Column style={{padding: '0 2rem'}} onClick={() => {
          this.setState({
            selectedTrip: trip
          })
        }}>
          <div style={{position: 'relative'}}>
            <Image
                className="TripImage"
                // onClick={() => rangeValue(trip.id)}
                src={trip.tripImageUrl || }
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
      </div>
    )))
} 

export default Favourites;
