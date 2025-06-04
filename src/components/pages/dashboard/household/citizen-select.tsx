import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Citizen } from '@/services/types/citizen.dto'
import { ChevronDown } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const CitizenSelect: FC<{
  citizens: Citizen[]
  defaultValue?: {
    headCitizenId: string
  }
}> = ({ citizens, defaultValue }) => {
  const { setValue, control } = useFormContext<{ headCitizenId: string }>()
  const [citizen, setCitizen] = useState<Citizen | null>(null)
  const handleChangeCitizen = (citizen: Citizen) => {
    setCitizen(citizen)
    setValue('headCitizenId', citizen.id)
    setOpen(false)
  }
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (defaultValue)
      setCitizen(citizens.find((citizen) => citizen.id === defaultValue.headCitizenId) || null)
    else setCitizen(null)
  }, [defaultValue, citizens])
  return (
    <FormField
      control={control}
      name='headCitizenId'
      render={() => (
        <FormItem className='flex flex-col items-start'>
          <FormLabel className='capitalize'>chủ hộ</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Button variant='outline' type='button' className='min-w-[200px] justify-between'>
                  {citizen ? citizen.fullName : 'Chọn chủ hộ'}
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder='Tìm kiếm chủ hộ' />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy dữ liệu</CommandEmpty>
                    {citizens.map((citizen) => (
                      <CommandItem
                        onSelect={() => handleChangeCitizen(citizen)}
                        className='cursor-pointer'
                        key={citizen.id}
                        value={citizen.id}
                      >
                        {citizen.fullName}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
