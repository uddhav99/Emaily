// surveyForm shows a form for the user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // very similar to connect function- makes sure surveyFrom has access to reducer
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields() {
        return (
            _.map(formFields, field => {
                return (
                    <Field 
                        key={field.name} 
                        component={SurveyField} 
                        type="text" 
                        label={field.label} 
                        name={field.name}
                    />
                );
            })
        );
    }

    render () {
        return ( 
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to='/surveys' className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    
    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    })

    return errors;
}
// the names are essentially for the store 
// now the redux store form component has a property called surveyTitle which has text in it
// any custom prop added to the Field gets passed as props to the component - label gets passed to SurveyField

export default reduxForm({
    validate: validate,
    form: 'surveyForm', 
    destroyOnUnmount: false
})(SurveyForm); 

// this passes in some props to this particular component which is specific to redux form
// the form: surveyForm is redux form specific - passes stuff like handlesubmit to props 

// survey form - 'surveyForm' is the name of the object which contains form data in the store
// could have named surveyForm anything else, but would have to change other stuff accordingly
// like in surveyFormReview would have had to do state.form.x.values 