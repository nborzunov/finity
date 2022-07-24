import { SessionType } from 'pomodoro/constants'
import { SessionOrderType, TimerState } from 'pomodoro/types'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { alarmsList } from 'settings/constants'
import { formatTime } from 'shared/helpers/formatTime'
import { getCurrentHookValue } from 'shared/helpers/getCurrentHookValue'
import {
    timerCurrentSessionState,
    timerIsPausedState,
    timerOrderState,
    timerRemainingSecondsState,
    timerSchemaChangedState,
    timerSchemaState,
    userSettingsState,
} from 'store/atoms'

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
            updateRemainingSeconds()
        }

        getTimer()

        if (timerSchemaChanged) {
            resetTimer()
            setTimerSchemaChanged(false)
        }
        return () => {
            clearInterval(timer)
        }
    }, [isPaused, timerSchemaChanged])

    async function updateRemainingSeconds() {
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
                return 5 || schema.pomodoroDuration * 60
            case SessionType.ShortBreak:
                return 5 || schema.shortBreakDuration * 60
            case SessionType.LongBreak:
                return 5 || schema.longBreakDuration * 60
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

    async function stepBack() {
        const order = await getCurrentHookValue<SessionOrderType>(setOrder)

        if (order.pomodoro === 0) {
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
        remainingSeconds,
        getPercentage,
        toggle,
        getFormattedTime,
        getSessionStatus,
        stepBack,
        resetTimer,
    }
}

export default useTimer
