<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { memberCenterMenu, useMemberCenterData, type MenuNode } from '@/lib/memberCenter'

interface FlatMenuNode extends MenuNode {
  depth: number
  hasChildren: boolean
}

const {
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
} = useMemberCenterData()

const expanded = ref(
  new Set<string>([
    'member',
    'member.create',
    'member.info',
    'member.actions',
    'coupon',
    'coupon.info',
    'coupon.issue',
    'coupon.history',
    'archive',
    'archive.company',
    'archive.agency',
    'setting',
    'setting.level',
    'setting.dict',
  ]),
)

const selectedNodeId = ref('architecture')
const selectedMemberId = ref(state.members[0]?.id ?? '')
const actionExtra = ref('')
const mergeFromId = ref('')
const mergeToId = ref('')

const memberDraft = reactive({
  id: '',
  name: '',
  phone: '',
  email: '',
  levelCode: 'BRONZE',
  gender: '男',
  birthday: '',
  channel: '手工录入',
  hotel: '',
  address: '',
  invoiceTitle: '',
  familyMembers: '',
  contacts: '',
  tags: '',
})

const pointsForm = reactive({
  memberId: '',
  delta: 10,
  reason: '人工补偿',
})

const couponIssueForm = reactive({
  ownerMemberId: '',
  name: '',
})

const couponAdjustForm = reactive({
  ownerMemberId: '',
  name: '',
  delta: 1,
})

const couponOperateForm = reactive({
  couponId: '',
  transferToMemberId: '',
})

const ruleForm = reactive({
  name: '',
  condition: '',
  result: '',
})

function flatten(nodes: MenuNode[], depth: number, bucket: FlatMenuNode[]) {
  nodes.forEach((node) => {
    const hasChildren = Boolean(node.children?.length)
    bucket.push({ ...node, depth, hasChildren })
    if (hasChildren && expanded.value.has(node.id)) flatten(node.children ?? [], depth + 1, bucket)
  })
}

const flatMenu = computed(() => {
  const rows: FlatMenuNode[] = []
  flatten(memberCenterMenu, 0, rows)
  return rows
})

function buildPath(nodes: MenuNode[], targetId: string, path: string[] = []): string[] {
  for (const node of nodes) {
    const next = [...path, node.label]
    if (node.id === targetId) return next
    if (node.children?.length) {
      const found = buildPath(node.children, targetId, next)
      if (found.length) return found
    }
  }
  return []
}

const breadcrumbs = computed(() => buildPath(memberCenterMenu, selectedNodeId.value))
const selectedNodeLabel = computed(() => flatMenu.value.find((item) => item.id === selectedNodeId.value)?.label ?? '系统架构')

function pickNode(node: FlatMenuNode) {
  if (node.hasChildren) {
    if (expanded.value.has(node.id)) {
      expanded.value.delete(node.id)
    } else {
      expanded.value.add(node.id)
    }
  }
  if (!node.hasChildren || node.id !== 'member' || selectedNodeId.value === 'architecture') {
    selectedNodeId.value = node.id
  }
}

const selectedMember = computed(() => state.members.find((item) => item.id === selectedMemberId.value) ?? null)
const selectedMemberOrders = computed(() => state.orders.filter((item) => item.memberId === selectedMemberId.value))
const selectedMemberCoupons = computed(() => state.coupons.filter((item) => item.ownerMemberId === selectedMemberId.value))

function fillDraftFromSelected() {
  if (!selectedMember.value) return
  Object.assign(memberDraft, {
    id: selectedMember.value.id,
    name: selectedMember.value.name,
    phone: selectedMember.value.phone,
    email: selectedMember.value.email,
    levelCode: selectedMember.value.levelCode,
    gender: selectedMember.value.gender,
    birthday: selectedMember.value.birthday,
    channel: selectedMember.value.channel,
    hotel: selectedMember.value.hotel,
    address: selectedMember.value.address,
    invoiceTitle: selectedMember.value.invoiceTitle,
    familyMembers: selectedMember.value.familyMembers.join(','),
    contacts: selectedMember.value.contacts.join(','),
    tags: selectedMember.value.tags.join(','),
  })
}

