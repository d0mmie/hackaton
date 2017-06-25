import React, { Component } from 'react';
import firebase from 'firebase'
import ReduxCon from '../redux/redux-connect'
import {Paper,Slider,CircularProgress,Divider,RaisedButton,Dialog,FlatButton} from 'material-ui'

class MatchPage extends Component {
    state={
        voted:null,
        alert:false,
        alertText:''
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            (user?firebase.database().ref(`/users/${user.uid}/vote_log/${this.props.match.params.match_id}/voted`).on('value',(snap)=>{
            (snap.val() === true?this.setState({voted:true}) :this.setState({voted:false}))
        }):null)
        })
        // console.log(this.props.store.user.uid)
        firebase.database().ref().child('allPoll').child(this.props.match.params.match_id).on('value',(snap)=>{
            this.props.SetCheerData(snap.val())
        })
    }
    VoteTeam(team,no){
        firebase.database().ref(`/allPoll/${this.props.match.params.match_id}/vote_log`).push({
            uid:this.props.store.user.uid,
            team:team
        })
        firebase.database().ref(`/users/${this.props.store.user.uid}/vote_log/${this.props.match.params.match_id}`).set({
            voted:true
        })
        firebase.database().ref(`/allPoll/${this.props.match.params.match_id}/${no}`).once('value').then((res)=>{
            firebase.database().ref(`/allPoll/${this.props.match.params.match_id}/${no}`).set(res.val()+1)
        })
        firebase.database().ref(`/users/${this.props.store.user.uid}/cheerPoint`).once('value').then((res)=>{
            firebase.database().ref(`/users/${this.props.store.user.uid}/cheerPoint`).set(res.val()+200)
        })
        this.setState({voted:true,alert:true,alertText:'You got 200 CheerPoint'})
    }
    render() {
        return (
            <div>
                {this.props.store.cheerData?
                <div>
                    <Paper style={{padding:10}} zDepth={1}>
                        <p><h3>{this.props.store.cheerData.teamOne} VS {this.props.store.cheerData.teamTwo}</h3></p>
                    </Paper>
                    <Paper style={{padding:10,marginTop:10}} zDepth={1}>
                        <p style={{textAlign:'center'}} ><strong>Score</strong></p>
                        <p><Slider value={this.props.store.cheerData.CheerOne === this.props.store.cheerData.CheerTwo?0.5:(this.props.store.cheerData.CheerOne/(this.props.store.cheerData.CheerTwo+this.props.store.cheerData.CheerOne))} disabled /></p>
                        <p>{this.props.store.cheerData.teamOne} : {this.props.store.cheerData.CheerOne} ({(this.props.store.cheerData.CheerOne === this.props.store.cheerData.CheerTwo?0.5:(this.props.store.cheerData.CheerOne/(this.props.store.cheerData.CheerTwo+this.props.store.cheerData.CheerOne))) * 100} %)</p>
                        <p>{this.props.store.cheerData.teamTwo} : {this.props.store.cheerData.CheerTwo} ({(1-(this.props.store.cheerData.CheerOne === this.props.store.cheerData.CheerTwo?0.5:(this.props.store.cheerData.CheerOne/(this.props.store.cheerData.CheerTwo+this.props.store.cheerData.CheerOne)))) * 100} %)</p>
                    </Paper>
                    {this.state.voted===false?<Paper style={{padding:10,marginTop:10,textAlign:'center'}}  zDepth={1}>
                        <p><strong>Vote</strong></p>
                        <span><RaisedButton onTouchTap={()=>this.VoteTeam(this.props.store.cheerData.teamOne,'CheerOne')} primary label={this.props.store.cheerData.teamOne} /></span> OR <span><RaisedButton onTouchTap={()=>this.VoteTeam(this.props.store.cheerData.teamOne,'CheerTwo')} secondary label={this.props.store.cheerData.teamTwo} /></span>
                    </Paper>:null}
                </div>: <Paper style={{padding:10,textAlign:'center'}} zDepth={1} ><CircularProgress /></Paper>}
                <Dialog
                        title="Error"
                        actions={<FlatButton primary label="OK" onTouchTap={()=>this.setState({alert:false})} />}
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

export default ReduxCon(MatchPage);