import { atom } from 'recoil'

import { SchemaType, SessionOrderType, SessionType } from '../hooks/useTimer'

export const timerIsPausedState = atom<Boolean>({
    key: 'timerIsPausedState',
    default: true,
})

export const timerOrderState = atom<SessionOrderType>({
    key: 'timerOrderState',
    default: {
        pomodoro: 0,
        shortBreak: 0,
        longBreak: 0,
    },
})

export const timerCurrentSessionState = atom<SessionType>({
    key: 'timerCurrentSessionState',
    default: 'pomodoro',
})

export const timerRemainingSecondsState = atom<number>({
    key: 'timerRemainingSecondsState',
    default: 5 * 1,
})

export const timerSchemaState = atom<SchemaType>({
    key: 'timerSchemaState',
    default: {
        pomodoroDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakDelay: 4,
        autoStartPomodoros: true,
        autoStartBreaks: true,
    },
})
