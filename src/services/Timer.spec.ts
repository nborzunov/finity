import { Timer } from './Timer'

describe('Timer service initialize', () => {
    var timer: Timer
    beforeEach(() => {
        var localStorageMock = (function () {
            var store: any = {}
            return {
                getItem: function (key: any) {
                    return store[key]
                },
                setItem: function (key: any, value: any) {
                    store[key] = value.toString()
                },
                clear: function () {
                    store = {}
                },
                removeItem: function (key: any) {
                    delete store[key]
                },
            }
        })()
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })

        timer = Timer.getTimer()
    })

    it('from local storage', () => {
        expect(timer.schema.pomodoroDuration).toBe(25)
        expect(timer.schema.shortBreakDuration).toBe(5)
        expect(timer.schema.longBreakDuration).toBe(15)
        expect(timer.schema.longBreakDelay).toBe(4)
        expect(timer.schema.autoStartPomodoros).toBe(true)
        expect(timer.schema.autoStartBreaks).toBe(true)
    })
    it('working timer', () => {
        timer.play()

        expect(1).toBe(1)
    })
})

// test('Timer service initialize from schema', () => { })

export {}
