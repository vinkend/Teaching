import { reactive } from 'vue'
import { coupons as seedCoupons, levels as seedLevels, members as seedMembers } from '@/mock/data'

export interface MemberProfile {
  id: string
  name: string
  phone: string
  email: string
  levelCode: string
  levelName: string
  status: '可用' | '冻结' | '注销'
  fixedLevel: boolean
  blacklisted: boolean
  gender: '男' | '女'
  birthday: string
  channel: string
  hotel: string
  tags: string[]
  password: string
  address: string
  invoiceTitle: string
  familyMembers: string[]
  contacts: string[]
  createdAt: string
}

export interface MemberOrder {
  id: string
  memberId: string
  hotel: string
  amount: number
  date: string
  status: '已完成' | '已取消' | '处理中'
}

export interface MemberCoupon {
  id: string
  templateId: string
  name: string
  ownerMemberId: string
  status: '未使用' | '已使用' | '已撤销'
  source: '内部' | '外部'
  expireAt: string
  createdAt: string
}

export interface CouponHistory {
  id: string
  couponId: string
  type: '延期' | '转赠' | '撤销'
  detail: string
  operator: string
  createdAt: string
}

export interface RuleItem {
  id: string
  name: string
  condition: string
  result: string
  enabled: boolean
}

export interface ArchiveItem {
  id: string
  name: string
  contact: string
  phone: string
  agreementPrice: string
  attachments: string[]
  invoices: string[]
  logs: string[]
}

export interface MemberCenterData {
  members: MemberProfile[]
  orders: MemberOrder[]
  coupons: MemberCoupon[]
  couponHistory: CouponHistory[]
  levelRules: RuleItem[]
  pointsRules: RuleItem[]
  benefitRelations: RuleItem[]
  dictionaries: RuleItem[]
  companies: ArchiveItem[]
  agencies: ArchiveItem[]
  operationLogs: string[]
}

export interface MenuNode {
  id: string
  label: string
  children?: MenuNode[]
}

const STORAGE_KEY = 'polycrm-member-center-v1'

