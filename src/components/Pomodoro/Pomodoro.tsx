import { Box, CircularProgress, CircularProgressLabel, Heading, Icon, IconButton } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { Icons } from '../../constants/icons'
import { boxShadowMedium, mainButtonStyles } from '../../constants/styles'
import { timerState } from '../../store/atoms'
import Stepper from '../Stepper/Stepper'

function Pomodoro() {
    const timer = useRecoilValue(timerState)
    return (
        <>
            {/* localization */}
            <Heading color="white" textAlign="center" pt="4" pb="8" fontSize="xl">
                Pomodoro timer
            </Heading>

            <CircularProgress
                value={timer.percentage}
                size="240px"
                thickness="3px"
                color="brand.700"
                trackColor="gray.500"
                capIsRound
            >
                <CircularProgressLabel color="white">{timer.getFormattedTime()}</CircularProgressLabel>
            </CircularProgress>

            <Box m="2">
                <Stepper count={timer.schema.longBreakDelay} active={timer.order.pomodoro} />
            </Box>

            <IconButton
                icon={<Icon as={!timer.isPaused ? Icons.Pause : Icons.Play} />}
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
                onClick={timer.toggle}
            />
        </>
    )
}

export default Pomodoro
