import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Segment, Sidebar, Grid } from "semantic-ui-react";
import MapFirebase from "./MapFirebase";
import { addToFavorites, fetchFromFavorites } from "../services/TripService";
import { sendTest } from "../services/TestService";
import { signout } from "../services/AuthService";

const Home = () => {
  const [trips, setTrips] = useState([]);

  // useEffect (() =>{
  //   fetchTrips().then(trips => {
  //     setTrips(trips)
  //   })
  // },[])

  const navStyle = {
    width: "100vw",
    minHeight: "100px",
    border: 0,
    borderRadius: 0
  };
  return (
    <div>
      <Sidebar.Pushable as={Segment} style={navStyle}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          direction="top"
          visible={true}
          width="thin"
        >
          <NavLink to="#" exact>
            <Menu.Item
              onClick={() => {
                sendTest();
              }}
            >
              <Icon name="upload" />
              send test
            </Menu.Item>
          </NavLink>

          {/* <NavLink to="#" exact>
            <Menu.Item
              onClick={() => {
                addToFavorites();
              }}
            >
              <Icon name="upload" />
              add to favs
            </Menu.Item>
          </NavLink> */}

          <NavLink to="#" exact>
            <Menu.Item
              onClick={async () => {
                const trips = await fetchFromFavorites();
                setTrips(trips);
              }}
            >
              <Icon name="download" />
              fetch favs
            </Menu.Item>
          </NavLink>

          <NavLink to="#" exact>
            <Menu.Item onClick={() => signout()}>
              <Icon name="sign out" />
              Wyloguj
            </Menu.Item>
          </NavLink>
        </Sidebar>
      </Sidebar.Pushable>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <MapFirebase trips={trips} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;