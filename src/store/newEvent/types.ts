import * as actions from './actions';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type NewEventActions = ReturnType<InferValueTypes<typeof actions>>


export type EventType = {
  title: string
  notes: string
  dates: EventDatesType
  _id: string
}

export type EventDatesType = Date[]

export type AddNewEventResponse = {
  statusText: string
  _id: string
}

export type AddNewEventErrorResponse = {
  statusText: string
  statusCode: number
}

export const ADD_NEW_EVENT_TITLE = 'ADD_NEW_EVENT_TITLE'
export const ADD_NEW_EVENT_NOTES = 'ADD_NEW_EVENT_NOTES'
export const ADD_NEW_EVENT_DATES = 'ADD_NEW_EVENT_DATES'

export const SAVE_NEW_EVENT_BEGIN = 'SAVE_NEW_EVENT_BEGIN'
export const SAVE_NEW_EVENT_SUCCESS = 'SAVE_NEW_EVENT_SUCCESS'
export const SAVE_NEW_EVENT_FAILURE = 'SAVE_NEW_EVENT_FAILURE'
