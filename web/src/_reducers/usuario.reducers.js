import { UsuarioConstants } from '../_constants/index';
import Funciones from '../_helpers/Funciones';

export default function _usuarios(state = {}, action) {
    switch (action.type) {
        case UsuarioConstants.REQUEST:
            return {
                ...state
            };
        case UsuarioConstants.FAILURE:
            Funciones.message("error", action.err.toString());
            return {
                ...state
            };
        case UsuarioConstants.LOGIN:
            Funciones.message(action.tipo, action.msj.toString());
            return {
                ...state,
                usuario: action.usuario           
            };
        default:
            return state
    }
}