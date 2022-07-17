export const defaultTimer = {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakDelay: 4,
    pomodorosGoal: 8,
    autoStartPomodoros: true,
    autoStartBreaks: true,
}

export const blankSchema = {
    title: '',
    ...defaultTimer,
}

export const defaultSchemas = [
    {
        title: 'Classic',
        default: true,
        pomodoroDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakDelay: 4,
        pomodorosGoal: 4,
        autoStartPomodoros: true,
        autoStartBreaks: true,
    },
    {
        title: 'Personal',
        default: true,
        pomodoroDuration: 30,
        shortBreakDuration: 2,
        longBreakDuration: 24,
        longBreakDelay: 2,
        pomodorosGoal: 4,
        autoStartPomodoros: true,
        autoStartBreaks: true,
    },
    {
        title: 'Work',
        default: true,
        pomodoroDuration: 50,
        shortBreakDuration: 10,
        longBreakDuration: 30,
        longBreakDelay: 4,
        pomodorosGoal: 4,
        autoStartPomodoros: true,
        autoStartBreaks: true,
    },
]
