import { Box, CircularProgress, CircularProgressLabel, Heading, Text } from '@chakra-ui/react'
import Stepper from 'pomodoro/components/partial/Stepper'
import useTimer from 'pomodoro/hooks/useTimer'
import { useRecoilValue } from 'recoil'
import { Icons } from 'shared/constants/icons'
import useTitle from 'shared/hooks/useTitle'
import { timerSchemaState } from 'store/atoms'

import RoundButton from './partial/RoundButtom'

function Pomodoro() {
    const { isPaused, schema, order, getPercentage, getFormattedTime, getSessionStatus, toggle, stepBack, resetTimer } = useTimer()
    const selectedSchema = useRecoilValue(timerSchemaState)

    useTitle(isPaused ? 'Pomodoro timer' : `${getFormattedTime()} - ${getSessionStatus()}`)
    return (
        <>
            {/* localization */}
            <Heading color="white" textAlign="center" pt="4" pb="8" fontSize="xl">
                {selectedSchema.title + ' timer'}
            </Heading>

            <CircularProgress value={getPercentage()} size="240px" thickness="3px" color="brand.700" trackColor="gray.500" capIsRound>
                <CircularProgressLabel color="white">
                    <Text>{getFormattedTime()}</Text>
                    <Text fontSize="lg">{getSessionStatus()}</Text>
                </CircularProgressLabel>
            </CircularProgress>

            <Box m="2">
                <Stepper count={schema.pomodorosGoal} active={order.shortBreak} />
            </Box>

            {/* TODO: buttons: reset timer and go back to prev */}

            <Box display="flex" alignItems="center" justifyContent="center" m="4">
                <RoundButton icon={Icons.Previous} title="Previous session" onClick={stepBack} />

                <RoundButton icon={!isPaused ? Icons.Pause : Icons.Play} title={!isPaused ? 'Pause' : 'Play'} onClick={toggle} mainButton />

                <RoundButton icon={Icons.Stop} title="Reset timer" onClick={resetTimer} />
            </Box>
        </>
    )
}

export default Pomodoro