export const memberCenterMenu: MenuNode[] = [
  { id: 'architecture', label: '系统架构' },
  {
    id: 'member',
    label: '会员',
    children: [
      {
        id: 'member.create',
        label: '新增会员',
        children: [
          { id: 'member.create.profile', label: '用户画像' },
          { id: 'member.create.addressInvoice', label: '地址及发票' },
          { id: 'member.create.family', label: '家庭成员' },
          { id: 'member.create.contacts', label: '更多通讯' },
          { id: 'member.edit', label: '编辑会员' },
        ],
      },
      {
        id: 'member.info',
        label: '查看会员信息',
        children: [
          { id: 'member.info.profile', label: '用户画像' },
          { id: 'member.info.orders', label: '会员订单' },
          { id: 'member.info.addressInvoice', label: '地址及发票' },
          { id: 'member.info.family', label: '家庭成员' },
        ],
      },
      {
        id: 'member.actions',
        label: '操作',
        children: [
          { id: 'member.actions.tags', label: '画像标签' },
          { id: 'member.actions.upgrade', label: '升级' },
          { id: 'member.actions.downgrade', label: '降级' },
          { id: 'member.actions.freeze', label: '冻结' },
          { id: 'member.actions.cancel', label: '注销' },
          { id: 'member.actions.blacklist', label: '加入黑名单' },
          { id: 'member.actions.merge', label: '合并帐户' },
          { id: 'member.actions.resetPassword', label: '重置密码' },
          { id: 'member.actions.fixLevel', label: '固定等级' },
        ],
      },
      { id: 'points', label: '积分' },
      {
        id: 'coupon',
        label: '优惠券',
        children: [
          { id: 'coupon.category', label: '优惠券分类' },
          {
            id: 'coupon.info',
            label: '优惠券信息',
            children: [
              { id: 'coupon.info.addInternal', label: '新增内部优惠券' },
              { id: 'coupon.info.addExternal', label: '新增外部优惠券' },
              { id: 'coupon.info.export', label: '导出券码' },
              { id: 'coupon.info.adjust', label: '加减券' },
            ],
          },
          { id: 'coupon.pack', label: '优惠券券包' },
          {
            id: 'coupon.bind',
            label: '优惠券/券包绑定',
            children: [{ id: 'coupon.bind.single', label: '券包绑定' }],
          },
          {
            id: 'coupon.issue',
            label: '优惠券发放明细',
            children: [
              { id: 'coupon.issue.verifyPriorityLow', label: '核销-优先级低' },
              { id: 'coupon.issue.extend', label: '延期' },
              { id: 'coupon.issue.transfer', label: '转赠' },
              { id: 'coupon.issue.revoke', label: '撤销' },
              { id: 'coupon.issue.batchExtend', label: '批量延期' },
              { id: 'coupon.issue.batchTransfer', label: '批量转赠-更新' },
            ],
          },
          {
            id: 'coupon.history',
            label: '优惠券操作历史',
            children: [
              { id: 'coupon.history.extend', label: '延期记录' },
              { id: 'coupon.history.revoke', label: '撤销记录' },
              { id: 'coupon.history.transfer', label: '转赠记录' },
            ],
          },
        ],
      },
      { id: 'storedValue', label: '储值' },
      { id: 'marketing', label: '营销' },
    ],
  },
  {
    id: 'archive',
    label: '档案',
    children: [
      {
        id: 'archive.company',
        label: '公司档案',
        children: [
          { id: 'archive.company.new', label: '新增公司档案' },
          { id: 'archive.company.price', label: '协议价格' },
          { id: 'archive.company.member', label: '下挂会员' },
          { id: 'archive.company.member.new', label: '新增下挂会员' },
          { id: 'archive.company.attachment', label: '附件' },
          { id: 'archive.company.invoice', label: '发票' },
          { id: 'archive.company.orders', label: '历史订单' },
          { id: 'archive.company.log', label: '日志' },
        ],
      },
      {
        id: 'archive.agency',
        label: '中介档案',
        children: [
          { id: 'archive.agency.new', label: '新增中介档案' },
          { id: 'archive.agency.price', label: '协议价格' },
          { id: 'archive.agency.commission', label: '佣金设置' },
          { id: 'archive.agency.attachment', label: '附件' },
          { id: 'archive.agency.invoice', label: '发票' },
          { id: 'archive.agency.orders', label: '历史订单' },
          { id: 'archive.agency.log', label: '日志' },
        ],
      },
      { id: 'archive.nonMember', label: '非会员档案' },
      { id: 'archive.report', label: '报表' },
    ],
  },
  {
    id: 'setting',
    label: '设置',
    children: [
      {
        id: 'setting.level',
        label: '会员等级设置',
        children: [
          { id: 'setting.level.edit', label: '编辑会员等级' },
          { id: 'setting.level.benefit', label: '查看权益' },
          { id: 'setting.level.benefit.add', label: '新增关联权益' },
          { id: 'setting.level.benefit.sort', label: '权益排序' },
          { id: 'setting.level.rule', label: '等级规则设置' },
          { id: 'setting.level.rule.add', label: '新增等级规则' },
          { id: 'setting.level.rule.edit', label: '修改等级规则' },
          { id: 'setting.level.rule.period', label: '等级考察期' },
          { id: 'setting.points.rule', label: '积分规则设置' },
          { id: 'setting.points.rule.add', label: '新增积分规则' },
          { id: 'setting.points.rule.edit', label: '修改积分规则' },
        ],
      },
      {
        id: 'setting.dict',
        label: '数据字典配置',
        children: [
          { id: 'setting.dict.pointsEarn', label: '新增积分获取方式' },
          { id: 'setting.dict.pointsDeduct', label: '积分扣除方式' },
          { id: 'setting.dict.nights', label: '间夜获取方式' },
          { id: 'setting.dict.levelReason', label: '等级变化原因' },
        ],
      },
    ],
  },
]

function nowText() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

function uuid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

