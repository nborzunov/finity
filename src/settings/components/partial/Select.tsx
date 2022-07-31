import { Box, Flex, Icon, Text, useColorModeValue, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { useRef } from 'react'
import { SelectOption } from 'settings/types'
import { Icons } from 'shared/constants/icons'

function Select({
    order,
    options,
    title,
    value,
    setField,
}: {
    order: number
    options: SelectOption[]
    title: string
    value: string
    setField: (value: number) => void
}) {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const ref = useRef<any>()

    useOutsideClick({
        ref: ref,
        handler: onClose,
    })

    return (
        <>
            <Box
                py="4"
                px="6"
                color={useColorModeValue('gray.900', 'white')}
                borderRadius="64px"
                alignItems="center"
                justifyContent="space-between"
                display="flex"
                position="relative"
                bgColor={useColorModeValue('brand.400', 'gray.900')}
                borderTopRadius={isOpen ? '32px' : '64px'}
                borderBottomRadius={isOpen ? 'none' : '64px'}
                transition="border-radius 0.1s"
                _hover={{
                    cursor: 'pointer',
                    // opacity: '0.8',
                }}
                onClick={onToggle}
                ref={ref}
                tabIndex={order}
            >
                <Text color={useColorModeValue('gray.100', 'gray.300')} fontSize="18px">
                    {title}
                </Text>

                <Flex alignItems="center">
                    <Text color="gray.100" fontSize="18px" mr="6">
                        {value}
                    </Text>

                    <Icon color={useColorModeValue('white', 'gray.100')} mr="2" as={isOpen ? Icons.Up : Icons.Down} />
                </Flex>

                <Box
                    position="absolute"
                    maxHeight="191px"
                    width="100%"
                    overflowY="auto"
                    bgColor={useColorModeValue('brand.400', 'gray.900')}
                    top="100%"
                    left="0"
                    py="2"
                    borderBottomRadius="32px"
                    zIndex={1000}
                    __css={{
                        '::-webkit-scrollbar': {
                            width: '0px',
                        },
                        scrollSnapType: 'y mandatory',
                    }}
                    visibility={isOpen ? 'visible' : 'hidden'}
                    opacity={isOpen ? 1 : 0}
                    transition="opacity 0.2s"
                    boxShadow="lg"
                >
                    {options.map((option, index) => (
                        <Text
                            key={index}
                            color="gray.100"
                            fontSize="18px"
                            textAlign="center"
                            px="4"
                            py="1"
                            _hover={{
                                cursor: 'pointer',
                                color: 'white',
                                bgColor: useColorModeValue('brand.200', 'brand.500'),
                            }}
                            __css={{
                                scrollSnapAlign: 'center',
                            }}
                            _active={{
                                color: 'gray.500',
                            }}
                            onClick={() => {
                                setField(option.value as number)
                                onToggle()
                            }}
                        >
                            {option.label}
                        </Text>
                    ))}
                </Box>
            </Box>
        </>
    )
}

Select.defaultProps = {
    order: -1,
}

export default Select
