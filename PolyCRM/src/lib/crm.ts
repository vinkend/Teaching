import { benefitCategories, coupons, levels, members, pointsAccounts, tags } from '@/mock/data'

export type ModuleKey = 'members' | 'levels' | 'points' | 'coupons' | 'benefits' | 'tags'

export interface OptionItem {
  label: string
  value: string
}

export interface FieldMeta {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'number'
  options?: OptionItem[]
}

export interface ColumnMeta {
  key: string
  label: string
}

export interface ModuleMeta {
  key: ModuleKey
  title: string
  listPath: string
  detailPath: (id: string) => string
  formPath: (id?: string) => string
  filters: FieldMeta[]
  formFields: FieldMeta[]
  columns: ColumnMeta[]
}

export const levelOptions = levels.map((item) => ({ label: item.name, value: item.code }))

export const moduleMetaMap: Record<ModuleKey, ModuleMeta> = {
  members: {
    key: 'members',
    title: '会员管理',
    listPath: '/members',
    detailPath: (id) => '/members/' + id,
    formPath: (id) => (id ? '/members/' + id + '/edit' : '/members/new'),
    filters: [
      { key: 'keyword', label: '关键字', type: 'text' },
      { key: 'gender', label: '性别', type: 'select', options: [{ label: '男', value: '男' }, { label: '女', value: '女' }] },
      { key: 'levelCode', label: '会员等级', type: 'select', options: levelOptions },
      { key: 'status', label: '会员状态', type: 'select', options: [{ label: '可用', value: '可用' }, { label: '冻结', value: '冻结' }, { label: '注销', value: '注销' }] },
      { key: 'channel', label: '注册渠道', type: 'text' },
      { key: 'hotel', label: '注册酒店', type: 'text' },
    ],
    formFields: [
      { key: 'name', label: '会员姓名', type: 'text' },
      { key: 'phone', label: '注册手机号', type: 'text' },
      { key: 'email', label: '邮箱', type: 'text' },
      { key: 'cardNo', label: '会员卡号', type: 'text' },
      { key: 'levelCode', label: '会员等级', type: 'select', options: levelOptions },
      { key: 'gender', label: '性别', type: 'select', options: [{ label: '男', value: '男' }, { label: '女', value: '女' }] },
      { key: 'birthday', label: '生日', type: 'date' },
      { key: 'channel', label: '注册渠道', type: 'text' },
      { key: 'hotel', label: '注册酒店', type: 'text' },
    ],
    columns: [
      { key: 'id', label: '会员编号' },
      { key: 'name', label: '姓名' },
      { key: 'phone', label: '手机号' },
      { key: 'cardNo', label: '会员卡号' },
      { key: 'levelName', label: '会员等级' },
      { key: 'channel', label: '注册渠道' },
      { key: 'hotel', label: '注册酒店' },
      { key: 'status', label: '状态' },
      { key: 'registeredAt', label: '注册时间' },
    ],
  },
  levels: {
    key: 'levels',
    title: '会员等级设置',
    listPath: '/levels',
    detailPath: (id) => '/levels/' + id,
    formPath: (id) => (id ? '/levels/' + id + '/edit' : '/levels/new'),
    filters: [
      { key: 'code', label: '等级代码', type: 'text' },
      { key: 'name', label: '等级名称', type: 'text' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
    ],
    formFields: [
      { key: 'code', label: '等级代码', type: 'text' },
      { key: 'name', label: '等级名称', type: 'text' },
      { key: 'sort', label: '等级排序', type: 'number' },
      { key: 'upgradeRule', label: '升级条件', type: 'text' },
      { key: 'description', label: '权益描述', type: 'text' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
    ],
    columns: [
      { key: 'code', label: '等级代码' },
      { key: 'name', label: '等级名称' },
      { key: 'description', label: '等级描述' },
      { key: 'upgradeRule', label: '升级条件' },
      { key: 'benefitCount', label: '权益数量' },
      { key: 'status', label: '状态' },
      { key: 'lastModifiedAt', label: '最后操作时间' },
      { key: 'operator', label: '最后操作人' },
    ],
  },
  points: {
    key: 'points',
    title: '积分管理',
    listPath: '/points',
    detailPath: (id) => '/points/' + id,
    formPath: (id) => (id ? '/points/' + id + '/edit' : '/points/new'),
    filters: [{ key: 'memberId', label: '会员编号', type: 'text' }, { key: 'memberName', label: '会员姓名', type: 'text' }],
    formFields: [
      { key: 'memberId', label: '会员ID', type: 'select', options: members.map((m) => ({ label: m.name + '(' + m.id + ')', value: m.id })) },
      { key: 'operationType', label: '操作类型', type: 'select', options: [{ label: '增加', value: '增加' }, { label: '扣除', value: '扣除' }, { label: '冻结', value: '冻结' }] },
      { key: 'pointsValue', label: '积分数量', type: 'number' },
      { key: 'reason', label: '操作原因', type: 'text' },
      { key: 'remark', label: '备注', type: 'text' },
    ],
    columns: [
      { key: 'memberId', label: '会员编号' },
      { key: 'memberName', label: '会员名称' },
      { key: 'available', label: '可用积分' },
      { key: 'frozen', label: '冻结积分' },
      { key: 'pendingExpiry', label: '待失效积分' },
      { key: 'expired', label: '失效积分' },
      { key: 'total', label: '总积分' },
      { key: 'lastEarnedAt', label: '最后获取时间' },
      { key: 'lastSpentAt', label: '最后消费时间' },
    ],
  },
  coupons: {
    key: 'coupons',
    title: '优惠券管理',
    listPath: '/coupons',
    detailPath: (id) => '/coupons/' + id,
    formPath: (id) => (id ? '/coupons/' + id + '/edit' : '/coupons/new'),
    filters: [
      { key: 'name', label: '券名称', type: 'text' },
      { key: 'type', label: '券类型', type: 'select', options: [{ label: '折扣券', value: '折扣券' }, { label: '满减券', value: '满减券' }, { label: '代金券', value: '代金券' }] },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '草稿', value: '草稿' }, { label: '生效', value: '生效' }, { label: '暂停', value: '暂停' }, { label: '失效', value: '失效' }] },
    ],
    formFields: [
      { key: 'name', label: '券名称', type: 'text' },
      { key: 'type', label: '券类型', type: 'select', options: [{ label: '折扣券', value: '折扣券' }, { label: '满减券', value: '满减券' }, { label: '代金券', value: '代金券' }] },
      { key: 'value', label: '面值/折扣', type: 'number' },
      { key: 'minSpend', label: '使用门槛', type: 'number' },
      { key: 'usageLimit', label: '使用限制', type: 'text' },
      { key: 'validFrom', label: '有效期开始', type: 'date' },
      { key: 'validTo', label: '有效期结束', type: 'date' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '草稿', value: '草稿' }, { label: '生效', value: '生效' }, { label: '暂停', value: '暂停' }, { label: '失效', value: '失效' }] },
    ],
    columns: [
      { key: 'id', label: '券编号' },
      { key: 'name', label: '券名称' },
      { key: 'type', label: '券类型' },
      { key: 'value', label: '面值/折扣' },
      { key: 'minSpend', label: '使用门槛' },
      { key: 'usageLimit', label: '使用限制' },
      { key: 'validRange', label: '有效期' },
      { key: 'status', label: '状态' },
      { key: 'createdAt', label: '创建时间' },
    ],
  },
  benefits: {
    key: 'benefits',
    title: '会员权益设置',
    listPath: '/benefits',
    detailPath: (id) => '/benefits/' + id,
    formPath: (id) => (id ? '/benefits/' + id + '/edit' : '/benefits/new'),
    filters: [
      { key: 'groupName', label: '权益大类', type: 'text' },
      { key: 'name', label: '权益分类名称', type: 'text' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
    ],
    formFields: [
      { key: 'groupName', label: '权益大类', type: 'text' },
      { key: 'name', label: '权益分类名', type: 'text' },
      { key: 'code', label: '权益分类Code', type: 'text' },
      { key: 'description', label: '权益描述', type: 'text' },
      { key: 'levelCodes', label: '适用等级（逗号分隔）', type: 'text' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
    ],
    columns: [
      { key: 'groupName', label: '权益大类名称' },
      { key: 'name', label: '权益分类名称' },
      { key: 'code', label: '权益分类Code' },
      { key: 'status', label: '权益分类状态' },
      { key: 'levelNames', label: '适用等级' },
      { key: 'lastModifiedAt', label: '最后操作时间' },
      { key: 'operator', label: '最后操作人' },
    ],
  },
  tags: {
    key: 'tags',
    title: '标签分类管理',
    listPath: '/tags',
    detailPath: (id) => '/tags/' + id,
    formPath: (id) => (id ? '/tags/' + id + '/edit' : '/tags/new'),
    filters: [
      { key: 'type', label: '分类类型', type: 'text' },
      { key: 'name', label: '分类名称', type: 'text' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
    ],
    formFields: [
      { key: 'type', label: '分类类型', type: 'text' },
      { key: 'name', label: '分类名称', type: 'text' },
      { key: 'code', label: '分类编码', type: 'text' },
      { key: 'sort', label: '排序', type: 'number' },
      { key: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: '启用' }, { label: '禁用', value: '禁用' }] },
      { key: 'description', label: '描述', type: 'text' },
    ],
    columns: [
      { key: 'type', label: '分类类型' },
      { key: 'name', label: '分类名称' },
      { key: 'code', label: '分类编码' },
      { key: 'sort', label: '排序' },
      { key: 'status', label: '状态' },
      { key: 'lastModifiedAt', label: '最后操作时间' },
      { key: 'operator', label: '最后操作人' },
    ],
  },
}

