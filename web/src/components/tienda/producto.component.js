import React, { Component } from "react";
import { connect } from 'react-redux';
import tiendaActions from "../../_actions/tienda.actions";
import { Tooltip } from "antd";
import server from "../../_services/server.services";
import funciones from "../../_helpers/Funciones";

class Producto extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        const{id_tipo} = this.props;
        this.props.dispatch(tiendaActions.GetProductosActivos({id_tipo}));
    }
    render() {
        const {productos_activos}=this.props;
        return (
            <div>
                <div className="row">
                    {productos_activos && productos_activos.map((item,i)=>{
                        return(
                            <div className="col-md-3 productos" key={i}>
                                <Tooltip title={item.nombre}>
                                    <img src={server._url+"/public/img/"+item.path} width="200"/>
                                    <p className="h5 m-0 p-0 text-center">
                                        <b>
                                            Q {funciones.commaSeparateNumber(item.precio)}
                                        </b>
                                    </p>
                                </Tooltip>                                
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

function MapStartToProps(state) {
    const {_tiendas} = state; 
    const {productos_activos}= _tiendas;
    return {productos_activos};
}

export default connect(MapStartToProps)(Producto);