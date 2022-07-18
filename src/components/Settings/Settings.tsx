import { Box } from '@chakra-ui/react'
import TimerSettings from 'components/Settings/TimerSettings/TimerSettings'

function Settings() {
    return (
        <Box width="100%" minWidth="300px">
            <TimerSettings />
            {/* <Heading textAlign="center" pt="4" pb="8" fontSize="xl" color="white">
                Notifications
            </Heading>
            <Heading textAlign="center" pt="4" pb="8" fontSize="xl" color="white">
                Application
            </Heading> */}
        </Box>
    )
}

export default Settings
