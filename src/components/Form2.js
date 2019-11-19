import React from "react";
import { Formik } from "formik";
import { Input } from "semantic-ui-react";
import * as Yup from "yup";

const accountFormSchema = Yup.object().shape({
  email: Yup.string()
    .max(100, "Too long buddy")
    .email("Wrong email!")
    .required("Required!"),
  password: Yup.string()
    .min(8, "Too short! Min 8 chars")
    .matches(new RegExp(/[a-zA-Z]\d\s/g), "Wrong password format."),
  phoneNumber: Yup.string().required("Required!")
});

const TextInput = props => {
  const { name, errors, touched } = props;
  return (
    <div>
      <Input {...props} error={errors[name] && touched[name]} />
      <div>{errors[name] && touched[name] && errors[name]}</div>
    </div>
  );
};

const AccountForm = () => (
  <div>
    <Formik
      initialValues={{
        email: "",
        password: "",
        phoneNumber: ""
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
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            touched={touched}
            errors={errors}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            touched={touched}
            errors={errors}
          />
          <TextInput
            type="text"
            name="phoneNumber"
            placeholder="Phone number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phoneNumber}
            touched={touched}
            errors={errors}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  </div>
);

export default AccountForm;
