import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  SAVE_NEW_EVENT_BEGIN,
  SAVE_NEW_EVENT_SUCCESS,
  SAVE_NEW_EVENT_FAILURE,
  EventDatesType,
  AddNewEventResponse,
  AddNewEventErrorResponse,
} from './types';

export function addNewEventTitle(title: string) {
  return {
    type: ADD_NEW_EVENT_TITLE,
    payload: {
      title
    }
  } as const
}

export function addNewEventNotes(notes: string) {
  return {
    type: ADD_NEW_EVENT_NOTES,
    payload: {
      notes
    }
  } as const
}

export function addNewEventDates(dates: EventDatesType) {
  return {
    type: ADD_NEW_EVENT_DATES,
    payload: {
      dates
    }
  } as const
}

export function saveNewEventBegin() {
  return {
    type: SAVE_NEW_EVENT_BEGIN,
  } as const
}

export function saveNewEventSuccess(status: AddNewEventResponse) {
  return {
    type: SAVE_NEW_EVENT_SUCCESS,
    payload: {
      status
    }
  } as const
}

export function saveNewEventFailure(error: AddNewEventErrorResponse) {
  return {
    type: SAVE_NEW_EVENT_FAILURE,
    payload: {
      error
    }
  } as const
}
