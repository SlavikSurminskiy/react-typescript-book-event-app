import {
  LOAD_EVENTS_BEGIN,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAILURE,
  LoadEventsErrorResponse,
} from './types';

import { EventType } from './../newEvent/types';


export function loadEventsBegin() {
  return {
    type: LOAD_EVENTS_BEGIN
  } as const
}

export function loadEventsSuccess(events: EventType[]) {
  return {
    type: LOAD_EVENTS_SUCCESS,
    payload: {
      events
    }
  } as const
}

export function loadEventsFailure(error: LoadEventsErrorResponse) {
  return {
    type: LOAD_EVENTS_FAILURE,
    payload: {
      error
    }
  } as const
}
