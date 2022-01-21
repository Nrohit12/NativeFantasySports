import {SET_MATCH, SET_PLAYERS, SET_SQUADS, SET_NEW_SQUAD} from '../constant'
import {apiMatch} from "../constant/api"
import {api_key} from '../constant/api_key'

export const setMatch = (url) => async (dispatch) => {
  // const response = await apiMatch.get(`/?x-access-token=${api_key}`);
  
  dispatch({ type: SET_MATCH, payload: 'hello' });
};

export const setPlayers = (url) => async (dispatch) => {
  const response = await api.get(url);
  dispatch({ type: SET_PLAYERS, payload: response.data });
};

export const setSquads = (item) => {
  console.log('set squads called.')
  return {
    type: SET_SQUADS,
    payload: item,
  };
};

export const setNewSquad = (item) => {
  return {
    type: SET_NEW_SQUAD,
    payload: item,
  };
};