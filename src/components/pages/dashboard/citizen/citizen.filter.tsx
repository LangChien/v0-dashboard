'use client'
import { FilterIn, FilterSheet } from '@/components/filter'
import { FilterBetween } from '@/components/filter/filter-between'
import { FilterDate } from '@/components/filter/filter-date'
import { Filter } from '@/hooks/query/common'
import { useQueryBetween } from '@/hooks/query/use-query-between'
import { useQueryIn } from '@/hooks/query/use-query-in'
import { useQueryManager } from '@/hooks/query/use-query-manager'
import { GENDER_LABELS } from '@/services/enum-label'
import { GENDER } from '@/services/schemas/citizen.schema'

export const CitizenFilter = () => {
  const queryManager = useQueryManager()
  const { updateParam } = queryManager
  const genderQuery = useQueryIn('gender', queryManager)
  const ageQuery = useQueryBetween<number>('age', queryManager)
  const dateOfBirthQuery = useQueryBetween<Date>('dateOfBirth', queryManager)

  const handleClear = () => {
    updateParam('filter')
  }

  // todo: handle submit: làm sao để đồng bộ cập nhật url state giữu các component
  const genderValue = genderQuery.values
  const ageTo = ageQuery.to
  const ageFrom = ageQuery.from
  const dateOfBirthTo = dateOfBirthQuery.to
  const dateOfBirthFrom = dateOfBirthQuery.from
  const handleSubmit = () => {
    const filter: Filter<any> = {
      age: {
        gte: ageFrom,
        lte: ageTo,
      },
      dateOfBirth: {
        gte: dateOfBirthFrom,
        lte: dateOfBirthTo,
      },
      gender: {
        in: genderValue,
      },
    }
    updateParam('filter', JSON.stringify(filter))
  }

  return (
    <FilterSheet handleClear={handleClear} handleSubmit={handleSubmit}>
      <FilterIn
        query={genderQuery}
        title='Giới tính'
        options={Object.values(GENDER).map((gender) => ({
          label: GENDER_LABELS[gender],
          value: gender,
        }))}
      />
      <FilterBetween query={ageQuery} title='Tuổi' />
      <FilterDate title='Ngày sinh' query={dateOfBirthQuery} />
    </FilterSheet>
  )
}
