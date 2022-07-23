import { SchemaItem } from 'components/Settings/TimerSettings/TimerSettings'
import { alarmsList } from 'constants/constants'
import { formatTime } from 'helpers/formatTime'
import { getCurrentHookValue } from 'helpers/getCurrentHookValue'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
    timerCurrentSessionState,
    timerIsPausedState,
    timerOrderState,
    timerRemainingSecondsState,
    timerSchemaChangedState,
    timerSchemaState,
    userSettingsState,
} from 'store/atoms'

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

export enum SessionType {
    Pomodoro = 'pomodoro',
    ShortBreak = 'shortBreak',
    LongBreak = 'longBreak',
}

export type SessionTypeUnion = `${SessionType}`

export interface TimerState {
    schema: SchemaItem
    currentSession: SessionType
    order: SessionOrderType
    remainingSeconds?: number
}

export function getTimerState(): TimerState | null {
    const storedTimer = localStorage.getItem('timer')

    if (storedTimer) {
        return JSON.parse(storedTimer)
    }
    return null
}

function useTimer() {
    const [isPaused, setIsPaused] = useRecoilState(timerIsPausedState)
    const [currentSession, setCurrentSession] = useRecoilState(timerCurrentSessionState)
    const [order, setOrder] = useRecoilState(timerOrderState)
    const [remainingSeconds, setRemainingSeconds] = useRecoilState(timerRemainingSecondsState)
    const [timerSchemaChanged, setTimerSchemaChanged] = useRecoilState(timerSchemaChangedState)

    const schema = useRecoilValue(timerSchemaState)
    const userSettings = useRecoilValue(userSettingsState)

    const resetCurrentSession = useResetRecoilState(timerCurrentSessionState)
    const resetOrder = useResetRecoilState(timerOrderState)
    const resetRemainingSeconds = useResetRecoilState(timerRemainingSecondsState)

    const [timer, setTimer] = useState<any>(null)

    useEffect(() => {
        if (remainingSeconds === -1) {
            updateRemainingSecinds()
        }

        getTimer()

        if (timerSchemaChanged) {
            reset()
            setTimerSchemaChanged(false)
        }
        return () => {
            clearInterval(timer)
        }
    }, [isPaused, timerSchemaChanged])

    async function updateRemainingSecinds() {
        const currentSession = await getCurrentHookValue<SessionType>(setCurrentSession)
        const duration = getSessionDuration(currentSession)
        setRemainingSeconds(duration)
    }

    const getTimer = useCallback(async () => {
        if (timer && isPaused) {
            clearInterval(timer)
            setTimer(null)
        } else if (!timer && !isPaused) {
            setTimer(
                setInterval(() => {
                    updateTimer()
                }, 1000),
            )
        }
    }, [timer, isPaused, remainingSeconds])

    function getPercentage(): number {
        return (remainingSeconds / getSessionDuration(currentSession)) * 100
    }

    function toggle(): void {
        setIsPaused((val) => !val)
    }

    const updateTimer = useCallback(async () => {
        if (isPaused) {
            return
        }

        setRemainingSeconds((val) => val - 1)

        let _remainingSeconds = await getCurrentHookValue<number>(setRemainingSeconds)
        if (_remainingSeconds <= 0) {
            nextSession()
        }
    }, [isPaused, remainingSeconds])

    async function nextSession() {
        const currentSession = await getCurrentHookValue<SessionType>(setCurrentSession)
        const [nextSession, stopTimer] = await getNextSession(currentSession)

        setOrder((val) => ({
            ...val,
            [currentSession]: val[currentSession] + 1,
        }))
        setCurrentSession(nextSession)
        setRemainingSeconds(getSessionDuration(nextSession))

        if (
            (!schema.autoStartPomodoros && nextSession === 'pomodoro') ||
            (!schema.autoStartBreaks && nextSession !== 'pomodoro') ||
            stopTimer
        ) {
            setIsPaused(true)
        }

        notify()

        if (stopTimer) {
            resetTimer()
        }
    }

    function resetTimer() {
        resetCurrentSession()
        resetOrder()
        resetRemainingSeconds()
    }

    async function getNextSession(currentSession: string): Promise<[SessionType, boolean]> {
        const order = await getCurrentHookValue<SessionOrderType>(setOrder)

        if (currentSession === 'pomodoro') {
            if (order.pomodoro < schema.pomodorosGoal - 1) {
                return [SessionType.ShortBreak, false]
            } else if (order.pomodoro === schema.longBreakDelay - 1) {
                return [SessionType.LongBreak, false]
            } else {
                return [SessionType.Pomodoro, true]
            }
        }
        if (currentSession === 'shortBreak') {
            return [SessionType.Pomodoro, false]
        }
        return [SessionType.Pomodoro, true]
    }

    function getSessionDuration(sessionType: SessionType): number {
        switch (sessionType) {
            case SessionType.Pomodoro:
                return schema.pomodoroDuration * 60
            case SessionType.ShortBreak:
                return schema.shortBreakDuration * 60
            case SessionType.LongBreak:
                return schema.longBreakDuration * 60
        }
    }
    function getFormattedTime(): string {
        return formatTime(remainingSeconds, 'mm:ss')
    }

    function getSessionStatus(): string {
        switch (currentSession) {
            case SessionType.Pomodoro:
                return 'Working'
            case SessionType.ShortBreak:
                return 'Short Break'
            case SessionType.LongBreak:
                return 'Long Break'
        }
    }
    function notify() {
        if (!userSettings.playAlarmSound) {
            return
        }
        const alarm = alarmsList.find((alarm) => alarm.id === userSettings.alarm)

        if (!alarm) {
            return
        }
        const audio = new Audio(alarm.url)

        audio.volume = userSettings.volume

        audio.play()
    }

    function reset() {
        resetTimer()
    }
    return {
        isPaused,
        currentSession,
        order,
        schema,
        remainingSeconds,
        getPercentage,
        toggle,
        getFormattedTime,
        getSessionStatus,
    }
}

export default useTimer
