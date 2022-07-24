import { Box, Slider as ChakraSlider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { Icons } from 'shared/constants/icons'

function Slider({ value, setValue }: { value: number; setValue: (value: number) => void }) {
    const [showTooltip, setShowTooltip] = useState(false)

    const [state, setState] = useState(value)

    function handleDrop() {
        setValue(state / 100)
    }

    return (
        <ChakraSlider aria-label="slider" defaultValue={state} onChange={(v) => setState(v)} onChangeEnd={() => handleDrop()}>
            <SliderTrack bg="white">
                <SliderFilledTrack bg="brand.500" />
            </SliderTrack>
            <Tooltip hasArrow bg="brand.500" color="white" placement="top" label={`${state}%`} isOpen={showTooltip}>
                <SliderThumb boxSize={6} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                    <Box color="brand.500" as={Icons.Volume} />
                </SliderThumb>
            </Tooltip>
        </ChakraSlider>
    )
}

export default Slider
