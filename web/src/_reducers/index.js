import { combineReducers } from 'redux';

import _usuarios from './usuario.reducers';
import _tiendas from './tienda.reducers';

export default combineReducers({
    _usuarios,
    _tiendas
});