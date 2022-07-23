import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import SettingsHeading from 'components/Settings/SettingsHeading'
import SchemaCard from 'components/Settings/TimerSettings/SchemaCard'
import SchemaDetails, { DialogMode } from 'components/Settings/TimerSettings/SchemaDetails'
import useSchemaDetailsDialog from 'hooks/useSchemaDetailsDialog'
import { SchemaType } from 'hooks/useTimer'
import { useRecoilState } from 'recoil'
import { schemasState } from 'store/atoms'

export interface SchemaItem extends SchemaType {
    id: string
    title: string
    default: boolean
}

function TimerSettings() {
    const [schemas] = useRecoilState(schemasState)

    const { open } = useSchemaDetailsDialog()

    function openDetailsDialog(mode: DialogMode, schema?: SchemaItem) {
        open({
            schema,
            initialMode: mode,
        })
    }

    return (
        <>
            <SchemaDetails />
            <SettingsHeading>Timer</SettingsHeading>

            <Stack spacing="3">
                {schemas.map((schema, index) => (
                    <Button
                        key={index}
                        color="white"
                        bgColor="brand.500"
                        p="3"
                        borderRadius="full"
                        h="64px"
                        alignItems="center"
                        justifyContent="space-between"
                        display="flex"
                        _hover={{
                            bgColor: 'brand.500',
                            opacity: 0.8,
                        }}
                        _focus={{
                            bgColor: 'brand.500',
                            color: 'rgba(255, 255, 255, 0.8)',
                        }}
                        onClick={() => openDetailsDialog(DialogMode.View, schema)}
                    >
                        <Box px="3" alignItems="center" justifyContent="space-between" display="flex" w="100%">
                            <SchemaCard schema={schema} />
                        </Box>
                    </Button>
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

            {/* {isSchemaDetailsOpen
                ? createPortal(
                      <>
                          <SchemaDetails
                              isOpen={isSchemaDetailsOpen}
                              onClose={onSchemaDetailsClose}
                              schema={schemaDetailsData?.schema}
                              initialMode={schemaDetailsData?.mode}
                          />
                      </>,
                      document.body,
                  )
                : null} */}
        </>
    )
}

export default TimerSettings
