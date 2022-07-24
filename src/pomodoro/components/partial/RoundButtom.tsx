import { Icon, IconButton, Tooltip } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { boxShadowMedium, mainButtonStyles } from 'shared/constants/styles'

function RoundButton({ mainButton, icon, title, onClick }: { mainButton: boolean; icon: IconType; title: string; onClick: () => void }) {
    return (
        <Tooltip label={title}>
            <IconButton
                icon={<Icon as={icon} />}
                aria-label={title}
                backgroundColor="brand.500"
                size="lg"
                mx="2"
                rounded="full"
                color="white"
                fontSize={!mainButton ? 'lg' : '2xl'}
                w={!mainButton ? '12' : '16'}
                h={!mainButton ? '12' : '16'}
                boxShadow={boxShadowMedium}
                {...mainButtonStyles}
                onClick={onClick}
            />
        </Tooltip>
    )
}

RoundButton.defaultProps = {
    mainButton: false,
}

export default RoundButton
