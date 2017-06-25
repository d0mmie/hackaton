import React, { Component } from 'react';
import ReduxCon from '../redux/redux-connect'
import {Card,CardHeader,CardText,TextField,CircularProgress} from 'material-ui'
import {Link} from 'react-router-dom'

class HomePage extends Component {
    componentDidMount(){
        this.props.SetSelected(0)
    }
    render() {
        return (
            <div>
                {this.props.store.user?(this.props.store.isLogin === true?<Card style={{margin:20}} >
                    <CardHeader avatar={this.props.store.user.photoURL} actAsExpander showExpandableButton title="Submit your Cheer" subtitle={this.props.store.user?this.props.store.user.displayName:'Loading...'} />
                    <CardText expandable>
                        <p><TextField multiLine fullWidth floatingLabelText="Your descript" /></p>
                    </CardText>
                </Card>: <Card style={{margin:20}} >
                        <CardHeader title="You're not Sign in" />
                        <CardText>
                            <p>Clink <Link to="/profile">Here</Link></p>
                        </CardText>
                    </Card>):<div style={{textAlign:'center',padding:10}} ><CircularProgress /></div>}
            </div>
        );
    }
}

export default ReduxCon(HomePage);