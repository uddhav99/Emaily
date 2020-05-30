import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return(
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo"> 
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) { // passed in the entire state from the store
    return { auth: state.auth } // need to return an object that will be sent to header component as props
}

export default connect(mapStateToProps)(Header);