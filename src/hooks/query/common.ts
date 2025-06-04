export enum Operator {
  Equals = 'equals',
  In = 'in',
  NotIn = 'notIn',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
}

export type BaseFilter<T> = {
  [K in Operator]?: K extends Operator.In | Operator.NotIn ? T[] : T
}

export interface Filter<T> extends Record<string, BaseFilter<T>> {}

export const FILTER_KEY = `filter`
