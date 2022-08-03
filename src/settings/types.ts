import { SchemaType } from 'pomodoro/types'
import { FieldLabels, SchemaItemFields } from 'settings/constants'
import { DialogMode } from 'shared/constants/constants'
import { DialogData } from 'shared/types'

export type Fields =
    | SchemaItemFields.Title
    | SchemaItemFields.PomodoroDuration
    | SchemaItemFields.ShortBreakDuration
    | SchemaItemFields.LongBreakDuration
    | SchemaItemFields.PomodorosGoal
    | SchemaItemFields.LongBreakDelay
    | SchemaItemFields.AutoStartPomodoros
    | SchemaItemFields.AutoStartBreaks

export interface Field {
    key: Fields
    label: FieldLabels
    order?: number
    isCheckbox?: boolean
}

export interface SelectOption {
    label: string
    value: string | number | boolean
}

export interface SchemaItem extends SchemaType {
    id: string
    title: string
    default: boolean
}

export interface SchemaDetailsInitialData {
    initialMode: DialogMode
    schema: SchemaItem
}
export type SchemaDetailsData = SchemaDetailsInitialData & DialogData<boolean>

export interface UserSettings {
    volume: number
    alarm: string
    playAlarmSound: boolean
    colorTheme: 'light' | 'dark'
    language: 'en' | 'ru'
}
