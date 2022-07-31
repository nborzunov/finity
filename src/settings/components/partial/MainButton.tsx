import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { boxShadowMedium, mainButtonStyles, mainButtonStylesGhost } from 'shared/constants/styles'

function MainButton({ onClick, isGhost, children }: { onClick: any; isGhost?: boolean; children: any }) {
    const { colorMode } = useColorMode()
    const isDarkMode = colorMode === 'dark'
    return (
        <Button
            size="lg"
            rounded="full"
            mx="4"
            fontSize="lg"
            px="8"
            width="50%"
            maxWidth="168px"
            color={isGhost ? useColorModeValue('gray.800', 'white') : 'white'}
            boxShadow={isGhost ? 'none' : boxShadowMedium}
            backgroundColor={isGhost ? 'transparent' : 'brand.500'}
            {...(isGhost ? mainButtonStylesGhost(isDarkMode) : mainButtonStyles)}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default MainButton
