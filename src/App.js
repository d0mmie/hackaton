import React, { Component } from 'react';
import {RaisedButton,BottomNavigation,BottomNavigationItem,Paper} from 'material-ui'
import ReactTapEvent from 'react-tap-event-plugin'
import ReduxCon from './redux/redux-connect'
import firebase from 'firebase'
import {ActionHome,SocialPerson} from 'material-ui/svg-icons'
import {grey200} from 'material-ui/styles/colors'

ReactTapEvent()

class App extends Component {
  state = {
    selected:0
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      (user?(this.props.SetIsLogin(true),this.props.SetUser(user)):(this.props.SetIsLogin(false),this.props.SetUser({})))
    })
  }
  getLocation= () =>{
    Notification.requestPermission().then((res) => {
      if(res === 'granted'){
        new Notification('Hello',{
          body:'Hello',
          icon:'favicon.ico'
        })
      }
    })
    navigator.geolocation.getCurrentPosition((geo)=>this.setState({latitude:geo.coords.latitude,longtitude:geo.coords.longitude}))
  }
  LoginFacebook=()=>{
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res)=>console.log('Hello'))
  }
  render() {
    return (
      <div className="App" >
        <RaisedButton label="Login" onTouchTap={this.LoginFacebook}  />
        {JSON.stringify(this.state)}
        <Paper zDepth={1} style={{position:'fixed',bottom:0,width:'100%'}}>
           <BottomNavigation selectedIndex={this.state.selected}  >
          <BottomNavigationItem label="Home" icon={<ActionHome />} />
          <BottomNavigationItem label="Profile" icon={<SocialPerson />} /> 
        </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default ReduxCon(App);
