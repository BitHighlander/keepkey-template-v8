'use client'

import { Container, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth-provider'
import { FormLayout, SubmitButton } from '@saas-ui/forms'
import { LoadingOverlay } from '@saas-ui/react/loading-overlay'
import { z } from 'zod'

import { Form } from '#components/form/form.tsx'
import { Link } from '#components/link'
import { Logo } from '#components/logo'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  if (isAuthenticated) {
    return (
      <LoadingOverlay.Root>
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
              await logIn(values)
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
