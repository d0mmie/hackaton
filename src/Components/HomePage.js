import React, { Component } from 'react';
import ReduxCon from '../redux/redux-connect'
import {Card,CardHeader,CardText,TextField,CircularProgress,Paper} from 'material-ui'
import {Link} from 'react-router-dom'
import firebase from 'firebase'

class HomePage extends Component {
    state = {
        team1:'',
        team2:'',
        descript:'',
        allPoll:null,
        loading:true
    }
    componentDidMount(){
        firebase.database().ref().child('allPoll').on('value',(snap)=>{
            this.setState({allPoll:snap.val(),loading:false})
        })
        this.props.SetSelected(0)
    }
    render() {
        return (
            <div>
                {this.props.store.user?(this.props.store.isLogin === true?<Card >
                    <CardHeader avatar={this.props.store.user.photoURL} actAsExpander showExpandableButton title="Submit your Cheer" subtitle="Tap to expand" />
                    <CardText expandable>
                        <p><TextField value={this.state.descript} onChange={(e)=>this.setState({descript:e.target.value})} multiLine fullWidth floatingLabelText="Your descript" /></p>
                        <p></p>
                    </CardText>
                </Card>: <Card style={{margin:20}} >
                        <CardHeader title="You're not Sign in" />
                        <CardText>
                            <p>Clink <Link to="/profile">Here</Link></p>
                        </CardText>
                    </Card>):<div style={{textAlign:'center',padding:10}} ><CircularProgress /></div>}
                    {this.state.loading === false?(this.state.allPoll === null?<Paper style={{textAlign:'center',padding:20,marginTop:20,color:'#aaaaaa'}} zDepth={1} >Nothing Poll</Paper>:Object.keys(this.state.allPoll).map((key)=>
                        <Paper style={{padding:10,marginTop:20,cursor:'pointer'}} onTouchTap={()=>this.props.history.push(`/m/${key}`)}>
                         <p style={{fontWeight:'bold'}} >{this.state.allPoll[key].team1} vs {this.state.allPoll[key].team2}</p>
                         <p>{this.state.allPoll[key].descript}</p>
                        </Paper>
                    )):null}
            </div>
        );
    }
}

export default ReduxCon(HomePage);