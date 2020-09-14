import React from 'react'
import {Dropdown, Form, Grid, GridColumn, Icon, Image, Input} from "semantic-ui-react";
import {data} from "../data";
import {Continents} from "./Continents";

export const SearchInputs = ({
                         handleInputChange, handleSelect, selectedContinent,
                         rangeValue, searchQuery, handleRangeSlider
                     }) => (
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
)

export const FilteredQueryResults = ({
                                         trip, setSelectedTrip, favourites,
                                         handleFavIcon, defaultImg
                                     }) => (
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

)

export const ResultsGrid = ({queryOutput}) => (
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
)

export const NoQueryResult = (message) => (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <h2>{message ? message :
            "Nie ma takiej wycieczki, ale możesz ją dodać!"}</h2>
    </div>
)