function seedData(): MemberCenterData {
  const members: MemberProfile[] = seedMembers.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    levelCode: item.levelCode,
    levelName: seedLevels.find((level) => level.code === item.levelCode)?.name ?? item.levelCode,
    status: item.status,
    fixedLevel: item.isPermanentLevel === '是',
    blacklisted: false,
    gender: item.gender,
    birthday: item.birthday,
    channel: item.channel,
    hotel: item.hotel,
    tags: item.tagCodes,
    password: '123456',
    address: `${item.hotel} 默认地址`,
    invoiceTitle: `${item.name} 个人发票`,
    familyMembers: [`${item.name}配偶`],
    contacts: [item.phone],
    createdAt: item.registeredAt,
  }))

  const coupons: MemberCoupon[] = []
  seedCoupons.forEach((tpl) => {
    tpl.assignedMemberIds.forEach((memberId) => {
      coupons.push({
        id: uuid('CPN'),
        templateId: tpl.id,
        name: tpl.name,
        ownerMemberId: memberId,
        status: '未使用',
        source: '内部',
        expireAt: tpl.validTo,
        createdAt: tpl.createdAt,
      })
    })
  })

  return {
    members,
    orders: [
      { id: 'ORD-001', memberId: members[0]?.id ?? '', hotel: '北京保利酒店', amount: 1288, date: '2026-03-09', status: '已完成' },
      { id: 'ORD-002', memberId: members[1]?.id ?? '', hotel: '上海保利酒店', amount: 2088, date: '2026-03-13', status: '已完成' },
      { id: 'ORD-003', memberId: members[0]?.id ?? '', hotel: '广州保利酒店', amount: 968, date: '2026-03-15', status: '处理中' },
    ],
    coupons,
    couponHistory: [],
    levelRules: [
      { id: uuid('LR'), name: '银卡升级规则', condition: '近12个月消费>=8000', result: '升级为银卡', enabled: true },
      { id: uuid('LR'), name: '金卡升级规则', condition: '近12个月消费>=20000', result: '升级为金卡', enabled: true },
    ],
    pointsRules: [
      { id: uuid('PR'), name: '消费得分', condition: '每消费10元', result: '增加1积分', enabled: true },
      { id: uuid('PR'), name: '退款扣分', condition: '退款订单', result: '按比例扣回积分', enabled: true },
    ],
    benefitRelations: [
      { id: uuid('BF'), name: '金卡权益', condition: '等级=金卡', result: '欢迎果盘/延迟退房', enabled: true },
      { id: uuid('BF'), name: '银卡权益', condition: '等级=银卡', result: '延迟退房', enabled: true },
    ],
    dictionaries: [
      { id: uuid('DI'), name: '积分获取', condition: '新增积分获取方式', result: '入住赠分', enabled: true },
      { id: uuid('DI'), name: '积分扣除', condition: '积分扣除方式', result: '积分抵现', enabled: true },
      { id: uuid('DI'), name: '间夜获取', condition: '间夜获取方式', result: '现金房费', enabled: true },
      { id: uuid('DI'), name: '等级变化', condition: '等级变化原因', result: '规则升级/手动调整', enabled: true },
    ],
    companies: [
      {
        id: uuid('COM'),
        name: '保利科技有限公司',
        contact: '林悦',
        phone: '13800112233',
        agreementPrice: '门市价95折',
        attachments: ['营业执照.pdf'],
        invoices: ['增值税专票'],
        logs: ['2026-03-20 新建公司档案'],
      },
    ],
    agencies: [
      {
        id: uuid('AGY'),
        name: '华旅中介服务',
        contact: '赵星',
        phone: '13900119922',
        agreementPrice: '协议价 780 起',
        attachments: ['合作协议.pdf'],
        invoices: ['普票'],
        logs: ['2026-03-19 新建中介档案'],
      },
    ],
    operationLogs: ['系统初始化会员中心模块'],
  }
}

function loadData(): MemberCenterData {
  if (typeof window === 'undefined') return seedData()
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return seedData()

  try {
    return JSON.parse(raw) as MemberCenterData
  } catch {
    return seedData()
  }
}

function persistData(data: MemberCenterData) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const state = reactive<MemberCenterData>(loadData())

function withPersist(action: () => void) {
  action()
  persistData(state)
}

function logAction(text: string) {
  state.operationLogs.unshift(`${nowText()} ${text}`)
  if (state.operationLogs.length > 200) state.operationLogs.length = 200
}

