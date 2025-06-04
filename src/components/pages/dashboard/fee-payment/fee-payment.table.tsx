'use client'

import { CustomTable } from '@/components/table-helpper'
import { PaginatePayment } from '@/services/types/payment.dto'
import { paymentDataColumns } from './fee-payment.column'
import { PaymentActionToolbar } from './fee-payment.toolbar'

export const PaymentTable = ({ data }: { data: PaginatePayment }) => (
  <CustomTable
    data={data}
    columns={paymentDataColumns}
    toolbar={(table) => <PaymentActionToolbar table={table} />}
  />
)
