import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

import { SchemaType } from '../../../hooks/useTimer'
import { schemasState } from '../../../store/atoms'
import SettingsHeading from '../SettingsHeading'
import SchemaCard from './SchemaCard'
import SchemaCardDetailsWrapper from './SchemaCardDetails'

export interface SchemaItem extends SchemaType {
    title: string
    default: boolean
}

function TimerSettings() {
    const [schemas] = useRecoilState(schemasState)
    return (
        <>
            <SettingsHeading>Timer</SettingsHeading>

            <Stack spacing="3">
                {schemas.map((schema, index) => (
                    <SchemaCardDetailsWrapper schema={schema} key={index}>
                        <Button
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
                        >
                            <Box px="3" alignItems="center" justifyContent="space-between" display="flex" w="100%">
                                <SchemaCard schema={schema} />
                            </Box>
                        </Button>
                    </SchemaCardDetailsWrapper>
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
                >
                    <Heading size="md">New schema</Heading>
                </Button>
            </Stack>
        </>
    )
}

export default TimerSettings
