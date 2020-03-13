import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { newEventReducer } from './newEvent/reducer';
import { loadEventsReducer } from "./events/reducer";

const rootReducer = combineReducers({
  newEvent: newEventReducer,
  events: loadEventsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store;
