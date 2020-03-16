import {
  ADD_NEW_PARTICIPANT_NAME,
  CHECK_NEW_DAY,
  LOAD_SINGLE_EVENT_BEGIN,
  LOAD_SINGLE_EVENT_SUCCESS,
  LOAD_SINGLE_EVENT_FAILURE,
  SAVE_PARTICIPANT_SUCCESS,
  SingleEventType,
  ParticipantType,
  EventErrorResponse,
  SingleEventActions,
} from './types';


type InitialStateType = SingleEventType & {
  newParticipant: ParticipantType
  isLoading: boolean
  isSaved: boolean
  error?: EventErrorResponse
}

const initialState: InitialStateType = {
  title: '',
  notes: '',
  dates: [],
  _id: '',
  newParticipant: { name: '', checkedDays: [] },
  participantsCount: [],
  participants: [],
  isLoading: false,
  isSaved: false,
}

export function singleEventReducer(state = initialState, action: SingleEventActions): InitialStateType {
  switch (action.type) {
    case ADD_NEW_PARTICIPANT_NAME:
      return {
        ...state,
        newParticipant: {
          ...state.newParticipant,
          name: action.payload.name
        }
      }
    case CHECK_NEW_DAY:
      return {
        ...state,
        newParticipant: {
          ...state.newParticipant,
          checkedDays: state.newParticipant.checkedDays.map((dayChecked, ind) => {
            if (ind === action.payload.dayIndex) {
              return action.payload.isChecked
            }
            return dayChecked
          }),
        }
      }
    case LOAD_SINGLE_EVENT_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case LOAD_SINGLE_EVENT_SUCCESS:
      const datesAmount = action.payload.event.dates.length;
      return {
        ...state,
        title: action.payload.event.title,
        notes: action.payload.event.notes,
        dates: action.payload.event.dates,
        _id: action.payload.event._id,
        participants: action.payload.event.participants,
        participantsCount: action.payload.event.participantsCount,
        newParticipant: {
          ...state.newParticipant,
          checkedDays: new Array(datesAmount).fill(false)
        },
        isSaved: true,
        isLoading: false,
      }
    case LOAD_SINGLE_EVENT_FAILURE:
      return {
        ...state,
        isSaved: false,
        isLoading: false,
        error: action.payload.error,
      }
    case SAVE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        participants: [...state.participants, action.payload.participant]
      }
    default:
      return state
  }
}