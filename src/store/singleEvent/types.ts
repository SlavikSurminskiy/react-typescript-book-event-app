import { Action } from 'redux'

import { EventType } from './../newEvent/types';

export const ADD_NEW_PARTICIPANT_NAME = 'ADD_NEW_PARTICIPANT_NAME'
export const CHECK_NEW_DAY = 'CHECK_NEW_DAY'

export const LOAD_SINGLE_EVENT_BEGIN = 'LOAD_SINGLE_EVENT_BEGIN'
export const LOAD_SINGLE_EVENT_SUCCESS = 'LOAD_SINGLE_EVENT_SUCCESS'
export const LOAD_SINGLE_EVENT_FAILURE = 'LOAD_SINGLE_EVENT_FAILURE'


export type SingleEventType = EventType & {
  participantsCount: number[]
  participants: ParticipantType[]
}

export type ParticipantType = {
  name: string
  checkedDays: boolean[]
}

export interface AddNewParticipantNameAction extends Action {
  type: typeof ADD_NEW_PARTICIPANT_NAME
  payload: {
    name: string
  }
}

export interface CheckNewDayAction extends Action {
  type: typeof CHECK_NEW_DAY
  payload: {
    dayIndex: number,
    isChecked: boolean
  }
}

export interface LoadSingleEventBeginAction extends Action {
  type: typeof LOAD_SINGLE_EVENT_BEGIN
}

export interface LoadSingleEventSuccessAction extends Action {
  type: typeof LOAD_SINGLE_EVENT_SUCCESS
  payload: {
    event: SingleEventType
  }
}

export type LoadSingleEventErrorResponse = {
  statusText: string
  statusCode: number
}

export interface LoadSingleEventFailureAction extends Action {
  type: typeof LOAD_SINGLE_EVENT_FAILURE
  payload: {
    error: LoadSingleEventErrorResponse
  }
}

export type SingleEventActions =
  AddNewParticipantNameAction |
  CheckNewDayAction |
  LoadSingleEventBeginAction |
  LoadSingleEventSuccessAction |
  LoadSingleEventFailureAction