'use client'

import {
  Avatar,
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton } from '@saas-ui/forms'
import { LoadingOverlay } from '@saas-ui/react/loading-overlay'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import { z } from 'zod'

import { Form } from '#components/form/form.tsx'
import { Link } from '#components/link'
import { Logo } from '#components/logo'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  if (isAuthenticated) {
    return (
      <LoadingOverlay.Root>
        <LoadingOverlay.Spinner />
      </LoadingOverlay.Root>
    )
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
              email: '',
              password: '',
            }}
            onSubmit={async (values) => {
              await signUp(values)
            }}
          >
            {({ Field }) => (
              <FormLayout>
                <Field name="email" label="Email" type="email" />
                <Field name="password" label="Password" type="password" />
                <SubmitButton>Sign up</SubmitButton>
              </FormLayout>
            )}
          </Form>
        </Container>

        <Text color="fg.muted" textStyle="sm">
          Already have an account?{' '}
          <Link href="/login" color="fg">
            Log in
          </Link>
          .
        </Text>
      </Stack>
      <Stack flex="1" bg="colorPalette.solid">
        <Center flex="1">
          <Container maxWidth="md">
            <HStack mb="4" gap="4">
              <Box>
                <Text color="fg.inverted" fontSize="md" fontWeight="medium">
                  Ahmed
                </Text>
                <Text color="fg.inverted/80" fontSize="md">
                  Founder of{' '}
                  <Link href="https://localxpose.io" color="fg.inverted">
                    LocalXpose
                  </Link>
                </Text>
              </Box>
            </HStack>
            <Text color="white" fontSize="md">
              I really recommend Saas UI to any developer or team seeking a
              robust, visually appealing, and easy-to-implement UI framework.
              The support and updates from the Saas UI team were exceptional,
              Thank you.
            </Text>
          </Container>
        </Center>
      </Stack>
    </Stack>
  )
}
