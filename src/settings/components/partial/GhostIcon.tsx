import { Icon, IconButton } from '@chakra-ui/react'
import { IconType } from 'react-icons'

function GhostIcon({ icon, hoverBg, title, onClick }: { icon: IconType; hoverBg?: string; title: string; onClick: any }) {
    return (
        <IconButton
            icon={<Icon as={icon} />}
            aria-label={title}
            variant="ghost"
            fontSize="17px"
            borderRadius="xl"
            title={title}
            _hover={{
                background: hoverBg,
                color: 'rgba(255, 255, 255, 0.8)',
            }}
            _focus={{
                background: hoverBg,
            }}
            onClick={onClick}
        />
    )
}

GhostIcon.defaultProps = {
    hoverBg: 'brand.500',
}

export default GhostIcon
