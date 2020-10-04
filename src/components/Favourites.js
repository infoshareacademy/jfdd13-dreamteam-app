import React, { useState, useEffect } from "react";
import {
  FilteredQueryResult,
  // handleFavIcon,
  NoQueryResult,
  ResultsGrid
} from './SearchItems'
import { fetchTrips, fetchFromFavorites, toggleFavorite, stopFetching } from "../services/TripService";
import { ShowLoader } from "./Loader";
import TripModal from "./TripModal";

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';
const Favourites = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [favouritesList, setFavouritesList] = useState([])
  const [favourites, setFavourites] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [favouriteTrip, setFavouriteTrip] = useState(false);

  useEffect(() => {
    const f = async () => {
      if (favouriteTrip) {
        await handleFavIcon(favouriteTrip)
        setFavouriteTrip(false)
      }
      const allTrips = await fetchTrips()
      await fetchFromFavorites(favourites => {
        const filteredTrips = allTrips.filter((trip) => favourites[trip.id] !== undefined)
        setFavouritesList(filteredTrips)
        setFavourites(favourites)
        setFetched(true)
        stopFetching()
      })
    }
    f()

    return () => {
      setFetched(true)
      stopFetching()
    }
    // eslint-disable-next-line
  }, [favouriteTrip])

  if (!fetched) {
    return null;
  }

  const handleFavIcon = async (tripId) => {
    await toggleFavorite(tripId)
  }

  const queryOutput = () => {
    if (!fetched) {
      return ShowLoader()
    } else if (favouritesList.length === 0) {
      return (
        <NoQueryResult />
      )
    }
    return favouritesList.map(trip => (<FilteredQueryResult
      trip={trip}
      key={trip.id}
      // handleFavIcon={}
      setFavouriteTrip={setFavouriteTrip}
      setSelectedTrip={setSelectedTrip}
      favourites={favourites}
      defaultImg={defaultImg}
    />
    ))
  }

  return (
    <div className="search">
      <ResultsGrid queryOutput={queryOutput} />
      <TripModal setSelectedTrip={setSelectedTrip} selectedTrip={selectedTrip} />

    </div>
  );
};

export default Favourites