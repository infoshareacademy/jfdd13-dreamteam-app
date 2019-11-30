import React, {Component} from 'react';
import {Grid, Input, Dropdown, Form, Image} from 'semantic-ui-react';
import {data} from '../data'

const continents = [
    {key: 'afr', value: 1, text: "Afryka"},
    {key: 'apd', value: 2, text: "Ameryka Południowa"},
    {key: 'apn', value: 3, text: "Ameryka Północna"},
    {key: 'aus', value: 4, text: "Australia i Oceania"},
    {key: 'azj', value: 5, text: "Azja"},
    {key: 'eur', value: 6, text: "Europa"}
];
const initialRange = 1999;

class Search extends Component {
    state = {
        DropdownValue: '',
        rangeValue: initialRange,
        searchQuery: '',
        drop: '',
        results: data,
        searchTargetValue: '',
        selectedContinent: ''
    };

    queryOutput() {

        return (this.filteredResults.map(trip => (
                <div key={trip.id}>
                    <Grid.Column key={trip.city} style={{padding: '0 2rem'}}>
                        <Image
                            className="TripImage"
                            // onClick={() => rangeValue(trip.id)}
                            src={trip.img}
                            label={{
                                ribbon: true,
                                color: "blue",
                                content: `${trip.city}`
                            }}
                            centered={true}
                        />
                        <p>{trip.title}</p>
                    </Grid.Column>
                </div>
            ))
        )
    }
    handleRange = (e, data) => {
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

    get filteredResults () {
        const {searchQuery, selectedContinent, rangeValue} = this.state;
        const continent = continents.find(continent => {
            return continent.value === selectedContinent
        });
        const continentText = continent ? continent.text : '';
        return this.state.results.filter(trip => {
            return (
                trip.continent.toLowerCase().includes(continentText.toLowerCase()) &&
                trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    (Number(trip.price) < rangeValue ||
                trip.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    Number(trip.price) < rangeValue
                )
            )
        })
    }
    handleChange = (e, {name, value}) => this.setState({[name]: value});

    render() {

        return (
            <div className="search">
                <Grid padded={true}>
                    <Grid.Row columns={1} centered={true}>
                        <Grid.Column width={12}>
                            <Input
                                onChange={this.handleInputChange}
                                list='places'
                                placeholder='Gdzie chesz pojechać?'
                                fluid
                                value={this.state.searchQuery}
                            />
                            <datalist id='places'>
                                {data.map(v => <option> {v.city}</option>)}
                            </datalist>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} centered={true}>
                        <Grid.Column width={6}>
                            <Dropdown
                                clearable
                                fluid
                                options={continents}
                                selection placeholder='Wybierz kontynent...'
                                onChange={this.handleSelect}
                                value={this.state.selectedContinent}
                            />
                        </Grid.Column>
                        <Grid.Column as={Form} width={6} textAlign={"right"} style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                            <span style={{display: 'inline-flex', padding: '0 8px', height: '100%'}}>Twój budżet: {this.state.rangeValue || initialRange}</span>
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
                          {flex: 1, justifyContent: 'center', flexDirection: 'column', margin: 'auto !important'}
                      }>
                    <Grid.Row
                        columns={3} style={{flex: 1}}
                    >
                        {this.queryOutput()}
                    </Grid.Row>
                </Grid>
            </div>
        );
    };
}

export default Search;

