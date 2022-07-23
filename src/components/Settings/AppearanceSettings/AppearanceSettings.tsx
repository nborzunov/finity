import { Box, Select, Stack } from '@chakra-ui/react'
import { languagesList } from 'constants/constants'
import { UserSettings } from 'constants/types'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userSettingsState } from 'store/atoms'

import Label from '../Label'
import SettingsHeading from '../SettingsHeading'

function AppearanceSettings() {
    const [userSettings, setUserSettings] = useRecoilState(userSettingsState)
    const [form, setForm] = useState<Pick<UserSettings, 'colorTheme' | 'language'>>({
        colorTheme: userSettings.colorTheme,
        language: userSettings.language,
    })

    function setValue(key: string) {
        return (value: any) => {
            setForm({
                ...form,
                [key]: value,
            })

            setUserSettings((val) => ({
                ...val,
                ...form,
            }))
        }
    }
    return (
        <Box width="100%" maxWidth="400px">
            <SettingsHeading>Appearance</SettingsHeading>

            <Stack spacing="4">
                <Box py="0" display="flex" justifyContent="space-between" alignItems="center">
                    <Label>Color theme</Label>
                    <Select value={form.language} onChange={(e) => setValue('language')(e.target.value)} w="120px">
                        <option value="dark">Dark</option>
                        <option value="light" disabled>
                            Light
                        </option>
                    </Select>
                </Box>

                <Box py="0" display="flex" justifyContent="space-between" alignItems="center">
                    <Label>Language</Label>
                    <Select value={form.language} onChange={(e) => setValue('language')(e.target.value)} w="120px">
                        {languagesList.map((language) => (
                            <option value={language.id} key={language.title} disabled={!language.supported}>
                                {language.title}
                            </option>
                        ))}
                    </Select>
                </Box>
            </Stack>
        </Box>
    )
}

export default AppearanceSettings
