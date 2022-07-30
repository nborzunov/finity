import { Box } from '@chakra-ui/react'
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
                    bg="gray.950"
                    h="100vh"
                    alignItems="center"
                    justifyContent="space-between"
                    display="flex"
                    flexDirection="column"
                    py="4"
                >
                    <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="column"
                        maxHeight="calc(100vh - 100px)"
                        overflowY="auto"
                        overflowX="hidden"
                        width="100vw"
                    >
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
