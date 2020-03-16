import { Action } from 'redux'

import { EventType } from './../newEvent/types';

export const ADD_NEW_PARTICIPANT_NAME = 'ADD_NEW_PARTICIPANT_NAME'
export const CHECK_NEW_DAY = 'CHECK_NEW_DAY'

export const LOAD_SINGLE_EVENT_BEGIN = 'LOAD_SINGLE_EVENT_BEGIN'
export const LOAD_SINGLE_EVENT_SUCCESS = 'LOAD_SINGLE_EVENT_SUCCESS'
export const LOAD_SINGLE_EVENT_FAILURE = 'LOAD_SINGLE_EVENT_FAILURE'

export const SAVE_PARTICIPANT_BEGIN = 'SAVE_PARTICIPANT_BEGIN'
export const SAVE_PARTICIPANT_SUCCESS = 'SAVE_PARTICIPANT_SUCCESS'
export const SAVE_PARTICIPANT_FAILURE = 'SAVE_PARTICIPANT_FAILURE'

export const CALC_PARTICIPANT_COUNT = 'CALC_PARTICIPANT_COUNT'

export type SingleEventType = EventType & {
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

export type EventErrorResponse = {
  statusText: string
  statusCode: number
}

export interface LoadSingleEventFailureAction extends Action {
  type: typeof LOAD_SINGLE_EVENT_FAILURE
  payload: {
    error: EventErrorResponse
  }
}

export interface SaveParticipantBeginAction extends Action {
  type: typeof SAVE_PARTICIPANT_BEGIN
}

export interface SaveParticipantSuccessAction extends Action {
  type: typeof SAVE_PARTICIPANT_SUCCESS
  payload: {
    participant: ParticipantType
  }
}

export interface SaveParticipantFailureAction extends Action {
  type: typeof SAVE_PARTICIPANT_FAILURE
  payload: {
    error: EventErrorResponse
  }
}

export interface CalcParticipantCoutAction extends Action {
  type: typeof CALC_PARTICIPANT_COUNT
  payload: {
    participantsCount: number[]
  }
}

export type SingleEventActions =
  AddNewParticipantNameAction |
  CheckNewDayAction |
  LoadSingleEventBeginAction |
  LoadSingleEventSuccessAction |
  LoadSingleEventFailureAction |
  SaveParticipantBeginAction |
  SaveParticipantSuccessAction |
  SaveParticipantFailureAction |
  CalcParticipantCoutAction