const levelNameByCode = new Map(levels.map((item) => [item.code, item.name]))
const memberById = new Map(members.map((item) => [item.id, item]))

export function getListRows(moduleKey: ModuleKey) {
  if (moduleKey === 'members') {
    return members.map((item) => ({ ...item, levelName: levelNameByCode.get(item.levelCode) ?? item.levelCode }))
  }
  if (moduleKey === 'levels') return levels
  if (moduleKey === 'points') {
    return pointsAccounts.map((item) => ({ ...item, memberName: memberById.get(item.memberId)?.name ?? '未知会员' }))
  }
  if (moduleKey === 'coupons') {
    return coupons.map((item) => ({ ...item, validRange: item.validFrom + ' ~ ' + item.validTo }))
  }
  if (moduleKey === 'benefits') {
    return benefitCategories.map((item) => ({ ...item, levelNames: item.levelCodes.map((code) => levelNameByCode.get(code) ?? code).join('、') }))
  }
  return tags
}

export function getDetailById(moduleKey: ModuleKey, id: string) {
  if (moduleKey === 'members') {
    const member = members.find((item) => item.id === id)
    if (!member) return null
    const memberPoints = pointsAccounts.find((item) => item.memberId === member.id)
    const memberCoupons = coupons.filter((item) => item.assignedMemberIds.includes(member.id))
    return {
      ...member,
      levelName: levelNameByCode.get(member.levelCode),
      pointsAccount: memberPoints,
      coupons: memberCoupons,
      tags: member.tagCodes.map((code) => tags.find((item) => item.code === code)?.name ?? code),
    }
  }

  if (moduleKey === 'levels') {
    const level = levels.find((item) => item.code === id)
    if (!level) return null
    return {
      ...level,
      benefitItems: benefitCategories.filter((item) => item.levelCodes.includes(level.code)),
      members: members.filter((item) => item.levelCode === level.code),
    }
  }

  if (moduleKey === 'points') {
    const points = pointsAccounts.find((item) => item.id === id)
    if (!points) return null
    return { ...points, member: memberById.get(points.memberId) }
  }

  if (moduleKey === 'coupons') {
    const coupon = coupons.find((item) => item.id === id)
    if (!coupon) return null
    return { ...coupon, members: coupon.assignedMemberIds.map((memberId) => memberById.get(memberId)).filter(Boolean) }
  }

  if (moduleKey === 'benefits') {
    const benefit = benefitCategories.find((item) => item.id === id)
    if (!benefit) return null
    return { ...benefit, levels: benefit.levelCodes.map((code) => levelNameByCode.get(code) ?? code) }
  }

  const tag = tags.find((item) => item.code === id)
  if (!tag) return null
  return { ...tag, members: members.filter((member) => member.tagCodes.includes(tag.code)) }
}

export function getDefaultFormValue(moduleKey: ModuleKey) {
  const currentRows = getListRows(moduleKey)
  return currentRows[0] ?? {}
}

export function filterRows(rows: Record<string, unknown>[], filters: Record<string, string>) {
  return rows.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      if (key === 'keyword') {
        const joined = Object.values(row).join('|').toLowerCase()
        return joined.includes(value.toLowerCase())
      }
      const current = row[key]
      if (current === undefined || current === null) return false
      return String(current).toLowerCase().includes(value.toLowerCase())
    })
  })
}
