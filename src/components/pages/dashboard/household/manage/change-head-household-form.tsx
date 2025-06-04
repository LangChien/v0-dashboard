'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { useRequest } from '@/hooks/use-request'
import { cn, formatDateTimestamp } from '@/lib/utils'
import { GENDER_LABELS, REL_HEAD_LABELS } from '@/services/enum-label'
import { memberRequest } from '@/services/routes/member.request'
import { REL_HEAD } from '@/services/schemas/member.schema'
import { HouseholdIncludeCitizen } from '@/services/types/household.dto'
import { ChangeHeadDto, MemberIncludeHouseholdAndCitizen } from '@/services/types/member.dto'
import { Pencil } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IProps {
  members: MemberIncludeHouseholdAndCitizen[]
  household: HouseholdIncludeCitizen
}

const STEP = 2
export const ChangeHeadHouseholForm = (props: IProps) => {
  const { members, household } = props
  const [newHeadCitizenId, setNewHeadCitizenId] = useState<string | undefined>()
  const [oldHeadRelation, setOldHeadRelation] = useState<REL_HEAD | undefined>()
  const [memberRelations, setMemberRelations] = useState<
    { memberId: string; relationWithNewHead: REL_HEAD }[]
  >([])
  const [step, setStep] = useState(0)
  const canContinue =
    (step === 0 && !!newHeadCitizenId) ||
    (step === 1 && !!oldHeadRelation) ||
    (step === 2 && memberRelations.length === members.length)
  const handleChangeRelation = (memberId: string, relation: REL_HEAD) => {
    const existingRelation = memberRelations.find((r) => r.memberId === memberId)
    if (existingRelation)
      setMemberRelations((prev) =>
        prev.map((r) => (r.memberId === memberId ? { ...r, relationWithNewHead: relation } : r)),
      )
    else setMemberRelations((prev) => [...prev, { memberId, relationWithNewHead: relation }])
  }
  const handleChangeHead = useRequest(async (data: ChangeHeadDto) => {
    return memberRequest.changeHead(household.id, data)
  }, `/dashboard/household/${household.id}/profile`)
  const handleSubmit = async () => {
    if (step < STEP) setStep(step + 1)
    else if (newHeadCitizenId && oldHeadRelation)
      await handleChangeHead({
        newHeadCitizenId,
        oldHeadRelation,
        memberRelations,
      })
    setNewHeadCitizenId(undefined)
    setOldHeadRelation(undefined)
    setMemberRelations([])
    setStep(0)
  }
  const router = useRouter()
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(0)
      setNewHeadCitizenId(undefined)
      setOldHeadRelation(undefined)
      setMemberRelations([])
      router.push(`/dashboard/household/${household.id}/profile`)
    } else setIsOpen(open)
  }
  useEffect(() => {
    if (pathName.includes('change-head-household')) setIsOpen(true)
    else setIsOpen(false)
  }, [pathName])
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={cn('max-w-[800px] max-h-[500px] overflow-auto')}>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold flex items-center gap-2 justify-start'>
            <Pencil />
            <h1>Thay đổi chủ căn hộ</h1>
          </DialogTitle>
          <Slider value={[step]} className='w-full' max={3} step={1} />
          <div className='font-bold grid grid-cols-3 gap-2 py-3 px-2 text-gray-500'>
            <p
              onClick={() => setStep(0)}
              className={cn(
                'cursor-pointer',
                step === 0 && 'text-black',
                newHeadCitizenId && 'text-green-500',
              )}
            >
              Chọn chủ căn hộ mới
            </p>
            <p
              onClick={() => {
                if (newHeadCitizenId) setStep(1)
              }}
              className={cn(
                'cursor-not-allowed',
                step === 1 && 'text-black',
                oldHeadRelation && 'text-green-500',
                newHeadCitizenId && 'cursor-pointer',
              )}
            >
              Quan hệ của chủ cũ với chủ mới
            </p>
            <p
              onClick={() => {
                if (oldHeadRelation) setStep(2)
              }}
              className={cn(
                'cursor-not-allowed',
                step === 2 && 'text-black',
                memberRelations.length === members.length && 'text-green-500',
                oldHeadRelation && 'cursor-pointer',
              )}
            >
              Quan hệ của các thành viên với chủ mới
            </p>
          </div>
          <Separator className='mb-5' />
        </DialogHeader>
        <div className='min-h-[200px]'>
          {step === 0 && (
            <RadioGroup
              className='grid grid-cols-2 gap-3'
              value={newHeadCitizenId}
              onValueChange={(v) => setNewHeadCitizenId(v)}
            >
              {members.map((member) => (
                <div
                  key={`${member.id}-select-new-head-house`}
                  className='flex items-center space-x-2'
                >
                  <RadioGroupItem
                    hidden
                    value={member.citizenId}
                    id={`${member.id}-select-new-head-house`}
                  />
                  <Label
                    htmlFor={`${member.id}-select-new-head-house`}
                    className={cn(
                      'w-full flex flex-col gap-2 border p-3 rounded-lg cursor-pointer',
                      newHeadCitizenId === member.citizenId && 'border-green-500 bg-slate-50',
                    )}
                  >
                    <p className='space-x-2'>
                      <span>{member.citizen.fullName}</span>
                      <span>{`(${REL_HEAD_LABELS[member.relationWithHead]})`}</span>
                    </p>
                    <p className='space-x-2'>
                      <span>{member.citizen.age} tuổi</span>
                      <span>{GENDER_LABELS[member.citizen.gender]}</span>
                    </p>
                    <p>{'Ngày tham gia ' + formatDateTimestamp(member.createdAt)}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {step === 1 && (
            <RadioGroup
              className='grid grid-cols-2 gap-3'
              value={oldHeadRelation}
              onValueChange={(v) => setOldHeadRelation(v as REL_HEAD)}
            >
              {Object.values(REL_HEAD).map((relation) => (
                <div key={relation} className='flex items-center space-x-2'>
                  <RadioGroupItem hidden value={relation} id={relation} />
                  <Label
                    className={cn(
                      'w-full flex items-center justify-center border p-5 rounded-lg cursor-pointer',
                      oldHeadRelation === relation && 'border-green-500 bg-slate-50',
                    )}
                    htmlFor={relation}
                  >
                    {REL_HEAD_LABELS[relation]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {step === 2 && (
            <div className='grid gap-3'>
              {members.map((member) => (
                <div
                  key={`new-relation-${member.id}`}
                  className='flex items-center justify-between'
                >
                  <div className='flex-1'>
                    <p>{member.citizen.fullName}</p>
                    <p>{REL_HEAD_LABELS[member.relationWithHead]}</p>
                  </div>
                  <div>
                    <Select
                      value={
                        memberRelations.find((r) => r.memberId === member.id)?.relationWithNewHead
                      }
                      onValueChange={(v) => handleChangeRelation(member.id, v as REL_HEAD)}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Chọn quan hệ' />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(REL_HEAD).map((relation) => (
                          <SelectItem value={relation} key={`relation-${relation}`}>
                            {REL_HEAD_LABELS[relation]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <div className='w-full'>
            <Separator />
            <div className='p-3 flex w-full items-center justify-between'>
              <Button
                onClick={() => setStep((prev) => prev - 1)}
                disabled={step === 0}
                variant='secondary'
              >
                Trở lại
              </Button>
              <Button disabled={!canContinue} onClick={handleSubmit}>
                {step === STEP ? 'Cập nhật' : 'Tiếp tục'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
