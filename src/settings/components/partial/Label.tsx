import { Text, useColorModeValue } from '@chakra-ui/react'

function Label({ children }: { children: string }) {
    return (
        <Text fontWeight="bold" fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')} mr="6">
            {children}
        </Text>
    )
}

export default Label
