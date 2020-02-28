import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { AsyncStorage } from 'AsyncStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStoreAlt } from '@fortawesome/free-solid-svg-icons';

import UsuarioActions from '../../_actions/usuario.actions';
import Tienda from '../tienda/tienda.component';

require("./menu.css");

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
                <div className="contenido">
                    <Route path="/" exact component={Tienda} />
                </div>
                <div className="menu-contenido">
                    <nav className="menu">
                        <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open" />
                        <label className="menu-open-button" htmlFor="menu-open">
                            <span className="lines line-1"></span>
                            <span className="lines line-2"></span>
                            <span className="lines line-3"></span>
                        </label>

                        <Tooltip title="Tienda">
                            <a href="/" className="menu-item blue">
                                <FontAwesomeIcon icon={faStoreAlt} color="#9a0007" size="sm" />
                            </a>
                        </Tooltip>
                        <Tooltip title="Cerrar sesion">
                            <a className="menu-item green" onClick={this.cerrarSession.bind(this)}>
                                <FontAwesomeIcon icon={faUser} color="#9a0007" size="sm" />
                            </a>
                        </Tooltip>
                        {/* <a href="#" className="menu-item red">
                            <FontAwesomeIcon icon={faUserFriends} color="#9a0007" size="sm" />
                        </a>
                        <a href="#" className="menu-item purple">
                            <FontAwesomeIcon icon={faUserFriends} color="#9a0007" size="sm" />
                        </a>
                        <a href="#" className="menu-item orange">
                            <FontAwesomeIcon icon={faUserFriends} color="#9a0007" size="sm" />
                        </a>
                        <a href="#" className="menu-item lightblue">
                            <FontAwesomeIcon icon={faUserFriends} color="#9a0007" size="sm" />
                        </a> */}
                    </nav>
                </div>

            </HashRouter >
        );
    }

    cerrarSession() {
        this.props.dispatch(UsuarioActions.logout());
    }
}

export default Menu;