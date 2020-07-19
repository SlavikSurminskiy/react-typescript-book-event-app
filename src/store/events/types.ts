import * as actions from './actions';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type LoadEventsActions = ReturnType<InferValueTypes<typeof actions>>

export type LoadEventsErrorResponse = {
  statusText: string
  statusCode: number
}

export const LOAD_EVENTS_BEGIN = 'EVENTS_BEGIN'
export const LOAD_EVENTS_SUCCESS = 'EVENTS_SUCCESS'
export const LOAD_EVENTS_FAILURE = 'EVENTS_FAILURE'
