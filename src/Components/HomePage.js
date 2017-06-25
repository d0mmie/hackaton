import React, { Component } from 'react';
import ReduxCon from '../redux/redux-connect'
import {Dialog,Card,CardHeader,CardText,TextField,CircularProgress,Paper,FlatButton,DropDownMenu,MenuItem,CardActions,RaisedButton} from 'material-ui'
import {Link} from 'react-router-dom'
import firebase from 'firebase'

class HomePage extends Component {
    state = {
        teamOne:'',
        teamTwo:'',
        descript:'',
        allPoll:null,
        loading:true,
        alert:false,
        alertText:''
    }
    footballTeam=[
        'Arsenal',
        'Bournemouth',
        'Brighton and Hove Albion',
        'Burnley',
        'Chelsea',
        'Crystal Palace',
        'Everton',
        'Huddersfield Town',
        'Leicester City',
        'Liverpool',
        'Manchester City',
        'Manchester United',
        'Newcastle United',
        'Southampton',
        'Stoke City',
        'Swansea City',
        'Tottenham Hotspur',
        'Watford',
        'West Bromwich Albion',
        'West Ham United'
    ]
    componentDidMount(){
        firebase.database().ref().child('allPoll').on('value',(snap)=>{
            this.setState({allPoll:snap.val(),loading:false})
        })
        this.props.SetSelected(0)
    }
    
    render() {
        const submitCheer = () =>{
        (this.state.teamOne === ''?this.setState({alert:true,alertText:'You must select team 1'}):(this.state.teamTwo === ''?this.setState({alert:true,alertText:'You must select team 2'}):firebase.database().ref().child('allPoll').push({
                teamOne:this.state.teamOne,
                teamTwo:this.state.teamTwo,
                descript:this.state.descript,
                author:this.props.store.user.uid,
                CheerOne:0,
                CheerTwo:0
            })))}
        return (
            <div>
                {this.props.store.user?(this.props.store.isLogin === true?<Card >
                    <CardHeader avatar={this.props.store.user.photoURL} actAsExpander showExpandableButton title="Submit your Cheer" subtitle="Tap to toggle expand" />
                    <CardActions>
                        <DropDownMenu value={this.state.teamOne} onChange={(e,i,val)=>this.setState({teamOne:val})}>
                            {this.footballTeam.map((data)=><MenuItem primaryText={data} disabled={this.state.teamTwo === data ? true:false} value={data} key={Math.random().toString()} />)}
                        </DropDownMenu> <span style={{fontSize:'2em',lineHeight:1.5}} >VS</span> <DropDownMenu value={this.state.teamTwo} onChange={(e,i,val)=>this.setState({teamTwo:val})}>
                            {this.footballTeam.map((data)=><MenuItem primaryText={data} disabled={this.state.teamOne === data ? true:false} value={data} key={Math.random().toString()} />)}
                        </DropDownMenu>
                    </CardActions>
                    <CardText expandable>
                        <p><TextField value={this.state.descript} onChange={(e)=>this.setState({descript:e.target.value})} multiLine fullWidth floatingLabelText="Your descript" /></p>
                    </CardText>
                    <CardActions style={{textAlign:'right'}} >
                        <RaisedButton label="Submit" secondary onTouchTap={submitCheer} />
                    </CardActions>
                </Card>: <Card >
                        <CardHeader style={{fontWeight:'bold'}} title="You're not Sign in" />
                        <CardText>
                            <p>Clink <FlatButton label="Here" onTouchTap={()=>this.props.history.push('/profile')} /> to Sign In</p>
                        </CardText>
                    </Card>):<div style={{textAlign:'center',padding:10}} ><CircularProgress /></div>}
                    {this.state.loading === false?(this.state.allPoll === null?<Paper style={{textAlign:'center',padding:20,marginTop:20,color:'#aaaaaa'}} zDepth={1} >Nothing Poll</Paper>:Object.keys(this.state.allPoll).map((key)=>
                        <Paper style={{padding:10,marginTop:20,cursor:'pointer'}} onTouchTap={()=>this.props.history.push(`/m/${key}`)}>
                         <p style={{fontWeight:'bold'}} >{this.state.allPoll[key].teamOne} vs {this.state.allPoll[key].teamTwo}</p>
                         <p>{this.state.allPoll[key].descript}</p>
                        </Paper>
                    )):null}
                     <Dialog
                        title="Error"
                        actions={'actions'}
                        modal={false}
                        open={this.state.alert}
                        onRequestClose={()=>this.setState({alert:false})}
        >
          {this.state.alertText}
        </Dialog>
            </div>
        );
    }
}

export default ReduxCon(HomePage);