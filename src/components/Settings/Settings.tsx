import { Box, Heading } from '@chakra-ui/react'

function Settings() {
    return (
        <Box>
            <Heading textAlign="center" pt="4" pb="8" fontSize="xl" color="white">
                Timer
            </Heading>
            <Heading textAlign="center" pt="4" pb="8" fontSize="xl" color="white">
                Notifications
            </Heading>
            <Heading textAlign="center" pt="4" pb="8" fontSize="xl" color="white">
                Application
            </Heading>
        </Box>
    )
}

export default Settings
