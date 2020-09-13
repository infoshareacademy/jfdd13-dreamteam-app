import React, {Component, Fragment, useState, useEffect} from 'react';
import {ShowLoader} from "./Loader";
import {Grid, Input, Dropdown, Form, Image, Icon, Modal, Header, Button, GridColumn} from 'semantic-ui-react';
import {data} from '../data'
import {fetchTrips, fetchFromFavorites, stopFetching, toggleFavorite} from "../services/TripService";
import {Continents} from "./Continents";

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
            })
        }
        f()
        }
        return ()=> setFetched(false)
    }, [])

    if(!fetched) {
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
            <Grid padded={true}>
                <Grid.Row columns={1} centered={true}>
                    <Grid.Column widescreen={12} largescreen={12} mobile={12}>
                        <Input
                            onChange={handleInputChange}
                            placeholder={'Dokąd chcesz pojehcać'}
                            fluid
                            value={searchQuery}
                        />
                        <datalist id={'places'}>
                            {data.map(v => <option key={v.id}>{v.city}</option>)}
                        </datalist>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} centered={true}>
                    <Grid.Column widescreen={6} largeScreen={6} mobile={12}>
                        <Dropdown
                            clearable
                            fluid
                            options={Continents}
                            selection
                            placeholder={'Wybierz kontynent'}
                            onChange={handleSelect}
                            value={selectedContinent}
                        />
                    </Grid.Column>
                    <GridColumn
                        as={Form}
                        widescreen={6}
                        largeScreen={6}
                        mobile={12}
                        textAlign={'right'}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-flex',
                                padding: '0 8px',
                                height: '100%'
                            }}
                        >
                            Maksymalna cena za dobę: {rangeValue || '0'}zł
                        </span>
                        <input
                            type={'range'}
                            min={0}
                            max={2000}
                            step={100}
                            onChange={handleRangeSlider}
                            name={'show'}
                            value={rangeValue}
                            style={{minHeight: '40px'}}
                        />
                    </GridColumn>
                </Grid.Row>
            </Grid>
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
            {/*{todo: set modal as another component}*/}
            <Modal
                dimmer={'blurring'}
                open={selectedTrip != null}
                onClose={() => setSelectedTrip(null)}
            >
                {selectedTrip != null && <Fragment>
                    <Modal.Header>{selectedTrip.title}</Modal.Header>
                    <Modal.Content image>
                        <Image
                            wrapped
                            size={'large'}
                            src={selectedTrip.tripImageUrl || defaultImg}
                        />
                        <Modal.Description>
                            {/*todo destructure following values*/}
                            <Header>{selectedTrip.city}</Header>
                            <ul>
                                <li>{selectedTrip.continent}</li>
                                <li>Cena za dobę za osobę: {selectedTrip.price} PLN</li>
                                <li>Data wyjazdu: {selectedTrip.date}</li>
                                <li>Opis: {selectedTrip.description}</li>
                            </ul>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color={'black'}
                            onClick={() => setSelectedTrip(null)}
                        >
                            Wyjdź
                        </Button>
                        <Button
                            positive
                            labelPosition="right"
                        />
                    </Modal.Actions>
                </Fragment>}
            </Modal>
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

