import { cn, formatMonthYear, formatPrice } from '@/lib/utils'
import { analyticRequest, CountPayment } from '@/services/routes/analytic.request'
import { File, House, RefreshCcw, TrendingDown, TrendingUp, User } from 'lucide-react'
import { Fragment, ReactNode } from 'react'
import { Card } from '../ui/card'

export const CardItem = (props: { title: string; count: number; icon: ReactNode }) => {
  const { icon, count, title } = props

  return (
    <Card className='flex items-center justify-between p-3'>
      <div className='space-y-2'>
        <h2>{title}</h2>
        <p>
          <span className='font-bold text-xl pe-1'>{count}</span>
          <span>Item</span>
        </p>
      </div>
      {icon}
    </Card>
  )
}

export const CountData = async () => {
  const res = await analyticRequest.getCountData()
  const { household, fee, citizen, payment } = res.data
  return (
    <div className='w-full gap-5 grid grid-cols-2 md:grid-cols-4'>
      <CardItem
        title='Căn hộ'
        count={household}
        icon={
          <span className='p-3 bg-slate-100 rounded-full'>
            <House />
          </span>
        }
      />
      <CardItem
        title='Khoản phí'
        count={fee}
        icon={
          <span className='p-3 bg-yellow-100 rounded-full'>
            <File />
          </span>
        }
      />
      <CardItem
        title='Người dân'
        count={citizen}
        icon={
          <span className='p-3 bg-red-100 rounded-full'>
            <User />
          </span>
        }
      />
      <CardItem
        title='Giao dịch'
        count={payment}
        icon={
          <span className='p-3 bg-green-100 rounded-full'>
            <RefreshCcw />
          </span>
        }
      />
    </div>
  )
}

export const PaymentCard = (props: { data: CountPayment }) => {
  const { currentMonth, prevMonth, total } = props.data
  // tăng trưởng tháng này so với tháng trước
  const growth = ((currentMonth - prevMonth) / (prevMonth || 1)) * 100
  return (
    <Fragment>
      <Card className='p-3 flex flex-col space-y-2 text-sm font-bold'>
        <span className='text-gray-500'>Tổng thu</span>
        <div className='flex items-center justify-between w-full'>
          <span className='font-bold text-green-500 pe-1'>+{formatPrice(total)}</span>
        </div>
        <span className='text-gray-500'>
          {formatMonthYear(new Date(new Date().setMonth(new Date().getMonth() - 2)))}
        </span>
        <div className='flex items-center justify-between w-full'>
          <span className='font-bold text-green-500 pe-1'>{formatPrice(prevMonth)}</span>
        </div>
        <span className='text-gray-500'>
          {formatMonthYear(new Date(new Date().setMonth(new Date().getMonth() - 1)))}
        </span>
        <div
          className={cn(
            growth > 0 ? 'text-green-500' : 'text-red-500',
            'flex gap-1',
            'flex items-center justify-between w-full',
          )}
        >
          <span className='font-bold pe-1'>+{formatPrice(currentMonth)}</span>
          <span className='flex items-center gap-1'>
            {growth > 0 ? '+' : ''}
            {growth.toFixed(2)}%{growth > 0 ? <TrendingUp /> : <TrendingDown />}
          </span>
        </div>
      </Card>
    </Fragment>
  )
}
