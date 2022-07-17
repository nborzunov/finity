import { Box, Select as ChakraSelect, Switch, Text } from '@chakra-ui/react'

import { DialogMode } from './SchemaCardDetails'

function Select({ options }: { options: string[] }) {
    return (
        <ChakraSelect
            color="white"
            bgColor="gray.900"
            h="59px"
            borderRadius="full"
            __css={{
                'chakra-select': {
                    color: 'red',
                },
                scrollBarWidth: 'none',
                color: 'red.500',
            }}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </ChakraSelect>
    )
}

function CardWrapper({
    title,
    value,
    mode,
    isCheckbox,
    options,
}: {
    title: string
    value: string | boolean
    mode: DialogMode
    isCheckbox: boolean
    options?: string[]
}) {
    function isBoolean(value: string | boolean): value is boolean {
        return isCheckbox
    }
    return (
        <>
            {mode === DialogMode.View && !isCheckbox && (
                <Box
                    color="white"
                    bgColor="gray.900"
                    py="4"
                    px="6"
                    borderRadius="full"
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex"
                >
                    <Text color="gray.300" fontSize="18px">
                        {title}
                    </Text>

                    <Text color="gray.100" fontSize="18px">
                        {value}
                    </Text>
                </Box>
            )}
            {isCheckbox && (
                <Box
                    color="white"
                    bgColor="transparent"
                    py="4"
                    px="6"
                    borderRadius="full"
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex"
                >
                    <Text color="gray.300" fontSize="18px">
                        {title}
                    </Text>

                    {isBoolean(value) && (
                        <Switch id="autoStartPomodoros" isChecked={value} isDisabled={mode === DialogMode.View} size="md" />
                    )}
                </Box>
            )}
            {mode !== DialogMode.View && <>{!isCheckbox && options && <Select options={options} />}</>}
        </>
    )
}

CardWrapper.defaultProps = {
    isCheckbox: false,
}

export default CardWrapper
