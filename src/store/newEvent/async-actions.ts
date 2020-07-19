import axios, { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './../index';
import { NewEventActions, AddNewEventResponse } from './types';
import { saveNewEventBegin, saveNewEventSuccess, saveNewEventFailure } from './actions';

export function saveNewEvent(): ThunkAction<void, RootState, unknown, NewEventActions> {
  return (dispatch, getState) => {
    dispatch(saveNewEventBegin());
    const eventPostData = getState().newEvent;
    axios
      .post<AddNewEventResponse>('/api/createEvent', {
        newEvent: {
          title: eventPostData.title,
          notes: eventPostData.notes,
          dates: eventPostData.dates,
        }
      })
      .then(res => {
        dispatch(saveNewEventSuccess({
          _id: res.data._id,
          statusText: 'Event was saved',
        }));
      })
      .catch((err: AxiosError) => {
        dispatch(saveNewEventFailure({
          statusText: err.response!.statusText,
          statusCode: err.response!.status,
        }));
      })
  }
}
