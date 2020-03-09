import React, { Component } from "react";
import { connect } from 'react-redux';
import { Tooltip, Button } from 'antd';
import TiendaActions from '../../_actions/tienda.actions';
import server from '../../_services/server.services';
import Producto from './producto.component';

const _fondo = require('../../media/fondo_cafe.jpg');

class Tienda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_tipo: undefined
        }
    }

    componentDidMount() {
        this.props.dispatch(TiendaActions.GetTiposActivos());
    }

    render() {
        const { tipos_activos } = this.props;
        const { id_tipo } = this.state;
        return (
            <div className="fondo_menu" style={{ backgroundImage: `url(${_fondo})` }}>
                <div className="container">
                    <div className="row" style={{ border: 'solid white 1px', position: 'relative' }}>
                        <div className="col-md-2">
                            <div data-component="sidebar">
                                <div className="sidebar">
                                    <ul className="list-group flex-column d-inline-block first-menu">
                                        {tipos_activos && tipos_activos.map((item, i) => {
                                            return (
                                                <li onClick={() => this.handlerDetalleMenu(item)} key={i} className="list-group-item py-2">
                                                    <Tooltip title={item.nombre}>
                                                        <a href="#">
                                                            <img src={server._url + '/public/img/' + item.path} width="60" className="mr-4" />
                                                        </a>
                                                    </Tooltip>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {id_tipo && <Producto id_tipo={id_tipo} />}
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handlerDetalleMenu(producto) {
        this.setState({ id_tipo: producto.id_tipo })
    }
}

function MapStartToProps(state) {
    const { _tiendas } = state;
    const { tipos_activos } = _tiendas;
    return { tipos_activos };
}

export default connect(MapStartToProps)(Tienda);