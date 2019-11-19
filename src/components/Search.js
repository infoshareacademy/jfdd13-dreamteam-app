import React, { Component } from 'react'
import { Grid, Header, Form, Input, Dropdown } from 'semantic-ui-react'
import TripContainer from './TripContainer'

const continentsOptions = [
  {key: 'afr', color: 'black', text: "Afryka"},
  {key: 'apn', color: 'red', text: "Ameryka Północna"},
  {key: 'apd', color: 'green', text: "Ameryka Południowa"},
  {key: 'ant', color: 'white', text: "Antarktyda"},
  {key: 'aus', color: 'blue', text: "Australia i Oceania"},
  {key: 'eur', color: 'grey', text: "Europa"}
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
                label={`Cena: ${show} PLN`}
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

