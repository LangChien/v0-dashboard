'use client'
import { FilterSheet } from '@/components/filter'
import { FilterBetween } from '@/components/filter/filter-between'
import { FilterDate } from '@/components/filter/filter-date'
import { FilterRadio } from '@/components/filter/filter-radio'
import { Filter } from '@/hooks/query/common'
import { useQueryBetween } from '@/hooks/query/use-query-between'
import { useQueryManager } from '@/hooks/query/use-query-manager'
import { useQuerySelect } from '@/hooks/query/use-query-select'

const FEE_STATUS_OPTIONS = [
  {
    label: 'Hoàn thành',
    value: 'false',
  },
  {
    label: 'Đang mở',
    value: 'true',
  },
]

const FEE_TYPE = [
  {
    value: 'false',
    label: 'Tự nguyện',
  },
  {
    value: 'true',
    label: 'Bắt buộc',
  },
]
export const FeeFilter = () => {
  const queryManager = useQueryManager()
  const amountQuery = useQueryBetween<number>('amount', queryManager)
  const dateOfBirthQuery = useQueryBetween<Date>('dueDate', queryManager)
  const statusQuery = useQuerySelect<string>('isOpen', queryManager)
  const feeTypeQuery = useQuerySelect<string>('isMandatory', queryManager)
  const handleClear = () => {
    queryManager.updateParam('filter')
  }

  const handleSubmit = () => {
    const filter: Filter<any> = {}
    if (amountQuery.from)
      filter.amount = {
        gte: amountQuery.from,
      }
    if (amountQuery.to)
      filter.amount = {
        lte: amountQuery.to,
      }
    if (dateOfBirthQuery.from)
      filter.dueDate = {
        gte: dateOfBirthQuery.from,
      }
    if (dateOfBirthQuery.to)
      filter.dueDate = {
        lte: dateOfBirthQuery.to,
      }
    if (statusQuery.value === 'true')
      filter.isOpen = {
        equals: true,
      }
    if (statusQuery.value === 'false')
      filter.isOpen = {
        equals: false,
      }
    if (feeTypeQuery.value === 'true')
      filter.isMandatory = {
        equals: true,
      }
    if (feeTypeQuery.value === 'false')
      filter.isMandatory = {
        equals: false,
      }
    queryManager.updateParam('filter', JSON.stringify(filter))
    queryManager.updateParam('page', 1)
  }

  return (
    <FilterSheet handleClear={handleClear} handleSubmit={handleSubmit}>
      <FilterBetween query={amountQuery} title='Số tiền' />
      <FilterDate title='Hạn nộp' query={dateOfBirthQuery} />
      <FilterRadio title='Trạng thái' query={statusQuery} options={FEE_STATUS_OPTIONS} />
      <FilterRadio title='Loại khoản thu' query={feeTypeQuery} options={FEE_TYPE} />
    </FilterSheet>
  )
}
