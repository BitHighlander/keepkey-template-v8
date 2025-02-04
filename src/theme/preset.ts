// theme.ts
import { createSystem, defineConfig } from '@chakra-ui/react'
import { defaultConfig } from '@saas-ui-pro/react'

/**
 * This theme config forces both light and dark modes to use dark colors.
 * For example, the bg.DEFAULT token is set so that:
 *   - In light mode: it is "#121212"
 *   - In dark mode: it is also "#121212"
 */
const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        // Background colors
        bg: {
          DEFAULT: {
            value: { _light: "#ffffff", _dark: "#121212" },
          },
          subtle: {
            value: { _light: "#f5f5f5", _dark: "#1f1f1f" },
          },
        },
        // Foreground/text colors
        fg: {
          DEFAULT: {
            value: { _light: "#171717", _dark: "#E0E0E0" },
          },
          muted: {
            value: { _light: "#666666", _dark: "#B0B0B0" },
          },
        },
        // Border colors
        border: {
          DEFAULT: {
            value: { _light: "#e2e2e2", _dark: "#333333" },
          },
        },
      },
    },
    // Add your custom recipes – here we re-map the button variants from the default configuration.
    recipes: {
      button: {
        variants: {
          variant: {
            primary: defaultConfig.theme?.recipes?.button.variants?.glass,
            secondary: defaultConfig.theme?.recipes?.button.variants?.surface,
            tertiary: defaultConfig.theme?.recipes?.button.variants?.ghost,
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
