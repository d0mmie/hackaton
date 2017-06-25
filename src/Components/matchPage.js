import React, { Component } from 'react';
import firebase from 'firebase'
import ReduxCon from '../redux/redux-connect'
import {Paper} from 'material-ui'

class MatchPage extends Component {
    componentDidMount() {
        firebase.database().ref().child('allPoll').child(this.props.match.params.match_id).on('value',(snap)=>{
            this.props.SetCheerData(snap.val())
        })
    }
    render() {
        return (
            <div>
                <Paper style={{padding:10}} zDepth={1}>

                </Paper>
            </div>
        );
    }
}

export default ReduxCon(MatchPage);