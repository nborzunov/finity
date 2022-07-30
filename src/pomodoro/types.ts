import { SessionType } from 'pomodoro/constants'
import { SchemaItem } from 'settings/types'

export interface SchemaType {
    pomodoroDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakDelay: number
    pomodorosGoal: number
    autoStartPomodoros: boolean
    autoStartBreaks: boolean
}

export type SessionOrderType = {
    [key in SessionType]: number
}

export interface TimerState {
    schema: SchemaItem
    currentSession: SessionType
    order: SessionOrderType
    seconds?: number
}

export type SessionTypeUnion = `${SessionType}`
