import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { newEventReducer } from './newEvent/reducer';
import { loadEventsReducer } from "./events/reducer";
import { singleEventReducer } from "./singleEvent/reducer";

const rootReducer = combineReducers({
  newEvent: newEventReducer,
  events: loadEventsReducer,
  singleEvent: singleEventReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store;
