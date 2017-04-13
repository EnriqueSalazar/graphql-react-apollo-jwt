// handles the state of the data in the store, and future functionality when
// items get selected
import {FETCH_SERVICE, ADD} from '../constants/ActionTypes'

const initialState = {
  data: []
}

export default function todos (state = initialState, action) {
  debugger//eslint-disable-line
  switch (action.type) {
    case FETCH_SERVICE:
      return {
        ...state,
        data: action.payload
      }

    case ADD:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload
        ]
      }
    default:
      return state
  }
}
