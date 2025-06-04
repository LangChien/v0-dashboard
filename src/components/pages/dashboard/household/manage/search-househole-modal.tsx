'use client'
import { SearchForm } from '@/components/common/search-form'
import { UUIDComp } from '@/components/common/uuid-comp'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { QueryManager, useQueryManager } from '@/hooks/query/use-query-manager'
import { isUUID } from '@/lib/utils'
import { Paginate, PaginateMeta } from '@/services/crud/crud.generic'
import { HouseholdIncludeCitizen } from '@/services/types/household.dto'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const SearchHousehold = (props: {
  data: Paginate<HouseholdIncludeCitizen>
  householdId: string
}) => {
  const data = props.data.result
  const meta = props.data.meta
  const householdId = props.householdId
  const queryManager = useQueryManager()
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (!isUUID(householdId)) router.push(`/dashboard/household/${householdId}`)
      else router.push(`/dashboard/household/${householdId}/profile`)
    }
  }
  useEffect(() => {
    if (pathname.endsWith('search')) setOpen(true)
    else setOpen(false)
  }, [pathname])
  return (
    <Dialog defaultOpen open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>
            <h1>Chọn căn hộ</h1>
          </DialogTitle>
        </DialogHeader>
        <SearchForm
          queryManager={queryManager}
          placeholder='Nhập mã căn hộ, số nhà hoặc tên chủ hộ'
          className='w-full'
        />
        <div>
          {data.map((house) => (
            <Link
              key={`house-item-${house.id}`}
              passHref
              href={`/dashboard/household/${house.id}/profile`}
            >
              <Button variant='outline' className='w-full mt-4 gap-5 justify-start'>
                <p>
                  Căn hộ: <UUIDComp id={house.id} className='text-sm' />
                </p>
                <p>
                  Số nhà: <span>{house.houseNumber}</span>
                </p>
                <p>
                  Chủ hộ: <span>{house.headCitizen.fullName}</span>
                </p>
                <Eye className='text-blue-500 ms-auto' />
              </Button>
            </Link>
          ))}
        </div>
        <DialogFooter>
          <PaginateComp queryManager={queryManager} meta={meta} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const PaginateComp = ({
  meta,
  queryManager,
}: {
  meta: PaginateMeta
  queryManager: QueryManager
}) => {
  const { updateParam } = queryManager
  const handlePageChange = (page: number) => {
    updateParam('page', page)
  }
  const { page, totalPage } = meta
  return (
    <div className='w-full flex justify-between items-center'>
      <span>{`Trang ${page}/${totalPage}`}</span>
      <div className='flex justify-center items-center gap-4'>
        <Button
          size='sm'
          variant='outline'
          onClick={() => handlePageChange(1)}
          disabled={page <= 1}
        >
          <ChevronsLeft />
        </Button>
        <Button
          size='sm'
          variant='outline'
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          size='sm'
          variant='outline'
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPage}
        >
          <ChevronRight />
        </Button>
        <Button
          size='sm'
          variant='outline'
          onClick={() => handlePageChange(totalPage)}
          disabled={page >= totalPage}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
