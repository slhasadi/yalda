import { combineReducers } from 'redux';
import { loginReducer, UserReducer } from './auth.js';
import { contentReducer } from "./content";
export default combineReducers({loginReducer, UserReducer, contentReducer});