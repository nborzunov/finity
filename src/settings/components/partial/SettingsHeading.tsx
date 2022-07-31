import { Heading, useColorModeValue } from '@chakra-ui/react'

function SettingsHeading({ children }: { children: string }) {
    return (
        <Heading textAlign="center" pt="4" pb="4" fontSize="xl" color={useColorModeValue('gray.950', 'white')}>
            {children}
        </Heading>
    )
}

export default SettingsHeading
