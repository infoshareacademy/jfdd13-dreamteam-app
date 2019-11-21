import React, { Component } from 'react';
import { Grid, Input, Dropdown, Form } from 'semantic-ui-react';
import TripContainer from './TripContainer';

const continents = [
  {key: 'afr', value:1, text: "Afryka"},
  {key: 'apd', value:2, text: "Ameryka Południowa"},
  {key: 'apn', value:3, text: "Ameryka Północna"},
  {key: 'ant', value:4, text: "Antarktyda"},
  {key: 'aus', value:5, text: "Australia i Oceania"},
  {key: 'eur', value:6, text: "Europa"}
];
const places = [
  {value:'Amsterdam'},
  {value:'Gdańsk'},
  {value:'Gdynia'},
  {value:'Innsbruck'},
  {value:'Johannesburg'},
  {value:'Londyn'},
  {value:'Los Angeles'},
  {value:'Mexico City'},
  {value:'Sopot' },
  {value:'Tokio'},
  {value:'Vancouver'}
];

class Search extends Component {
  state = {show: 999}

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  render() {
    const {show} = this.state;

    return (
      <div className="Search">
        <Grid padded={true}>
          <Grid.Row columns={1} centered={true}>
            <Grid.Column width={12}>
              <Input list='places' placeholder='Podaj destynację...' fluid  />
                <datalist id='places'>
                  {places.map(v => <option> {v.value}</option>)}
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
                max={19999}
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

