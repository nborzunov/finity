import bell_1 from '../../assets/sounds/bell_1.ogg'
import bell_2 from '../../assets/sounds/bell_2.ogg'
import ding from '../../assets/sounds/ding.ogg'
import knock from '../../assets/sounds/knock.ogg'

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
        url: knock,
    },
    {
        id: 'bell_1',
        title: 'Bell 1',
        url: bell_1,
    },
    {
        id: 'bell_2',
        title: 'Bell 2',
        url: bell_2,
    },
    {
        id: 'ding',
        title: 'Ding',
        url: ding,
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
