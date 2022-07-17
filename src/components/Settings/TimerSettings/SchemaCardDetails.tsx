import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'

import { blankSchema } from '../../../constants/defaultValues'
import { boxShadowMedium, mainButtonStyles, mainButtonStylesGhost } from '../../../constants/styles'
import { formatTime } from '../../../helpers/formatTime'
import CardWrapper from './CardWrapper'
import { SchemaItem } from './TimerSettings'

export enum DialogMode {
    Edit = 'edit',
    Create = 'create',
    View = 'view',
}

function SchemaCardDetails({
    initialMode,
    isOpen,
    onClose,
    schema,
}: {
    initialMode: DialogMode
    isOpen: boolean
    onClose: () => void
    schema: SchemaItem
}) {
    const [mode, setMode] = useState(initialMode)
    const [initialSchema] = useState<SchemaItem>(schema)

    const getFormattedTime = useCallback(
        (seconds: number) => {
            return formatTime(seconds, 'HH:MM')
        },
        [schema],
    )

    function edit() {
        setMode(DialogMode.Edit)
    }
    function save() {}

    function cancel() {}

    function getOptions(type: string) {
        switch (type) {
            case 'pomodoroDuration':
                return getInterval(5, 60).map((interval) => formatTime(interval * 60, 'HH:MM'))
        }
    }

    function getInterval(min: number, max: number, step: number = 1) {
        const intervals = []
        for (let i = min; i <= max; i += step) {
            intervals.push(i)
        }
        return intervals
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
            <ModalContent bg="gray.950">
                <ModalHeader>{schema.title} timer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing="3">
                        <CardWrapper
                            title="Focus time"
                            value={getFormattedTime(initialSchema.pomodoroDuration * 60)}
                            mode={mode}
                            options={getOptions('pomodoroDuration')}
                        />
                        <CardWrapper title="Short break" value={getFormattedTime(initialSchema.shortBreakDuration * 60)} mode={mode} />
                        <CardWrapper title="Long break" value={getFormattedTime(initialSchema.longBreakDuration * 60)} mode={mode} />
                        <CardWrapper title="Sections" value={initialSchema.pomodorosGoal + ' intervals'} mode={mode} />
                        <CardWrapper title="Long break delay" value={initialSchema.longBreakDelay + ' intervals'} mode={mode} />

                        <CardWrapper title="Auto start pomodoros" value={initialSchema.autoStartPomodoros} mode={mode} isCheckbox={true} />

                        <CardWrapper title="Auto start breaks" value={initialSchema.autoStartBreaks} mode={mode} isCheckbox={true} />
                    </Stack>
                </ModalBody>

                <ModalFooter display="flex" justifyContent={mode === DialogMode.View ? 'flex-end' : 'space-between'}>
                    {mode === DialogMode.View && (
                        <Button
                            backgroundColor="brand.500"
                            size="lg"
                            rounded="full"
                            mx="4"
                            color="white"
                            fontSize="lg"
                            px="8"
                            width="50%"
                            boxShadow={boxShadowMedium}
                            {...mainButtonStyles}
                            onClick={() => edit()}
                            maxWidth="168px"
                        >
                            Edit
                        </Button>
                    )}
                    {mode === DialogMode.Edit && (
                        <>
                            <Button
                                size="lg"
                                rounded="full"
                                mx="4"
                                color="white"
                                fontSize="lg"
                                px="8"
                                width="50%"
                                backgroundColor="transparent"
                                {...mainButtonStylesGhost}
                                onClick={() => cancel()}
                            >
                                Cancel
                            </Button>

                            <Button
                                backgroundColor="brand.500"
                                size="lg"
                                rounded="full"
                                mx="4"
                                color="white"
                                fontSize="lg"
                                px="8"
                                width="50%"
                                boxShadow={boxShadowMedium}
                                {...mainButtonStyles}
                                onClick={() => save()}
                            >
                                Save
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

SchemaCardDetails.defaultProps = {
    initialMode: DialogMode.View,
    schema: blankSchema,
}

function SchemaCardDetailsWrapper({ schema, children }: { schema: SchemaItem; children: React.ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {React.cloneElement(children as any, {
                onClick: onOpen,
            })}

            <SchemaCardDetails isOpen={isOpen} onClose={onClose} schema={schema} />
        </>
    )
}

export default SchemaCardDetailsWrapper
