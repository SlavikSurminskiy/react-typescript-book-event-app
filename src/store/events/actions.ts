import {
  LOAD_EVENTS_BEGIN,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAILURE,
  LoadEventsActions,
  LoadEventsErrorResponse,
} from './types';

import axios, { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './../index';
import { EventType } from './../newEvent/types';


function loadEventsBegin(): LoadEventsActions {
  return {
    type: LOAD_EVENTS_BEGIN
  }
}

function loadEventsSuccess(events: EventType[]): LoadEventsActions {
  return {
    type: LOAD_EVENTS_SUCCESS,
    payload: {
      events
    }
  }
}

function loadEventsFailure(error: LoadEventsErrorResponse): LoadEventsActions {
  return {
    type: LOAD_EVENTS_FAILURE,
    payload: {
      error
    }
  }
}

type LoadEventsResponse = {
  events: EventType[]
}

export function loadEvents(): ThunkAction<void, RootState, unknown, LoadEventsActions> {
  return (dispatch) => {
    dispatch(loadEventsBegin());
    axios
      .get<LoadEventsResponse>('/api/events')
      .then(res => {
        dispatch(loadEventsSuccess(res.data.events));
      })
      .catch((err: AxiosError) => {
        dispatch(loadEventsFailure({
          statusText: err.response!.statusText,
          statusCode: err.response!.status,
        }));
      })
  }
}