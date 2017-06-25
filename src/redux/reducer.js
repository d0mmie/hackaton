export default (state={selected:null},action) => {
    switch(action.type){
        case "SET_isLogin":return{...state,isLogin:action.payload}
        case "SET_User":return{...state,user:action.payload}
        case "SET_Navigation":return{...state,selected:action.payload}
        default:return state
    }
}