import { Box, CircularProgress, CircularProgressLabel, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import Stepper from 'pomodoro/components/Stepper'
import useTimer from 'pomodoro/hooks/useTimer'
import { useRecoilValue } from 'recoil'
import { Icons } from 'shared/constants/icons'
import { boxShadowMedium, mainButtonStyles } from 'shared/constants/styles'
import useTitle from 'shared/hooks/useTitle'
import { timerSchemaState } from 'store/atoms'

function Pomodoro() {
    const { isPaused, schema, order, getPercentage, getFormattedTime, getSessionStatus, toggle } = useTimer()
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
            <IconButton
                icon={<Icon as={!isPaused ? Icons.Pause : Icons.Play} />}
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
                onClick={toggle}
            />
        </>
    )
}

export default Pomodoro
