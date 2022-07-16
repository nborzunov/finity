import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getCurrentHookValue } from '../helpers/getCurrentHookValue'
import {
    timerCurrentSessionState,
    timerIsPausedState,
    timerOrderState,
    timerRemainingSecondsState,
    timerSchemaState,
} from '../store/atoms'

export interface SchemaType {
    pomodoroDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakDelay: number
    autoStartPomodoros: boolean
    autoStartBreaks: boolean
}

export type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak'

export type SessionOrderType = {
    [key in SessionType]: number
}

export interface TimerState {
    schema: SchemaType
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
    const [schema] = useRecoilState(timerSchemaState)

    const [timer, setTimer] = useState<any>(null)

    useEffect(() => {
        getTimer()

        return () => {
            clearInterval(timer)
        }
    }, [isPaused])

    const getTimer = useCallback(() => {
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

        const sessionOrder = order[currentSession]
        const nextSession = getNextSession(sessionOrder, currentSession)

        setOrder((val) => ({
            ...val,
            [currentSession]: val[currentSession] + 1,
        }))
        setCurrentSession(nextSession)
        setRemainingSeconds(getSessionDuration(nextSession))
    }

    function getNextSession(sessionOrder: number, currentSession: string): SessionType {
        if (currentSession === 'pomodoro') {
            return sessionOrder !== schema.longBreakDelay ? 'shortBreak' : 'longBreak'
        } else {
            return 'pomodoro'
        }
    }

    function getSessionDuration(sessionType: SessionType): number {
        switch (sessionType) {
            case 'pomodoro':
                return schema.pomodoroDuration * 1
            case 'shortBreak':
                return schema.shortBreakDuration * 1
            case 'longBreak':
                return schema.longBreakDuration * 1
        }
    }
    function getFormattedTime(): string {
        const minutes = Math.floor(remainingSeconds / 60)
        const seconds = remainingSeconds % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    function getSessionStatus(): string {
        switch (currentSession) {
            case 'pomodoro':
                return 'Working'
            case 'shortBreak':
                return 'Short Break'
            case 'longBreak':
                return 'Long Break'
        }
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
