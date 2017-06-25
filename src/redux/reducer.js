export default (state={selected:null},action) => {
    switch(action.type){
        case "SET_isLogin":return{...state,isLogin:action.payload}
        case "SET_User":return{...state,user:action.payload}
        case "SET_Navigation":return{...state,selected:action.payload}
        case "SET_CheerPoint":return{...state,cheerPoint:action.payload}
        case "SET_CheerMatch":return{...state,cheerData:action.payload}
        default:return state
    }
}