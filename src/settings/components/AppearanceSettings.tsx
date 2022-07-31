import { Box, Select, Stack, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Label from 'settings/components/partial/Label'
import SettingsHeading from 'settings/components/partial/SettingsHeading'
import { languagesList } from 'settings/constants'
import { UserSettings } from 'settings/types'
import { userSettingsState } from 'store/atoms'

function AppearanceSettings() {
    const [userSettings, setUserSettings] = useRecoilState(userSettingsState)
    const { setColorMode } = useColorMode()
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
                [key]: value,
            }))

            if (key === 'colorTheme') {
                setColorMode(value)
            }
        }
    }

    return (
        <Box width="100%" maxWidth="340px">
            <SettingsHeading>Appearance</SettingsHeading>

            <Stack spacing="4">
                <Box py="0" display="flex" justifyContent="space-between" alignItems="center">
                    <Label>Color theme</Label>
                    <Select value={form.colorTheme} onChange={(e) => setValue('colorTheme')(e.target.value)} w="120px">
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
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
