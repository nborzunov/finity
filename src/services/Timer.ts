import { BehaviorSubject } from 'rxjs'

interface Schema {
    pomodoroDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakDelay: number
    autoStartPomodoros: boolean
    autoStartBreaks: boolean
}

type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak'

type SessionOrder = {
    [key in SessionType]: number
}

interface TimerState {
    schema: Schema
    currentSession: SessionType
    order: SessionOrder
    remainingSeconds?: number
}

export class Timer {
    public isPaused: boolean = true
    public remainingSeconds: number
    public subscription?: BehaviorSubject<Timer>

    private interval?: any

    setTimer?: (timer: Timer) => void

    constructor(
        public schema: Schema,
        public currentSession: SessionType,
        public order: SessionOrder,
        remainingSeconds?: number,
    ) {
        this.remainingSeconds = remainingSeconds ?? this.getSessionDuration(this.currentSession)

        this.subscription = new BehaviorSubject(this as Timer)
    }

    static getTimer(): Timer {
        const { schema, currentSession, order, remainingSeconds } = Timer.getTimerState()

        return new Timer(schema, currentSession, order, remainingSeconds)
    }

    static getTimerState(): TimerState {
        const storedTimer = localStorage.getItem('timer')

        if (storedTimer) {
            return JSON.parse(storedTimer)
        }

        // TODO: refactor to get user timer from database
        return {
            schema: {
                pomodoroDuration: 25,
                shortBreakDuration: 5,
                longBreakDuration: 15,
                longBreakDelay: 4,
                autoStartPomodoros: true,
                autoStartBreaks: true,
            },
            currentSession: 'pomodoro',
            order: {
                pomodoro: 0,
                shortBreak: 0,
                longBreak: 0,
            },
        }
    }

    get percentage(): number {
        return (this.getSessionDuration(this.currentSession) / this.remainingSeconds) * 100
    }

    public pause() {
        this.isPaused = true

        this.checkTimer()
    }

    public play() {
        this.isPaused = false

        this.checkTimer()
    }

    public toggle() {
        this.isPaused = !this.isPaused

        this.checkTimer()
    }

    private save(): void {
        if (this.setTimer) {
            this.setTimer(this)
        }
    }

    private checkTimer() {
        if (this.isPaused) {
            this.stopTimer()
        } else {
            this.startTimer()
        }

        this.save()
    }
    private startTimer() {
        this.interval = setInterval(() => {
            this.updateTimer()
        }, 1000)
    }

    private stopTimer() {
        clearInterval(this.interval)
    }

    private updateTimer() {
        if (this.isPaused) {
            return
        }

        this.remainingSeconds--
        if (this.remainingSeconds <= 0) {
            this.nextSession()
        }

        this.save()
    }

    private nextSession() {
        const sessionOrder = this.order[this.currentSession]
        const nextSession = this.getNextSession(sessionOrder)
        this.currentSession = nextSession
        this.remainingSeconds = this.getSessionDuration(nextSession)
    }

    private getNextSession(sessionOrder: number): SessionType {
        return Object.keys(this.order).find(
            (sessionType: string) => this.order[sessionType as SessionType] === sessionOrder + 1,
        ) as SessionType
    }

    private getSessionDuration(sessionType: SessionType): number {
        switch (sessionType) {
            case 'pomodoro':
                return this.schema.pomodoroDuration * 60
            case 'shortBreak':
                return this.schema.shortBreakDuration * 60
            case 'longBreak':
                return this.schema.longBreakDuration * 60
        }
    }
    public getFormattedTime(): string {
        const minutes = Math.floor(this.remainingSeconds / 60)
        const seconds = this.remainingSeconds % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
}
