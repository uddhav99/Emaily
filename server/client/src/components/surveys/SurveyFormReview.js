// shows users their form for final review and submit 
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


// history is a part of withRouter
// submitSurvey is an action creator
const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entry</h5>
            {reviewFields}
            <button 
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button 
                onClick={() => submitSurvey(formValues, history)}
                className="green btn-flat right white-text"
            >
                Send Survey 
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

// formvalues properties determined by the 'name' in surveyForm

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
// withrouter = we need to give the action creater the freedom to change routes once the action is made