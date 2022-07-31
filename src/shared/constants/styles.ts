export const boxShadowMedium = '0 0px 15px rgba(122, 92, 182, .4)'

export const mainButtonStyles = {
    transition: '0.2s',
    _hover: {
        opacity: '0.7',
        backgroundColor: 'brand.500',
    },
    _active: {
        backgroundColor: 'brand.500',
    },
}

export const mainButtonStylesGhost = (isDarkMode: boolean) => ({
    transition: '0.2s',
    _hover: {
        opacity: '0.7',
        backgroundColor: isDarkMode ? 'gray.950' : 'transparent',
    },
    _active: {
        backgroundColor: isDarkMode ? 'gray.950' : 'brand.500',
        color: isDarkMode ? 'brand.500' : 'white',
    },
})
