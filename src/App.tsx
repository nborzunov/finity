import { Box } from '@chakra-ui/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Pomodoro from './components/Pomodoro/Pomodoro';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Box
        bg="gray.900"
        h="100vh"
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        flexDirection="column"
        py="4"
      >
        <Box alignItems="center" display="flex" flexDirection="column">
          <Routes>
            <Route element={<Navigate to="/pomodoro" replace />} path="/" />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>

        <Navigation />
      </Box>
    </BrowserRouter>
  );
}

export default App;
