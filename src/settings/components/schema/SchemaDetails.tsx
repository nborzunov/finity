import {
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
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import MainButton from 'settings/components/partial/MainButton'
import CardWrapper from 'settings/components/schema/CardWrapper'
import { FieldLabels, SchemaItemFields } from 'settings/constants'
import { Field, Fields, SchemaItem } from 'settings/types'
import { DialogMode } from 'shared/constants/constants'
import ConfirmationDialog from 'shared/dialogs/ConfirmationDialog'
import { formatTime } from 'shared/helpers/formatTime'
import { ConfirmationDialogData } from 'shared/types'
import { schemaDetailsState, schemasState, timerSchemaChangedState, timerSchemaState } from 'store/atoms'

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
                            choose(checkRequiredFieldsChanged())
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

    function choose(dontReset: boolean = false) {
        if (schemaToEdit) {
            setSelectedSchema(schemaToEdit)
            if (!dontReset) {
                setTimerSchemaChanged(true)
            }
        }
        cancel()
    }

    function checkRequiredFieldsChanged() {
        if (!schemaToEdit || !initialSchema) {
            return
        }
        const requiredFIelds = Object.values(SchemaItemFields).filter(
            (field) => field !== SchemaItemFields.AutoStartPomodoros && field !== SchemaItemFields.AutoStartBreaks,
        ) as Fields[]

        for (let key of requiredFIelds) {
            if (schemaToEdit[key] !== initialSchema[key]) {
                return false
            }
        }
        return true
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
            case SchemaItemFields.PomodoroDuration:
                return getInterval(5, 120).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
            case SchemaItemFields.ShortBreakDuration:
                return getInterval(5, 30).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
            case SchemaItemFields.LongBreakDuration:
                return getInterval(5, 60).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))

            case SchemaItemFields.PomodorosGoal:
                return getInterval(1, 12).map((interval) => ({
                    label: formatOptionValue(type, interval),
                    value: interval,
                }))
            case SchemaItemFields.LongBreakDelay:
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
        const keys = Object.values(SchemaItemFields) as Fields[]

        return keys.map((key, index) => {
            let field: Field = {
                key: key,
                label: FieldLabels[key],
            }

            if (key === SchemaItemFields.AutoStartPomodoros || key === SchemaItemFields.AutoStartBreaks) {
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
                <ModalContent bg={useColorModeValue('brand.50', 'gray.950')} ref={ref} mt="8" mx="4">
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
                                <MainButton isGhost onClick={choose}>
                                    Choose
                                </MainButton>

                                <MainButton onClick={edit}>Edit</MainButton>
                            </>
                        )}
                        {mode !== DialogMode.View && (
                            <>
                                <MainButton isGhost onClick={cancel}>
                                    Cancel
                                </MainButton>

                                {mode === DialogMode.Edit && <MainButton onClick={save}>Save</MainButton>}

                                {mode === DialogMode.Create && <MainButton onClick={save}>Create</MainButton>}
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
