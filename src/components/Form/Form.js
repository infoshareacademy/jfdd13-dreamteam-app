import React, { Fragment, useState } from 'react';
import firebase from "../../firebase";
import { Form, Input, Button, Checkbox } from 'semantic-ui-react';
import styles from './Form.module.css';
import { Formik, Field } from "formik";
import { Continents } from "../Continents";
import { accountFormSchema } from "./YupSchema"

const truncateDecimals = (value, digits) => {
  const number = parseFloat(value)
  const multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
  return truncatedNum / multiplier;
};

const TripForm = () => {
  const [tYVisible, setTYVisible] = useState(false)

  const formikInitialValues = {
    title: "",
    date: "",
    price: "",
    city: "",
    continent: "",
    description: "",
    email: "",
    terms: false,
    tripImageUrl: ""
  }

  const handleThankYouVisible = () => {
    setTYVisible(!tYVisible)
  }

  const handleFormSubmit = (values, actions) => {
    fetch('https://dreamteam-app.firebaseio.com/trips.json', {
      method: 'POST',
      body: JSON.stringify({ ...values, active: true })
    }).then(() => {
      actions.setSubmitting(false);
      actions.resetForm();
      handleThankYouVisible()
    })
      .then(() => {
        localStorage.setItem('form', JSON.stringify({ ...values, active: true }))
      });
  }

  return (
    <Fragment>
      <h1> Formularz dodawania wycieczki</h1>
      <Formik
        initialValues={formikInitialValues}
        validationSchema={accountFormSchema}
        onSubmit={handleFormSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => {
          console.log(touched)
          return (
            <Form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className="form__item">
                <label>Tytuł wycieczki</label>
                <Field
                  placeholder='Wpisz zaproponowany tytuł wycieczki'
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
              </div>
              <div className="form__item">
                <label>Data wyjazdu</label>
                <Field
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
              </div>
              <div className="form__item">
                <label>Cena w złotówkach za dobę</label>
                <Field
                  placeholder='Wpisz cenę za dobę'
                  type="number"
                  name="price"
                  onChange={(e) => {
                    const { value } = e.target
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
              </div>
              <div className="form__item">
                <label>Lokalizacja</label>
                <Field
                  placeholder='Wpisz miasto'
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  touched={touched}
                  errors={errors}
                />
                <div className={styles.error}>
                  {errors.city && touched.city && errors.city}
                </div>
              </div>
              <div className="form__item">
                <label>Kontynent</label>
                <Field
                  as="select"
                  name="continent"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option defaultValue></option>
                  {Continents.map(continent => (
                    <option
                      key={continent.key}
                      value={continent.value}
                    >
                      {continent.text}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="form__item">
                <label>Opis wycieczki</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder='Opisz wycieczkę w kilku zdaniach, uwzględniając średni budzet oraz ciekawe miejsca, które warto odwiedzić.'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <div className={styles.error}>
                  {errors.description && touched.description && errors.description}
                </div>
              </div>
              <div className="form__item">
                <label>Twój e-mail</label>
                <Field
                  placeholder='Wpisz e-mail'
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
              </div>
              {/* TODO: change this input to Formik field */}
              <Form.Field>
                <label>Zdjęcie wycieczki</label>
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
                      () => { },
                      () => { },
                      () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                          .then((downloadURL) => setFieldValue('tripImageUrl', downloadURL));
                      })
                  }}
                />
                <div className={styles.error}>
                  {errors.tripImageUrl}
                </div>
              </Form.Field>
              <Form.Field>
                <Checkbox
                  checked={values.terms}
                  onChange={() => setFieldValue('terms', !values.terms)}
                  label='Zgadzam się na otrzymywanie maili związanych z wprowadzoną przeze mnie ofertą.'
                  name="terms"
                />
                <div className={styles.error}>
                  {errors.terms && touched.terms && errors.terms}
                </div>
              </Form.Field>
              <Button type='submit' disabled={isSubmitting}>Dodaj</Button>
              <p className={tYVisible ? styles.information : styles.invisible}>Dziękujemy za przesłanie wycieczki.</p>
            </Form>
          )
        }}
      </Formik>
    </Fragment>
  )
}

export default TripForm;