import React from 'react'
import {Dropdown, Form, Grid, GridColumn, Input} from "semantic-ui-react";
import {data} from "../data";
import {Continents} from "./Continents";

const SearchItems = ({
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
export default SearchItems