import './Pomodoro.css';

import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Icon,
  IconButton,
} from '@chakra-ui/react';

import { Icons } from '../../constants/icons';
import { boxShadowMedium, mainButtonStyles } from '../../constants/styles';
import Stepper from '../Stepper/Stepper';

function Pomodoro() {
  return (
    <>
      {/* localization */}
      <Heading color="white" textAlign="center" pt="4" pb="8" fontSize="xl">
        Pomodoro timer
      </Heading>

      <CircularProgress
        value={30}
        size="240px"
        thickness="3px"
        color="brand.700"
        trackColor="gray.500"
        capIsRound
      >
        <CircularProgressLabel color="white">05:24</CircularProgressLabel>
      </CircularProgress>

      <Box m="2">
        <Stepper count={4} active={2} />
      </Box>

      <IconButton
        icon={<Icon as={Icons.Pause} />}
        aria-label="pause"
        backgroundColor="brand.500"
        size="lg"
        boxShadow={boxShadowMedium}
        rounded="full"
        m="4"
        color="white"
        fontSize="2xl"
        w="16"
        h="16"
        {...mainButtonStyles}
      />
    </>
  );
}

export default Pomodoro;
