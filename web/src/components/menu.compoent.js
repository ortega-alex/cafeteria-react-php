import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { AsyncStorage } from 'AsyncStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollyFlatbed, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import UsuarioActions from '../_actions/usuario.actions';
import Tienda from './tienda/tienda.component';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('menu_tickets', (err, res) => {
            if (!err && res) {
                var menu = JSON.parse(res);
                if (menu.background && menu.color) {
                    this.setState({ background: menu.background, color: menu.color });
                }
            }
        });
        AsyncStorage.getItem('login_tickets', (err, res) => {
            if (!err && res && res != "undefined") {
                const user = JSON.parse(res);
                this.setState({ user });
            }
        });
    }

    render() {
        return (
            <HashRouter>
                <div style={{ overflowX: 'hidden', height: '100%', white: '100%' }}>
                    <nav className="navbar navbar-expand-lg navbar-dark" style={styles.nav}>
                    <div className="container">
                        <Link className="navbar-brand" to="/" >
                            #
                            </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" >
                                        <Tooltip title="Tienda">
                                            <FontAwesomeIcon icon={faDollyFlatbed} size="3x" color="white" />
                                        </Tooltip>
                                    </Link>
                                </li>

                                <li className="nav-item dropdown nav-login">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown"
                                        href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUser} color="white" size="3x" />
                                    </a>
                                    <div className="dropdown-menu">
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" onClick={this.cerrarSession.bind(this)}>
                                            <FontAwesomeIcon icon={faSignOutAlt} color="#9a0007" size="sm" /> &nbsp;
                                            logout
                                        </a>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="p-2">
                    <Route path="/" exact component={Tienda} />
                </div>
                </div>
            </HashRouter >
        );
    }

    cerrarSession() {
        this.props.dispatch(UsuarioActions.logout());
    }
}

const styles = {
    nav: {
        backgroundColor: '#5c6bc0'
    }
}

export default Menu;