import { Box, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import GhostIcon from 'settings/components/partial/GhostIcon'
import useSchemaDetailsDialog from 'settings/hooks/useSchemaDetailsDialog'
import { SchemaItem } from 'settings/types'
import { DialogMode } from 'shared/constants/constants'
import { Icons } from 'shared/constants/icons'
import ConfirmationDialog from 'shared/dialogs/ConfirmationDialog'
import { formatTime } from 'shared/helpers/formatTime'
import { ConfirmationDialogData } from 'shared/types'
import { schemasState } from 'store/atoms'

function SchemaCard({ schema }: { schema: SchemaItem }) {
    const setSchemas = useSetRecoilState(schemasState)
    const [confirmationData, setConfirmationData] = useState<ConfirmationDialogData>()

    const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()

    const { open } = useSchemaDetailsDialog()

    function calculateSchemaDuration(schema: SchemaItem) {
        const pomodorosDuration = schema.pomodorosGoal * schema.pomodoroDuration * 60
        const shortBreaksDuration = schema.pomodorosGoal * schema.shortBreakDuration * 60
        const longBreaksDuration = Math.floor(schema.pomodorosGoal / schema.longBreakDelay) * schema.longBreakDuration * 60
        return pomodorosDuration + shortBreaksDuration + longBreaksDuration
    }

    function getFormattedTime(seconds: number) {
        return formatTime(seconds, 'hh:mm')
    }

    function deleteSchema(event: MouseEvent, id: string) {
        event.stopPropagation()
        setConfirmationData({
            title: 'Delete schema',
            actionTitle: 'Delete',
            danger: true,
            additionalText: 'Are you sure you want to delete this schema?',
            onConfirm: () => {
                setSchemas((schemas) => schemas.filter((schema) => schema.id !== id))
            },
        })
        onOpenConfirm()
    }

    function editSchema(event: MouseEvent) {
        event.stopPropagation()
        open({
            schema,
            initialMode: DialogMode.Edit,
        })
    }
    return (
        <>
            <ConfirmationDialog isOpen={isOpenConfirm} onClose={onCloseConfirm} {...confirmationData} />
            <Box>
                <b>{schema.title}</b> - {getFormattedTime(calculateSchemaDuration(schema))}
            </Box>
            <Box display="flex" gap="4px">
                <GhostIcon icon={Icons.Edit} hoverBg="blue.500" title="Edit" onClick={(event: any) => editSchema(event)} />
                <GhostIcon icon={Icons.Delete} hoverBg="red.500" title="Delete" onClick={(event: any) => deleteSchema(event, schema.id)} />
            </Box>
        </>
    )
}

export default SchemaCard
