import { Box, Switch, Text } from '@chakra-ui/react'
import { DialogMode } from 'components/Settings/TimerSettings/SchemaCardDetails'
import Select, { SelectOption } from 'components/Settings/TimerSettings/Select'

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
    mode: DialogMode
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
}

export default CardWrapper