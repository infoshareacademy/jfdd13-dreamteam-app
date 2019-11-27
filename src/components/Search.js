import React, {Component, Fragment, useState} from 'react';
import {Grid, Input, Dropdown, Form, Container, Image, Modal, Header, Button} from 'semantic-ui-react';
import TripContainer from './TripContainer';
import {data} from '../data'

const continents = [
  {key: 'afr', value:1, text: "Afryka"},
  {key: 'apd', value:2, text: "Ameryka Południowa"},
  {key: 'apn', value:3, text: "Ameryka Północna"},
  {key: 'ant', value:4, text: "Antarktyda"},
  {key: 'aus', value:5, text: "Australia i Oceania"},
  {key: 'azj', value:5, text: "Azja"},
  {key: 'eur', value:6, text: "Europa"}
];
class Search extends Component {
  state = {
    DropdownValue: '',
    show: '',
    searchQuery: '',
    drop: '',
    slider: 0,
    results: data
  };
  handleSearchQuery (e) {
    // this.setState({searchQuery: e.target.value});
    this.setState({results:
          data.filter((query => (Object.entries(query).toString().toLowerCase().includes(e.target.value))))
    })
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
        {/*{*/}
        {/*  //search*/}
        {/*  (this.state.searchQuery === '')? 'uważaj, tu się chowa znajomy JSON' :*/}
        {/*      //searching through whole object entries instead of title*/}
        {/*      JSON.stringify(data.filter(query => Object.entries(query).toString().toLowerCase().includes(searchQuery)))*/}

        {/*      // ) || query.title.toLowerCase().includes(searchQuery)))*/}
        {/*    //now push it to state results array and display it*/}

        {/*}*/}


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
                  onClick={(data) => console.log(data)}
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

