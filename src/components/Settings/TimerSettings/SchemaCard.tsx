import { Box, Icon, IconButton } from '@chakra-ui/react'
import { SchemaItem } from 'components/Settings/TimerSettings/TimerSettings'
import { Icons } from 'constants/icons'
import { formatTime } from 'helpers/formatTime'
import { IconType } from 'react-icons'

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
    function calculateSchemaDuration(schema: SchemaItem) {
        const pomodorosDuration = schema.pomodorosGoal * schema.pomodoroDuration * 60
        const shortBreaksDuration = schema.pomodorosGoal * schema.shortBreakDuration * 60
        const longBreaksDuration = Math.floor(schema.pomodorosGoal / schema.longBreakDelay) * schema.longBreakDuration * 60
        return pomodorosDuration + shortBreaksDuration + longBreaksDuration
    }

    function getFormattedTime(seconds: number) {
        return formatTime(seconds, 'hh:mm')
    }
    return (
        <>
            <Box>
                <b>{schema.title}</b> - {getFormattedTime(calculateSchemaDuration(schema))}
            </Box>
            <Box display="flex" gap="4px">
                <GhostIcon icon={Icons.Edit} title="Edit" onClick={(event: any) => event.stopPropagation()} />
                <GhostIcon icon={Icons.Delete} hoverBg="red.500" title="Delete" onClick={(event: any) => event.stopPropagation()} />
            </Box>
        </>
    )
}

export default SchemaCard
