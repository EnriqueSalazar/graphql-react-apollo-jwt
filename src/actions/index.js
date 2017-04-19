import * as types from '../constants/ActionTypes'
import Data from '../service/data.json'
import cookie from 'react-cookie'

const fetchService = payload => ({type: types.FETCH_SERVICE, payload})

// loads data emulating a fetch service.
export const loadData = () => {
  return (dispatch) => {
    dispatch(fetchService(Data.data))
  }
}

export const add = payload => ({type: types.ADD, payload})

export const getSessionFromCookie = cookieName => {
  const cookieJSON = cookie.load(cookieName) || {}
  return {type: types.GET_COOKIE, payload: cookieJSON}
}
// Not used, cookie cleared from server
export const deleteSessionCookie = cookieName => {
  cookie.remove(cookieName)
  return {type: types.CLEAR_SESSION}
}
