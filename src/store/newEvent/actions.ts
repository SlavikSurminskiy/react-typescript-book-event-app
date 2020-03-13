import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  SAVE_NEW_EVENT_BEGIN,
  SAVE_NEW_EVENT_SUCCESS,
  SAVE_NEW_EVENT_FAILURE,
  EventDatesType,
  NewEventActions,
  AddNewEventResponse,
  AddNewEventErrorResponse,
} from './types';

import axios, { AxiosError } from 'axios';
import { RootState } from './../index';
import { ThunkAction } from 'redux-thunk';

export function addNewEventTitle(title: string): NewEventActions {
  return {
    type: ADD_NEW_EVENT_TITLE,
    payload: {
      title
    }
  }
}

export function addNewEventNotes(notes: string): NewEventActions {
  return {
    type: ADD_NEW_EVENT_NOTES,
    payload: {
      notes
    }
  }
}

export function addNewEventDates(dates: EventDatesType): NewEventActions {
  return {
    type: ADD_NEW_EVENT_DATES,
    payload: {
      dates
    }
  }
}

function saveNewEventBegin(): NewEventActions {
  return {
    type: SAVE_NEW_EVENT_BEGIN,
  }
}

function saveNewEventSuccess(status: AddNewEventResponse): NewEventActions {
  return {
    type: SAVE_NEW_EVENT_SUCCESS,
    payload: {
      status
    }
  }
}

function saveNewEventFailure(error: AddNewEventErrorResponse): NewEventActions {
  return {
    type: SAVE_NEW_EVENT_FAILURE,
    payload: {
      error
    }
  }
}

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
