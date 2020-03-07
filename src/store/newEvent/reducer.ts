import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  EventType,
  NewEventActions
} from './types';

const initialState: EventType = {
  title: '',
  notes: '',
  dates: []
}

export function newEventReducer(state = initialState, action: NewEventActions): EventType {
  switch (action.type) {
    case ADD_NEW_EVENT_TITLE:
      return {
        ...state,
        title: action.payload.title,
      }
    case ADD_NEW_EVENT_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
      }
    case ADD_NEW_EVENT_DATES:
      return {
        ...state,
        dates: action.payload.dates,
      }
    default:
      return state
  }
}
