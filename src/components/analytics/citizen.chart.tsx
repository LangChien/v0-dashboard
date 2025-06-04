'use client'

import React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatDateString } from '@/lib/utils'
import { GENDER_LABELS } from '@/services/enum-label'
import { GENDER } from '@/services/schemas/citizen.schema'

const chartConfig = {
  [GENDER_LABELS.MALE]: {
    label: GENDER_LABELS.MALE,
    color: '#0ea5e9',
  },
  [GENDER_LABELS.OTHER]: {
    label: GENDER_LABELS.OTHER,
    color: '#a855f7',
  },
  [GENDER_LABELS.FEMALE]: {
    label: GENDER_LABELS.FEMALE,
    color: '#ef4444',
  },
} satisfies ChartConfig

export const CitizenChart = (props: { data: Record<GENDER, number> }) => {
  const { data } = props
  const totalCitizen = React.useMemo(() => {
    return Object.values(data).reduce((acc, value) => acc + value, 0)
  }, [data])
  const formatData = React.useMemo(() => {
    return Object.entries(data).map(([key, value], i) => ({
      gender: GENDER_LABELS[key as GENDER],
      count: value,
      fill: chartConfig[GENDER_LABELS[key as GENDER]].color,
    }))
  }, [data])
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Thống kê giới tính </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square w-[300px]'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={formatData}
              dataKey='count'
              nameKey='gender'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalCitizen.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Cư dân
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey='gender' />}
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>
          Dữ liệu cập nhật đến ngày {formatDateString(new Date())}
        </div>
      </CardFooter>
    </Card>
  )
}
