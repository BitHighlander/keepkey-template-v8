import { EmptyState } from '@saas-ui/react'
import { LuBuilding } from 'react-icons/lu'

export function CompaniesPage() {
  return (
    <EmptyState
      title="Companies"
      description="Manage your companies."
      icon={<LuBuilding />}
    />
  )
}
