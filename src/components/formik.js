import React from 'react';
import { Formik } from 'formik';

export class AddTodoForm2 extends React.Component {
    constructor(props) {
        super(props);
    }

    submitForm = e => {
        e.preventDefault();
    }

    render() {
        return (
            <Formik
                initialValues={{ text: '', text2: '' }}
                onSubmit={(values, actions) => {
                    fetch('https://dreamteam-app.firebaseio.com/trip.json', {
                        method: 'POST',
                        body: JSON.stringify({ ...values, active: true })
                    }).then(() => {
                        actions.setSubmitting(false);
                    });
                }}>
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.name}
                            name="text"
                        />
                        <input
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.name}
                            name="text2"
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        )
    }
}
