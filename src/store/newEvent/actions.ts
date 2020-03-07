import {
  ADD_NEW_EVENT_TITLE,
  ADD_NEW_EVENT_NOTES,
  ADD_NEW_EVENT_DATES,
  EventDatesType,
  NewEventActions
} from './types';


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
