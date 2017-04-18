// handles the state of the data in the store, and future functionality when
// items get selected
import {
  FETCH_SERVICE, ADD, GET_COOKIE, CLEAR_SESSION
} from '../constants/ActionTypes'

const initialState = {
  data: [],
  session: {}
}

export default function todos (state = initialState, action) {
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
    case GET_COOKIE:
      console.info('action.payload', action.payload)
      return {
        ...state,
        session:
          action.payload
      }
    case CLEAR_SESSION:
      return {
        ...state,
        session: {}
      }
    default:
      return state
  }
}
