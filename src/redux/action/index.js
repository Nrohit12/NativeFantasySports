import {
  SET_MATCH,
  SET_PLAYERS,
  SET_SQUADS,
  SET_NEW_SQUAD,
  GET_SQUADS,
} from '../constant';
import {apiMatch} from '../constant/api';
import {api_key, config} from '../constant/api_key';
import axios from 'axios';

export const setMatch = url => async dispatch => {
  const url = 'http://15.206.110.130:5001/matches/upcoming-matches';
  await axios
    .get(`${url}`, config)
    .then(response => {
      dispatch({type: SET_MATCH, payload: response.data});
    })
    .catch(err => console.log(err.message));
};

export const setPlayers = id => async dispatch => {
  const url = `http://15.206.110.130:5001/squad/players?match_id=${id}`;
  await axios
    .get(`${url}`, config)
    .then(response => {
      // console.log(response.data)
      dispatch({type: SET_PLAYERS, payload: response.data});
    })
    .catch(err => console.log(err.message));
};

export const getSquads = id => async dispatch => {
  const url = `http://15.206.110.130:5001/squad?match_id=${id}`;
  await axios
    .get(`${url}`, config)
    .then(response => {
      // console.log(response.data);
      dispatch({type: GET_SQUADS, payload: response.data});
    })
    .catch(err => console.log(err.message));
};

export const setSquads = item => async dispatch => {
  console.log('set squads called.');
  // console.log(item);
  let data = [];
  item.squad.map(squads => data.push(squads.id));
  let itemToSend = {
    vice_captain_id: item.vice_captain_id-0,
    captain_id: item.captain_id-0,
    event_id: item.event_id,
    match_id: item.match_id,
    squad: data
  };
  
  const url = `http://15.206.110.130:5001/squad`;
  await axios
    .post(`${url}`, itemToSend, config)
    .then(response => {
      dispatch({type: SET_SQUADS, payload: response.data});
    })
    .catch(error => console.log(error));
};

export const setNewSquad = item => {
  return {
    type: SET_NEW_SQUAD,
    payload: item,
  };
};
