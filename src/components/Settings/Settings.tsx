import { Box, Stack } from '@chakra-ui/react'
import AppearanceSettings from 'components/Settings/AppearanceSettings/AppearanceSettings'
import NotificationSettings from 'components/Settings/NotificationSettings/NotificationSettings'
import TimerSettings from 'components/Settings/TimerSettings/TimerSettings'

function Settings() {
    return (
        <Box width="100%" minWidth="300px">
            <Stack spacing="5" display="flex" alignItems="center">
                <TimerSettings />
                <NotificationSettings />
                <AppearanceSettings />
            </Stack>
        </Box>
    )
}

export default Settings
