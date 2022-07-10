import { atom, selector } from 'recoil'

import { Timer } from '../services/Timer'

export const timerState = atom<Timer>({
    key: 'timerState',
    default: Timer.getTimer(),
})

export const timerClockState = selector({
    key: 'timerClockState',
    get: ({ get }) => {
        const timer = get(timerState)

        return timer.getFormattedTime()
    },
})

export const timerPercentageState = selector({
    key: 'timerPercentageState',
    get: ({ get }) => {
        const timer = get(timerState)

        return timer.percentage
    },
})
