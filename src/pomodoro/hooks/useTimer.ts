import { SessionType } from 'pomodoro/constants'
import { SessionOrderType, TimerState } from 'pomodoro/types'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { alarmsList } from 'settings/constants'
import { SchemaItem } from 'settings/types'
import { formatTime } from 'shared/helpers/formatTime'
import { getCurrentHookValue } from 'shared/helpers/getCurrentHookValue'
import useTitle from 'shared/hooks/useTitle'
import {
    timerCurrentSessionState,
    timerIsPausedState,
    timerOrderState,
    timerSchemaChangedState,
    timerSchemaState,
    timerSecondsState,
    userSettingsState,
} from 'store/atoms'

export function getTimerState(): TimerState | null {
    const storedTimer = localStorage.getItem('timer')

    if (storedTimer) {
        return JSON.parse(storedTimer)
    }
    return null
}

export const TimerContext = createContext<Timer>({} as Timer)

interface Timer {
    isPaused: boolean
    currentSession: SessionType
    order: SessionOrderType
    schema: SchemaItem
    seconds: number
    getPercentage: () => number
    toggle: () => void
    getTime: () => string
    getSession: () => string
    stepBack: () => void
    resetTimer: () => void
}

function useTimer(): Timer {
    const [isPaused, setIsPaused] = useRecoilState(timerIsPausedState)
    const [currentSession, setCurrentSession] = useRecoilState(timerCurrentSessionState)
    const [order, setOrder] = useRecoilState(timerOrderState)
    const [seconds, setRemainingSeconds] = useRecoilState(timerSecondsState)
    const [timerSchemaChanged, setTimerSchemaChanged] = useRecoilState(timerSchemaChangedState)

    const schema = useRecoilValue(timerSchemaState)
    const userSettings = useRecoilValue(userSettingsState)

    const resetCurrentSession = useResetRecoilState(timerCurrentSessionState)
    const resetOrder = useResetRecoilState(timerOrderState)
    const resetRemainingSeconds = useResetRecoilState(timerSecondsState)

    const [timer, setTimer] = useState<any>(null)

    const setTitle = useTitle()

    useEffect(() => {
        return () => {
            close()
        }
    }, [])
    useEffect(() => {
        if (seconds === -1) {
            updateRemainingSeconds()
        }

        getTimer()
    }, [isPaused, timerSchemaChanged])

    useEffect(() => {
        setTitle(isPaused ? 'Pomodoro timer' : `${getTime()} - ${getSession()}`)
    }, [seconds, isPaused])

    async function updateRemainingSeconds() {
        const currentSession = await getCurrentHookValue<SessionType>(setCurrentSession)
        const duration = getSessionDuration(currentSession)
        setRemainingSeconds(duration)
    }

    async function close() {
        clearInterval(timer)
        setTimer(null)
        setIsPaused(true)
    }

    const getTimer = useCallback(async () => {
        const _timerSchemaChanged = await getCurrentHookValue(setTimerSchemaChanged)

        if (_timerSchemaChanged) {
            resetTimer()
            setTimerSchemaChanged(false)
        }

        const _timer: any = await getCurrentHookValue(setTimer)

        if (_timer && isPaused) {
            clearInterval(_timer)
            setTimer(null)
        } else if (!_timer && !isPaused) {
            setTimer(
                setInterval(() => {
                    updateTimer()
                }, 1000),
            )
        }
    }, [timer, isPaused, seconds])

    function getPercentage(): number {
        return (seconds / getSessionDuration(currentSession)) * 100
    }

    function toggle(): void {
        setIsPaused((val) => !val)
    }

    const updateTimer = useCallback(async () => {
        if (isPaused) {
            return
        }

        setRemainingSeconds((val) => val - 1)

        let _seconds = await getCurrentHookValue<number>(setRemainingSeconds)
        if (_seconds <= 0) {
            nextSession()
        }
    }, [isPaused, seconds])

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
        setIsPaused(true)
        resetCurrentSession()
        resetOrder()
        resetRemainingSeconds()
        updateRemainingSeconds()
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
    function getTime(): string {
        return formatTime(seconds, 'mm:ss')
    }

    function getSession(): string {
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

    async function stepBack() {
        const order = await getCurrentHookValue<SessionOrderType>(setOrder)

        if (order.pomodoro === 0) {
            resetTimer()
            return
        }

        setOrder((val) => ({
            ...val,
            pomodoro: val.pomodoro - 1,
            shortBreak: val.pomodoro - 1,
        }))

        setCurrentSession(SessionType.Pomodoro)
        setRemainingSeconds(getSessionDuration(SessionType.Pomodoro))
    }

    return {
        isPaused,
        currentSession,
        order,
        schema,
        seconds,
        getPercentage,
        toggle,
        getTime,
        getSession,
        stepBack,
        resetTimer,
    }
}

export default useTimer
