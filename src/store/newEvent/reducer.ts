import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  SAVE_NEW_EVENT_BEGIN,
  SAVE_NEW_EVENT_SUCCESS,
  SAVE_NEW_EVENT_FAILURE,
  EventType,
  NewEventActions,
  EventStatusType
} from './types';

type InitialStateType = EventType & EventStatusType

const initialState: InitialStateType = {
  title: '',
  notes: '',
  dates: [],
  isSaved: false,
  statusText: null,
  isSending: false
}

export function newEventReducer(state = initialState, action: NewEventActions): InitialStateType {
  switch (action.type) {
    case ADD_NEW_EVENT_TITLE:
      return {
        ...state,
        title: action.payload.title,
        isSaved: false,
        statusText: null,
      }
    case ADD_NEW_EVENT_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
        isSaved: false,
        statusText: null,
      }
    case ADD_NEW_EVENT_DATES:
      return {
        ...state,
        dates: action.payload.dates,
        isSaved: false,
        statusText: null,
      }
    case SAVE_NEW_EVENT_BEGIN:
      return {
        ...state,
        isSending: action.payload.isSending
      }
    case SAVE_NEW_EVENT_SUCCESS:
      return {
        ...state,
        isSending: action.payload.status.isSending,
        isSaved: action.payload.status.isSaved,
        eventId: action.payload.status.eventId,
        statusText: action.payload.status.statusText,
      }
    case SAVE_NEW_EVENT_FAILURE:
      return {
        ...state,
        isSending: action.payload.error.isSending,
        isSaved: action.payload.error.isSaved,
        statusText: action.payload.error.statusText,
      }
    default:
      return state
  }
}
