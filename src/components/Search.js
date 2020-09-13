import React, {Component, Fragment, useState, useEffect} from 'react';
import {ShowLoader} from "./Loader";
import {Grid, Input, Dropdown, Form, Image, Icon, Modal, Header, Button, GridColumn} from 'semantic-ui-react';
import {data} from '../data'
import {fetchTrips, fetchFromFavorites, stopFetching, toggleFavorite} from "../services/TripService";
import {Continents} from "./Continents";
import SearchItems from "./SearchItems";

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
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <h2>Nie ma takiej wycieczki, ale możesz ją dodać!</h2>
                </div>
            )
        }
        return FilteredResults().map(trip => (
            <div key={trip.id} className={'tripContainer'}>
                <GridColumn style={{padding: '0 2rem'}}
                            onClick={() => {
                                setSelectedTrip(trip)
                            }}
                >
                    <div style={{position: 'relative'}}>
                        <Image
                            className={'TripImage'}
                            src={trip.tripImageUrl || defaultImg}
                            label={{
                                ribbon: true,
                                color: 'blue',
                                content: `${trip.city}`
                            }}
                            centered={true}
                            style={{cursor: 'pointer'}}

                        />
                        <Icon
                            inverted
                            className={'iconFavourites'}
                            name={favourites[trip.id] !== undefined ? 'heart' : 'heart outline'}
                            size={'large'}

                            onClick={(e) => {
                                e.stopPropagation();
                                handleFavIcon(trip.id)
                            }}
                        />
                    </div>
                    <p>{trip.title}</p>
                </GridColumn>
            </div>
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
            {/*{todo: place following results view as another component}*/}
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
//todo: rewrite render from Search
const NoQueryResult = () => (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <h2>Nie ma takiej wycieczki, ale możesz ją dodać!</h2>
    </div>
)

//todo: pass following as props when mounting the component
const FilteredQueryResults = ({trip, setSelectedTrip, favourites, handleFavIcon}) => (
    <div key={trip.id}>
        <GridColumn style={{padding: '0 2rem'}}
                    onClick={() => {
                        setSelectedTrip(trip)
                    }}
        >
            <div style={{position: 'relative'}}>
                <Image
                    className={'iconFavourites'}
                    size={'large'}
                    inverted
                    name={favourites[trip.id] !== undefined ? 'heart' : 'heart-outline'}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavIcon(trip.id)
                    }}
                />
            </div>
            <p>{trip.title}</p>
        </GridColumn>
    </div>
)


export default Search;

