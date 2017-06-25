import React, { Component } from 'react';
import ReduxCon from '../redux/redux-connect'

class ProfilePage extends Component {
    componentDidMount(){
        this.props.SetSelected(1)
    }
    render() {
        return (
            <div>
                Hello Hi
            </div>
        );
    }
}

export default ReduxCon(ProfilePage);