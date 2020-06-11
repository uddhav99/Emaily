// SurveyField contains information to render a label and text as input

import React from 'react';

export default ({ input, label }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
}