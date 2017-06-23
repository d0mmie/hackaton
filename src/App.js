import React, { Component } from 'react';
import {RaisedButton} from 'material-ui'
import ReactTapEvent from 'react-tap-event-plugin'

ReactTapEvent()

class App extends Component {
  state = {
    latitude:'',
    longtitude:''
  }
  
  render() {
   const getLocation= () =>{
    Notification.requestPermission().then((res) => console.log(res))
    navigator.geolocation.getCurrentPosition((geo)=>this.setState({latitude:geo.coords.latitude,longtitude:geo.coords.longitude}))
  }
    return (
      <div className="App">
        <RaisedButton label="Get Geo" onTouchTap={getLocation}  />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default App;
