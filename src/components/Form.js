import React from 'react';
import firebase from "../firebase";
import { Form, Input, TextArea, Button, Checkbox, Select } from 'semantic-ui-react';
import styles from './Form.module.css';
import * as Yup from "yup";
import { Formik } from "formik";

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(40, 'Tytuł za długi, skróć do 40 znaków.')
    .required("Pole wymagane.")
    .matches(new RegExp(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/), "Używaj wyłącznie liter i spacji."),
  date: Yup.string()
    .required("Pole wymagane."),
  price: Yup.number()
    .moreThan(20, "Minimalna cena za dobę to 20 zł.")
    .lessThan(2001, "Maksymalna cena za dobę to 2000 zł.")
    .positive("Cena musi być liczba dodatnia")
    .required("Pole wymagane."),
  city: Yup.string()
    .matches(new RegExp(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/), "Używaj wyłącznie liter i spacji.")
    .required("Pole wymagane."),
  continent: Yup.string()
    .required("Pole wymagane."),
  description: Yup.string()
    .max(400, "Opis za długi, skróć tekst do 400 znaków."),
  email: Yup.string()
    .required("Pole wymagane.")
    .matches(new RegExp(/^\S+@\S+\.\S+$/), 'Nieprawidłowy format e-maila.'),
  terms: Yup.boolean()
    .oneOf([true], 'Zaznacz pole powyżej.'),
  tripImageUrl: Yup.string()
    .required("Zdjecie wycieczki jest wymagane")
});

const continents = [
  { key: 'afr', value: "Afryka", text: "Afryka" },
  { key: 'apd', value: "Ameryka Południowa", text: "Ameryka Południowa" },
  { key: 'apn', value: "Ameryka Północna", text: "Ameryka Północna" },
  { key: 'ant', value: "Antarktyda", text: "Antarktyda" },
  { key: 'aus', value: "Australia i Oceania", text: "Australia i Oceania" },
  { key: 'azj', value: "Azja", text: "Azja" },
  { key: 'eur', value: "Europa", text: "Europa" }
];

const truncateDecimals = function (value, digits) {
  const number = parseFloat(value)
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
  return truncatedNum / multiplier;
};

class Formularz extends React.Component {

  state = {
    thankYouVisible: false
  }

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
            terms: false,
            tripImageUrl: ""
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
            })
            .then(()=>{
              localStorage.setItem('form', JSON.stringify({ ...values, active: true }))
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
                  />
                  <div className={styles.error}>
                    {errors.title && touched.title && errors.title}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Data wyjazdu</label>
                  <Input
                    type="date"
                    name="date"
                    min="2019-12-01"
                    max="2022-01-01"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    touched={touched}
                  />
                  <div className={styles.error}>
                    {errors.date && touched.date && errors.date}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Cena w złotówkach za dobę</label>
                  <Input placeholder='Wpisz cenę za dobę'
                    type="number"
                    name="price"
                    onChange={(e)=>{
                      const {value} = e.target
                      const price = truncateDecimals(value, 2)
                      setFieldValue('price', price)
                    }}
                    onBlur={handleBlur}
                    value={values.price}
                    touched={touched}
                  />
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
                  <Select placeholder='Wybierz kontynent'
                   name="continent"
                   options={continents}
                    onChange={(event, data) => setFieldValue('continent', data.value)}
                    onBlur={handleBlur}
                    touched={touched}
                  />
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
                  />
                  <div className={styles.error}>
                    {errors.email && touched.email && errors.email}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Zdjecie wycieczki</label>
                  <Input
                    type="file"
                    name="tripImageUrl"
                    accept=".jpg, .jpeg, .png"
                    onChange={event => {
                      const firstFile = event.target.files[0]

                      const storageRef = firebase.storage().ref('trips')
                      const fileName = 'trip-' + new Date().toISOString()
                      const fileRef = storageRef.child(fileName + '.jpg')

                      const uploadTask = fileRef.put(firstFile)

                      uploadTask.on(
                          'state_changed',
                          () => {},
                          () => {},
                          () => {
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                              console.log('File available at', downloadURL);
                              setFieldValue('tripImageUrl', downloadURL)
                            });
                          })
                      }}
                  />
                  <div className={styles.error}>
                    {errors.tripImageUrl}
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