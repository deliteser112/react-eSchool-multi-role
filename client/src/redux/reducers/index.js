import {combineReducers} from "redux"
import login from "./loginReducer"
import token from "./tokenReducer"
import users from "./usersReducer"

export default combineReducers({
    login,
    token,
    users
})