export enum FieldLabels {
    pomodoroDuration = 'Focus time',
    shortBreakDuration = 'Short break',
    longBreakDuration = 'Long break',
    pomodorosGoal = 'Pomodoros goal',
    longBreakDelay = 'Long break delay',
    autoStartPomodoros = 'Auto start pomodoros',
    autoStartBreaks = 'Auto start breaks',
}

export const alarmsList = [
    {
        id: 'knock',
        title: 'Knonk',
        url: 'assets/sounds/knock.ogg',
    },
    {
        id: 'bell_1',
        title: 'Bell 1',
        url: 'assets/sounds/bell_1.ogg',
    },
    {
        id: 'bell_2',
        title: 'Bell 2',
        url: 'assets/sounds/bell_2.ogg',
    },
    {
        id: 'ding',
        title: 'Ding',
        url: 'assets/sounds/ding.ogg',
    },
]

export const languagesList = [
    {
        id: 'en',
        title: 'English',
        supported: true,
    },
    {
        id: 'ru',
        title: 'Russian',
        supported: false,
    },
]
