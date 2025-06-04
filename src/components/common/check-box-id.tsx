'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const CheckboxIdItem = (props: { id: string }) => {
  const [checked, setChecked] = useState(false)
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const onCheckedChange = (checked: CheckedState) => {
    const params = new URLSearchParams(searchParams.toString())
    const ids = searchParams.getAll('ids')
    params.delete('ids')
    const _ids = !!checked ? [...ids, props.id] : ids.filter((id) => id !== props.id)
    _ids.forEach((id) => {
      params.append('ids', id)
    })
    replace(`${pathName}?${params.toString()}`)
  }
  useEffect(() => {
    const ids = searchParams.getAll('ids')
    const _checked = ids.includes(props.id)
    setChecked(_checked)
  }, [searchParams, props.id])
  return <Checkbox id={props.id} onCheckedChange={onCheckedChange} checked={checked} />
}
