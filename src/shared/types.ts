export interface DialogData<T> {
    onClose: (result: T) => void
    isOpen: boolean
}

export interface ConfirmationDialogData {
    title?: string
    closeTitle?: string
    actionTitle?: string
    additionalText?: string
    saveButtonTitle?: string
    danger?: boolean
    onConfirm?: (result: boolean) => void
}
