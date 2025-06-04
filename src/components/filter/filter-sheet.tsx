import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import { FC, ReactNode } from 'react'

interface FilterSheetProps {
  handleClear: () => void
  handleSubmit: () => void
  children?: ReactNode
}

export const FilterSheet: FC<FilterSheetProps> = ({ handleClear, handleSubmit, children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <Filter />
          Bộ lọc tìm kiếm
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-lg p-5'>
        <SheetHeader className='mb-5'>
          <SheetTitle className='flex gap-3 text-2xl items-center'>
            <Filter /> Bộ lọc tìm kiếm
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className='h-full'>
          {children}
          <SheetFooter className='flex gap-5 py-5'>
            <Button variant='destructive' onClick={handleClear} type='button'>
              Xóa tất cả
            </Button>
            <SheetClose asChild>
              <Button className='flex-1' onClick={handleSubmit} type='button'>
                Áp dụng
              </Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
