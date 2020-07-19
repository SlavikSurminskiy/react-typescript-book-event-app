import axios, { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './../index';
import { EventType } from './../newEvent/types';
import { LoadEventsActions } from './types';
import { loadEventsBegin, loadEventsSuccess, loadEventsFailure } from './actions';


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
