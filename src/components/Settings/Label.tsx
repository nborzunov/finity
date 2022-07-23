import { Text } from '@chakra-ui/react'

function Label({ children }: { children: string }) {
    return (
        <Text fontWeight="bold" fontSize="lg" color="gray.300" mr="6">
            {children}
        </Text>
    )
}

export default Label
