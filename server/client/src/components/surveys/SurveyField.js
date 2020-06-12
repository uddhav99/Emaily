// SurveyField contains information to render a label and text as input
import React from 'react';

// input and meta are possed in as props because of the Field tag it is being rendered by

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
}