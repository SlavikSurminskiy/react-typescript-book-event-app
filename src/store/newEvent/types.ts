import { Action } from 'redux'

export const ADD_NEW_EVENT_TITLE = 'ADD_NEW_EVENT_TITLE'
export const ADD_NEW_EVENT_NOTES = 'ADD_NEW_EVENT_NOTES'
export const ADD_NEW_EVENT_DATES = 'ADD_NEW_EVENT_DATES'

export type EventType = {
  title: string
  notes: string
  dates: EventDatesType
}

export type EventDatesType = Date[]

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

export type NewEventActions = AddNewEventTitleAction | AddNewEventNotesAction | AddNewEventDatesAction
