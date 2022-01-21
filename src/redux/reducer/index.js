import { SET_MATCH, SET_PLAYERS, SET_SQUADS, SET_NEW_SQUAD } from "../constant";
import { combineReducers } from "redux";
const matchState = {
  matchData: [],
};

const playerState = {
  playerData: [],
};
const squadsState = {
  squadsData: [],
}

const newSquadState = {
  newSquadData: {}
} 

const matchReducer = (state = matchState, action) => {
  switch (action.type) {
    case SET_MATCH:
      return { ...state, matchData: action.payload };
    default:
      return state;
  }
};

const playersReducer = (state = playerState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return { ...state, playerData: action.payload };
    default:
      return state;
  }
};

const squadsReducer = (state = squadsState, action) => {
  switch (action.type) {
    case SET_SQUADS:
      return { ...state, squadsData: [...state.squadsData, action.payload] };
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