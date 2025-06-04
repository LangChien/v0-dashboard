'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRequest } from '@/hooks/use-request'
import { REL_HEAD_LABELS } from '@/services/enum-label'
import { memberRequest } from '@/services/routes/member.request'
import { REL_HEAD } from '@/services/schemas/member.schema'
import { MemberIncludeHouseholdAndCitizen } from '@/services/types/member.dto'
import { Trash } from 'lucide-react'

export const DeleteMemberBtn = (props: { member: MemberIncludeHouseholdAndCitizen }) => {
  const member = props.member
  const handleDelete = useRequest(() => memberRequest.delete(member.id))
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>
          <Trash className='text-red-500' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa thành viên này khỏi hộ gia đình của bạn? Điều này sẽ không thể
            hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const ChangeRelation = (props: { member: MemberIncludeHouseholdAndCitizen }) => {
  const member = props.member
  const handleChangeRelation = useRequest(async (relation: REL_HEAD) =>
    memberRequest.update(member.id, {
      relationWithHead: relation,
      householdId: member.householdId,
    }),
  )
  return (
    <Select
      value={member.relationWithHead}
      onValueChange={(v) => handleChangeRelation(v as REL_HEAD)}
    >
      <SelectTrigger>
        <SelectValue placeholder='Thay đổi vai trò' />
      </SelectTrigger>
      <SelectContent>
        {Object.values(REL_HEAD).map((relation) => (
          <SelectItem value={relation} key={`relation-${relation}`}>
            {REL_HEAD_LABELS[relation]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
