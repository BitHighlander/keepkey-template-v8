import { FormEvent, useRef } from 'react'

import * as z from 'zod'
import { Text, useStepsContext } from '@chakra-ui/react'
import { useSessionStorageValue } from '@react-hookz/web'
import { Field, FormLayout, UseFormReturn } from '@saas-ui/forms'
import { toast } from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'
import slug from 'slug'

import { createOrganization } from '#api'

import { OnboardingStep } from './onboarding-step'

const schema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your organization name.')
    .min(2, 'Please choose a name with at least 3 characters.')
    .max(50, 'The organization name should be no longer than 50 characters.')
    .describe('Name'),
  slug: z.string(),
})

type FormInput = z.infer<typeof schema>

export const CreateOrganizationStep = () => {
  const stepper = useStepsContext()

  const workspace = useSessionStorageValue('getting-started.workspace')

  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
  })

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Create a new organization"
      description="Saas UI is multi-tenant and supports workspaces with multiple teams."
      defaultValues={{ name: '', slug: '' }}
      onSubmit={async (data) => {
        try {
          const result = await mutateAsync({ name: data.name })
          if (result.createOrganization?.slug) {
            workspace.set(result.createOrganization.slug)
            stepper.goToNextStep()
          }
        } catch {
          toast.error({
            title: 'Failed to create your organization.',
          })
        }
      }}
      submitLabel="Create organization"
      maxW={{ base: '100%', md: 'lg' }}
    >
      <FormLayout>
        <Field
          name="name"
          type="text"
          label="Organization name"
          size="lg"
          autoFocus
          rules={{ required: true }}
          data-1p-ignore
          onChange={(e: FormEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value
            formRef.current?.setValue('name', value)
            formRef.current?.setValue('slug', slug(value))
          }}
          fontSize="sm"
        />
        <Field
          name="slug"
          type="text"
          label="Organization URL"
          size="lg"
          startElement={<Text color="fg.muted">https://saas-ui.dev/</Text>}
          rules={{
            required: true,
            pattern: /^[a-z0-9-]+$/,
          }}
          ps="140px"
          fontSize="sm"
        />
      </FormLayout>
    </OnboardingStep>
  )
}
