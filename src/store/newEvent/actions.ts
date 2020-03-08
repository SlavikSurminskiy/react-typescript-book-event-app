import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  SAVE_NEW_EVENT_BEGIN,
  SAVE_NEW_EVENT_SUCCESS,
  SAVE_NEW_EVENT_FAILURE,
  EventStatusType,
  EventDatesType,
  NewEventActions
} from './types';

import axios from 'axios';
import store from '../';

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
    payload: {
      isSending: true
    }
  }
}

function saveNewEventSuccess(status: EventStatusType): NewEventActions {
  return {
    type: SAVE_NEW_EVENT_SUCCESS,
    payload: {
      status
    }
  }
}

function saveNewEventFailure(error: EventStatusType): NewEventActions {
  return {
    type: SAVE_NEW_EVENT_FAILURE,
    payload: {
      error
    }
  }
}

export function saveNewEvent() {
  return (dispatch: any) => {
    dispatch(saveNewEventBegin());
    const eventPostData = store.getState().newEvent;
    axios
      .post<EventStatusType>('/api/createEvent', {
        newEvent: {
          title: eventPostData.title,
          notes: eventPostData.notes,
          dates: eventPostData.dates,
        }
      })
      .then(res => {
        dispatch(saveNewEventSuccess({
          isSending: false,
          isSaved: true,
          eventId: res.data.eventId,
          statusText: 'Event was saved',
        }));
      })
      .catch(err => {
        dispatch(saveNewEventFailure({
          isSending: false,
          isSaved: false,
          statusText: err.response.data,
        }));
      })
  }
}
