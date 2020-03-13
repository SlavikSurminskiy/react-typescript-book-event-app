import { Action } from 'redux'

export const ADD_NEW_EVENT_TITLE = 'ADD_NEW_EVENT_TITLE'
export const ADD_NEW_EVENT_NOTES = 'ADD_NEW_EVENT_NOTES'
export const ADD_NEW_EVENT_DATES = 'ADD_NEW_EVENT_DATES'

export const SAVE_NEW_EVENT_BEGIN = 'SAVE_NEW_EVENT_BEGIN'
export const SAVE_NEW_EVENT_SUCCESS = 'SAVE_NEW_EVENT_SUCCESS'
export const SAVE_NEW_EVENT_FAILURE = 'SAVE_NEW_EVENT_FAILURE'


export type EventType = {
  title: string
  notes: string
  dates: EventDatesType
  _id?: string
}

export type EventDatesType = Date[]

export type EventStatusType = {
  isSaved: boolean
  statusText: string | null
  isSending: boolean
  eventId?: string
}

export interface AddNewEventTitleAction extends Action {
  type: typeof ADD_NEW_EVENT_TITLE
  payload: {
    title: string
  }
}

export interface AddNewEventNotesAction extends Action {
  type: typeof ADD_NEW_EVENT_NOTES
  payload: {
    notes: string
  }
}

export interface AddNewEventDatesAction extends Action {
  type: typeof ADD_NEW_EVENT_DATES
  payload: {
    dates: EventDatesType
  }
}

export interface SaveNewEventBeginAction extends Action {
  type: typeof SAVE_NEW_EVENT_BEGIN
  payload: {
    isSending: boolean
  }
}

export interface SaveNewEventSuccessAction extends Action {
  type: typeof SAVE_NEW_EVENT_SUCCESS
  payload: {
    status: EventStatusType
  }
}

export interface SaveNewEventFailureAction extends Action {
  type: typeof SAVE_NEW_EVENT_FAILURE
  payload: {
    error: EventStatusType
  }
}

export type NewEventActions =
  AddNewEventTitleAction |
  AddNewEventNotesAction |
  AddNewEventDatesAction |
  SaveNewEventBeginAction |
  SaveNewEventSuccessAction |
  SaveNewEventFailureAction
