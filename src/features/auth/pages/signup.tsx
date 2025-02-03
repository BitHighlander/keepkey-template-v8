'use client'

import {
  Avatar,
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton } from '@saas-ui/forms'
import { LoadingOverlay } from '@saas-ui/react/loading-overlay'
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
      <LoadingOverlay.Root variant="fullscreen">
        <LoadingOverlay.Spinner />
      </LoadingOverlay.Root>
    )
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

          <Form
            schema={schema}
            defaultValues={{
              email: 'demo@saas-ui.dev',
              password: 'demo',
            }}
            onSubmit={async (values) => {
              await signUp(values)
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
