import { Heading } from '@chakra-ui/react'

function SettingsHeading({ children }: { children: string }) {
    return (
        <Heading textAlign="center" pt="4" pb="4" fontSize="xl" color="white">
            {children}
        </Heading>
    )
}

export default SettingsHeading
