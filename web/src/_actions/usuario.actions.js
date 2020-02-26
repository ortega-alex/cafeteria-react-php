import { AsyncStorage } from 'AsyncStorage';
import { UsuarioConstants } from '../_constants/index';
import http from '../_services/http.services';

var moment = require('moment');
require("moment/min/locales.min");
moment.locale('es');

function request() { return { type: UsuarioConstants.REQUEST } }
function failure(err) { return { type: UsuarioConstants.FAILURE, err } }
function successLogin(tipo, msj, usuario = {}) { return { type: UsuarioConstants.LOGIN, tipo, msj, usuario } }

function login(data) {
    return dispatch => {
        dispatch(request());
        http._POST("usuario/usuario.php?login=true", data).then(res => {
            if (res.err == 'true') {
                dispatch(successLogin("warning", res.msj));
            } else if (res.usuario.restablecer == 0) {
                res.usuario.fecha = moment();
                AsyncStorage.setItem('login_cafeteria', JSON.stringify(res.usuario)).then(() => {
                    window.location.reload(true);
                });
            } else {
                dispatch(successLogin("success", res.msj, res.usuario));
            }
        }).catch(err => {
            dispatch(failure(err.toString()));
        })
    }
}

function changePass(data) {
    return dispatch => {
        dispatch(request());
        http._POST("usuario/usuario.php?change_pass=true", data).then(res => {
            if (res.err == 'true') {
                dispatch(successLogin("warning", res.msj));
            } else {
                dispatch(successLogin("success", res.msj));
            }
        }).catch(err => {
            dispatch(failure(err.toString()));
        })
    }
}

function logout() {
    AsyncStorage.setItem('login_cafeteria', undefined).then(() => {
        window.location.reload();
    });
    return { type: UsuarioConstants.LOGIN, tipo: 'success', mjs: 'Se cerro la session exitosamente', usuario: {} };
}


export default {
    login,
    changePass,
    logout
};