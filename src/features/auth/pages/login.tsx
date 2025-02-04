'use client'

import { Button, Container, HStack, Stack, Text } from '@chakra-ui/react'
import { FormLayout, SubmitButton } from '@saas-ui/forms'
import { LoadingOverlay } from '@saas-ui/react/loading-overlay'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaGoogle } from 'react-icons/fa'
import { z } from 'zod'

import { Form } from '#components/form/form.tsx'
import { Link } from '#components/link'
import { Logo } from '#components/logo'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const LoginPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <LoadingOverlay.Root>
        <LoadingOverlay.Spinner />
      </LoadingOverlay.Root>
    )
  }

  if (session) {
    router.replace('/')
    return null
  }

  const handleGoogleSignIn = async () => {
    try {
      console.log('Starting Google sign-in...')
      
      await signIn('google', {
        callbackUrl: '/',
        redirect: true,
        // Force no caching of the auth request
        authorizationParams: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
          // Add a timestamp to prevent caching
          state: `st_${Date.now()}`
        }
      })
    } catch (error) {
      console.error('Failed to sign in with Google:', error)
    }
  }

  return (
    <Stack flex="1" direction="row" minH="100vh">
      <Stack
        flex="1"
        alignItems="center"
        justify="center"
        direction="column"
        gap="8"
      >
        <Container maxWidth="sm">
          <Logo margin="0 auto" mb="12" />

          <Button
            w="100%"
            mb="4"
            onClick={handleGoogleSignIn}
            variant="outline"
          >
            <Stack direction="row" gap={2} align="center">
              <FaGoogle />
              <Text>Continue with Google</Text>
            </Stack>
          </Button>

          <Stack direction="row" gap={4} align="center" my="4">
            <Stack flex="1" h="1px" bg="gray.200" />
            <Text color="fg.muted">
              or
            </Text>
            <Stack flex="1" h="1px" bg="gray.200" />
          </Stack>

          <Form
            schema={schema}
            defaultValues={{
              email: 'user@keepkey.com',
              password: '123345',
            }}
            onSubmit={async (values) => {
              const result = await signIn('credentials', {
                ...values,
                redirect: false,
              })
              if (result?.error) {
                return { error: result.error }
              }
            }}
          >
            {({ Field }) => (
              <FormLayout>
                <Field name="email" label="Email" type="email" />
                <Field name="password" label="Password" type="password" />
                <SubmitButton>Log in</SubmitButton>
              </FormLayout>
            )}
          </Form>
        </Container>

        <Text color="fg.muted" textStyle="sm">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" color="fg">
            Sign up
          </Link>
          .
        </Text>
      </Stack>
    </Stack>
  )
}
