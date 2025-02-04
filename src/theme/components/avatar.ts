import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: '#E6B300',
    color: 'white',
    _dark: {
      backgroundColor: '#E6B300',
      color: 'black',
    },
  },
})

export const avatarTheme = defineMultiStyleConfig({
  baseStyle,
}) 