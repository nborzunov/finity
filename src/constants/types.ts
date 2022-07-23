export interface DialogData<T> {
    onClose: (result: T) => void
    isOpen: boolean
}
