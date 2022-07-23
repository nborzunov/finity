export interface DialogData<T> {
    onClose: (result: T) => void
    isOpen: boolean
}

export interface UserSettings {
    volume: number
    alarm: string
    playAlarmSound: boolean
    colorTheme: 'light' | 'dark'
    language: 'en' | 'ru'
}
