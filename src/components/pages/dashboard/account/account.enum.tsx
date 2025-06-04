import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  USER_ROLE_COLORS,
  USER_ROLE_LABELS,
  USER_STATUS_COLORS,
  USER_STATUS_LABELS,
} from '@/services/enum-label'
import { USER_ROLE, USER_STATUS } from '@/services/schemas/user.schema'

export const UserStatusBabge = ({
  status,
  className,
}: {
  status: USER_STATUS
  className?: string
}) => {
  return (
    <Badge variant='outline' className={cn(USER_STATUS_COLORS[status], 'text-nowrap', className)}>
      {USER_STATUS_LABELS[status]}
    </Badge>
  )
}

export const UserRoleBabge = ({ role, className }: { role: USER_ROLE; className?: string }) => {
  return <Badge className={cn(USER_ROLE_COLORS[role], className)}>{USER_ROLE_LABELS[role]}</Badge>
}
