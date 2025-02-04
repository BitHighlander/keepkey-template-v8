import { theme as saasTheme } from '@saas-ui-pro/react'
import { defineStyle } from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'

// Define the outline variant using gold colors
const variantOutline = defineStyle((props) => {
  const { colorScheme: c, theme } = props
  return {
    border: '1px solid',
    borderColor: '#E6B300', // using KeepKey Gold
    _checked: {
      bg: '#FFEDB3', // lighter gold (primary.100)
      _dark: {
        bg: transparentize('#E6B300', 0.12)(theme),
      },
    },
  }
})

// Define the ghost variant; for gray use specific style, otherwise fallback to outline
const variantGhost = defineStyle((props) => {
  const { colorScheme: c } = props
  if (c === 'gray') {
    return {
      borderColor: 'default-border-color',
      _checked: {
        bg: 'blackAlpha.200',
        _dark: {
          bg: 'whiteAlpha.300',
        },
      },
    }
  }
  return variantOutline(props)
})

// Define secondary variant that extends outline with transparent bg
const variantSecondary = defineStyle((props) => {
  const { theme, colorScheme: c } = props
  return {
    ...variantOutline(props),
    bg: 'transparent',
    _checked: {
      bg: '#FFEDB3',
      _dark: {
        bg: transparentize('#E6B300', 0.12)(theme),
      },
    },
  }
})

// Define sizes
const sizes = {
  xs: defineStyle({
    h: '7',
    minW: '7',
    fontSize: 'xs',
    px: '2',
  }),
}

export default {
  colors: {
    primary: {
      50: '#FFF9E6',
      100: '#FFEDB3',
      200: '#FFE180',
      300: '#FFD54D',
      400: '#FFC91A',
      500: '#E6B300', // KeepKey Gold
      600: '#B38A00',
      700: '#806200',
      800: '#4D3B00',
      900: '#1A1300',
    },
  },
  grayTint: '#000000',
  tokens: {
    'app-background': {
      default: '#FFFFFF',
      _dark: '#000000', // Pure black background
    },
    'app-text': {
      default: '#1A1A1A',
      _dark: '#E6B300', // Gold text in dark mode
    },
    'sidebar-background': {
      default: '#F5F5F5',
      _dark: '#0A0A0A', // Slightly lighter black for sidebar
    },
    'sidebar-text': {
      default: '#1A1A1A',
      _dark: '#E6B300', // Gold text in dark mode
    },
    'card-background': {
      default: '#FFFFFF',
      _dark: '#0A0A0A', // Slightly lighter black for cards
    },
    'card-text': {
      default: '#1A1A1A',
      _dark: '#FFFFFF',
    },
    'button-background': {
      default: '#E6B300',
      _dark: '#E6B300',
    },
    'button-text': {
      default: '#FFFFFF',
      _dark: '#000000',
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: '#FFC91A', // Lighter gold on hover
        },
      },
      variants: {
        solid: {
          bg: '#E6B300', // KeepKey Gold
          color: 'white',
          _dark: {
            bg: '#E6B300',
            color: 'black',
          },
        },
        glass: {
          bg: 'rgba(230, 179, 0, 0.15)', // KeepKey Gold with transparency
          color: '#E6B300',
          backdropFilter: 'blur(8px)',
          _hover: {
            bg: 'rgba(230, 179, 0, 0.25)',
          },
          _dark: {
            color: '#E6B300',
            bg: 'rgba(230, 179, 0, 0.15)',
            _hover: {
              bg: 'rgba(230, 179, 0, 0.25)',
            },
          },
        },
        surface: {
          bg: 'gray.100',
          color: 'gray.800',
          _hover: {
            bg: 'gray.200',
          },
          _dark: {
            bg: 'gray.800',
            color: '#E6B300',
            _hover: {
              bg: 'gray.700',
            },
          },
        },
        ghost: variantGhost,
        primary: {
          bg: '#E6B300',
          color: 'white',
          _hover: {
            bg: '#FFC91A',
          },
          _dark: {
            bg: '#E6B300',
            color: 'black',
            _hover: {
              bg: '#FFC91A',
            },
          },
        },
        outline: variantOutline,
        secondary: variantSecondary,
      },
      sizes: {
        xs: sizes.xs,
      },
      defaultProps: {
        colorScheme: 'primary'
      },
    },
  },
} 