import React, { useState, useEffect } from "react";
import { Icon, Menu, Segment, Sidebar, Grid } from "semantic-ui-react";
import MapFirebase from "./MapFirebase";
import { addToFavorites, fetchFromFavorites } from "../services/TripService";
import { sendTest } from "../services/TestService";
import { signout } from "../services/AuthService";

const Home = () => {

  // useEffect (() =>{
  //   fetchTrips().then(trips => {
  //     setTrips(trips)
  //   })
  // },[])
    return null

};

export default Home;