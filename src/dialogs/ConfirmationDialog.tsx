import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

export interface ConfirmationDialogData {
    title?: string
    closeTitle?: string
    actionTitle?: string
    additionalText?: string
    saveButtonTitle?: string
    danger?: boolean
    onConfirm?: (result: boolean) => void
}
function ConfirmationDialog({
    isOpen,
    title,
    actionTitle,
    closeTitle,
    additionalText,
    danger,
    onConfirm,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
} & ConfirmationDialogData) {
    const cancelRef = useRef<any>()

    function confirm(value: boolean) {
        if (onConfirm) {
            onConfirm(value)
        }
        onClose()
    }
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => confirm(false)} isCentered>
            <AlertDialogOverlay bg="rgba(0, 0, 0, 0.6)">
                <AlertDialogContent bg="gray.950">
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>

                    {additionalText && <AlertDialogBody>{additionalText}</AlertDialogBody>}

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => confirm(false)}>
                            {closeTitle}
                        </Button>
                        <Button colorScheme={danger ? 'red' : 'brand'} onClick={() => confirm(true)} ml={3}>
                            {actionTitle}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

ConfirmationDialog.defaultProps = {
    closeTitle: 'Cancel',
    actionTitle: 'Confirm',
    danger: true,
}

export default ConfirmationDialog
