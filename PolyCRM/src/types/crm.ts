export type MemberStatus = '可用' | '冻结' | '注销'
export type EnabledStatus = '启用' | '禁用'

export interface Member {
  id: string
  name: string
  phone: string
  email: string
  cardNo: string
  levelCode: string
  isPermanentLevel: '是' | '否'
  channel: string
  hotel: string
  gender: '男' | '女'
  birthday: string
  availablePoints: number
  availableStoredValue: number
  status: MemberStatus
  registeredAt: string
  tagCodes: string[]
}

export interface Level {
  code: string
  name: string
  description: string
  upgradeRule: string
  benefitCount: number
  status: EnabledStatus
  sort: number
  lastModifiedAt: string
  operator: string
}

export interface PointsAccount {
  id: string
  memberId: string
  available: number
  frozen: number
  pendingExpiry: number
  expired: number
  total: number
  lastEarnedAt: string
  lastSpentAt: string
}

export interface Coupon {
  id: string
  name: string
  type: '折扣券' | '满减券' | '代金券'
  value: number
  minSpend: number
  usageLimit: string
  validFrom: string
  validTo: string
  issuedCount: number
  redeemedCount: number
  transferredCount: number
  status: '草稿' | '生效' | '暂停' | '失效'
  createdAt: string
  assignedMemberIds: string[]
}

export interface BenefitCategory {
  id: string
  groupName: string
  name: string
  code: string
  description: string
  levelCodes: string[]
  status: EnabledStatus
  lastModifiedAt: string
  operator: string
}

export interface TagCategory {
  code: string
  type: string
  name: string
  sort: number
  status: EnabledStatus
  description: string
  lastModifiedAt: string
  operator: string
}

export interface PaginationResult<T> {
  rows: T[]
  total: number
}
