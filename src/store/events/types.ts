import { Action } from 'redux'

import { EventType } from './../newEvent/types';

export const LOAD_EVENTS_BEGIN = 'EVENTS_BEGIN'
export const LOAD_EVENTS_SUCCESS = 'EVENTS_SUCCESS'
export const LOAD_EVENTS_FAILURE = 'EVENTS_FAILURE'


export interface LoadEventsBeginAction extends Action {
  type: typeof LOAD_EVENTS_BEGIN
}

export interface LoadEventsSuccessAction extends Action {
  type: typeof LOAD_EVENTS_SUCCESS
  payload: {
    events: EventType[]
  }
}

export type LoadEventsErrorResponse = {
  statusText: string
  statusCode: number
}

export interface LoadEventsFailureAction extends Action {
  type: typeof LOAD_EVENTS_FAILURE
  payload: {
    error: LoadEventsErrorResponse
  }
}

export type LoadEventsActions =
  LoadEventsBeginAction |
  LoadEventsSuccessAction |
  LoadEventsFailureAction
