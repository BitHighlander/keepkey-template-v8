'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { AppProvider } from '#features/common/providers/app'
import { system } from '#theme'

/**
 * This is the root context provider for the application.
 * You can add context providers here that should be available to all pages.
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <AppProvider onError={(error, info) => console.error(error, info)}>
        {children}
      </AppProvider>
    </ChakraProvider>
  )
}
