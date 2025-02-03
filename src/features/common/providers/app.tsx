'use client'

import * as React from 'react'

import { FeaturesProvider } from '@saas-ui-pro/feature-flags'
import { SuiProvider } from '@saas-ui/react'
import { useHotkeys } from '@saas-ui/use-hotkeys'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getCookie, setCookie } from 'cookies-next'
import { IconContext } from 'react-icons'

import { Link } from '#components/link'
import { ModalsProvider } from '#components/modals'
import { appHotkeys, segments } from '#config'
import { system } from '#theme'

import { Hotkeys } from '../components/hotkeys'
import { getQueryClient } from '../lib/react-query'
import { AuthProvider } from './auth'
import { I18nProvider } from './i18n'

/**
 * We use a custom color mode manager to sync the color mode
 * value with the cookie value. This will prevent any flash
 * of color mode mismatch when the page loads.
 */
// type StorageManager = typeof localStorageManager
// const colorModeManager: StorageManager = {
//   type: 'cookie',
//   ssr: true,
//   get: (initialColorMode?: ColorMode): ColorMode | undefined => {
//     const storedColorMode = getCookie('chakra-ui-color-mode') as
//       | ColorMode
//       | undefined

//     return storedColorMode ? storedColorMode : initialColorMode
//   },
//   set: (value: string) => {
//     setCookie('chakra-ui-color-mode', value, {
//       maxAge: 31536000,
//       path: '/',
//     })
//   },
// }

export interface AppProviderProps {
  onError?: (error: Error, info: any) => void
  initialColorMode?: any
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { onError, children } = props

  const [showDevtools, setShowDevtools] = React.useState(false)

  /**
   * Toggle React Query devtools
   */
  useHotkeys('ctrl+shift+d', () => {
    setShowDevtools((prev) => !prev)
  })

  const queryClient = React.useMemo(() => getQueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ className: 'react-icon', size: '1.1em' }}>
        <SuiProvider linkComponent={Link} onError={onError} value={system}>
          <AuthProvider>
            <FeaturesProvider value={segments}>
              <I18nProvider>
                <Hotkeys hotkeys={appHotkeys}>
                  <ModalsProvider>{children}</ModalsProvider>
                </Hotkeys>
              </I18nProvider>
            </FeaturesProvider>
          </AuthProvider>
        </SuiProvider>
      </IconContext.Provider>
      {showDevtools && <ReactQueryDevtools position="right" />}
    </QueryClientProvider>
  )
}
