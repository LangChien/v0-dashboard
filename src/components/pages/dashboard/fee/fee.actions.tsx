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
import { feeRequest } from '@/services/routes/fee.request'
import { FeeInludeCount } from '@/services/types/fee.dto'
import { Copy, Delete, Edit, Ellipsis, Eye } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { ViewFeeDialog } from './view-fee-dialog'

export const FeeActions = ({ fee }: { fee: FeeInludeCount }) => {
  const handleDelete = useRequest(async (id: string) => feeRequest.delete(id))
  const [openViewDialog, setOpenViewDialog] = useState(false)

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(fee.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy fee ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenViewDialog(true)}>
            <Eye className='mr-2 h-4 w-4' />
            Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link passHref href={`/dashboard/fee/${fee.id}/edit`}>
            <DropdownMenuItem>
              <Edit className='mr-2 h-4 w-4' />
              Cập nhật
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => handleDelete(fee.id)}>
            <Delete className='mr-2 h-4 w-4' />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewFeeDialog fee={fee} open={openViewDialog} onClose={() => setOpenViewDialog(false)} />
    </Fragment>
  )
}
