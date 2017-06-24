import {connect} from 'react-redux'
import reduxAction from './reduxAction'

export default (component)=> connect(reduxAction.mapStatetoProps,reduxAction.mapDispatchtoProps)(component)