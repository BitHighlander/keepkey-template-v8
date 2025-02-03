'use client'

import { Card, Group, Stack, Text } from '@chakra-ui/react'
import { useBilling } from '@saas-ui-pro/billing'
import { Section } from '@saas-ui-pro/react'
import { FormLayout, SubmitButton } from '@saas-ui/forms'
import { useMutation, useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { getOrganization } from '#api'
import { LinkButton } from '#components/button'
import { Form } from '#components/form'
import { SettingsPage } from '#components/settings-page'
import { usePath } from '#features/common/hooks/use-path'
import { useWorkspace } from '#features/common/hooks/use-workspace'
import { FormattedDate } from '#i18n/date-helpers'

function BillingPlan() {
  const { isTrialing, isTrialExpired, trialEndsAt, currentPlan } = useBilling()

  return (
    <Section.Root>
      <Section.Header title="Billing plan" />
      <Section.Body>
        <Card.Root>
          <Card.Body>
            <Stack alignItems="flex-start" textStyle="sm">
              {!isTrialExpired && (
                <Text>
                  You are currently on the <strong>{currentPlan?.name}</strong>{' '}
                  plan.
                </Text>
              )}

              {isTrialing && (
                <Text>
                  Your trial ends <FormattedDate value={trialEndsAt} />.
                </Text>
              )}

              {isTrialExpired && (
                <Text>
                  Your trial ended on <FormattedDate value={trialEndsAt} />.
                </Text>
              )}

              <LinkButton href={usePath('/settings/plans')} variant="surface">
                View plans and upgrade
              </LinkButton>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Section.Body>
    </Section.Root>
  )
}

const billingSchema = z.object({
  billing: z.object({ email: z.string().email() }),
})

function BillingEmail() {
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof billingSchema>) => null,
  })

  return (
    <Section.Root>
      <Section.Header title="Billing email" />
      <Section.Body>
        <Card.Root>
          <Card.Body>
            <Form
              schema={billingSchema}
              onSubmit={(values) => mutation.mutate(values)}
            >
              {({ Field }) => (
                <FormLayout css={{ '--field-label-width': '10rem' }}>
                  <Field
                    name="billing.email"
                    label="Email address"
                    type="email"
                    orientation="horizontal"
                    help="Send invoices to an alternative address."
                  />
                  <Group ps="10.5rem">
                    <SubmitButton>Update</SubmitButton>
                  </Group>
                </FormLayout>
              )}
            </Form>
          </Card.Body>
        </Card.Root>
      </Section.Body>
    </Section.Root>
  )
}

function BillingInvoices() {
  return (
    <Section.Root>
      <Section.Header title="Invoices" />
      <Section.Body>
        <Card.Root>
          <Card.Body>
            <Text color="fg.muted" textStyle="sm">
              No invoices received yet.
            </Text>
          </Card.Body>
        </Card.Root>
      </Section.Body>
    </Section.Root>
  )
}

export function BillingPage() {
  const slug = useWorkspace()

  const { isLoading } = useQuery({
    queryKey: ['Organization', slug],
    queryFn: () => getOrganization({ slug }),
    enabled: !!slug,
  })

  return (
    <SettingsPage
      loading={isLoading}
      title="Billing"
      description="Manage your billing information and invoices"
    >
      <BillingPlan />
      <BillingEmail />
      <BillingInvoices />
    </SettingsPage>
  )
}
