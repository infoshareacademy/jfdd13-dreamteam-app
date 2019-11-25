import React, {Component, Fragment} from 'react';
import { Grid, Input, Dropdown, Form, Container } from 'semantic-ui-react';
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

const SeachConst = props => {
  const {searchQuery,
  onChange,
  search
  } = props;

  return (
      <Fragment>
        <input
          type="text"
          value={searchQuery}
          onChange={onChange}
        />
      </Fragment>
  )
};


class Search extends Component {
  state = {
    show: 999,
    searchQuery: '',
    results: []
  };
  handleSearchQuery (e) {
    this.setState({searchQuery: e.target.value});
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  handleSearchResult = (props) => {
    console.log('dupa');
    console.log(props);
  }

  render() {
    const {show, searchQuery} = this.state;

    return (
      <div className="search">
        {JSON.stringify(data.filter(query => query.title.toLowerCase().includes(searchQuery)))}
        <Grid padded={true}>
          <Grid.Row columns={1} centered={true}>
            <Grid.Column width={12}>
              <Input
                  onChange={event => this.handleSearchQuery(event)}
                  list='places'
                  placeholder='Podaj destynację...'
                  fluid
                  onKeyPress={this.handleSearchResult}
              />
                <datalist id='places'>
                  {data.map(v => <option> {v.city }</option>)}
                </datalist>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} centered={true}>
            <Grid.Column width={6} >
              <Dropdown clearable fluid options={continents} selection placeholder='Wybierz kontynent...'/>
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
        <TripContainer />
      </div>
    );
  };
}
export default Search;

