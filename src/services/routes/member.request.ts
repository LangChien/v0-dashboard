import { getOptionWithAccessToken } from '@/lib/action'
import { CONTROLLER_PREFIX } from '../constants'
import { CurdRequest } from '../crud/crud.request'
import { ChangeHistoryIncludeCitizen } from '../schemas/history.schema'
import { Household } from '../types/household.dto'
import { ChangeHeadDto, GenericCrudHouseholdMember, SplitHouseholdDto } from '../types/member.dto'

// '/members': ['POST', 'DELETE', 'GET'],
// '/members/:id': ['PATCH', 'DELETE', 'GET'],
// '/members/household/:householdId/change-head': ['POST'],
// '/members/household/:householdId/change-history': ['GET'],
// '/members/household/:householdId/split-household': ['POST'],

class MemberRequest extends CurdRequest<GenericCrudHouseholdMember> {
  constructor() {
    super(CONTROLLER_PREFIX.MEMBER)
  }
  getHouseholdChangeHistory = async (householdId: string) => {
    const httpOption = await getOptionWithAccessToken()
    return this.http.get<ChangeHistoryIncludeCitizen[]>(
      `${this.prefix}/household/${householdId}/change-history`,
      httpOption,
    )
  }
  changeHead = async (householdId: string, body: ChangeHeadDto) => {
    const httpOption = await getOptionWithAccessToken()
    return this.http.post<undefined>(
      `${this.prefix}/household/${householdId}/change-head`,
      body,
      httpOption,
    )
  }
  splitHousehold = async (householdId: string, body: SplitHouseholdDto) => {
    const httpOption = await getOptionWithAccessToken()
    return this.http.post<Household>(
      `${this.prefix}/household/${householdId}/split-household`,
      body,
      httpOption,
    )
  }
}

export const memberRequest = new MemberRequest()
