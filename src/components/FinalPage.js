import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import {Heart} from './Heart'  

class FinalPage extends Component {
  
  state = { open: false, favourites: false, active: content }
  
  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show('blurring')}>Zdjęcie miniaturka</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Gdynia Główna Osobowa</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='medium'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ulica%C5%9Awi%C4%99toja%C5%84ska_Gdynia.jpg/1200px-Ulica%C5%9Awi%C4%99toja%C5%84ska_Gdynia.jpg'
            />
            <Modal.Description>
              <Header>Gdynia</Header>
              <p>
                <li>Lokalizacja:Gdynia, wygwizdowie</li>
                <li>Liczba łóżek:1 dla 6 osób</li>
                <li>Łazienka: brak</li>  
                <li>Toaleta:500m od lokalizacji</li>                  

              </p>
              <p>Możesz polubić</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Wyjdź
            </Button>
            <Button
              positive
              icon={`heart ${this.state.favourites ? '' : 'outline'}`}
              labelPosition='right'
              content = {this.state.active ? "Ulubione" : "Dodaj do ulubionych"}
              // content="Ulubione"
              onClick={() => {this.setState({favourites : !this.state.favourites})}}
              
              />
    
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
  

  }
export default FinalPage;