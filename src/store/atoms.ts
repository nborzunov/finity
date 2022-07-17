import { atom } from 'recoil'

import { SchemaItem } from '../components/Settings/TimerSettings/TimerSettings'
import { defaultSchemas, defaultTimer } from '../constants/defaultValues'
import { SchemaType, SessionOrderType, SessionType } from '../hooks/useTimer'
import { localStorageEffect } from './effects'

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
    effects: [localStorageEffect('timer_order')],
})

export const timerCurrentSessionState = atom<SessionType>({
    key: 'timerCurrentSessionState',
    default: 'pomodoro' as SessionType,
    effects: [localStorageEffect('current_session')],
})

export const timerRemainingSecondsState = atom<number>({
    key: 'timerRemainingSecondsState',
    default: 1,
    effects: [localStorageEffect('remaining_seconds')],
})

export const timerSchemaState = atom<SchemaType>({
    key: 'timerSchemaState',
    default: defaultTimer,
    effects: [localStorageEffect('timer_schema')],
})

export const showNotificationsState = atom<boolean>({
    key: 'showNotificationsState',
    default: true,
    effects: [localStorageEffect('show_notifications')],
})

export const schemasState = atom<SchemaItem[]>({
    key: 'schemasState',
    default: defaultSchemas,
    effects: [localStorageEffect('schemas')],
})
