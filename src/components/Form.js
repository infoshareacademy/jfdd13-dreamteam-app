import React from 'react';
import { Form, Input, TextArea, Button, Checkbox, Radio } from 'semantic-ui-react'
import styles from './Form.module.css'

class Formularz extends React.Component {

  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
   <Form className={styles.formContainer}>
    <Form.Field>
    <h1>Formularz dodawania wycieczki </h1>
      <label>Tytuł wycieczki</label>
      <input placeholder='Tytuł wycieczki' />
    </Form.Field>
    <Form.Field>
      <label>Data wyjazdu</label>
      <input placeholder='Data wycieczki' />
    </Form.Field>
    <Form.Field>
          <b>Typ wycieczki</b>
        </Form.Field>
        <div className={styles.radioButtons}>
        <Form.Field>
          <Radio
            label='Dla rodzin'
            name='radioGroup'
            value='this'
            checked={this.state.value === 'this'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Dla seniorów'
            name='radioGroup'
            value='that'
            checked={this.state.value === 'that'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Dla x'
            name='radioGroup'
            value='thut'
            checked={this.state.value === 'thut'}
            onChange={this.handleChange}
          />
        </Form.Field>
        </div>
    <Form.Field>
      <label>Cena</label>
      <input placeholder='Cena' />
    </Form.Field>
    <Form.Field>
      <label>Lokalizacja</label>
      <input placeholder='Lokalizacja' />
    </Form.Field>
    <Form.TextArea label='Opis wycieczki' placeholder='Opisz wycieczkę jak najdokładniej, uwzględniając średni budzet oraz ciekawe miejsca, które warto odwiedzić. ' />
    <Form.Field>
      <label>Twój e-mail</label>
      <input placeholder='Wpisz e-mail' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='Zgadzam się na otrzymywania maili związanych z wprowadzoną przeze mnie ofertą.' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    )
  };
};

export default Formularz;