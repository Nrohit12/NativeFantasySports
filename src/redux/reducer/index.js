import { SET_MATCH, SET_PLAYERS, SET_SQUADS, SET_NEW_SQUAD, GET_SQUADS } from "../constant";
import { combineReducers } from "redux";
const matchState = {
  matchData: [],
  loading: true
};

const playerState = {
  playerData: [],
  loading: true
};
const squadsState = {
  squadsData: [],
  loading: true
}

const newSquadState = {
  newSquadData: {}
} 

const matchReducer = (state = matchState, action) => {
  switch (action.type) {
    case SET_MATCH:
      return {matchData: action.payload, loading: false };
    default:
      return state;
  }
};

const playersReducer = (state = playerState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { playerData: action.payload, loading: false };
    default:
      return state;
  }
};

const squadsReducer = (state = squadsState, action) => {
  switch (action.type) {
    case SET_SQUADS:
      return { ...state, squadsData: [...state.squadsData, action.payload] };
    case GET_SQUADS: 
      return {squadsData: action.payload, loading: false };
    default:
      return state;
  }
};

const newSquadReducer = (state = newSquadState, action) => {
  switch (action.type) {
    case SET_NEW_SQUAD:
      return { ...state, newSquadData: action.payload };
    default:
      return state;
  }
};


const reducers = combineReducers({
  allMatch: matchReducer,
  allPlayers: playersReducer,
  squad: squadsReducer,
  newSquad: newSquadReducer
});
export default reducers;