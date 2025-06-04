'use client'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export const SplitButton = (props: { householdId: string }) => {
  const searchParams = useSearchParams()
  const ids = searchParams.getAll('ids')
  const { push } = useRouter()
  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString())
    const url = `/dashboard/household/${props.householdId}/split?${params.toString()}`
    push(url)
  }
  return (
    <Button disabled={ids.length === 0} onClick={handleClick} variant='destructive'>
      Tách hộ
    </Button>
  )
}
