import { TiendaConstants } from '../_constants/index';
import Funciones from '../_helpers/Funciones';

export default function _tiendas(state = {}, action) {
    switch (action.type) {
        case TiendaConstants.TND_REQUEST:
            return {
                ...state
            };
        case TiendaConstants.TND_FAILURE:
            Funciones.message("error", action.err.toString());
            return {
                ...state
            };
        case TiendaConstants.TND_SUCCESS:
            Funciones.message(action.tipo, action.msj.toString());
            return {
                ...state,
            };
        case TiendaConstants.TND_TIPOS:
            return {
                ...state, tipos: action.tipos
            };
        case TiendaConstants.TND_TIPOS_ACTIVOS:
            return {
                ...state, tipos_activos: action.tipos_activos
            };
            case TiendaConstants.TND_PRODUCTOS_ACTIVOS:
                return {
                    ...state, productos_activos: action.productos_activos
                };
        default:
            return state
    }
}