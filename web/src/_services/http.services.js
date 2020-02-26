import _server from './server.services';

const _URL = `${_server._url}/src/`;
const _HEADERS = {
    'Accept': 'application/json'
}

const http = {
    _POST,
    _GET
}

function _POST(_url, _data) {
    return fetch(_URL + _url, {
        method: 'POST',
        headers: _HEADERS,
        body: _data
    }).then(handleResponse);
}

function _GET(_url) {
    return fetch(_URL + _url, {
        method: 'GET',
        headers: _HEADERS
    }).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export default http;