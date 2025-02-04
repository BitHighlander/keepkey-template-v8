import { FormEvent, useRef } from 'react'

import * as z from 'zod'
import { Text, useStepsContext } from '@chakra-ui/react'
import { Field, FormLayout, UseFormReturn } from '@saas-ui/forms'
import { toast } from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import slug from 'slug'

import { createOrganization } from '#api'

import { OnboardingStep } from './onboarding-step'

const schema = z.object({
  name: z
    .string()
    .min(3, 'Please choose a name with at least 3 characters.')
    .max(50, 'The organization name should be no longer than 50 characters.')
    .describe('Name'),
  slug: z
    .string()
    .min(1, 'Organization URL is required')
    .regex(/^[a-z0-9-]+$/, 'URL can only contain lowercase letters, numbers, and hyphens')
    .describe('URL'),
})

type FormInput = z.infer<typeof schema>

export const CreateOrganizationStep = () => {
  const stepper = useStepsContext()
  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createOrganization,
  })

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Create a new organization"
      description="Saas UI is multi-tenant and supports workspaces with multiple teams."
      defaultValues={{ name: '', slug: '' }}
      onChange={(data) => {
        // Update slug when name changes
        if (formRef.current && data.name) {
          const slugValue = slug(data.name)
          formRef.current.setValue('slug', slugValue)
        }
      }}
      onSubmit={async (data) => {
        try {
          const result = await mutateAsync({ name: data.name, slug: data.slug })
          if (result.createOrganization?.slug) {
            // Store the workspace in session storage
            window.sessionStorage.setItem('getting-started.workspace', result.createOrganization.slug)
            stepper.goToNextStep()
          }
        } catch (error) {
          toast.error({
            title: 'Failed to create your organization.',
            description: error instanceof Error ? error.message : 'Please try again.',
          })
        }
      }}
      submitLabel={isPending ? 'Creating...' : 'Create organization'}
      maxW={{ base: '100%', md: 'lg' }}
    >
      <FormLayout>
        <Field
          name="name"
          type="text"
          label="Organization name"
          size="lg"
          autoFocus
          required
          data-1p-ignore
          fontSize="sm"
          placeholder="Enter your organization name"
        />
        <Field
          name="slug"
          type="text"
          label="Organization URL"
          size="lg"
          startElement={<Text color="fg.muted">https://saas-ui.dev/</Text>}
          required
          rules={{
            pattern: /^[a-z0-9-]+$/,
          }}
          ps="140px"
          fontSize="sm"
          help="This will be your unique URL identifier"
          disabled
        />
      </FormLayout>
    </OnboardingStep>
  )
}
