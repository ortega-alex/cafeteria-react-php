import { TiendaConstants } from '../_constants/index';
import http from '../_services/http.services';

function request() { return { type: TiendaConstants.TND_REQUEST } }
function failure(err) { return { type: TiendaConstants.TND_FAILURE, err } }
function success(tipo, msj) { return { type: TiendaConstants.TND_SUCCESS, tipo, msj } }
function successGetTipos(tipos) { return { type: TiendaConstants.TND_TIPOS, tipos } }
function successGetTiposActivos(tipos_activos) { return { type: TiendaConstants.TND_TIPOS_ACTIVOS, tipos_activos } }
function successGetProductosActivos(productos_activos) { return { type: TiendaConstants.TND_PRODUCTOS_ACTIVOS, productos_activos } }


function GetTipos() {
    return dispatch => {
        dispatch(request());
        http._GET("tienda/tienda.php?get_tipos=true").then(res => {
            dispatch(successGetTipos( res.tipos)); 
        }).catch(err => {
            dispatch(failure(err.toString()));
        })
    }
}
function GetTiposActivos() {
    return dispatch => {
        dispatch(request());
        http._GET("tienda/tienda.php?get_tipos_activos=true").then(res => {
            dispatch(successGetTiposActivos( res.tipos_activos)); 
        }).catch(err => {
            dispatch(failure(err.toString()));
        })
    }
}
function GetProductosActivos(data){
    return dispatch =>{
        dispatch(request());
        http._POST("/tienda/tienda.php?get_productos_tipo=true",data).then(res=>{
            dispatch(successGetProductosActivos(res.productos_tipo));
        }).catch(err=>{
            dispatch(failure(err.toString()));
        })
    }
}
export default {
    GetTipos,
    GetTiposActivos,
    GetProductosActivos
};