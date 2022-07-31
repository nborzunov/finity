import { Box, Switch, Text, useColorModeValue } from '@chakra-ui/react'
import Select from 'settings/components/partial/Select'
import { SelectOption } from 'settings/types'
import { DialogMode } from 'shared/constants/constants'

function CardWrapper({
    title,
    value,
    mode,
    isCheckbox,
    options,
    order,
    setField,
}: {
    title: string
    value: string | boolean
    mode?: DialogMode
    isCheckbox: boolean
    setField: (value: number | boolean) => void
    options?: SelectOption[]
    order?: number
}) {
    function isBoolean(value: string | boolean): value is boolean {
        return isCheckbox && typeof value === 'boolean'
    }
    return (
        <>
            {mode === DialogMode.View && !isCheckbox && (
                <Box
                    bgColor={useColorModeValue('brand.400', 'gray.900')}
                    py="4"
                    px="6"
                    borderRadius="full"
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex"
                >
                    <Text color={useColorModeValue('gray.100', 'gray.300')} fontSize="18px">
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
                    <Text color={useColorModeValue('gray.900', 'gray.300')} fontSize="18px">
                        {title}
                    </Text>

                    <Switch
                        size="md"
                        colorScheme="brand"
                        zIndex={1}
                        isChecked={value as boolean}
                        isDisabled={mode === DialogMode.View}
                        onChange={(event: any) => setField(event.target.checked)}
                    />
                </Box>
            )}
            {mode !== DialogMode.View && (
                <>
                    {!isCheckbox && !isBoolean(value) && options && (
                        <Select options={options} title={title} value={value} order={order} setField={setField} />
                    )}
                </>
            )}
        </>
    )
}

CardWrapper.defaultProps = {
    isCheckbox: false,
    mode: 'edit',
}

export default CardWrapper
