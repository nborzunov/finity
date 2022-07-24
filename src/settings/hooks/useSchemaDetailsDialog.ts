import { useDisclosure } from '@chakra-ui/react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { SchemaDetailsInitialData } from 'settings/types'
import { schemaDetailsState } from 'store/atoms'

function useSchemaDetailsDialog() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [dialogData, setDialogData] = useRecoilState(schemaDetailsState)
    const resetSchemaDetails = useResetRecoilState(schemaDetailsState)
    function open(newData: Partial<SchemaDetailsInitialData>) {
        setDialogData((data) => ({
            ...data,
            schema: newData.schema || data.schema,
            initialMode: newData.initialMode || data.initialMode,
            isOpen: true,
            onClose: close,
        }))
        onOpen()
    }

    function close() {
        setDialogData((data) => ({
            ...data,
            isOpen: false,
        }))
        resetSchemaDetails()
        onClose()
    }

    return {
        isOpen,
        open,
        initialMode: dialogData.initialMode,
        schema: dialogData.schema,
        close,
    }
}

export default useSchemaDetailsDialog
