import {
  ADD_NEW_PARTICIPANT_NAME,
  CHECK_NEW_DAY,
  LOAD_SINGLE_EVENT_BEGIN,
  LOAD_SINGLE_EVENT_SUCCESS,
  LOAD_SINGLE_EVENT_FAILURE,
  SAVE_PARTICIPANT_BEGIN,
  SAVE_PARTICIPANT_SUCCESS,
  SAVE_PARTICIPANT_FAILURE,
  SingleEventType,
  ParticipantType,
  EventErrorResponse,
  SingleEventActions,
} from './types';

import axios, { AxiosError } from 'axios';
import { RootState } from './../index';
import { ThunkAction } from 'redux-thunk';

export function addNewParticipantName(name: string): SingleEventActions {
  return {
    type: ADD_NEW_PARTICIPANT_NAME,
    payload: {
      name
    }
  }
}

export function checkNewDay(dayIndex: number, isChecked: boolean): SingleEventActions {
  return {
    type: CHECK_NEW_DAY,
    payload: {
      dayIndex,
      isChecked,
    }
  }
}

function loadSingleEventBegin(): SingleEventActions {
  return {
    type: LOAD_SINGLE_EVENT_BEGIN
  }
}

function loadSingleEventSuccess(event: SingleEventType): SingleEventActions {
  return {
    type: LOAD_SINGLE_EVENT_SUCCESS,
    payload: {
      event
    }
  }
}

function loadSingleEventFailure(error: EventErrorResponse): SingleEventActions {
  return {
    type: LOAD_SINGLE_EVENT_FAILURE,
    payload: {
      error
    }
  }
}

// need change type of dates from type Date[] to string[]
// because dates come back from server as array of strings
type loadSingleEventResponse = {
  event: Omit<SingleEventType, 'dates'> & { dates: string[] }
}

export function loadSingleEvent(id: string): ThunkAction<void, RootState, unknown, SingleEventActions> {
  return (dispatch) => {
    dispatch(loadSingleEventBegin());
    axios
      .get<loadSingleEventResponse>('/api/event/' + id)
      .then(res => {
        const { event } = res.data;
        // convert response dates from string to JS Date object
        const dates = event.dates.map((d: string) => new Date(d));
        dispatch(loadSingleEventSuccess({ ...event, dates }));
      })
      .catch((err: AxiosError) => {
        dispatch(loadSingleEventFailure({
          statusText: err.response!.statusText,
          statusCode: err.response!.status,
        }));
      })
  }
}

function saveParticipantBegin(): SingleEventActions {
  return {
    type: SAVE_PARTICIPANT_BEGIN
  }
}

function saveParticipantSuccess(participant: ParticipantType): SingleEventActions {
  return {
    type: SAVE_PARTICIPANT_SUCCESS,
    payload: {
      participant
    }
  }
}

function saveParticipantFailure(error: EventErrorResponse): SingleEventActions {
  return {
    type: SAVE_PARTICIPANT_FAILURE,
    payload: {
      error
    }
  }
}

export function saveParticipant(): ThunkAction<void, RootState, unknown, SingleEventActions> {
  return (dispatch, getState) => {
    dispatch(saveParticipantBegin());
    const { _id, newParticipant } = getState().singleEvent;
    const { name, checkedDays } = newParticipant;
    axios
      .post(`/api/addParticipant/${_id}`, {
        participant: {
          name,
          checkedDays,
        }
      })
      .then(() => {
        dispatch(saveParticipantSuccess({
          name,
          checkedDays,
        }));
      })
      .catch((err: AxiosError) => {
        dispatch(saveParticipantFailure({
          statusText: err.response!.statusText,
          statusCode: err.response!.status,
        }));
      })
  }
}
