import React, { Component } from 'react'
import { Grid, Header, Form, Input, Dropdown } from 'semantic-ui-react'
import TripContainer from './TripContainer'

const continentsOptions = [
  {key: 'afr', label: {color: 'black', empty: true, circular:true}, text: "Afryka"},
  {key: 'apd', label: {color: 'green', empty: true, circular:true}, text: "Ameryka Południowa"},
  {key: 'apn', label: {color: 'red', empty: true, circular:true}, text: "Ameryka Północna"},
  {key: 'ant', label: {color: 'white', empty: true, circular:true}, text: "Antarktyda"},
  {key: 'aus', label: {color: 'blue', empty: true, circular:true}, text: "Australia i Oceania"},
  {key: 'eur', label: {color: 'grey', empty: true, circular:true}, text: "Europa"}
]
class Search extends Component {
  state = {show: 999}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))

  render() {
    const {show} = this.state

    return (
      <div className="Search">
        <Grid padded={true}>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header>Wskaż kierunek!</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Dropdown
                placeholder='Wybierz kontynent'
                focus
                search
                selection
                options={continentsOptions}
              >
              </Dropdown>
            </Grid.Column>
           <Grid.Column as={Form}>
              <Form.Input
                label={`Twój budżet: ${show} PLN`}
                min={99}
                max={19999}
                name="show"
                onChange={this.handleChange}
                step={100}
                type="range"
                value={show}
              />
            </Grid.Column>
            <Grid.Column>
              <Input focus icon="search" placeholder="Wyszukaj..." />
            </Grid.Column>
           </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Form.Button content="Szukaj" onClick={this.toggleVisibility} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        <TripContainer />
      </div>
    );
};
}
export default Search;

