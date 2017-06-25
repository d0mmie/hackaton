import React, { Component } from 'react';
import ReduxCon from '../redux/redux-connect'
import {RaisedButton,Card,CardHeader,CardActions,CardText} from 'material-ui'
import firebase from 'firebase'

class ProfilePage extends Component {
    componentDidMount(){
        this.props.SetSelected(1)
    }
    LoginFacebook=()=>{
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((data)=>{
            firebase.database().ref(`/users/${data.user.uid}`).once('value',(snap)=>{
                (snap.val() === null?firebase.database().ref(`/users/${data.user.uid}`).set({displayName:data.user.displayName,email:data.user.email,cheerPoint:0}):console.log('exist') )
            })
            
        })
    }
    Logout=()=>{
        firebase.auth().signOut()
    }
    render() {
        return (
            <div>
                {this.props.store.user ?(this.props.store.isLogin === false?<RaisedButton primary label="Login to Facebook" onTouchTap={this.LoginFacebook}  />:
                <Card>
                    <CardHeader title={this.props.store.user.displayName} subtitle={this.props.store.user.uid}  avatar={this.props.store.user.photoURL} />
                    <CardText>
                        <p>Your Chears Score : {this.props.store.cheerPoint}</p>
                    </CardText>
                    <CardActions>
                        <RaisedButton secondary label="SignOut" onTouchTap={this.Logout} />
                    </CardActions>
                </Card>
                ):null}
            </div>
        );
    }
}

export default ReduxCon(ProfilePage);