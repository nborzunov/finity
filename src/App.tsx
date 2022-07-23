import { Box } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Navigation from 'components/Navigation/Navigation'
import Pomodoro from 'components/Pomodoro/Pomodoro'
import Settings from 'components/Settings/Settings'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            50: '#dedef3',
            100: '#c2c2e9',
            200: '#a0a0dd',
            300: '#8396df',
            400: '#8d8dd6',
            500: '#5454c2',
            600: '#5454c2', // copy of 500
            700: '#4747b1',
            800: '#4949a8',
            900: '#100f5b',
        },
        black: '#05050e',
        gray: {
            500: '#545068',
            900: '#2C2C3E',
            950: '#1F1B2E',
        },
        blue: {
            500: '#282fa9',
        },
    },
})

function App() {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
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
                        >
                            <Routes>
                                <Route element={<Navigate to="pomodoro" replace />} path="/" />
                                <Route path="pomodoro" element={<Pomodoro />} />
                                <Route path="settings" element={<Settings />} />
                            </Routes>
                        </Box>

                        <Navigation />
                    </Box>
                </BrowserRouter>
            </ChakraProvider>
        </RecoilRoot>
    )
}

export default App
