import { Box, Select, Stack, Switch } from '@chakra-ui/react'
import Slider from 'components/Settings/NotificationSettings/Slider'
import SettingsHeading from 'components/Settings/SettingsHeading'
import { alarmsList } from 'constants/constants'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userSettingsState } from 'store/atoms'

import Label from '../Label'

function NotificationSettings() {
    const [userSettings, setUserSettings] = useRecoilState(userSettingsState)
    const [form, setForm] = useState({
        volume: userSettings.volume,
        playAlarmSound: userSettings.playAlarmSound,
        alarm: userSettings.alarm,
    })

    function setValue(key: string) {
        return (value: any) => {
            setForm({
                ...form,
                [key]: value,
            })

            if (key !== 'playAlarmSound') {
                playSound(key === 'alarm' ? value : form.alarm)
            }
        }
    }

    function playSound(alarmId: string) {
        const alarm = alarmsList.find((alarm) => alarm.id === alarmId)

        if (!alarm) {
            return
        }

        const audio = new Audio(alarm.url)

        audio.volume = form.volume
        audio.play()
    }

    useEffect(() => {
        setUserSettings((val) => ({
            ...val,
            ...form,
        }))
    }, [form])

    return (
        <Box width="100%" maxWidth="400px">
            <SettingsHeading>Notifications</SettingsHeading>

            <Stack spacing="4">
                <Box py="0" display="flex" justifyContent="space-between" alignItems="center">
                    <Label>Volume</Label>

                    <Slider value={form.volume * 100} setValue={setValue('volume')} />
                </Box>

                <Box py="0" display="flex" justifyContent="space-between" alignItems="center">
                    <Label>Sound</Label>
                    <Select value={form.alarm} onChange={(e) => setValue('alarm')(e.target.value)} w="120px">
                        {alarmsList.map((alarm) => (
                            <option value={alarm.id} key={alarm.title}>
                                {alarm.title}
                            </option>
                        ))}
                    </Select>
                </Box>

                <Box py="0" display="flex" justifyContent="space-between" alignItems="center">
                    <Label>Play alarm sound</Label>

                    <Switch
                        size="md"
                        colorScheme="brand"
                        zIndex={1}
                        isChecked={form.playAlarmSound}
                        onChange={(event: any) => setValue('playAlarmSound')(event.target.checked)}
                    />
                </Box>
            </Stack>
        </Box>
    )
}

export default NotificationSettings
