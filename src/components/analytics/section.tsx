import { analyticRequest } from '@/services/routes/analytic.request'
import { PaymentCard } from './card'
import { CitizenChart } from './citizen.chart'
import { PaymentChart } from './payment.chart'

export const CitizenSection = async () => {
  const res = await analyticRequest.getCountByGender()
  return <CitizenChart data={res.data} />
}

export const PaymentSection = async (props: { timeRange?: string }) => {
  const timeRange = props.timeRange || '90d'
  const res = await analyticRequest.getCountPaymentByDate(timeRange)
  return <PaymentChart data={res.data} />
}

export const PaymentByTypeSection = async () => {
  const res = await analyticRequest.getCountFee()
  return <PaymentCard data={res.data} />
}
