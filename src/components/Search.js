import React, {Component, Fragment, useState, useEffect} from 'react';
import {ShowLoader} from "./Loader";
import {Grid, Input, Dropdown, Form, Image, Icon, Modal, Header, Button, GridColumn} from 'semantic-ui-react';
import {data} from '../data'
import {fetchTrips, fetchFromFavorites, stopFetching, toggleFavorite} from "../services/TripService";
import {Continents} from "./Continents";

const initialRange = 1999;
const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

const Hooked = () => {
    const [dropdownValue, setDropdownValue] = useState('');
    const [rangeValue, setRangeValue] = useState(initialRange);
    const [searchQuery, setSearchQuery] = useState('');
    const [drop, setDrop] = '';
    const [results, setResults] = [];
    const [searchTargetValue, setSearchTargetValue] = '';
    const [selectedContinent, setSelectedContinent] = '';
    const [selectedTrip, setSelectedTrip] = null;
    const [favourites, setFavourites] = [];
    const [fetched, setFetched] = false;

    useEffect(() => {
        const f = async () => {
            const results = await fetchTrips()
            setResults(results)
            await fetchFromFavorites(favourites => {
                setFavourites(favourites)
                setFetched(true)
            })
        }
        f()
        return () => stopFetching()
    })

    const handleFavIcon = async (tripId) => {
        await toggleFavorite(tripId)
    }
    //todo: after that finish queryOutput
    const handleRangeSlider = (e) => setRangeValue(Number(e.target.value))

    const handleSelect = (e) => setSelectedContinent(data.value)

    const handleInputChange = (e) => setSearchQuery(e.target.value)

    const FilteredResults = () => {
        const continent = Continents.find(continent => continent.value === selectedContinent).toLowerCase()
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
        ))

    }

}
//todo: rewrite render from Search

class Search extends Component {
    state = {
        DropdownValue: '',
        rangeValue: initialRange,
        searchQuery: '',
        drop: '',
        results: [],
        searchTargetValue: '',
        selectedContinent: '',
        selectedTrip: null,
        favourites: [],
        fetched: false
    };


    async componentDidMount() {
        const results = await fetchTrips()
        this.setState({
            results
        })
        await fetchFromFavorites(favourites => {
            this.setState({
                favourites,
                fetched: true
            })
        })
    }

    componentWillUnmount() {
        stopFetching()
    }

    async handleFavIcon(tripId) {
        await toggleFavorite(tripId);
    }

    queryOutput() {
        return (
            (!this.state.fetched) ?
                ShowLoader() :
                (this.FilteredResults.length === 0) ?
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <h2>Nie ma takiej wycieczki, ale możesz ją dodać!</h2>
                    </div> :
                    this.FilteredResults.map(trip => (
                        <div key={trip.id} className={'tripContainer'}>
                            <Grid.Column style={{padding: '0 2rem'}} onClick={() => {
                                this.setState({
                                    selectedTrip: trip
                                })
                            }}>
                                <div style={{position: 'relative'}}>
                                    <Image
                                        className="TripImage"
                                        // onClick={() => rangeValue(trip.id)}
                                        src={trip.tripImageUrl || defaultImg}
                                        label={{
                                            ribbon: true,
                                            color: "blue",
                                            content: `${trip.city}`
                                        }}
                                        centered={true}
                                        style={{cursor: 'pointer'}}
                                    >
                                    </Image>
                                    <Icon
                                        className={'iconFavourites'}
                                        size={'large'}
                                        inverted
                                        name={this.state.favourites[trip.id] !== undefined ? 'heart' : 'heart outline'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            this.handleFavIcon(trip.id)
                                        }}/>
                                </div>
                                <p>{trip.title}</p>
                            </Grid.Column>
                        </div>
                    ))


        )
    }

    handleRange = (e) => {
        this.setState({
            rangeValue: Number(e.target.value)
        })
    };

    handleSelect = (e, data) => {
        this.setState({
            selectedContinent: data.value
        })
    };

    handleInputChange = e => {
        this.setState({
            searchQuery: e.target.value
        })
    };

    get FilteredResults() {
        const {searchQuery, selectedContinent, rangeValue} = this.state;
        const continent = Continents.find(continent => {
            return continent.value === selectedContinent
        });
        const continentText = continent ? continent.text : '';
        return this.state.results.filter(trip => {
            return (
                (trip.continent.toLowerCase().includes(continentText.toLowerCase()) &&
                    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    Number(trip.price) < rangeValue) ||
                (trip.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    trip.continent.toLowerCase().includes(continentText.toLowerCase()) &&
                    Number(trip.price) < rangeValue)
            )
        })
    }

    render() {
        const {selectedTrip} = this.state

        return (
            <div className="search">
                <Grid padded={true}>
                    <Grid.Row columns={1} centered={true}>
                        <Grid.Column widescreen={12} largeScreen={12} mobile={12}>
                            <Input
                                onChange={this.handleInputChange}
                                placeholder='Gdzie chcesz pojechać?'
                                fluid
                                value={this.state.searchQuery}
                            />
                            <datalist id='places'>
                                {data.map(v => <option key={v.id}> {v.city}</option>)}
                            </datalist>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} centered={true}>
                        <Grid.Column widescreen={6} largeScreen={6} mobile={12}>
                            <Dropdown
                                clearable
                                fluid
                                options={Continents}
                                selection placeholder='Wybierz kontynent...'
                                onChange={this.handleSelect}
                                value={this.state.selectedContinent}
                            />
                        </Grid.Column>
                        <Grid.Column as={Form} widescreen={6} largeScreen={6} mobile={12} textAlign={"right"}
                                     style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                            <span style={{
                                display: 'inline-flex',
                                padding: '0 8px',
                                height: '100%'
                            }}>Maksymalna cena za dobę: {this.state.rangeValue || '0'}zł</span>
                            <input type={'range'}
                                   min={0}
                                   max={2000}
                                   step={100}
                                   onChange={this.handleRange}
                                   name={'show'}
                                   value={this.state.rangeValue}
                                   style={{minHeight: '40px'}}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid container
                      style={
                          {
                              display: 'flex',
                              justifyContent: 'flex-start',
                              flexDirection: 'column',
                              height: '100%',
                              margin: 'auto !important'
                          }
                      }>
                    <Grid.Row
                        columns={3} mobile={1} style={{display: 'flex', height: '100%'}}
                    >
                        {this.queryOutput()}
                    </Grid.Row>
                </Grid>
                <Modal
                    dimmer={"blurring"}
                    open={this.state.selectedTrip != null}
                    onClose={() => {
                        this.setState({
                            selectedTrip: null
                        })
                    }}
                >
                    {selectedTrip != null && <Fragment>
                        <Modal.Header>{selectedTrip.title}</Modal.Header>
                        <Modal.Content image>
                            <Image
                                wrapped
                                size="large"
                                src={selectedTrip.tripImageUrl || defaultImg}
                            />
                            <Modal.Description>
                                <Header>{selectedTrip.city}</Header>
                                <ul style={{padding: "0 0 0 1.5rem"}}>
                                    <li>{selectedTrip.continent}</li>
                                    <li>Cena za dobę za osobę: {selectedTrip.price} PLN</li>
                                    <li>Data wyjazdu: {selectedTrip.date}</li>
                                    <li>Opis: {selectedTrip.description}</li>
                                </ul>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black"
                                    onClick={() => {
                                        this.setState({
                                            selectedTrip: null
                                        })
                                    }}
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
        );
    };
}

export default Search;

