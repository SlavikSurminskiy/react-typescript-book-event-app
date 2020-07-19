import { EventType } from './../newEvent/types';

import * as actions from './actions';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type SingleEventActions = ReturnType<InferValueTypes<typeof actions>>


export type SingleEventType = EventType & {
  participants: ParticipantType[]
}

export type ParticipantType = {
  name: string
  checkedDays: boolean[]
}

export type EventErrorResponse = {
  statusText: string
  statusCode: number
}

export const ADD_NEW_PARTICIPANT_NAME = 'ADD_NEW_PARTICIPANT_NAME'
export const CHECK_NEW_DAY = 'CHECK_NEW_DAY'

export const LOAD_SINGLE_EVENT_BEGIN = 'LOAD_SINGLE_EVENT_BEGIN'
export const LOAD_SINGLE_EVENT_SUCCESS = 'LOAD_SINGLE_EVENT_SUCCESS'
export const LOAD_SINGLE_EVENT_FAILURE = 'LOAD_SINGLE_EVENT_FAILURE'

export const SAVE_PARTICIPANT_BEGIN = 'SAVE_PARTICIPANT_BEGIN'
export const SAVE_PARTICIPANT_SUCCESS = 'SAVE_PARTICIPANT_SUCCESS'
export const SAVE_PARTICIPANT_FAILURE = 'SAVE_PARTICIPANT_FAILURE'

export const CALC_PARTICIPANT_COUNT = 'CALC_PARTICIPANT_COUNT'

