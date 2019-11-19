import React, { Component } from 'react'
import { Form, Grid, Header, Input} from 'semantic-ui-react'

class Search extends Component {
  state = {show: 7}

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
      <Grid.Column as={Form}>
        <Form.Input
          label={`Ilość dni: ${show}`}
          min={2}
          max={21}
          name='show'
          onChange={this.handleChange}
          step={1}
          type='range'
          value={show}
        />
        <Form.Button content='Szukaj' onClick={this.toggleVisibility} />
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>

    </Grid.Row>

  </Grid>



    </div> 
  );
};
}
export default Search;

