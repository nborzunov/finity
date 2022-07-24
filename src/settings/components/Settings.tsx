import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import { useResetRecoilState } from 'recoil'
import AppearanceSettings from 'settings/components/AppearanceSettings'
import NotificationSettings from 'settings/components/NotificationSettings'
import SettingsHeading from 'settings/components/SettingsHeading'
import TimerSettings from 'settings/components/TimerSettings'
import {
    schemaDetailsState,
    schemasState,
    timerCurrentSessionState,
    timerIsPausedState,
    timerOrderState,
    timerRemainingSecondsState,
    timerSchemaChangedState,
    timerSchemaState,
    userSettingsState,
} from 'store/atoms'

function Settings() {
    const resetTimerIsPaused = useResetRecoilState(timerIsPausedState)
    const resetTimerOrder = useResetRecoilState(timerOrderState)
    const resetCurrentSession = useResetRecoilState(timerCurrentSessionState)
    const resetTimerRemainingSeconds = useResetRecoilState(timerRemainingSecondsState)
    const resetTimerSchema = useResetRecoilState(timerSchemaState)
    const resetTimerSchemaChanged = useResetRecoilState(timerSchemaChangedState)
    const resetSchemasList = useResetRecoilState(schemasState)
    const resetSchemaDetails = useResetRecoilState(schemaDetailsState)
    const resetUserSettings = useResetRecoilState(userSettingsState)

    function clearState() {
        localStorage.clear()
        resetTimerIsPaused()
        resetTimerOrder()
        resetCurrentSession()
        resetTimerRemainingSeconds()
        resetTimerSchema()
        resetTimerSchemaChanged()
        resetSchemasList()
        resetSchemaDetails()
        resetUserSettings()
    }
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
                        {/* TODO: clear all atom states */}
                        <Button onClick={clearState} mt="4">
                            Clear all cache
                        </Button>
                    </Box>
                </Stack>
            </HStack>
        </Box>
    )
}

export default Settings
