export function formatTime(seconds: number, format: string): string {
    switch (format) {
        case 'MM': {
            const minutes = Math.floor(seconds / 60)
            return ` ${minutes} minute${minutes === 1 ? '' : 's'}`
        }
        case 'HH:MM': {
            const hours = Math.floor(seconds / 3600)
            const minutes = Math.floor((seconds % 3600) / 60)
            return `${hours === 0 ? '' : hours + ' hrs'} ${minutes} min`
        }
        case 'hh:mm': {
            const hours = Math.floor(seconds / 3600)
            const minutes = Math.floor((seconds % 3600) / 60)
            return `${hours === 0 ? '' : hours + 'h'} ${minutes}m`
        }

        case 'mm:ss':
        default: {
            const min = Math.floor(seconds / 60)
            const sec = seconds % 60
            return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
        }
    }
}
