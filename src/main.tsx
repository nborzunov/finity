import './index.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const theme = extendTheme({
    colors: {
        brand: {
            300: '#8396df',
            500: '#5454c2',
            700: '#4747b1',
            900: '#100f5b',
        },
        black: '#05050e',
        gray: {
            500: '#545068',
            900: '#2C2C3E',
        },
        blue: {
            500: '#282fa9',
        },
    },
})
ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
