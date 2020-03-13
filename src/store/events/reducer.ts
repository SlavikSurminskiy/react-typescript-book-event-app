import {
  LOAD_EVENTS_BEGIN,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAILURE,
  LoadEventsActions,
  LoadEventsErrorResponse,
} from './types';

import { EventType } from './../newEvent/types';

type InitialStateType = {
  events: EventType[]
  isLoading: boolean
  isSaved: boolean
  error?: LoadEventsErrorResponse
};

const initialState: InitialStateType = {
  events: [],
  isLoading: false,
  isSaved: false,
}

export function loadEventsReducer(state = initialState, action: LoadEventsActions): InitialStateType {
  switch (action.type) {
    case LOAD_EVENTS_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        isSaved: true,
        isLoading: false,
      }
    case LOAD_EVENTS_FAILURE:
      return {
        ...state,
        isSaved: false,
        isLoading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}