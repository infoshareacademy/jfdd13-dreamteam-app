import React, { useState, useEffect } from "react";
import {
  FilteredQueryResults,
  // handleFavIcon,
  NoQueryResult,
  ResultsGrid
} from './SearchItems'
import { fetchTrips, fetchFromFavorites, toggleFavorite, stopFetching } from "../services/TripService";
import { ShowLoader } from "./Loader";
import TripModal from "./TripModal";

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';
const Favourites = () => {
  const [data, setData] = useState([])
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [favouritesList, setFavouritesList] = useState([])
  const [favourites, setFavourites] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [favouriteTrip, setFavouriteTrip] = useState(false);

  useEffect(() => {
    if (!fetched) {
      const f = async () => {
        const allTrips = await fetchTrips()
        await fetchFromFavorites(favourites => {
          setData(allTrips)
          const filteredTrips = allTrips.filter((trip) => favourites[trip.id] !== undefined)
          setFavouritesList(filteredTrips)
          setFavourites(favourites)
          setFetched(true)
          stopFetching()
        })
      }
      f()
    }
    return () => setFetched(true)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    async function f(clickedTripId) {
      await handleFavIcon(clickedTripId)
      setFavouriteTrip(false)
      await fetchFromFavorites(favourites => {
        const filteredTrips = data.filter((trip) => favourites[trip.id] !== undefined)
        setFavouritesList(filteredTrips)
        stopFetching()
      })
    }

    if (favouriteTrip) {
      f(favouriteTrip)
    }
    return () => setFavouriteTrip(false)
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
    return favouritesList.map(trip => (<FilteredQueryResults
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