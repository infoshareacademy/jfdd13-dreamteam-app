import React from 'react';
import { Form, Input, TextArea, Button, Checkbox, Radio } from 'semantic-ui-react';
import styles from './Form.module.css';
import * as Yup from "yup";
import { Formik } from "formik";

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(40, 'Tytuł za długi, skróć do 40 znaków.')
    .required("Pole wymagane.")
    .matches(new RegExp(/^[a-zA-Z0-9_ ]*$/), "Używaj wyłącznie liter i spacji."),
  date: Yup.string()
    .matches(new RegExp(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/), 'Zły format   daty.')
    .required("Pole wymagane."),
  price: Yup.string()
    .matches(new RegExp(/^[0-9]*$/), 'Podaj cenę, używając cyfr.')
    .required("Pole wymagane."),
  city: Yup.string()
    .matches(new RegExp(/^[A-Za-z]+$/), "Używaj wyłącznie liter.")
    .required("Pole wymagane."),
  continent: Yup.string()
    .max(20, 'Tekst za długi.')
    .required("Pole wymagane.")
    .matches(new RegExp(/^[a-zA-Z0-9_ ]*$/), "Używaj wyłącznie liter i spacji."),
  description: Yup.string()
    .max(200, "Opis za długi, skróć tekst do 200 znaków."),
  email: Yup.string()
    .required("Pole wymagane.")
    .matches(new RegExp(/^\S+@\S+\.\S+$/), 'Nieprawidłowy format e-maila.'),
  terms: Yup.boolean()
    .oneOf([true], 'Zaznacz pole powyżej.'),
});



class Formularz extends React.Component {

  state = {
    thankYouVisible: false
  }

  handleChange = (e, { value }) =>
    this.setState(
      { value }
    )

  handleThankYouVisible() {

    this.setState({
      thankYouVisible: true
    })
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            title: "",
            date: "",
            price: "",
            city: "",
            continent: "",
            description: "",
            email: "",
            terms: false
          }}
          validationSchema={accountFormSchema}
          onSubmit={(values, actions) => {
            fetch('https://dreamteam-app.firebaseio.com/trip.json', {
              method: 'POST',
              body: JSON.stringify({ ...values, active: true })
            }).then(() => {
              actions.setSubmitting(false);
              actions.resetForm();
              this.handleThankYouVisible()
            });
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
              <Form className={styles.formContainer} onSubmit={handleSubmit}>
                <Form.Field>
                  <h1> Formularz dodawania wycieczki</h1>
                  <label>Tytuł wycieczki</label>
                  <Input placeholder='Wpisz zaproponowany tytuł wycieczki'
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    touched={touched}
                    errors={errors} />
                  <div className={styles.error}>
                    {errors.title && touched.title && errors.title}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Data wyjazdu w formacie DD/MM/YYYY</label>
                  <Input placeholder='Wpisz datę wyjazdu'
                    type="text"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    touched={touched}
                    errors={errors}
                  />
                  <div className={styles.error}>
                    {errors.date && touched.date && errors.date}
                  </div>
                </Form.Field>
 
                <Form.Field>
                  <label>Cena w złotówkach za dobę</label>
                  <Input placeholder='Wpisz cenę za dobę'
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    touched={touched}
                    errors={errors} />
                  <div className={styles.error}>
                    {errors.price && touched.price && errors.price}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Lokalizacja</label>
                  <Input placeholder='Wpisz miasto'
                    type="text"
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    touched={touched}
                    errors={errors} />
                  <div className={styles.error}>
                    {errors.city && touched.city && errors.city}</div>
                </Form.Field>
                <Form.Field>
                  <label>Kontynent</label>
                  <Input placeholder='Wpisz kontynent'
                    type="text"
                    name="continent"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.continent}
                    touched={touched}
                    errors={errors} />
                  <div className={styles.error}>
                    {errors.continent && touched.continent && errors.continent}</div>
                </Form.Field>
                <Form.Field>
                  <label>Opis wycieczki</label>
                  <TextArea label='Opis wycieczki' placeholder='Opisz wycieczkę w kilku zdaniach, uwzględniając średni budzet oraz ciekawe miejsca, które warto odwiedzić.'
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    touched={touched}
                    errors={errors} />
                  <div className={styles.error}>
                    {errors.description && touched.description && errors.description}</div>
                </Form.Field>
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
                  <div className={styles.error}>
                    {errors.email && touched.email && errors.email}
                  </div>
                </Form.Field>
                <Form.Field>
                  <Checkbox checked={values.terms} onChange={() => setFieldValue('terms', !values.terms)} label='Zgadzam się na otrzymywanie maili związanych z wprowadzoną przeze mnie ofertą.'
                    name="terms" />
                  <div className={styles.error}>
                    {errors.terms && touched.terms && errors.terms}
                  </div>
                </Form.Field>
                <Button type='submit' disabled={isSubmitting}>Dodaj</Button>
                <p className={this.state.thankYouVisible ? styles.information : styles.invisible}>Dziękujemy za przesłanie wycieczki.</p>
              </Form>
            )}
        </Formik>
      </div>
    )
  };
};

export default Formularz;