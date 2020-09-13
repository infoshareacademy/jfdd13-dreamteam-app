import React, {Component, Fragment, useState, useEffect} from 'react';
import {ShowLoader} from "./Loader";
import {Grid, Input, Dropdown, Form, Image, Icon, Modal, Header, Button, GridColumn} from 'semantic-ui-react';
import {data} from '../data'
import {fetchTrips, fetchFromFavorites, stopFetching, toggleFavorite} from "../services/TripService";
import {Continents} from "./Continents";
import SearchItems, {FilteredQueryResults} from "./SearchItems";

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

    if (!fetched) {
        return null;
    }

    const handleFavIcon = async (tripId) => {
        await toggleFavorite(tripId)
    }
    //todo: after that finish queryOutput
    const handleRangeSlider = (e) => setRangeValue(Number(e.target.value))

    const handleSelect = (e) => setSelectedContinent(data.value)

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
// todo: set following function as another component
    const queryOutput = () => {
        if (!fetched) {
            return ShowLoader()
        } else if (FilteredResults().length === 0) {
            return (
              <NoQueryResult/>
            )
        }
        return FilteredResults().map(trip => ( <FilteredQueryResults
                trip={trip}
                key={trip.id}
                handleFavIcon={handleFavIcon}
                setSelectedTrip={setSelectedTrip}
                favourites={favourites}
                defaultImg={defaultImg}
            />
        ))
    }

    return (
        <div className={'search'}>
            <SearchItems
                handleInputChange={handleInputChange}
                handleSelect={handleSelect}
                handleRangeSlider={handleRangeSlider}
                selectedContinent={selectedContinent}
                rangeValue={rangeValue}
                searchQuery={searchQuery}
            />
            <Grid container style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                height: '100%',
                margin: 'auto !important'
            }}>
                <Grid.Row
                    columns={3}
                    mobile={1}
                    style={{
                        display: 'flex',
                        height: '100%'
                    }}
                >
                    {queryOutput()}
                </Grid.Row>
            </Grid>
            <Modal
                selectedTrip={selectedTrip}
                setSelectedTrip={setSelectedTrip}
            />
        </div>
    )
}
const NoQueryResult = () => (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <h2>Nie ma takiej wycieczki, ale możesz ją dodać!</h2>
    </div>
)




export default Search;

