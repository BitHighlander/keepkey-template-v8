import { IconButton, Portal } from '@chakra-ui/react'
import { Has } from '@saas-ui-pro/feature-flags'
import { useAuth } from '@saas-ui/auth-provider'
import { Menu, PersonaAvatar } from '@saas-ui/react'
import { useHotkeysShortcut } from '@saas-ui/use-hotkeys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

import { getCurrentUser } from '#api'
import { useHelpCenter } from '#components/help-center'

import { usePath } from '../hooks/use-path'

export const UserMenu = () => {
  const { logOut } = useAuth()

  const { data: { currentUser } = {} } = useQuery({
    queryKey: ['GetCurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  const queryClient = useQueryClient()

  const logOutAndClearCache = () => {
    logOut().then(() => {
      queryClient.clear()
    })
  }

  const toggleColorMode = () => null

  const help = useHelpCenter()
  const helpCommand = useHotkeysShortcut('general.help', () => {
    help.open()
  })

  const logoutCommand = useHotkeysShortcut('general.logout', () => {
    logOutAndClearCache()
  })

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" aria-label="User menu" rounded="full">
          <PersonaAvatar
            size="xs"
            name={currentUser?.name || ''}
            src={currentUser?.avatar || undefined}
            presence="online"
          />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        {/* Wrap the menu in a portal so that the color scheme tokens get applied correctly.  */}
        <Menu.Content minW="200px" zIndex={['modal', null, 'dropdown']}>
          <Menu.ItemGroup title={currentUser?.name || ''}>
            <Menu.Item value="profile" asChild>
              <Link href={usePath(`/settings/account`)}>Profile</Link>
            </Menu.Item>
            <Has feature="settings">
              <Menu.Item value="settings" asChild>
                <Link href={usePath(`/settings`)}>Settings</Link>
              </Menu.Item>
            </Has>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.Item value="changelog">Changelog</Menu.Item>
          <Menu.Item value="help" onClick={() => help.open()}>
            Help
            <Menu.ItemCommand>{helpCommand}</Menu.ItemCommand>
          </Menu.Item>
          <Menu.Item value="feedback">Feedback</Menu.Item>
          <Menu.Item
            value="toggle-color-mode"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              toggleColorMode()
            }}
          >
            {/* {colorMode === 'dark' ? 'Light mode' : 'Dark mode'} */}
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="logout" onClick={() => logOutAndClearCache()}>
            Log out
            <Menu.ItemCommand>{logoutCommand}</Menu.ItemCommand>
          </Menu.Item>
        </Menu.Content>
      </Portal>
    </Menu.Root>
  )
}
