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
import matchPage from './Components/matchPage';

ReactTapEvent()

class App extends Component {
  state = {
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      (user?(this.props.SetIsLogin(true),this.props.SetUser(user),firebase.database().ref().child('users').child(this.props.store.user.uid).child('cheerPoint').on('value',((snap)=>{
      this.props.SetCheerPoint(snap.val())
    }))):(this.props.SetIsLogin(false),this.props.SetUser({})))
    })
    
  }
  render() {
    return (
        <Router history={History} >      
      <div className="App" >
        <div>
          <Switch>
            <div style={{marginBottom:56}} >
              <Route path="/" exact component={HomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/m/:match_id" component={matchPage} />
            </div>
          </Switch>
        </div>
          
          <Paper zDepth={1} style={{position:'fixed',bottom:0,width:'100%',zIndex:999}}>
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
