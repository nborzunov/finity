import { Flex, Icon, IconButton } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from 'shared/constants/icons'
import { mainButtonStylesGhost } from 'shared/constants/styles'

function Navigation() {
    const icons = [
        {
            id: '/calendar',
            label: 'Calendar',
            icon: Icons.Calendar,
        },
        {
            id: '/',
            label: 'Pomodoro',
            icon: Icons.Pomodoro,
        },
        {
            id: '/settings',
            label: 'Settings',
            icon: Icons.Settings,
        },
        {
            id: '/profile',
            label: 'Profile',
            icon: Icons.Profile,
        },
    ]

    const location = useLocation()
    return (
        <Flex justifyContent="space-around" w="100%" mx="8" maxW="320px">
            {icons.map((icon) => {
                return (
                    <Link to={icon.id} key={icon.id}>
                        <IconButton
                            icon={<Icon as={icon.icon} />}
                            aria-label={icon.label}
                            isActive={location.pathname === icon.id}
                            variant="ghost"
                            rounded="full"
                            color="gray.500"
                            size="lg"
                            textShadow="1px 1px 10px #614ad3"
                            fontSize="2xl"
                            {...mainButtonStylesGhost}
                        />
                    </Link>
                )
            })}
        </Flex>
    )
}

export default Navigation
