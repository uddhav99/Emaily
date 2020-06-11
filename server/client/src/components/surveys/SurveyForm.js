// surveyForm shows a form for the user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // very similar to connect function- makes sure surveyFrom has access to reducer
import SurveyField from './SurveyField';
import _ from 'lodash';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {

    renderFields() {
        return (
            _.map(FIELDS, field => {
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
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit">Submit!</button>
                </form>
            </div>
        );
    }
}

// the names are essentially for the store 
// now the redux store form component has a property called surveyTitle which has text in it

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm); // this passes in some props to this particular component