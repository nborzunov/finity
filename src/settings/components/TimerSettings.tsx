import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import SettingsHeading from 'settings/components/partial/SettingsHeading'
import SchemaCard from 'settings/components/schema/SchemaCard'
import SchemaDetails from 'settings/components/schema/SchemaDetails'
import useSchemaDetailsDialog from 'settings/hooks/useSchemaDetailsDialog'
import { SchemaItem } from 'settings/types'
import { DialogMode } from 'shared/constants/constants'
import { schemasState, timerSchemaState } from 'store/atoms'

function TimerSettings() {
    const [schemas] = useRecoilState(schemasState)

    const { open } = useSchemaDetailsDialog()

    function openDetailsDialog(mode: DialogMode, schema?: SchemaItem) {
        open({
            schema,
            initialMode: mode,
        })
    }
    const selectedSchema = useRecoilValue(timerSchemaState)

    return (
        <Box w="340px">
            <SchemaDetails />
            <SettingsHeading>Timer</SettingsHeading>

            <Stack spacing="3">
                {schemas.map((schema, index) => (
                    <Box
                        key={index}
                        color="white"
                        p="3"
                        borderRadius="full"
                        h="64px"
                        alignItems="center"
                        justifyContent="space-between"
                        display="flex"
                        cursor="pointer"
                        transition="0.15s"
                        bgColor={selectedSchema.id !== schema.id ? 'brand.500' : 'brand.400'}
                        _hover={{
                            bgColor: selectedSchema.id !== schema.id ? 'brand.500' : 'brand.400',
                            opacity: 0.8,
                        }}
                        _focus={{
                            bgColor: selectedSchema.id !== schema.id ? 'brand.500' : 'brand.400',
                            color: 'rgba(255, 255, 255, 0.8)',
                        }}
                        onClick={() => openDetailsDialog(DialogMode.View, schema)}
                    >
                        <Box px="3" alignItems="center" justifyContent="space-between" display="flex" w="100%">
                            <SchemaCard schema={schema} />
                        </Box>
                    </Box>
                ))}

                <Button
                    color="white"
                    bgColor="brand.500"
                    px="8"
                    borderRadius="full"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    h="64px"
                    _hover={{
                        bgColor: 'brand.500',
                        opacity: 0.8,
                    }}
                    _focus={{
                        bgColor: 'brand.500',
                        color: 'rgba(255, 255, 255, 0.8)',
                    }}
                    onClick={() => openDetailsDialog(DialogMode.Create)}
                >
                    <Heading size="md">New schema</Heading>
                </Button>
            </Stack>
        </Box>
    )
}

export default TimerSettings
