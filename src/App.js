import React, { Component } from 'react';
import {RaisedButton,BottomNavigation,BottomNavigationItem,Paper} from 'material-ui'
import ReactTapEvent from 'react-tap-event-plugin'
import ReduxCon from './redux/redux-connect'
import firebase from 'firebase'
import {ActionHome,SocialPerson} from 'material-ui/svg-icons'
import {grey200} from 'material-ui/styles/colors'
import {Route,Router,Switch} from 'react-router-dom'
import History from './history'
import HomePage from './Components/HomePage'
import ProfilePage from './Components/ProfilePage'

ReactTapEvent()

class App extends Component {
  state = {
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      (user?(this.props.SetIsLogin(true),this.props.SetUser(user)):(this.props.SetIsLogin(false),this.props.SetUser({})))
    })
  }
  LoginFacebook=()=>{
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res)=>console.log('Hello'))
  }
  render() {
    return (
        <Router history={History} >      
      <div className="App" >
        <div>
          <Switch>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/profile" component={ProfilePage} />
            </div>
          </Switch>
        </div>
          
          <Paper zDepth={1} style={{position:'fixed',bottom:0,width:'100%'}}>
            <BottomNavigation selectedIndex={this.props.store.selected}  >
              <BottomNavigationItem label="Home" onTouchTap={()=>History.push("/")} icon={<ActionHome />} />
              <BottomNavigationItem label="Profile" onTouchTap={()=>History.push("/profile")} icon={<SocialPerson />} /> 
            </BottomNavigation>
          </Paper>
      </div>
        </Router>
    );
  }
}

export default ReduxCon(App);
