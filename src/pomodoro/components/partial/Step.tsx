import { Box, useColorModeValue } from '@chakra-ui/react'

function Step({
    isActive,
    isLast,
    isFilled,
    count,
    index,
}: {
    isActive: boolean
    isLast: boolean
    isFilled: boolean
    count: number
    index: number
}) {
    function getBackgroundColor() {
        if (isActive) {
            // TODO: bgColor
            return useColorModeValue('white', 'gray.950')
        }
        if (isFilled) {
            return 'brand.500'
        }
        if (!isFilled) {
            return useColorModeValue('gray.400', 'gray.500')
        }
    }

    function getBackgroundPosition() {
        if (isActive) {
            return 'right'
        }
        if (isFilled) {
            return 'center'
        }
        if (!isFilled) {
            return 'left'
        }
    }
    return (
        <>
            <Box
                borderRadius="full"
                w="24px"
                h="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="-5px"
                backgroundSize="200%"
                transition="0.2s ease-in-out"
                bgGradient={`linear(to-l, ${useColorModeValue('gray.400', 'gray.500')} 50%, brand.500 50%) r`}
                transitionDelay={`${index * 0.2}s`}
                backgroundPosition={isFilled || isActive ? 'left' : 'right'}
            >
                <Box
                    w="18px"
                    h="18px"
                    borderRadius="50%"
                    backgroundColor={getBackgroundColor()}
                    backgroundSize="200%"
                    transition="0.2s ease-in-out"
                    bgGradient={`linear(to-l, ${useColorModeValue('gray.400', 'gray.500')}, 30% brand.500 30%, ${useColorModeValue(
                        'white',
                        'gray.950',
                    )} 30%) r`}
                    transitionDelay={`${index * 0.2}s`}
                    backgroundPosition={getBackgroundPosition()}
                ></Box>
            </Box>

            {!isLast && (
                <Box
                    w={-2 * count + 40 + 'px'}
                    h="2px"
                    backgroundSize="200%"
                    transition="0.2s ease-in-out"
                    bgGradient={`linear(to-l, ${useColorModeValue('gray.400', 'gray.500')} 50%, brand.500 50%) r`}
                    transitionDelay={`${index * 0.2 + 0.2}s`}
                    backgroundPosition={isFilled ? 'left' : 'right'}
                />
            )}
        </>
    )
}

export default Step
