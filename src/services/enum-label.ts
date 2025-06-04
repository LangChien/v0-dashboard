import { GENDER } from './schemas/citizen.schema'
import { FEE_STATUS } from './schemas/fee.schema'
import { HH_CHANGE, REL_HEAD } from './schemas/member.schema'
import { USER_ROLE, USER_STATUS } from './schemas/user.schema'

export const USER_ROLE_LABELS: Record<USER_ROLE, string> = {
  SYSTEM_ADMIN: 'Quản trị viên hệ thống',
  TEAM_LEADER: 'Trưởng nhóm',
  ACCOUNTANT: 'Kế toán',
  NORMAL_USER: 'Người dùng',
}

export const USER_STATUS_LABELS: Record<USER_STATUS, string> = {
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Không hoạt động',
  BLOCKED: 'Bị khóa',
}

export const USER_ROLE_COLORS = {
  SYSTEM_ADMIN: 'bg-red-100 text-red-800',
  TEAM_LEADER: 'bg-blue-100 text-blue-800',
  ACCOUNTANT: 'bg-green-100 text-green-800',
  NORMAL_USER: 'bg-gray-100 text-gray-800',
} as const

export const USER_STATUS_COLORS = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-yellow-100 text-yellow-800',
  BLOCKED: 'bg-red-100 text-red-800',
} as const

export const REL_HEAD_LABELS: Record<REL_HEAD, string> = {
  SPOUSE: 'Vợ/Chồng',
  CHILD: 'Con',
  PARENT: 'Cha/Mẹ',
  SIBLING: 'Anh/Chị/Em',
  GRANDPARENT: 'Ông/Bà',
  GRANDCHILD: 'Cháu',
  OTHER: 'Khác',
}

export const HH_CHANGE_LABELS: Record<HH_CHANGE, string> = {
  CREATE: 'Tạo mới hộ khẩu',
  ADD_MEMBER: 'Thêm thành viên',
  REMOVE_MEMBER: 'Xóa thành viên',
  CHANGE_HEAD: 'Thay đổi chủ hộ',
  SPLIT_HOUSEHOLD: 'Tách hộ',
  TEMP_RESIDENCE: 'Tạm trú',
  CHANGE_RELATION: 'Thay đổi quan hệ',
}

export const GENDER_LABELS: Record<GENDER, string> = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
}

export const GENDER_COLORS = {
  MALE: 'bg-blue-100 text-blue-800',
  FEMALE: 'bg-pink-100 text-pink-800',
  OTHER: 'bg-gray-100 text-gray-800',
} as const

export const FEE_STATUS_LABELS: Record<FEE_STATUS, string> = {
  APPROVED: 'Đã duyệt',
  PENDING: 'Đang chờ duyệt',
  REJECTED: 'Đã từ chối',
  COMPLETED: 'Đã hoàn thành',
  CANCELED: 'Đã hủy',
}

export const FEE_STATUS_COLORS = {
  [FEE_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [FEE_STATUS.APPROVED]: 'bg-blue-100 text-blue-800',
  [FEE_STATUS.REJECTED]: 'bg-red-100 text-red-800',
  [FEE_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
  [FEE_STATUS.CANCELED]: 'bg-gray-100 text-gray-800',
}
