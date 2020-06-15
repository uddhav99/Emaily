import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
    return (
        <div style={{ textAlign:"center" }}>
            <SurveyList />
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red" style={{marginRight: "150px", marginBottom: "50px"}}>
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;