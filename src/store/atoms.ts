import { SessionType } from 'pomodoro/constants'
import { SessionOrderType } from 'pomodoro/types'
import { atom } from 'recoil'
import { SchemaDetailsData, SchemaItem, UserSettings } from 'settings/types'
import { DialogMode } from 'shared/constants/constants'
import { defaultSchemas, getBlankSchema } from 'shared/constants/defaultValues'
import { localStorageEffect } from 'store/effects'

// TODO: isolate atoms to their feature folders

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
    default: -1,
    effects: [localStorageEffect('remaining_seconds')],
})

export const timerSchemaState = atom<SchemaItem>({
    key: 'timerSchemaState',
    default: defaultSchemas[0],
    effects: [localStorageEffect('timer_schema')],
})

export const timerSchemaChangedState = atom<boolean>({
    key: 'timerSchemaChangedState',
    default: false,
    effects: [localStorageEffect('timer_schema_changed')],
})

export const schemasState = atom<SchemaItem[]>({
    key: 'schemasState',
    default: defaultSchemas,
    effects: [localStorageEffect('schemas')],
})

export const schemaDetailsState = atom<SchemaDetailsData>({
    key: 'schemaDetailsState',
    default: {
        isOpen: false,
        onClose: () => {},
        initialMode: DialogMode.View,
        schema: getBlankSchema(),
    },
})

export const userSettingsState = atom<UserSettings>({
    key: 'userSettingsState',
    default: {
        volume: 1,
        alarm: 'bell_1',
        playAlarmSound: true,
        colorTheme: 'dark',
        language: 'en',
    },
    effects: [localStorageEffect('user_settings')],
})
