import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { newEventReducer } from './newEvent/reducer';

const rootReducer = combineReducers({
  newEvent: newEventReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools())
export default store;
