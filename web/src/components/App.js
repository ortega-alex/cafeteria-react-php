import React, { Component } from 'react';
import { AsyncStorage } from "AsyncStorage";
import store from './ConfigureStore';
import { Provider } from 'react-redux';

import Loading from '../_helpers/loading.component';
import Menu from './menu/menu.compoent';
import Login from './usuario/login.compoent';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cargando: true,
            login: undefined
        };
    }

    componentDidMount() {
        this.comprobarSesion();
    }

    render() {
        const { cargando, login } = this.state;
        return (
            <Provider store={store}>
                <div className="app">
                    {(cargando == true) &&
                        <div className="fondo">
                            <Loading />
                        </div>
                    }
                    {(login == true) &&
                        <Menu />
                    }
                    {(login == false) &&
                        <Login />
                    }
                </div>
            </Provider>
        );
    }

    async comprobarSesion() {
        AsyncStorage.getItem('login_cafeteria', (err, res) => {
            if (!err && res && res != "undefined") {
                this.setState({ login: true, cargando: false });
            } else {
                this.setState({ login: false, cargando: false });
            }
        });
    }
}

export default App;