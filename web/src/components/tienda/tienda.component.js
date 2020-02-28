import React, { Component } from "react";
import { connect } from 'react-redux';

class Tienda extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>Tienda</div>
        );
    }
}

function MapStartToProps(state) {
    const { } = state;
    return {};
}

export default connect(MapStartToProps)(Tienda);