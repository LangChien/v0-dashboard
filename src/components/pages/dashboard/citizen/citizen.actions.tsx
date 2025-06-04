import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRequest } from '@/hooks/use-request'
import { citizenRequest } from '@/services/routes/citizen.request'
import { Citizen } from '@/services/types/citizen.dto'
import { Copy, Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { ViewCitizenDialog } from './view-citizen-dialog'

export const CitizenActions = ({ citizen }: { citizen: Citizen }) => {
  const handleDelete = useRequest(async (id: string) => citizenRequest.delete(id))
  const [open, setOpen] = useState(false)
  return (
    <Fragment>
      <ViewCitizenDialog open={open} onClose={() => setOpen(false)} citizen={citizen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true)
            }}
          >
            <Eye className='mr-2 h-4 w-4' />
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(citizen.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy citizen ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link passHref href={`/dashboard/citizen/${citizen.id}/edit`}>
            <DropdownMenuItem>
              <Pencil className='mr-2 h-4 w-4' />
              Cập nhật
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => handleDelete(citizen.id)}>
            <Trash2 className='mr-2 h-4 w-4' />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  )
}
