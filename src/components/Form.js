import React from 'react';
import { Form, Input, TextArea, Button, Checkbox, Radio } from 'semantic-ui-react';
import styles from './Form.module.css';
import * as Yup from "yup";
import { Formik } from "formik";

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(20, 'Tytuł za długi, skróć do 20 znaków.')
    .required("Required!"),
  date: Yup.string()
    .min(8, "Too short! Min 8 chars")
    .matches(new RegExp(), 'Zły format daty.')
    .required("Required!"),
  price: Yup.string()
    .matches(new RegExp(), 'Podaj cenę.')
    .required("Required!"),
  place: Yup.string()
    .required("Required!"),
  description: Yup.string()
    .max(200, "Opis za długi, skróć tekst do 200 znaków.")
    .required("Required!"),
  email: Yup.string()
    .required("Required!")
    .matches(new RegExp(/^\S+@\S+\.\S+$/), 'Podaj e-maila.')
});


class Formularz extends React.Component {

  state = {}
  handleChange = (e, { value }) =>
    this.setState(
      { value }
    )

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            title: "",
            date: "",
            price: "",
            place: "",
            description: "",
            email: ""
          }}
          validationSchema={accountFormSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
              <Form className={styles.formContainer} onSubmit={handleSubmit}>
                <Form.Field>
                  <h1>Formularz dodawania wycieczki </h1>
                  <label>Tytuł wycieczki</label>
                  <Input placeholder='Tytuł wycieczki'
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    touched={touched}
                    errors={errors} />
                    {errors.title && touched.title && errors.title}
                </Form.Field>
                <Form.Field>
                  <label>Data wyjazdu</label>
                  <Input placeholder='Data wycieczki'
                    type="text"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    touched={touched}
                    errors={errors} />
                    {errors.date && touched.date && errors.date}
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
                  <Input placeholder='Cena'
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    touched={touched}
                    errors={errors} />
                  {errors.price && touched.price && errors.price}
                </Form.Field>
                <Form.Field>
                  <label>Lokalizacja</label>
                  <Input placeholder='Lokalizacja'
                    type="text"
                    name="place"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.place}
                    touched={touched}
                    errors={errors} />
                     {errors.place && touched.place && errors.place}
                </Form.Field>
                <TextArea label='Opis wycieczki' placeholder='Opisz wycieczkę jak najdokładniej, uwzględniając średni budzet oraz ciekawe miejsca, które warto odwiedzić.'
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  touched={touched}
                  errors={errors} />
                  {errors.description && touched.description && errors.description}
                <Form.Field>
                  <label>Twój e-mail</label>
                  <Input placeholder='Wpisz e-mail'
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    touched={touched}
                    errors={errors} />
                  {errors.email && touched.email && errors.email}
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Zgadzam się na otrzymywanie maili związanych z wprowadzoną przeze mnie ofertą.' />
                </Form.Field>
                <Button type='submit' disabled={isSubmitting}>Submit</Button>
              </Form>
            )}
        </Formik>
      </div>
    )
  };
};

export default Formularz;