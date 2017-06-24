import React, { Component } from 'react';
import {RaisedButton} from 'material-ui'
import ReactTapEvent from 'react-tap-event-plugin'
import ReduxCon from './redux/redux-connect'
import firebase from 'firebase'

ReactTapEvent()

class App extends Component {
  state = {
  }
  componentDidMount() {
    this.props.SetIsLogin(true)
  }

  render() {
   const getLocation= () =>{
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
    return (
      <div className="App" >
        <RaisedButton label="Get Geo" onTouchTap={getLocation}  />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default ReduxCon(App);
