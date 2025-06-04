'use client'
import { Search } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { QueryManager, useQueryManager } from '@/hooks/query/use-query-manager'
import { cn } from '@/lib/utils'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../ui/input'

interface SearchFormProps extends React.ComponentProps<'form'> {
  placeholder?: string
  queryManager?: QueryManager
}
export const SearchForm = ({ placeholder, className, queryManager, ...props }: SearchFormProps) => {
  const defaultQueryManager = useQueryManager()
  const { updateParam } = queryManager || defaultQueryManager
  const handleSearch = useDebouncedCallback((term: string) => {
    updateParam('search', term)
  }, 500)
  return (
    <form {...props} className={cn('relative', className)}>
      <Label htmlFor='search' className='sr-only'>
        Search
      </Label>
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        id='search'
        placeholder={placeholder}
        className='pl-8 h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring'
      />
      <Search className='pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50' />
    </form>
  )
}
