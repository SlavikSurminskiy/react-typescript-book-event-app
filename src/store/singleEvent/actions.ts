import {
  ADD_NEW_PARTICIPANT_NAME,
  CHECK_NEW_DAY,
  LOAD_SINGLE_EVENT_BEGIN,
  LOAD_SINGLE_EVENT_SUCCESS,
  LOAD_SINGLE_EVENT_FAILURE,
  SAVE_PARTICIPANT_BEGIN,
  SAVE_PARTICIPANT_SUCCESS,
  SAVE_PARTICIPANT_FAILURE,
  CALC_PARTICIPANT_COUNT,
  SingleEventType,
  ParticipantType,
  EventErrorResponse,
} from './types';

import store from '../'

export function addNewParticipantName(name: string) {
  return {
    type: ADD_NEW_PARTICIPANT_NAME,
    payload: {
      name
    }
  } as const
}

export function checkNewDay(dayIndex: number, isChecked: boolean) {
  return {
    type: CHECK_NEW_DAY,
    payload: {
      dayIndex,
      isChecked,
    }
  } as const
}

export function loadSingleEventBegin() {
  return {
    type: LOAD_SINGLE_EVENT_BEGIN
  } as const
}

export function loadSingleEventSuccess(event: SingleEventType) {
  return {
    type: LOAD_SINGLE_EVENT_SUCCESS,
    payload: {
      event
    }
  } as const
}

export function loadSingleEventFailure(error: EventErrorResponse) {
  return {
    type: LOAD_SINGLE_EVENT_FAILURE,
    payload: {
      error
    }
  } as const
}

export function saveParticipantBegin() {
  return {
    type: SAVE_PARTICIPANT_BEGIN
  } as const
}

export function saveParticipantSuccess(participant: ParticipantType) {
  return {
    type: SAVE_PARTICIPANT_SUCCESS,
    payload: {
      participant
    }
  } as const
}

export function saveParticipantFailure(error: EventErrorResponse) {
  return {
    type: SAVE_PARTICIPANT_FAILURE,
    payload: {
      error
    }
  } as const
}

// calc number of checked cell in each column
export function calcParticipantCount() {
  const { dates, participants } = store.getState().singleEvent;

  const datesAmount = dates.length;
  const participantAmount = participants.length;
  const participantsCount: number[] = new Array(datesAmount).fill(0);

  for (let i = 0; i < datesAmount; i += 1) {
    for (let j = 0; j < participantAmount; j += 1) {
      if (participants[j].checkedDays[i]) {
        participantsCount[i] += 1;
      }
    }
  }

  return {
    type: CALC_PARTICIPANT_COUNT,
    payload: {
      participantsCount,
    }
  } as const
}
