import { useDisclosure } from '@chakra-ui/react'
import { DialogMode } from 'components/Settings/TimerSettings/SchemaDetails'
import { SchemaItem } from 'components/Settings/TimerSettings/TimerSettings'
import { DialogData } from 'constants/types'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { schemaDetailsState } from 'store/atoms'

export interface SchemaDetailsInitialData {
    initialMode: DialogMode
    schema: SchemaItem
}
export type SchemaDetailsData = SchemaDetailsInitialData & DialogData<boolean>

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
