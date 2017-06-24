export default (state,action) => {
    switch(action.type){
        case "SET_isLogin":return{...state,isLogin:action.payload}
        case "SET_User":return{...state,user:action.payload}
        default:return state
    }
}