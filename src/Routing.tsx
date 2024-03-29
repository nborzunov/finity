import './index.css'

import { Box, useColorModeValue } from '@chakra-ui/react'
import Pomodoro from 'pomodoro/components/Pomodoro'
import useTimer, { TimerContext } from 'pomodoro/hooks/useTimer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Settings from 'settings/components/Settings'
import Navigation from 'shared/components/Navigation'

function AppRouting() {
    const timer = useTimer()
    return (
        <BrowserRouter>
            <TimerContext.Provider value={timer}>
                <Box
                    id="container"
                    bg={useColorModeValue('white', 'gray.950')}
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex"
                    flexDirection="column"
                    py="4"
                >
                    <Box alignItems="center" display="flex" flexDirection="column" overflowY="auto" overflowX="hidden" width="100vw">
                        <Routes>
                            <Route path="/" element={<Pomodoro />} />
                            <Route path="settings" element={<Settings />} />
                        </Routes>
                    </Box>

                    <Navigation />
                </Box>
            </TimerContext.Provider>
        </BrowserRouter>
    )
}

export default AppRouting
