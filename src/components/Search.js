import React, {useState, useEffect} from 'react';
import {ShowLoader} from "./Loader";
import {data} from '../data'
import {fetchTrips, fetchFromFavorites, stopFetching, toggleFavorite} from "../services/TripService";
import {Continents} from "./Continents";
import {SearchInputs, FilteredQueryResults, ResultsGrid, NoQueryResult} from "./SearchItems";
import TripModal from "./TripModal";

const initialRange = 1999;
const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

const Search = () => {
    const [rangeValue, setRangeValue] = useState(initialRange);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [favourite, setFavouriteTrip] = useState(false);

    useEffect(() => {
        if (!fetched) {
            const f = async () => {
                const results = await fetchTrips()
                setResults(results)
                await fetchFromFavorites(favourites => {
                    setFavourites(favourites)
                    setFetched(true)
                    stopFetching()
                })
            }
            f()
        }
        return () => setFetched(false)
    }, [])

    useEffect(() => {
        async function f(clickedTripId) {
            await handleFavIcon(clickedTripId)
            setFavouriteTrip(false)
            await fetchFromFavorites(favourites => {
                setFavourites(favourites)
                stopFetching()
            })
        }

        if (favourite) {
            f(favourite)
        }
    }, [favourite])

    if (!fetched) {
        return null;
    }

    const handleFavIcon = async (tripId) => {
        await toggleFavorite(tripId)
    }
    const handleRangeSlider = (e) => setRangeValue(Number(e.target.value))

    const handleSelect = () => setSelectedContinent(data.value)

    const handleInputChange = (e) => setSearchQuery(e.target.value)

    const FilteredResults = () => {
        const continent = Continents.find(continent => continent.value === selectedContinent)
        const continentText = continent ? continent.text.toLowerCase() : '';
        const userQuery = searchQuery.toLowerCase()
        return results.filter(trip => (
                trip.continent.toLowerCase().includes(continentText) &&
                trip.title.toLowerCase().includes(userQuery) &&
                Number(trip.price) < rangeValue
            ) ||
            (
                trip.city.toLowerCase().includes(userQuery) &&
                trip.continent.toLowerCase().includes(continentText) &&
                Number(trip.price < rangeValue)
            ))
    }
    const queryOutput = () => {
        if (!fetched) {
            return ShowLoader()
        } else if (FilteredResults().length === 0) {
            return (
                <NoQueryResult/>
            )
        }
        return FilteredResults().map(trip => (<FilteredQueryResults
                trip={trip}
                key={trip.id}
                setFavouriteTrip={setFavouriteTrip}
                setSelectedTrip={setSelectedTrip}
                favourites={favourites}
                defaultImg={defaultImg}
            />
        ))
    }

    return (
        <div className={'search'}>
            <SearchInputs
                handleInputChange={handleInputChange}
                handleSelect={handleSelect}
                handleRangeSlider={handleRangeSlider}
                selectedContinent={selectedContinent}
                rangeValue={rangeValue}
                searchQuery={searchQuery}
            />
            <ResultsGrid queryOutput={queryOutput}/>
            <TripModal
                selectedTrip={selectedTrip}
                setSelectedTrip={setSelectedTrip}
            />
        </div>
    )
}

export default Search;
