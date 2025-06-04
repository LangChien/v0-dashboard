'use client'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Copy } from 'lucide-react'

export const UUIDComp = ({ id, className }: { id: string; className?: string }) => {
  const shortId = id.slice(0, 6) + '...' + id.slice(-3)
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className={className}>{shortId}</span>
        </TooltipTrigger>
        <TooltipContent side='right' asChild>
          <Button onClick={() => navigator.clipboard.writeText(id)} size='icon' variant='ghost'>
            <Copy />
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
