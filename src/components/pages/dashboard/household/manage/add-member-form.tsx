'use client'
import { SearchForm } from '@/components/common/search-form'
import { UUIDComp } from '@/components/common/uuid-comp'
import { Pagination } from '@/components/table-helpper'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRequest } from '@/hooks/use-request'
import { cn } from '@/lib/utils'
import { Paginate } from '@/services/crud/crud.generic'
import { GENDER_LABELS, REL_HEAD_LABELS } from '@/services/enum-label'
import { memberRequest } from '@/services/routes/member.request'
import { REL_HEAD } from '@/services/schemas/member.schema'
import { Citizen } from '@/services/types/citizen.dto'
import { CreateHouseholdMemberDto } from '@/services/types/member.dto'
import { Pencil } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const AddMemberForm = (props: { data: Paginate<Citizen>; householdId: string }) => {
  const { data, householdId } = props
  const router = useRouter()
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [citizenId, setCitizenId] = useState<string>()
  const [relationWithHead, setRelationWithHead] = useState<REL_HEAD>()
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCitizenId(undefined)
      setRelationWithHead(undefined)
      router.push(`/dashboard/household/${householdId}/member`)
    } else setIsOpen(open)
  }
  useEffect(() => {
    if (pathName.endsWith('/add-member')) setIsOpen(true)
    else setIsOpen(false)
  }, [pathName])
  const handleRequest = useRequest(
    (data: CreateHouseholdMemberDto) => memberRequest.create(data),
    `/dashboard/household/${householdId}/member`,
  )

  const handleSubmit = async () => {
    if (!citizenId || !relationWithHead) return
    const data: CreateHouseholdMemberDto = {
      householdId,
      citizenId,
      relationWithHead,
    }
    await handleRequest(data)
    setCitizenId(undefined)
    setRelationWithHead(undefined)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={cn('max-w-[800px] h-[500px] overflow-auto')}>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold flex items-center gap-2 justify-start'>
            <Pencil />
            <h1>Thêm thành viên mới</h1>
          </DialogTitle>
          <Separator className='mb-5' />
        </DialogHeader>
        {relationWithHead ? (
          <CitizenTable
            handleSubmit={handleSubmit}
            citizenId={citizenId}
            data={data}
            setCitizenId={setCitizenId}
          />
        ) : (
          <RelationSelect
            relationWithHead={relationWithHead}
            setRelationWithHead={setRelationWithHead}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

const CitizenTable = (props: {
  data: Paginate<Citizen>
  setCitizenId: Dispatch<SetStateAction<string | undefined>>
  citizenId?: string
  handleSubmit?: () => void
}) => {
  const { data, setCitizenId, citizenId, handleSubmit } = props
  const { result: citizens, meta } = data
  return (
    <div className='flex flex-col gap-4 w-full py-5'>
      <div className='flex gap-5'>
        <SearchForm placeholder='Nhập id, tên hoặc số CCCD/CMND' className='w-full' />
        <Button onClick={handleSubmit} disabled={!citizenId}>
          Thêm
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Số CCCD/CMND</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Tuổi</TableHead>
            <TableHead>Giới tính</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {citizens.map((citizen) => (
            <TooltipProvider key={citizen.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TableRow
                    className={cn(
                      'cursor-pointer hover:bg-slate-100',
                      citizenId === citizen.id && 'bg-slate-200 text-green-500 font-bold',
                    )}
                    onClick={() => setCitizenId(citizen.id)}
                  >
                    <TableCell className='font-medium'>
                      <UUIDComp id={citizen.id} />
                    </TableCell>
                    <TableCell>{citizen.nationalId}</TableCell>
                    <TableCell>{citizen.fullName}</TableCell>
                    <TableCell>{citizen.age}</TableCell>
                    <TableCell>{GENDER_LABELS[citizen.gender]}</TableCell>
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chọn công dân này</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <Pagination meta={meta} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

const RelationSelect = (props: {
  setRelationWithHead: Dispatch<SetStateAction<REL_HEAD | undefined>>
  relationWithHead?: REL_HEAD
}) => {
  const { setRelationWithHead, relationWithHead } = props
  return (
    <RadioGroup
      className='grid grid-cols-2 gap-3'
      value={relationWithHead}
      onValueChange={(v) => setRelationWithHead(v as REL_HEAD)}
    >
      {Object.values(REL_HEAD).map((relation) => (
        <div key={relation} className='flex items-center space-x-2'>
          <RadioGroupItem hidden value={relation} id={relation} />
          <Label
            className={cn(
              'w-full flex items-center justify-center border p-5 rounded-lg cursor-pointer',
              relationWithHead === relation && 'border-green-500 bg-slate-50',
            )}
            htmlFor={relation}
          >
            {REL_HEAD_LABELS[relation]}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
