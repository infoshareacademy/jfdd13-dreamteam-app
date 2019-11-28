import React, {Component, Fragment, useState} from 'react';
import {Grid, Input, Dropdown, Form, Container, Image, Modal, Header, Button} from 'semantic-ui-react';
import TripContainer from './TripContainer';
import {data} from '../data'

const continents = [
  {key: 'afr', value:1, text: "Afryka"},
  {key: 'apd', value:2, text: "Ameryka Południowa"},
  {key: 'apn', value:3, text: "Ameryka Północna"},
  {key: 'aus', value:4, text: "Australia i Oceania"},
  {key: 'azj', value:5, text: "Azja"},
  {key: 'eur', value:6, text: "Europa"}
];
const initialRange = 1999;
class Search extends Component {
  state = {
    DropdownValue: '',
    show: initialRange,
    searchQuery: '',
    drop: '',
    results: data
  };
  clearSearchResult() {
      this.setState({results: data})
}

  handleSearchQuery (e = '') {

      let inputVal = ''; //error handling
      let dropdownContinent = '';
      let inputRange = '';

      if (e.hasOwnProperty('target')) {
          inputVal = e.target.value
      }
      const defaultOutput = data.filter(query => (
          Object
              .entries(query).toString()
              .toLowerCase()
              .includes(
                  inputRange && dropdownContinent && inputVal || inputRange && dropdownContinent || inputRange && inputVal
                  || dropdownContinent && inputVal || inputRange || dropdownContinent || inputVal
  )));

      if (inputRange < initialRange) {
          inputRange = this.state.show
      }

      // let dropdownQuery = this.state.results.filter(dropdownItem => dropdownItem.continent === filteredContinent[0].text); //match the continent name to filteredContinent
      const dropdownQuery = (q) => q.filter(dropdownItem => dropdownItem.continent === filteredContinent[0].text); //match the continent name
      // this.setState({searchQuery: e.target.value});
      let filteredContinent = '';
      if (this.state.DropdownValue !== ''){
          filteredContinent = continents.filter(item => item.value === this.state.DropdownValue); //get the continent id from continents array
          this.setState( {results: dropdownQuery(defaultOutput)})
      } else {
          this.setState({
              results: defaultOutput
          })
      }
      console.log(this.state.DropdownValue);
      // console.log(filteredContinent[0].text);
      // console.log(dropdownQuery(defaultOutput));
      console.log('now state:');
      console.log(this.state)
  }
  queryOutput() {
    // const results = data.filter((query => (Object.entries(query).toString().toLowerCase().includes(this.state.searchQuery))));
    // const results2 = (data.filter(item => (Object.values(item.title))));

  // this.searchResultHandler(results);

    return(this.state.results.map(trip => (
        <div key={trip.id}>
          <Grid.Column key={trip.city} style={{padding: '0 2rem'}}>
            <Image
                className="TripImage"
                // onClick={() => show(trip.id)}
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

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  render() {
    const {show, searchQuery} = this.state;

    return (
      <div className="search">
        <Grid padded={true}>
          <Grid.Row columns={1} centered={true}>
            <Grid.Column width={12}>
              <Input
                  onChange={event => this.handleSearchQuery(event)}
                  list='places'
                  placeholder='Podaj destynację...'
                  fluid
              />
                <datalist id='places'>
                  {data.map(v => <option> {v.city }</option>)}
                </datalist>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} centered={true}>
            <Grid.Column width={6} >
              <Dropdown
                  clearable
                  fluid
                  options={continents}
                  selection placeholder='Wybierz kontynent...'
                  onClick={() => console.log()}
                  onChange={(event, data) => {
                      if (data.value === "") {
                          this.clearSearchResult();
                          this.setState({DropdownValue: ''})
                      } else {
                    this.setState({
                        DropdownValue: data.value
                    });
                      this.handleSearchQuery()
                  }}}
              />
            </Grid.Column>
            <Grid.Column as={Form} width={6} textAlign={"right"}>
              <Form.Input inline
                label={`Twój budżet: ${show} PLN`}
                min={99}
                max={2000}
                step={100}
                type="range"
                onChange={this.handleChange}
                name="show"
                value={show}
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

        {/*<TripContainer />*/}
      </div>
    );
  };
}
export default Search;

