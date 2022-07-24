import { Box, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { useSetRecoilState } from 'recoil'
import useSchemaDetailsDialog from 'settings/hooks/useSchemaDetailsDialog'
import { SchemaItem } from 'settings/types'
import { DialogMode } from 'shared/constants/constants'
import { Icons } from 'shared/constants/icons'
import ConfirmationDialog from 'shared/dialogs/ConfirmationDialog'
import { formatTime } from 'shared/helpers/formatTime'
import { ConfirmationDialogData } from 'shared/types'
import { schemasState } from 'store/atoms'

function GhostIcon({ icon, hoverBg, title, onClick }: { icon: IconType; hoverBg?: string; title: string; onClick: any }) {
    return (
        <IconButton
            icon={<Icon as={icon} />}
            aria-label="edit"
            variant="ghost"
            fontSize="17px"
            borderRadius="xl"
            title={title}
            _hover={{
                background: hoverBg,
                color: 'rgba(255, 255, 255, 0.8)',
            }}
            _focus={{
                background: hoverBg,
            }}
            onClick={onClick}
        />
    )
}

GhostIcon.defaultProps = {
    hoverBg: 'brand.500',
}

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