const isMemberCreatePage = computed(
  () =>
    selectedNodeId.value.startsWith('member.create.') ||
    selectedNodeId.value === 'member.create' ||
    selectedNodeId.value === 'member.create.profile' ||
    selectedNodeId.value === 'member.create.addressInvoice' ||
    selectedNodeId.value === 'member.create.family' ||
    selectedNodeId.value === 'member.create.contacts',
)

const isMemberEditPage = computed(() => selectedNodeId.value === 'member.edit')
const isMemberInfoPage = computed(() => selectedNodeId.value.startsWith('member.info'))
const isMemberActionPage = computed(() => selectedNodeId.value.startsWith('member.actions'))
const isCouponPage = computed(() => selectedNodeId.value.startsWith('coupon'))
const isArchivePage = computed(() => selectedNodeId.value.startsWith('archive'))
const isLevelSettingPage = computed(() => selectedNodeId.value.startsWith('setting.level'))
const isDictSettingPage = computed(() => selectedNodeId.value.startsWith('setting.dict'))

function saveMember(mode: 'create' | 'edit') {
  const payload = {
    ...(mode === 'edit' ? { id: memberDraft.id } : {}),
    name: memberDraft.name,
    phone: memberDraft.phone,
    email: memberDraft.email,
    levelCode: memberDraft.levelCode,
    gender: memberDraft.gender as '男' | '女',
    birthday: memberDraft.birthday,
    channel: memberDraft.channel,
    hotel: memberDraft.hotel,
    address: memberDraft.address,
    invoiceTitle: memberDraft.invoiceTitle,
    familyMembers: memberDraft.familyMembers.split(',').map((item) => item.trim()).filter(Boolean),
    contacts: memberDraft.contacts.split(',').map((item) => item.trim()).filter(Boolean),
    tags: memberDraft.tags.split(',').map((item) => item.trim()).filter(Boolean),
  }

  upsertMember(payload)
  selectedMemberId.value = mode === 'edit' ? memberDraft.id : state.members[0]?.id ?? ''

  if (mode === 'create') {
    Object.assign(memberDraft, {
      id: '',
      name: '',
      phone: '',
      email: '',
      levelCode: 'BRONZE',
      gender: '男',
      birthday: '',
      channel: '手工录入',
      hotel: '',
      address: '',
      invoiceTitle: '',
      familyMembers: '',
      contacts: '',
      tags: '',
    })
  }
}

function executeMemberAction() {
  if (!selectedMemberId.value) return

  if (selectedNodeId.value === 'member.actions.merge') {
    mergeMembers(mergeFromId.value, mergeToId.value)
    return
  }

  const actionMap: Record<string, string> = {
    'member.actions.tags': '画像标签',
    'member.actions.upgrade': '升级',
    'member.actions.downgrade': '降级',
    'member.actions.freeze': '冻结',
    'member.actions.cancel': '注销',
    'member.actions.blacklist': '加入黑名单',
    'member.actions.resetPassword': '重置密码',
    'member.actions.fixLevel': '固定等级',
  }

  const action = actionMap[selectedNodeId.value]
  if (!action) return
  operateMember(selectedMemberId.value, action, actionExtra.value)
}

function executePointsAdjust() {
  if (!pointsForm.memberId) return
  adjustPoints(pointsForm.memberId, pointsForm.delta, pointsForm.reason)
}

function executeCouponAction() {
  const node = selectedNodeId.value
  if (node === 'coupon.info.addInternal') issueCoupon(couponIssueForm.ownerMemberId, couponIssueForm.name, '内部')
  if (node === 'coupon.info.addExternal') issueCoupon(couponIssueForm.ownerMemberId, couponIssueForm.name, '外部')
  if (node === 'coupon.info.adjust') adjustCoupon(couponAdjustForm.ownerMemberId, couponAdjustForm.name, couponAdjustForm.delta)
  if (node === 'coupon.issue.extend') operateCoupon(couponOperateForm.couponId, '延期')
  if (node === 'coupon.issue.transfer') operateCoupon(couponOperateForm.couponId, '转赠', couponOperateForm.transferToMemberId)
  if (node === 'coupon.issue.revoke') operateCoupon(couponOperateForm.couponId, '撤销')
  if (node === 'coupon.issue.batchExtend') {
    state.coupons.filter((item) => item.status === '未使用').slice(0, 3).forEach((item) => operateCoupon(item.id, '延期', '批量延期'))
  }
  if (node === 'coupon.issue.batchTransfer' && couponOperateForm.transferToMemberId) {
    state.coupons.filter((item) => item.status === '未使用').slice(0, 3).forEach((item) => operateCoupon(item.id, '转赠', couponOperateForm.transferToMemberId))
  }
}

