import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  SAVE_NEW_EVENT_BEGIN,
  SAVE_NEW_EVENT_SUCCESS,
  SAVE_NEW_EVENT_FAILURE,
  EventType,
  NewEventActions,
} from './types';

type InitialStateType = EventType & {
  isSaved: boolean
  isSending: boolean
  statusText: string | null
  statusCode: number | null
}

const initialState: InitialStateType = {
  title: '',
  notes: '',
  dates: [],
  _id: '',
  isSaved: false,
  statusText: null,
  statusCode: null,
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
        isSending: true
      }
    case SAVE_NEW_EVENT_SUCCESS:
      return {
        ...state,
        _id: action.payload.status._id,
        isSending: false,
        isSaved: true,
        statusText: action.payload.status.statusText,
      }
    case SAVE_NEW_EVENT_FAILURE:
      return {
        ...state,
        isSending: false,
        isSaved: false,
        statusText: action.payload.error.statusText,
        statusCode: action.payload.error.statusCode,
      }
    default:
      return state
  }
}
