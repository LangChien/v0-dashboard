'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatPrice } from '@/lib/utils'
import { CountPaymentByDate } from '@/services/routes/analytic.request'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const chartConfig = {
  count: {
    label: 'Số lần thanh toán',
    color: 'hsl(220 70% 50%)',
  },
  amount: {
    label: 'Số tiền thanh toán',
    color: 'hsl(160 60% 45%)',
  },
} satisfies ChartConfig

export const PaymentChart = (props: { data: CountPaymentByDate[] }) => {
  const { data } = props
  const [timeRange, setTimeRange] = useState('90d')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const handleChangeTimeRange = (value: string) => {
    setTimeRange(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set('timeRange', value)
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <Card className='flex-1'>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <CardTitle>Biểu đồ tổng thu phí các dịch vụ</CardTitle>
          <CardDescription>Hiển thị tổng số lượt truy cập trong 3 tháng qua</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={handleChangeTimeRange}>
          <SelectTrigger className='w-[160px] rounded-lg sm:ml-auto' aria-label='Select a value'>
            <SelectValue placeholder='3 tháng trước' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='365d' className='rounded-lg'>
              1 năm trước
            </SelectItem>
            <SelectItem value='90d' className='rounded-lg'>
              3 tháng trước
            </SelectItem>
            <SelectItem value='30d' className='rounded-lg'>
              30 ngày trước
            </SelectItem>
            <SelectItem value='7d' className='rounded-lg'>
              7 ngày trước
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[300px] xl:h-[400px] w-full'>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='fillCount' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='var(--color-count)' stopOpacity={0.8} />
                <stop offset='95%' stopColor='var(--color-count)' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='fillAmount' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='var(--color-amount)' stopOpacity={0.8} />
                <stop offset='95%' stopColor='var(--color-amount)' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('vi-VN', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis yAxisId='left' orientation='left' axisLine={true} />
            <YAxis
              yAxisId='right'
              tickFormatter={(v) => formatPrice(v)}
              orientation='right'
              axisLine={true}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('vi-VN', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              yAxisId='right'
              dataKey='amount'
              type='natural'
              fill='url(#fillAmount)'
              stroke='var(--color-amount)'
              name='Số tiền thanh toán'
            />
            <Area
              yAxisId='left'
              dataKey='count'
              type='natural'
              fill='url(#fillCount)'
              stroke='var(--color-count)'
              name='Số lần thanh toán'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