const couponPreviewRows = computed(() => {
  const ownerMap = new Map(state.members.map((item) => [item.id, item.name]))
  return state.coupons.map((item) => ({
    ...item,
    ownerName: ownerMap.get(item.ownerMemberId) ?? item.ownerMemberId,
  }))
})

function exportCouponCode() {
  const content = couponPreviewRows.value.map((item) => `${item.id},${item.name},${item.ownerName},${item.expireAt},${item.status}`).join('\n')
  navigator.clipboard.writeText(content)
}

function saveRule(target: 'levelRules' | 'pointsRules' | 'benefitRelations' | 'dictionaries') {
  if (!ruleForm.name || !ruleForm.condition || !ruleForm.result) return
  addRule(target, {
    name: ruleForm.name,
    condition: ruleForm.condition,
    result: ruleForm.result,
    enabled: true,
  })
  ruleForm.name = ''
  ruleForm.condition = ''
  ruleForm.result = ''
}

function getCouponHistory(type: '延期' | '转赠' | '撤销') {
  return state.couponHistory.filter((item) => item.type === type)
}

function formatNodeGuide(nodeId: string) {
  if (nodeId === 'storedValue') return '储值模块原型入口已创建，可继续扩展余额账户、充值、流水与退款流程。'
  if (nodeId === 'marketing') return '营销模块原型入口已创建，可继续扩展活动、触达和效果归因能力。'
  if (nodeId === 'archive.nonMember') return '非会员档案页面已预留，支持后续沉淀潜客档案及转化。'
  if (nodeId === 'archive.report') return '报表页已预留，当前可基于会员、券、等级规则实时汇总。'
  return '当前节点已接入真实数据存储与交互，可继续按原型细化字段。'
}
</script>

