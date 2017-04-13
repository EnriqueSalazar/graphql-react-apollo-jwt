import * as types from '../constants/ActionTypes'
import Data from '../service/data.json'

const fetchService = payload => ({type: types.FETCH_SERVICE, payload})

// loads data emulating a fetch service.
export const loadData = () => {
  return (dispatch) => {
    dispatch(fetchService(Data.data))
  }
}

export const add = payload => ({type: types.ADD, payload})
