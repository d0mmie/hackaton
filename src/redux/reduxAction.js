export default {
    mapDispatchtoProps:(dispatch)=>{
        return {
            SetIsLogin:(status)=>{
                dispatch({
                    type:"SET_isLogin",
                    payload:status
                })
            }
        }
    },
    mapStatetoProps:(state)=>{
        return{
            store:state
        }
    }
}
