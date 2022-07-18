import { Box, CircularProgress, CircularProgressLabel, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import Stepper from 'components/Stepper/Stepper'
import { Icons } from 'constants/icons'
import { boxShadowMedium, mainButtonStyles } from 'constants/styles'
import useTimer from 'hooks/useTimer'
import useTitle from 'hooks/useTitle'

function Pomodoro() {
    const { isPaused, schema, order, getPercentage, getFormattedTime, getSessionStatus, toggle } = useTimer()

    useTitle(isPaused ? 'Pomodoro timer' : `${getFormattedTime()} - ${getSessionStatus()}`)
    return (
        <>
            {/* localization */}
            <Heading color="white" textAlign="center" pt="4" pb="8" fontSize="xl">
                Pomodoro timer
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