export function useMemberCenterData() {
  const levelOrder = seedLevels.map((item) => item.code)

  function upsertMember(payload: Partial<MemberProfile> & { id?: string }) {
    withPersist(() => {
      if (payload.id) {
        const index = state.members.findIndex((item) => item.id === payload.id)
        if (index >= 0) {
          state.members[index] = {
            ...state.members[index],
            ...payload,
          } as MemberProfile
          logAction(`编辑会员 ${state.members[index].name}`)
        }
        return
      }

      const id = `M${Date.now().toString().slice(-8)}`
      state.members.unshift({
        id,
        name: payload.name ?? '新会员',
        phone: payload.phone ?? '',
        email: payload.email ?? '',
        levelCode: payload.levelCode ?? 'BRONZE',
        levelName: seedLevels.find((item) => item.code === (payload.levelCode ?? 'BRONZE'))?.name ?? '铜卡',
        status: '可用',
        fixedLevel: false,
        blacklisted: false,
        gender: (payload.gender as '男' | '女') ?? '男',
        birthday: payload.birthday ?? '',
        channel: payload.channel ?? '手工录入',
        hotel: payload.hotel ?? '未分配',
        tags: payload.tags ?? [],
        password: '123456',
        address: payload.address ?? '',
        invoiceTitle: payload.invoiceTitle ?? '',
        familyMembers: payload.familyMembers ?? [],
        contacts: payload.contacts ?? [],
        createdAt: nowText(),
      })
      logAction(`新增会员 ${payload.name ?? id}`)
    })
  }

  function operateMember(memberId: string, operation: string, extra?: string) {
    withPersist(() => {
      const member = state.members.find((item) => item.id === memberId)
      if (!member) return

      if (operation === '升级' || operation === '降级') {
        const current = levelOrder.indexOf(member.levelCode)
        const next = operation === '升级' ? Math.min(current + 1, levelOrder.length - 1) : Math.max(current - 1, 0)
        member.levelCode = levelOrder[next]
        member.levelName = seedLevels.find((item) => item.code === levelOrder[next])?.name ?? member.levelCode
      }

      if (operation === '冻结') member.status = '冻结'
      if (operation === '注销') member.status = '注销'
      if (operation === '加入黑名单') member.blacklisted = true
      if (operation === '重置密码') member.password = '123456'
      if (operation === '固定等级') member.fixedLevel = !member.fixedLevel
      if (operation === '画像标签' && extra) {
        member.tags = extra
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      }

      logAction(`${operation} -> ${member.name}${extra ? ` (${extra})` : ''}`)
    })
  }

  function mergeMembers(fromMemberId: string, toMemberId: string) {
    if (!fromMemberId || !toMemberId || fromMemberId === toMemberId) return
    withPersist(() => {
      const from = state.members.find((item) => item.id === fromMemberId)
      const to = state.members.find((item) => item.id === toMemberId)
      if (!from || !to) return
      to.tags = Array.from(new Set([...to.tags, ...from.tags]))
      state.coupons.forEach((item) => {
        if (item.ownerMemberId === from.id) item.ownerMemberId = to.id
      })
      from.status = '注销'
      logAction(`合并帐户 ${from.name} -> ${to.name}`)
    })
  }

  function adjustPoints(memberId: string, points: number, reason: string) {
    withPersist(() => {
      const member = state.members.find((item) => item.id === memberId)
      if (!member) return
      logAction(`积分调整 ${member.name} ${points > 0 ? '+' : ''}${points}，原因: ${reason}`)
    })
  }

  function issueCoupon(ownerMemberId: string, name: string, source: '内部' | '外部') {
    if (!ownerMemberId || !name) return
    withPersist(() => {
      state.coupons.unshift({
        id: uuid('CPN'),
        templateId: uuid('TPL'),
        name,
        ownerMemberId,
        status: '未使用',
        source,
        expireAt: '2026-12-31',
        createdAt: nowText(),
      })
      const owner = state.members.find((item) => item.id === ownerMemberId)
      logAction(`新增${source}优惠券 ${name} -> ${owner?.name ?? ownerMemberId}`)
    })
  }

  function adjustCoupon(ownerMemberId: string, couponName: string, delta: number) {
    if (!ownerMemberId || !couponName) return
    withPersist(() => {
      if (delta > 0) {
        for (let i = 0; i < delta; i += 1) {
          state.coupons.push({
            id: uuid('CPN'),
            templateId: uuid('TPL'),
            name: couponName,
            ownerMemberId,
            status: '未使用',
            source: '内部',
            expireAt: '2026-12-31',
            createdAt: nowText(),
          })
        }
      } else {
        let removeCount = Math.abs(delta)
        for (let i = state.coupons.length - 1; i >= 0 && removeCount > 0; i -= 1) {
          if (state.coupons[i].ownerMemberId === ownerMemberId && state.coupons[i].name === couponName && state.coupons[i].status === '未使用') {
            state.coupons.splice(i, 1)
            removeCount -= 1
          }
        }
      }
      logAction(`加减券 ${ownerMemberId} ${couponName} ${delta > 0 ? '+' : ''}${delta}`)
    })
  }

  function operateCoupon(couponId: string, type: CouponHistory['type'], payload?: string) {
    withPersist(() => {
      const coupon = state.coupons.find((item) => item.id === couponId)
      if (!coupon) return

      if (type === '延期') {
        const current = new Date(`${coupon.expireAt}T00:00:00`)
        current.setDate(current.getDate() + 30)
        coupon.expireAt = current.toISOString().slice(0, 10)
      }

      if (type === '转赠' && payload) {
        coupon.ownerMemberId = payload
      }

      if (type === '撤销') {
        coupon.status = '已撤销'
      }

      state.couponHistory.unshift({
        id: uuid('HIS'),
        couponId,
        type,
        detail: payload ?? '标准操作',
        operator: 'Admin',
        createdAt: nowText(),
      })
      logAction(`优惠券${type} ${coupon.name}(${coupon.id})`)
    })
  }

  function addRule(target: 'levelRules' | 'pointsRules' | 'benefitRelations' | 'dictionaries', item: Omit<RuleItem, 'id'>) {
    withPersist(() => {
      state[target].unshift({ id: uuid('RULE'), ...item })
      logAction(`新增规则 ${item.name}`)
    })
  }

  function resetAll() {
    withPersist(() => {
      const fresh = seedData()
      Object.assign(state, fresh)
      logAction('重置会员中心模块数据')
    })
  }

  return {
    state,
    upsertMember,
    operateMember,
    mergeMembers,
    adjustPoints,
    issueCoupon,
    adjustCoupon,
    operateCoupon,
    addRule,
    resetAll,
  }
}
