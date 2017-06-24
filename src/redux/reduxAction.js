export default {
    mapDispatchtoProps:(dispatch)=>{
        return {
            SetIsLogin:(status)=>{
                dispatch({
                    type:"SET_isLogin",
                    payload:status
                })
            },
            SetUser:(user)=>{
                dispatch({
                    type:"SET_User",
                    payload:user
                })
            },
            dispatch:dispatch
        }
    },
    mapStatetoProps:(state)=>{
        return{
            store:state
        }
    }
}
