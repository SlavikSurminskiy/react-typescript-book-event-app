import axios, { AxiosError } from 'axios';
import { RootState } from './../index';
import { ThunkAction } from 'redux-thunk';

import {
  loadSingleEventBegin,
  loadSingleEventSuccess,
  calcParticipantCount,
  loadSingleEventFailure,
  saveParticipantBegin,
  saveParticipantSuccess,
  saveParticipantFailure,
} from './actions'
import { SingleEventActions, SingleEventType } from "./types";

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
        dispatch(calcParticipantCount());
      })
      .catch((err: AxiosError) => {
        dispatch(loadSingleEventFailure({
          statusText: err.response!.statusText,
          statusCode: err.response!.status,
        }));
      })
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
        dispatch(calcParticipantCount());
      })
      .catch((err: AxiosError) => {
        dispatch(saveParticipantFailure({
          statusText: err.response!.statusText,
          statusCode: err.response!.status,
        }));
      })
  }
}
