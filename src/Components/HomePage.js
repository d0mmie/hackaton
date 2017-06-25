import React, { Component } from 'react';
import ReduxCon from '../redux/redux-connect'

class HomePage extends Component {
    componentDidMount(){
        this.props.SetSelected(0)
    }
    render() {
        return (
            <div>
                Home
            </div>
        );
    }
}

export default ReduxCon(HomePage);