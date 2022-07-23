import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import AppearanceSettings from 'components/Settings/AppearanceSettings/AppearanceSettings'
import NotificationSettings from 'components/Settings/NotificationSettings/NotificationSettings'
import TimerSettings from 'components/Settings/TimerSettings/TimerSettings'

import SettingsHeading from './SettingsHeading'

function Settings() {
    return (
        <Box width="100%" minWidth="300px" mt="8">
            <HStack spacing="8" alignItems="start">
                <Stack spacing="8" display="flex" alignItems="center">
                    <NotificationSettings />
                    <AppearanceSettings />
                </Stack>
                <Stack spacing="8" display="flex" alignItems="center">
                    <TimerSettings />
                </Stack>
                <Stack spacing="8" display="flex" alignItems="center">
                    <Box width="100%" maxWidth="300px">
                        <SettingsHeading>Additional</SettingsHeading>
                        <Text>If you face with some issues with the app, please click this button</Text>
                        <Button onClick={() => localStorage.clear()} mt="4">
                            Clear all cache
                        </Button>
                    </Box>
                </Stack>
            </HStack>
        </Box>
    )
}

export default Settings