<template>
  <div class="mc-page space-y-5">
    <div class="mc-hero rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">会员模块（原型实现）</h2>
          <p class="mt-1 text-sm text-slate-600">按蓝湖原型树生成模块，支持真实数据交互（本地持久化）。</p>
        </div>
        <button class="h-10 rounded-lg border border-rose-200 px-4 text-sm text-rose-600 hover:bg-rose-50" @click="resetAll">重置模块数据</button>
      </div>
    </div>

    <div class="grid gap-5 xl:grid-cols-[300px,1fr]">
      <aside class="mc-tree rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <p class="px-2 pb-2 text-xs uppercase tracking-wider text-slate-400">Prototype Tree</p>
        <div class="max-h-[calc(100vh-220px)] space-y-1 overflow-auto pr-1">
          <button
            v-for="node in flatMenu"
            :key="node.id"
            class="mc-tree-item flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition"
            :style="{ paddingLeft: `${node.depth * 14 + 10}px` }"
            :class="selectedNodeId === node.id ? 'is-active' : ''"
            @click="pickNode(node)"
          >
            <span class="truncate">{{ node.label }}</span>
            <span v-if="node.hasChildren" class="text-xs text-slate-400">{{ expanded.has(node.id) ? '▾' : '▸' }}</span>
          </button>
        </div>
      </aside>

      <section class="space-y-4">
        <div class="mc-section-head rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-xs text-slate-400">{{ breadcrumbs.join(' / ') }}</p>
          <h3 class="mt-1 text-lg font-semibold text-slate-900">{{ selectedNodeLabel }}</h3>
        </div>

        <section v-if="selectedNodeId === 'architecture'" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-xs text-slate-500">表现层</p>
              <p class="mt-1 text-sm font-medium text-slate-900">菜单树 + 场景页面</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-xs text-slate-500">应用服务层</p>
              <p class="mt-1 text-sm font-medium text-slate-900">会员、券、积分、档案、规则服务</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-xs text-slate-500">领域层</p>
              <p class="mt-1 text-sm font-medium text-slate-900">会员生命周期 + 等级规则 + 发券流程</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-xs text-slate-500">数据层</p>
              <p class="mt-1 text-sm font-medium text-slate-900">Mock Seed + LocalStorage 持久化</p>
            </div>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="text-base font-semibold text-slate-900">实时运行数据</h4>
            <div class="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div class="rounded-lg bg-slate-50 p-3 text-sm">
                <p class="text-slate-500">会员数</p>
                <p class="text-xl font-semibold text-slate-900">{{ state.members.length }}</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-3 text-sm">
                <p class="text-slate-500">会员券数量</p>
                <p class="text-xl font-semibold text-slate-900">{{ state.coupons.length }}</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-3 text-sm">
                <p class="text-slate-500">规则数量</p>
                <p class="text-xl font-semibold text-slate-900">{{ state.levelRules.length + state.pointsRules.length }}</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-3 text-sm">
                <p class="text-slate-500">操作日志</p>
                <p class="text-xl font-semibold text-slate-900">{{ state.operationLogs.length }}</p>
              </div>
            </div>
          </div>
        </section>

        <section v-else-if="isMemberCreatePage || isMemberEditPage || isMemberInfoPage || isMemberActionPage" class="space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <label class="text-sm text-slate-600">选择会员</label>
            <select v-model="selectedMemberId" class="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" @change="fillDraftFromSelected">
              <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
            </select>
          </div>

          <div v-if="isMemberCreatePage || isMemberEditPage" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">{{ isMemberEditPage ? '编辑会员' : '新增会员' }}</h4>
            <div class="grid gap-3 md:grid-cols-2">
              <input v-model="memberDraft.name" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="会员姓名" />
              <input v-model="memberDraft.phone" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="手机号" />
              <input v-model="memberDraft.email" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="邮箱" />
              <select v-model="memberDraft.levelCode" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="BRONZE">铜卡</option>
                <option value="SILVER">银卡</option>
                <option value="GOLD">金卡</option>
              </select>
              <input v-model="memberDraft.hotel" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="注册酒店" />
              <input v-model="memberDraft.channel" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="注册渠道" />
              <input v-model="memberDraft.address" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="地址" />
              <input v-model="memberDraft.invoiceTitle" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="发票抬头" />
              <input v-model="memberDraft.familyMembers" class="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-2" placeholder="家庭成员，逗号分隔" />
              <input v-model="memberDraft.contacts" class="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-2" placeholder="更多通讯，逗号分隔" />
              <input v-model="memberDraft.tags" class="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-2" placeholder="画像标签，逗号分隔" />
            </div>
            <div class="mt-4 flex gap-2">
              <button class="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white" @click="saveMember(isMemberEditPage ? 'edit' : 'create')">保存</button>
              <button v-if="isMemberEditPage" class="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700" @click="fillDraftFromSelected">载入当前会员</button>
            </div>
          </div>

          <div v-if="isMemberInfoPage && selectedMember" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">会员信息</h4>
            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div class="rounded-lg bg-slate-50 p-3">
                <p class="text-xs text-slate-500">姓名</p>
                <p class="mt-1 text-sm font-medium">{{ selectedMember.name }}</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-3">
                <p class="text-xs text-slate-500">等级</p>
                <p class="mt-1 text-sm font-medium">{{ selectedMember.levelName }}</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-3">
                <p class="text-xs text-slate-500">状态</p>
                <p class="mt-1 text-sm font-medium">{{ selectedMember.status }}</p>
              </div>
            </div>

            <div v-if="selectedNodeId === 'member.info.orders'" class="mt-4 overflow-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-left text-slate-500">
                    <th class="p-2">订单号</th>
                    <th class="p-2">酒店</th>
                    <th class="p-2">金额</th>
                    <th class="p-2">日期</th>
                    <th class="p-2">状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in selectedMemberOrders" :key="row.id" class="border-b border-slate-100">
                    <td class="p-2">{{ row.id }}</td>
                    <td class="p-2">{{ row.hotel }}</td>
                    <td class="p-2">{{ row.amount }}</td>
                    <td class="p-2">{{ row.date }}</td>
                    <td class="p-2">{{ row.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="selectedNodeId === 'member.info.family'" class="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
              {{ selectedMember.familyMembers.join('、') || '暂无' }}
            </div>
            <div v-if="selectedNodeId === 'member.info.addressInvoice'" class="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
              {{ selectedMember.address }} / {{ selectedMember.invoiceTitle }}
            </div>
            <div v-if="selectedNodeId === 'member.info.profile'" class="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
              标签：{{ selectedMember.tags.join('、') || '无' }}；联系方式：{{ selectedMember.contacts.join('、') || '无' }}
            </div>
          </div>

          <div v-if="isMemberActionPage" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">会员操作</h4>

            <div v-if="selectedNodeId === 'member.actions.merge'" class="grid gap-3 md:grid-cols-2">
              <select v-model="mergeFromId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">选择源会员</option>
                <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
              </select>
              <select v-model="mergeToId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">选择目标会员</option>
                <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
              </select>
            </div>

            <div v-else>
              <input
                v-model="actionExtra"
                class="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                :placeholder="selectedNodeId === 'member.actions.tags' ? '输入标签，逗号分隔' : '可选：备注/原因'"
              />
            </div>

            <button class="mt-3 h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white" @click="executeMemberAction">执行操作</button>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">会员券资产</h4>
            <div class="overflow-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-left text-slate-500">
                    <th class="p-2">券码</th>
                    <th class="p-2">券名</th>
                    <th class="p-2">状态</th>
                    <th class="p-2">有效期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="coupon in selectedMemberCoupons" :key="coupon.id" class="border-b border-slate-100">
                    <td class="p-2">{{ coupon.id }}</td>
                    <td class="p-2">{{ coupon.name }}</td>
                    <td class="p-2">{{ coupon.status }}</td>
                    <td class="p-2">{{ coupon.expireAt }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section v-else-if="selectedNodeId === 'points'" class="space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">积分调整</h4>
            <div class="grid gap-3 md:grid-cols-3">
              <select v-model="pointsForm.memberId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">选择会员</option>
                <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
              </select>
              <input v-model.number="pointsForm.delta" type="number" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="积分变化值" />
              <input v-model="pointsForm.reason" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="原因" />
            </div>
            <button class="mt-3 h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white" @click="executePointsAdjust">提交积分变更</button>
          </div>
        </section>

        <section v-else-if="isCouponPage" class="space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">优惠券操作台</h4>

            <div v-if="selectedNodeId === 'coupon.info.addInternal' || selectedNodeId === 'coupon.info.addExternal'" class="grid gap-3 md:grid-cols-2">
              <select v-model="couponIssueForm.ownerMemberId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">选择会员</option>
                <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
              </select>
              <input v-model="couponIssueForm.name" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="优惠券名称" />
            </div>

            <div v-if="selectedNodeId === 'coupon.info.adjust'" class="grid gap-3 md:grid-cols-3">
              <select v-model="couponAdjustForm.ownerMemberId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">选择会员</option>
                <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
              </select>
              <input v-model="couponAdjustForm.name" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="券名称" />
              <input v-model.number="couponAdjustForm.delta" type="number" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="数量变化" />
            </div>

            <div
              v-if="selectedNodeId === 'coupon.issue.extend' || selectedNodeId === 'coupon.issue.transfer' || selectedNodeId === 'coupon.issue.revoke' || selectedNodeId === 'coupon.issue.batchTransfer'"
              class="grid gap-3 md:grid-cols-2"
            >
              <select v-model="couponOperateForm.couponId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">选择券码</option>
                <option v-for="coupon in state.coupons" :key="coupon.id" :value="coupon.id">{{ coupon.id }} - {{ coupon.name }}</option>
              </select>
              <select v-model="couponOperateForm.transferToMemberId" class="h-10 rounded-lg border border-slate-200 px-3 text-sm">
                <option value="">转赠目标会员（可选）</option>
                <option v-for="member in state.members" :key="member.id" :value="member.id">{{ member.name }}（{{ member.id }}）</option>
              </select>
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-if="selectedNodeId === 'coupon.info.export'"
                class="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700"
                @click="exportCouponCode"
              >
                导出券码到剪贴板
              </button>
              <button
                v-if="selectedNodeId !== 'coupon.category' && selectedNodeId !== 'coupon.pack' && selectedNodeId !== 'coupon.bind' && selectedNodeId !== 'coupon.bind.single' && !selectedNodeId.startsWith('coupon.history')"
                class="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white"
                @click="executeCouponAction"
              >
                执行操作
              </button>
            </div>

            <p v-if="selectedNodeId === 'coupon.category' || selectedNodeId === 'coupon.pack' || selectedNodeId === 'coupon.bind' || selectedNodeId === 'coupon.bind.single'" class="text-sm text-slate-500">
              {{ formatNodeGuide(selectedNodeId) }}
            </p>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">优惠券数据</h4>
            <div class="overflow-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-left text-slate-500">
                    <th class="p-2">券码</th>
                    <th class="p-2">券名</th>
                    <th class="p-2">持有人</th>
                    <th class="p-2">来源</th>
                    <th class="p-2">状态</th>
                    <th class="p-2">有效期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in couponPreviewRows" :key="row.id" class="border-b border-slate-100">
                    <td class="p-2">{{ row.id }}</td>
                    <td class="p-2">{{ row.name }}</td>
                    <td class="p-2">{{ row.ownerName }}</td>
                    <td class="p-2">{{ row.source }}</td>
                    <td class="p-2">{{ row.status }}</td>
                    <td class="p-2">{{ row.expireAt }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="selectedNodeId.startsWith('coupon.history')" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">操作历史</h4>
            <div class="space-y-2 text-sm text-slate-700">
              <div v-for="row in getCouponHistory(selectedNodeId.endsWith('extend') ? '延期' : selectedNodeId.endsWith('transfer') ? '转赠' : '撤销')" :key="row.id" class="rounded-lg bg-slate-50 p-2">
                {{ row.createdAt }} | {{ row.couponId }} | {{ row.detail }}
              </div>
            </div>
          </div>
        </section>

        <section v-else-if="isArchivePage" class="space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">档案中心</h4>
            <p class="text-sm text-slate-500">{{ formatNodeGuide(selectedNodeId) }}</p>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h5 class="mb-2 text-sm font-semibold text-slate-900">公司档案</h5>
              <div v-for="company in state.companies" :key="company.id" class="mb-2 rounded-lg bg-slate-50 p-3 text-sm">
                {{ company.name }}｜{{ company.agreementPrice }}｜{{ company.contact }} {{ company.phone }}
              </div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h5 class="mb-2 text-sm font-semibold text-slate-900">中介档案</h5>
              <div v-for="agency in state.agencies" :key="agency.id" class="mb-2 rounded-lg bg-slate-50 p-3 text-sm">
                {{ agency.name }}｜{{ agency.agreementPrice }}｜{{ agency.contact }} {{ agency.phone }}
              </div>
            </div>
          </div>
        </section>

        <section v-else-if="isLevelSettingPage || isDictSettingPage" class="space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 class="mb-3 text-base font-semibold text-slate-900">规则配置</h4>
            <div class="grid gap-3 md:grid-cols-3">
              <input v-model="ruleForm.name" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="规则名称" />
              <input v-model="ruleForm.condition" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="触发条件" />
              <input v-model="ruleForm.result" class="h-10 rounded-lg border border-slate-200 px-3 text-sm" placeholder="执行结果" />
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <button v-if="isLevelSettingPage" class="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white" @click="saveRule('levelRules')">新增等级规则</button>
              <button v-if="selectedNodeId.includes('benefit')" class="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700" @click="saveRule('benefitRelations')">新增权益关联</button>
              <button v-if="selectedNodeId.includes('points.rule')" class="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700" @click="saveRule('pointsRules')">新增积分规则</button>
              <button v-if="isDictSettingPage" class="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700" @click="saveRule('dictionaries')">新增字典项</button>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h5 class="mb-2 text-sm font-semibold text-slate-900">等级规则</h5>
              <div v-for="rule in state.levelRules" :key="rule.id" class="mb-2 rounded-lg bg-slate-50 p-3 text-sm">{{ rule.name }}｜{{ rule.condition }}｜{{ rule.result }}</div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h5 class="mb-2 text-sm font-semibold text-slate-900">积分规则</h5>
              <div v-for="rule in state.pointsRules" :key="rule.id" class="mb-2 rounded-lg bg-slate-50 p-3 text-sm">{{ rule.name }}｜{{ rule.condition }}｜{{ rule.result }}</div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h5 class="mb-2 text-sm font-semibold text-slate-900">权益关联</h5>
              <div v-for="rule in state.benefitRelations" :key="rule.id" class="mb-2 rounded-lg bg-slate-50 p-3 text-sm">{{ rule.name }}｜{{ rule.condition }}｜{{ rule.result }}</div>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h5 class="mb-2 text-sm font-semibold text-slate-900">数据字典</h5>
              <div v-for="rule in state.dictionaries" :key="rule.id" class="mb-2 rounded-lg bg-slate-50 p-3 text-sm">{{ rule.name }}｜{{ rule.condition }}｜{{ rule.result }}</div>
            </div>
          </div>
        </section>

        <section v-else class="space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-sm text-slate-600">
            {{ formatNodeGuide(selectedNodeId) }}
          </div>
        </section>

        <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 class="mb-3 text-base font-semibold text-slate-900">系统操作日志</h4>
          <div class="max-h-52 space-y-2 overflow-auto text-sm text-slate-600">
            <div v-for="(log, index) in state.operationLogs.slice(0, 30)" :key="`${index}-${log}`" class="rounded-lg bg-slate-50 p-2">{{ log }}</div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<style scoped>
.mc-page {
  --brand-700: #0f4aa3;
  --brand-600: #165dcb;
  --brand-500: #2970ff;
  --brand-100: #eaf2ff;
  --line: #d7e3f4;
  --text-strong: #0f2747;
  --text-regular: #314968;
  background: linear-gradient(180deg, #f5f8ff 0%, #f2f6fc 100%);
  padding-bottom: 8px;
}

.mc-page :deep(.rounded-xl.border.border-slate-200.bg-white) {
  border-color: var(--line);
  box-shadow: 0 1px 2px rgba(16, 42, 67, 0.04);
}

.mc-hero {
  background: linear-gradient(120deg, #ffffff 0%, #f3f8ff 100%);
}

.mc-tree {
  background: linear-gradient(180deg, #fbfdff 0%, #f7faff 100%);
}

.mc-tree-item {
  color: var(--text-regular);
  font-weight: 500;
}

.mc-tree-item:hover {
  background: #edf4ff;
  color: var(--brand-700);
}

.mc-tree-item.is-active {
  background: var(--brand-100);
  color: var(--brand-700);
}

.mc-section-head h3 {
  color: var(--text-strong);
}

.mc-page :deep(input),
.mc-page :deep(select) {
  border-color: #c9d9f2 !important;
  color: #1b3557 !important;
  background: #ffffff;
}

.mc-page :deep(input:focus),
.mc-page :deep(select:focus) {
  border-color: var(--brand-500) !important;
  box-shadow: 0 0 0 3px rgba(41, 112, 255, 0.12);
  outline: none;
}

.mc-page :deep(button[class*='bg-blue-600']) {
  background: var(--brand-600) !important;
}

.mc-page :deep(button[class*='bg-blue-600']:hover) {
  background: var(--brand-700) !important;
}

.mc-page :deep(button[class*='bg-slate-900']) {
  background: #123a77 !important;
}

.mc-page :deep(th) {
  background: #f6f9ff;
  color: #4a6385;
  font-weight: 600;
}

.mc-page :deep(td) {
  color: #25415f;
}
</style>
