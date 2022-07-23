import {
    Button,
    Heading,
    Input,
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
import CardWrapper from 'components/Settings/TimerSettings/CardWrapper'
import { SchemaItem } from 'components/Settings/TimerSettings/TimerSettings'
import { boxShadowMedium, mainButtonStyles, mainButtonStylesGhost } from 'constants/styles'
import ConfirmationDialog, { ConfirmationDialogData } from 'dialogs/ConfirmationDialog'
import { formatTime } from 'helpers/formatTime'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { schemaDetailsState, schemasState, timerSchemaChangedState, timerSchemaState } from 'store/atoms'

export enum DialogMode {
    Edit = 'edit',
    Create = 'create',
    View = 'view',
}

enum FieldLabels {
    pomodoroDuration = 'Focus time',
    shortBreakDuration = 'Short break',
    longBreakDuration = 'Long break',
    pomodorosGoal = 'Pomodoros goal',
    longBreakDelay = 'Long break delay',
    autoStartPomodoros = 'Auto start pomodoros',
    autoStartBreaks = 'Auto start breaks',
}

type Fields =
    | 'pomodoroDuration'
    | 'shortBreakDuration'
    | 'longBreakDuration'
    | 'pomodorosGoal'
    | 'longBreakDelay'
    | 'autoStartPomodoros'
    | 'autoStartBreaks'

interface Field {
    key: Fields
    label: FieldLabels
    order?: number
    isCheckbox?: boolean
}

function SchemaDetails() {
    const { initialMode, schema, onClose, isOpen } = useRecoilValue(schemaDetailsState)
    const [mode, setMode] = useState<DialogMode>()
    const [initialSchema, setInitialSchema] = useState<SchemaItem>()
    const [schemaToEdit, setSchemaToEdit] = useState<SchemaItem>()
    const [confirmationData, setConfirmationData] = useState<ConfirmationDialogData>()
    const [fields, setFields] = useState<Field[]>()
    const setSchemas = useSetRecoilState(schemasState)
    const setSelectedSchema = useSetRecoilState(timerSchemaState)
    const setTimerSchemaChanged = useSetRecoilState(timerSchemaChangedState)

    const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()

    const ref = useRef<any>()

    const setSchemaField = useCallback(
        (field: string) => (value: any) => {
            setSchemaToEdit((currentSchema) => ({ ...currentSchema, [field]: value } as SchemaItem))
        },
        [schemaToEdit],
    )

    function edit() {
        setMode(DialogMode.Edit)
    }

    function save() {
        if (mode === DialogMode.Edit) {
            if (isEqual(schemaToEdit, initialSchema)) {
                onClose(true)
                return
            }
            confirm({
                title: 'Save changes?',
                actionTitle: 'Save',
                danger: false,
                onConfirm: (result) => {
                    if (result) {
                        if (schemaToEdit) {
                            setSchemas((schemas) => schemas.map((schema) => (schema.title === schemaToEdit.title ? schemaToEdit : schema)))
                            setTimerSchemaChanged(true)
                        }
                        onClose(true)
                        return
                    }
                },
            })
            return
        }
        // add validation
        if (schemaToEdit) {
            setSchemas((schemas) => [...schemas, schemaToEdit])
            choose()
            onClose(true)
        }
    }

    function cancel() {
        if (isEqual(schemaToEdit, initialSchema)) {
            onClose(false)
            return
        }
        if (mode === DialogMode.Edit) {
            confirm({
                title: 'Discard changes?',
                actionTitle: 'Discard',
                additionalText: 'Are you sure you want to discard changes? You will lose all unsaved changes.',
                onConfirm: (result) => {
                    if (result) {
                        onClose(false)
                        return
                    }
                },
            })
            return
        }
        if (mode === DialogMode.Create) {
            confirm({
                title: 'Discard new schema?',
                actionTitle: 'Discard',
                additionalText: 'Are you sure you want to discard new schema?',
                onConfirm: (result) => {
                    if (result) {
                        onClose(true)
                        return
                    }
                },
            })
        }
    }

    function confirm(data: ConfirmationDialogData) {
        setConfirmationData(data)
        onOpenConfirm()
    }

    function choose() {
        if (schemaToEdit) {
            setSelectedSchema(schemaToEdit)
            setTimerSchemaChanged(true)
        }
        cancel()
    }

    useEffect(() => {
        if (isOpen === true) {
            onMount()
        }
    }, [isOpen])

    function onMount() {
        setMode(initialMode)
        setInitialSchema(schema)
        setSchemaToEdit(schema)
        setConfirmationData({})
        setFields(buildFields())
    }

    function getOptions(type: string) {
        switch (type) {
            case 'pomodoroDuration':
                return getInterval(5, 120).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
            case 'shortBreakDuration':
                return getInterval(5, 30).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
            case 'longBreakDuration':
                return getInterval(5, 60).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))

            case 'pomodorosGoal':
                return getInterval(1, 12).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
            case 'longBreakDelay':
                return getInterval(1, (schemaToEdit as SchemaItem).pomodorosGoal).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
        }
    }

    function getInterval(min: number, max: number, step: number = 1) {
        const intervals = []
        for (let i = min; i <= max; i += step) {
            intervals.push(i)
        }
        return intervals
    }

    function formatOptionValue(field: Fields, initialValue?: number | string): string {
        const value = initialValue || (schemaToEdit as SchemaItem)[field] || ''
        switch (field) {
            case 'pomodoroDuration':
            case 'shortBreakDuration':
            case 'longBreakDuration':
                return getFormattedTime((value as number) * 60)
            case 'pomodorosGoal':
                return `${value} pomodoro${value > 1 ? 's' : ''}`
            case 'longBreakDelay':
                return `every ${value} time${value > 1 ? 's' : ''}`
            default:
                return ''
        }
    }

    const getFormattedTime = useCallback(
        (seconds: number) => {
            return formatTime(seconds, 'MM')
        },
        [schema],
    )

    function buildFields(): Field[] {
        const keys: Fields[] = [
            'pomodoroDuration',
            'shortBreakDuration',
            'longBreakDuration',
            'pomodorosGoal',
            'longBreakDelay',
            'autoStartPomodoros',
            'autoStartBreaks',
        ]

        return keys.map((key, index) => {
            let field: Field = {
                key: key,
                label: FieldLabels[key],
            }

            if (key === 'autoStartPomodoros' || key === 'autoStartBreaks') {
                field.isCheckbox = true
            } else {
                field.order = index + 1
            }
            return field
        })
    }

    function getValue(field: Fields, isCheckbox: boolean = false): string | boolean {
        if (!isCheckbox) {
            return formatOptionValue(field)
        }
        return (schemaToEdit as SchemaItem)[field] as boolean
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={cancel} onOverlayClick={cancel}>
                <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
                <ModalContent bg="gray.950" ref={ref}>
                    {/* TODO: edit/create mode change title */}
                    <ModalHeader>
                        {mode === DialogMode.View && <Heading size="md">{`${schema.title} timer`}</Heading>}
                        {mode !== DialogMode.View && (
                            <Input
                                variant="unstyled"
                                value={schemaToEdit?.title}
                                placeholder="Enter title.."
                                onChange={(e) => setSchemaField('title')(e.target.value)}
                                fontWeight="bold"
                                fontSize="xl"
                                lineHeight="1.2"
                            />
                        )}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing="3">
                            {mode &&
                                fields?.map((field) => (
                                    <CardWrapper
                                        key={field.key}
                                        title={field.label}
                                        value={getValue(field.key, field.isCheckbox)}
                                        setField={setSchemaField(field.key)}
                                        mode={mode}
                                        options={!field.isCheckbox ? getOptions(field.key) : undefined}
                                        order={field.order}
                                        isCheckbox={field.isCheckbox}
                                    />
                                ))}
                        </Stack>
                    </ModalBody>

                    <ModalFooter display="flex" justifyContent="space-between">
                        {mode === DialogMode.View && (
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
                                    onClick={() => choose()}
                                >
                                    Choose
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
                                    onClick={() => edit()}
                                    maxWidth="168px"
                                >
                                    Edit
                                </Button>
                            </>
                        )}
                        {mode !== DialogMode.View && (
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

                                {mode === DialogMode.Edit && (
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
                                )}

                                {mode === DialogMode.Create && (
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
                                        Create
                                    </Button>
                                )}
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ConfirmationDialog isOpen={isOpenConfirm} onClose={onCloseConfirm} {...confirmationData} />
        </>
    )
}

export default SchemaDetails
