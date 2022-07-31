import { Box, CircularProgress, CircularProgressLabel, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import RoundButton from 'pomodoro/components/partial/RoundButtom'
import Stepper from 'pomodoro/components/partial/Stepper'
import { TimerContext } from 'pomodoro/hooks/useTimer'
import { useContext } from 'react'
import { useRecoilValue } from 'recoil'
import { Icons } from 'shared/constants/icons'
import { timerSchemaState } from 'store/atoms'

function Pomodoro() {
    const { isPaused, schema, order, getPercentage, getTime, getSession, toggle, stepBack, resetTimer } = useContext(TimerContext)
    const selectedSchema = useRecoilValue(timerSchemaState)

    return (
        <>
            {/* localization */}
            <Heading color={useColorModeValue('gray.950', 'white')} textAlign="center" pt="4" pb="8" fontSize="xl">
                {selectedSchema.title + ' timer'}
            </Heading>

            <CircularProgress
                value={getPercentage()}
                size="240px"
                thickness="3px"
                color={useColorModeValue('brand.500', 'brand.700')}
                trackColor={useColorModeValue('gray.400', 'gray.500')}
                capIsRound
            >
                <CircularProgressLabel color={useColorModeValue('gray.950', 'white')}>
                    <Text>{getTime()}</Text>
                    <Text fontSize="lg">{getSession()}</Text>
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
