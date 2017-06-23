export default (state,action) => {
    switch(action.type){
        case "SET_isLogin":return{...state,isLogin:action.payload}
        default:return state
    }
}