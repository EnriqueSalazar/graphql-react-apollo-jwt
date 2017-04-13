import {combineReducers} from 'redux'
import main from './mainReducer'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({main, routing: routerReducer})

export default rootReducer
