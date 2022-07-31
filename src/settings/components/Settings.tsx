import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useResetRecoilState } from 'recoil'
import AppearanceSettings from 'settings/components/AppearanceSettings'
import NotificationSettings from 'settings/components/NotificationSettings'
import SettingsHeading from 'settings/components/partial/SettingsHeading'
import TimerSettings from 'settings/components/TimerSettings'
import useMobile from 'shared/hooks/useMobile'
import {
    schemaDetailsState,
    schemasState,
    timerCurrentSessionState,
    timerIsPausedState,
    timerOrderState,
    timerSchemaChangedState,
    timerSchemaState,
    timerSecondsState,
    userSettingsState,
} from 'store/atoms'

function SettingsContainer({ children }: { children: ReactNode }) {
    const isMobile = useMobile()

    return (
        <Stack spacing={isMobile ? '4' : '8'} display="flex" alignItems="center" width="100%" maxWidth="min(340px, 100vw)">
            {children}
        </Stack>
    )
}
function Settings() {
    const resetTimerIsPaused = useResetRecoilState(timerIsPausedState)
    const resetTimerOrder = useResetRecoilState(timerOrderState)
    const resetCurrentSession = useResetRecoilState(timerCurrentSessionState)
    const resetTimerRemainingSeconds = useResetRecoilState(timerSecondsState)
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

    const isMobile = useMobile()
    return (
        <Box minWidth="300px" mt={isMobile ? '2' : '8'}>
            <HStack
                spacing={isMobile ? '2' : '8'}
                alignItems={isMobile ? 'center' : 'start'}
                justifyContent={isMobile ? 'center' : 'start'}
                flexWrap={isMobile ? 'wrap' : 'nowrap'}
            >
                <SettingsContainer>
                    <NotificationSettings />
                    <AppearanceSettings />
                </SettingsContainer>
                <SettingsContainer>
                    <TimerSettings />
                </SettingsContainer>
                <SettingsContainer>
                    <Box>
                        <SettingsHeading>Additional</SettingsHeading>
                        <Text>If you face with some issues in the app, please click this button</Text>
                        <Button onClick={clearState} mt="4">
                            Clear all cache
                        </Button>
                    </Box>
                </SettingsContainer>
            </HStack>
        </Box>
    )
}

export default Settings
