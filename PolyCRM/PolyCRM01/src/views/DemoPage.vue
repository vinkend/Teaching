<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { flattenSiteMap, siteMapTree, type SiteMapNode } from '../data/sitemap';
import { flatFunctionMenus, functionMenus } from '../data/functionMenu';

const route = useRoute();
const router = useRouter();
const allPages = flattenSiteMap(siteMapTree);
const allFunctionPages = flatFunctionMenus();

const slug = computed(() => String(route.params.slug || 'dashboard____'));
const normalizeDisplayName = (name: string) =>
  name
    .replace(/^[A-Za-z][A-Za-z\s]*\s+/, '')
    .replace(/\s*[-－—]\s*P\d+\b/gi, '')
    .replace(/\bP\d+\b/gi, '')
    .trim();

const currentPage = computed(() => allPages.find((item) => item.slug === slug.value));
const functionPage = computed(() => allFunctionPages.find((item) => item.slug === slug.value) || null);
const functionFirst = computed(() => functionMenus.find((first) => first.children.some((child) => child.slug === slug.value)) || null);
const pageTitle = computed(() => functionPage.value?.name || currentPage.value?.name || '功能页面');
const displayPageTitle = computed(() => normalizeDisplayName(pageTitle.value) || pageTitle.value);
const pageBadge = computed(() => currentPage.value?.url || functionPage.value?.slug || '');
const isLoginUnifiedPage = computed(() => (functionFirst.value?.name || '').includes('Login'));
const parentPage = computed(() => {
  const current = currentPage.value;
  if (!current?.parentUrl) return null;
  return allPages.find((item) => item.url === current.parentUrl) || null;
});

const siblingPages = computed(() => {
  const current = currentPage.value;
  if (!current) return [];

  if (!current.parentUrl) {
    return allPages.filter((item) => item.depth === 0 && item.slug !== current.slug && !item.url.startsWith('folder-')).slice(0, 5);
  }

  return allPages
    .filter((item) => item.parentUrl === current.parentUrl && item.slug !== current.slug && !item.url.startsWith('folder-'))
    .slice(0, 5);
});

const childPages = computed(() => (currentPage.value?.children || []).filter((item) => !item.url.startsWith('folder-')));

const go = (target: SiteMapNode) => {
  router.push({ name: 'page', params: { slug: target.slug } });
};

const goBySlug = (targetSlug: string) => {
  router.push({ name: 'page', params: { slug: targetSlug } });
};

const actionFeedback = ref('');
let actionTimer: ReturnType<typeof setTimeout> | null = null;

const pageName = computed(() => pageTitle.value);
const isMemberListPage = computed(() => pageName.value === '会员' || pageName.value === '会员信息' || slug.value === '会员');

const pageSummary = computed(() => {
  const name = pageName.value;
  if (functionPage.value?.optimize) return functionPage.value.optimize;
  if (name.includes('Dashboard') || name.includes('概述')) return '展示会员增长、消费、活跃度、标签分层等关键经营指标，支撑管理层日常决策。';
  if (name.includes('会员')) return '以会员档案为核心，贯通新增、编辑、查询、操作等完整生命周期管理。';
  if (name.includes('档案')) return '用于维护公司/中介/非会员等基础档案，关联协议、发票、附件和订单记录。';
  if (name.includes('报表')) return '聚焦经营数据统计输出，支持业务复盘与月度运营分析。';
  if (name.includes('设置')) return '管理系统参数、业务规则和运行配置，保障系统稳定落地。';
  return '该页面用于承接原型中的业务流程节点，支持演示时按流程进行页面跳转说明。';
});

const memberFlowTabs = computed(() => {
  const isViewVariant = slug.value.includes('_1');
  if (isViewVariant) {
    return [
      { label: '基本信息', slug: '查看会员信息' },
      { label: '用户画像', slug: '用户画像_1' },
      { label: '地址及发票', slug: '地址及发票_1' },
      { label: '家庭成员', slug: '家庭成员_1' }
    ];
  }
  return [
    { label: '基本信息', slug: '新增会员' },
    { label: '用户画像', slug: '用户画像' },
    { label: '地址及发票', slug: '地址及发票' },
    { label: '家庭成员', slug: '家庭成员' }
  ];
});

const pageKind = computed<'dashboard' | 'member' | 'archive' | 'operation' | 'report' | 'settings' | 'general'>(() => {
  const name = pageName.value;
  if (name.includes('Dashboard') || name.includes('概述')) return 'dashboard';
  if (name.includes('报表')) return 'report';
  if (name.includes('设置')) return 'settings';
  if (name.includes('档案') || name.includes('公司') || name.includes('中介') || name.includes('非会员')) return 'archive';
  if (['操作', '升级', '降级', '冻结', '注销', '黑名单', '重置密码', '合并帐户'].some((key) => name.includes(key))) return 'operation';
  if (name.includes('会员')) return 'member';
  return 'general';
});

const pageDetailKind = computed<
  | 'newMember'
  | 'viewMember'
  | 'companyProfile'
  | 'agencyProfile'
  | 'newCompanyProfile'
  | 'newAgencyProfile'
  | 'nonMemberProfile'
  | 'fixedLevel'
  | 'blacklist'
  | 'memberChangeLog'
  | 'points'
  | 'coupon'
  | 'storedValue'
  | 'marketing'
  | 'memberPortrait'
  | 'memberAddressInvoice'
  | 'memberFamily'
  | 'memberMoreContact'
  | 'pricing'
  | 'invoice'
  | 'orderHistory'
  | 'log'
  | 'none'
>(() => {
  const name = pageName.value;
  if (name.includes('新增会员')) return 'newMember';
  if (name.includes('查看会员信息')) return 'viewMember';
  if (name.includes('新增公司档案')) return 'newCompanyProfile';
  if (name.includes('新增中介档案')) return 'newAgencyProfile';
  if (name.includes('非会员档案')) return 'nonMemberProfile';
  if (name.includes('固定等级')) return 'fixedLevel';
  if (name.includes('黑名单管理')) return 'blacklist';
  if (name.includes('会员信息变更记录')) return 'memberChangeLog';
  if (name.includes('积分')) return 'points';
  if (name.includes('优惠券')) return 'coupon';
  if (name.includes('储值')) return 'storedValue';
  if (name.includes('营销')) return 'marketing';
  if (name.includes('地址及发票')) return 'memberAddressInvoice';
  if (name.includes('家庭成员')) return 'memberFamily';
  if (name.includes('用户画像')) return 'memberPortrait';
  if (name.includes('更多通讯')) return 'memberMoreContact';
  if (name.includes('公司档案')) return 'companyProfile';
  if (name.includes('中介档案')) return 'agencyProfile';
  if (name.includes('协议价格')) return 'pricing';
  if (name.includes('发票')) return 'invoice';
  if (name.includes('历史订单')) return 'orderHistory';
  if (name.includes('日志')) return 'log';
  return 'none';
});

const breadcrumb = computed(() => {
  if (functionPage.value) {
    const first = functionFirst.value?.name || 'CRM';
    return [
      { id: `${first}-1`, name: normalizeDisplayName(first) || first, slug: '', isFunction: true },
      {
        id: `${first}-${functionPage.value.slug}`,
        name: normalizeDisplayName(functionPage.value.name) || functionPage.value.name,
        slug: functionPage.value.slug,
        isFunction: true
      }
    ];
  }
  const chain: SiteMapNode[] = [];
  let cursor = currentPage.value;
  while (cursor) {
    chain.unshift(cursor);
    if (!cursor.parentUrl) break;
    cursor = allPages.find((item) => item.url === cursor?.parentUrl);
  }
  return chain.map((item) => ({ ...item, name: normalizeDisplayName(item.name) || item.name }));
});

const functionActions = computed(() => functionPage.value?.actions || []);

const functionFieldNames = computed(() => {
  const src = [
    functionPage.value?.optimize || '',
    ...functionActions.value.map((a) => a.desc || ''),
    ...functionActions.value.map((a) => a.name || '')
  ]
    .join('，')
    .replace(/[\n\r]/g, '，');
  const parts = src
    .split(/[，。,；;、\s]+/)
    .map((s) => s.trim())
    .filter((s) => s && s.length <= 20 && !/^(\.\.\.|待定|已完成|未开始)$/.test(s));
  const uniq: string[] = [];
  parts.forEach((p) => {
    if (!uniq.includes(p)) uniq.push(p);
  });
  return uniq.slice(0, 8);
});

const functionTableColumns = computed(() => {
  const defaults = ['编号', '名称', '状态', '更新时间'];
  const fromFields = functionFieldNames.value.slice(0, 4);
  const cols = fromFields.length ? fromFields : defaults;
  if (!cols.includes('状态')) cols.push('状态');
  if (!cols.includes('更新时间')) cols.push('更新时间');
  return cols.slice(0, 6);
});

const functionMockRows = computed(() => {
  const cols = functionTableColumns.value;
  return Array.from({ length: 6 }).map((_, idx) => {
    const row: Record<string, string> = {};
    cols.forEach((c, i) => {
      if (c.includes('状态')) row[c] = idx % 2 === 0 ? '启用' : '待配置';
      else if (c.includes('时间') || c.includes('日期')) row[c] = `2026-03-${String(10 + idx).padStart(2, '0')}`;
      else if (c.includes('编号')) row[c] = `NO${1000 + idx}`;
      else row[c] = `${c}示例${idx + 1}`;
    });
    return row;
  });
});

const functionTabs = computed(() => functionFirst.value?.children || []);
const functionKeyword = ref('');
const functionStatus = ref('');

const filteredFunctionRows = computed(() => {
  const keyword = functionKeyword.value.trim();
  return functionMockRows.value.filter((row) => {
    const values = Object.values(row).join(' ');
    const hitKeyword = !keyword || values.includes(keyword);
    const hitStatus = !functionStatus.value || row['状态'] === functionStatus.value;
    return hitKeyword && hitStatus;
  });
});

const actionVerbRE = /查询|查看|新增|编辑|修改|删除|启用|禁用|导出|导入|绑定|解绑|上传|下载|推广|终止|重置|合并|添加|扣除|冻结|解冻|升级|降级|核销|延期|转赠|发卡|挂失|恢复/g;

const findTargetByAction = (actionName: string) => {
  const base = actionName.replace(actionVerbRE, '').trim();
  const siblings = functionTabs.value;
  if (base) {
    const hit = siblings.find((item) => item.slug !== slug.value && item.name.includes(base));
    if (hit) return hit.slug;
  }
  const fallback = siblings.find((item) => item.slug !== slug.value);
  return fallback?.slug || '';
};

const handleFunctionAction = (actionName: string) => {
  const target = findTargetByAction(actionName);
  if (target) {
    goBySlug(target);
    return;
  }
  actionFeedback.value = `已执行：${actionName}`;
  if (actionTimer) clearTimeout(actionTimer);
  actionTimer = setTimeout(() => {
    actionFeedback.value = '';
  }, 1200);
};

type LoginMethod = 'sso' | 'wechat' | 'third';
const loginMethod = ref<LoginMethod>('sso');
const loginLanguage = ref('zh-CN');
const loginOrg = ref('guangzhou-headquarter');
const loginAccount = ref('');
const loginPassword = ref('');

const orgOptions = [
  { label: '广州总部', value: 'guangzhou-headquarter' },
  { label: '上海保利艾美门店', value: 'sh-lemeridien' },
  { label: '北京保利万丽门店', value: 'beijing-renaissance' },
  { label: '深圳保利皇冠门店', value: 'sz-crowne' }
];

const methodByName = (name: string): LoginMethod => {
  if (name.includes('企业微信')) return 'wechat';
  if (name.includes('第三方')) return 'third';
  return 'sso';
};

watch(
  () => functionPage.value?.name,
  (name) => {
    if (!name) return;
    loginMethod.value = methodByName(name);
  },
  { immediate: true }
);

const switchLoginMethod = (method: LoginMethod, label: string) => {
  loginMethod.value = method;
  const target = functionTabs.value.find((item) => item.name.includes(label));
  if (target && target.slug !== slug.value) {
    goBySlug(target.slug);
  }
};

const metricCards = [
  { label: '会员总量', value: '258,903', trend: '+3.8%' },
  { label: '本月新增会员', value: '12,491', trend: '+9.4%' },
  { label: '活跃会员率', value: '68.2%', trend: '+1.6%' },
  { label: '高价值会员占比', value: '21.7%', trend: '+0.9%' }
];

const memberTags = ['铂金会员', '家庭客群', '高复购', '偏好亲子产品'];

const orderRows = [
  { orderNo: 'PO202603290012', product: '亲子度假套餐', amount: '¥6,888', status: '已支付' },
  { orderNo: 'PO202603220097', product: '城市休闲套餐', amount: '¥2,380', status: '已完成' },
  { orderNo: 'PO202603150231', product: '餐饮储值礼遇', amount: '¥1,500', status: '已使用' }
];

const archiveRows = [
  { name: '华南渠道公司', contract: '框架协议A-2026', invoice: '月结专票', level: 'A类合作' },
  { name: '远航中介', contract: '中介协议B-2026', invoice: '普票', level: 'B类合作' },
  { name: '臻选旅业', contract: '专项协议C-2026', invoice: '电子票', level: '重点跟进' }
];

const actionSteps = [
  '核验会员身份与风险标签',
  '确认操作原因与审批人',
  '执行升级/冻结/黑名单等动作',
  '自动记录日志并通知相关部门'
];

const reportRows = [
  { dim: '会员等级', metric: '贡献收入', value: '¥18,220,000', ratio: '63%' },
  { dim: '营销渠道', metric: '新增会员', value: '31,204', ratio: '42%' },
  { dim: '会员生命周期', metric: '流失率', value: '7.9%', ratio: '-0.8%' }
];

const settingRows = [
  { name: '会员等级自动升降级规则', owner: '运营策略组', status: '已启用' },
  { name: '黑名单风控同步开关', owner: '风控组', status: '已启用' },
  { name: '订单积分回写策略', owner: '产品组', status: '测试中' }
];

const memberFormRows = [
  { label: '会员姓名', value: '王女士' },
  { label: '手机号', value: '138****6699' },
  { label: '证件类型', value: '身份证' },
  { label: '证件号码', value: '4401**********89' },
  { label: '来源渠道', value: '官网小程序' },
  { label: '会员等级', value: '银卡（待评估升级）' }
];

const memberAssetRows = [
  { label: '当前积分', value: '12,860' },
  { label: '储值余额', value: '¥3,500' },
  { label: '可用优惠券', value: '6 张' },
  { label: '近90天消费', value: '¥9,280' }
];

const companyArchiveRows = [
  { label: '公司名称', value: '华南渠道公司' },
  { label: '统一社会信用代码', value: '9144************7X' },
  { label: '结算周期', value: '月结（30天）' },
  { label: '协议价格体系', value: 'A-2026 主协议' },
  { label: '合作状态', value: '正常合作' }
];

const agencyArchiveRows = [
  { label: '中介名称', value: '远航中介' },
  { label: '佣金比例', value: '6.5%' },
  { label: '佣金结算规则', value: '次月15日结算' },
  { label: '归属区域', value: '华南区域' },
  { label: '风险标签', value: '低风险' }
];

const pricingRows = [
  { channel: '企业协议价', roomType: '豪华大床房', weekday: '¥588', weekend: '¥688', blackout: '法定节假日不可用' },
  { channel: '中介协议价', roomType: '行政双床房', weekday: '¥728', weekend: '¥828', blackout: '大型会展期间不可用' },
  { channel: '团购协议价', roomType: '套房', weekday: '¥1,280', weekend: '¥1,480', blackout: '春节不可用' }
];

const invoiceRows = [
  { title: '华南渠道公司', type: '增值税专用发票', taxRate: '6%', cycle: '按月汇总', status: '启用' },
  { title: '远航中介', type: '增值税普通发票', taxRate: '3%', cycle: '单单开票', status: '启用' },
  { title: '臻选旅业', type: '电子普票', taxRate: '1%', cycle: '按周汇总', status: '待确认' }
];

const historyOrderRows = [
  { no: 'PO202603050031', customer: '华南渠道公司', total: '¥23,860', checkin: '2026-03-12', status: '已离店' },
  { no: 'PO202603110228', customer: '远航中介', total: '¥9,420', checkin: '2026-03-20', status: '已离店' },
  { no: 'PO202603190416', customer: '臻选旅业', total: '¥15,300', checkin: '2026-03-28', status: '进行中' }
];

const logRows = [
  { time: '2026-03-29 14:22', user: '张敏(运营)', action: '更新协议价格', result: '成功' },
  { time: '2026-03-28 11:05', user: '李航(财务)', action: '调整开票规则', result: '成功' },
  { time: '2026-03-27 18:16', user: '系统任务', action: '同步历史订单', result: '成功' },
  { time: '2026-03-27 09:42', user: '王倩(客服)', action: '新增档案附件', result: '成功' }
];

const newCompanyRows = [
  { label: '公司名称', value: '示例渠道公司（待提交）' },
  { label: '联系人', value: '陈经理 / 139****8821' },
  { label: '所属城市', value: '广州' },
  { label: '开票类型', value: '增值税专票' },
  { label: '结算方式', value: '月结' }
];

const newAgencyRows = [
  { label: '中介名称', value: '示例中介（待提交）' },
  { label: '合作区域', value: '华东大区' },
  { label: '佣金比例', value: '7%' },
  { label: '对接人', value: '赵女士 / 136****2268' },
  { label: '结算日', value: '每月15日' }
];

const nonMemberRows = [
  { name: '李先生', mobile: '139****2020', source: '线下活动', tag: '高潜' },
  { name: '周女士', mobile: '186****1133', source: '企业合作', tag: '待跟进' },
  { name: '陈先生', mobile: '135****4875', source: '官网留资', tag: '沉默客户' }
];

const fixedLevelRows = [
  { memberId: 'M-102387', memberName: '杨女士', level: '金卡', reason: '长期战略客户', expiry: '2099-12-31' },
  { memberId: 'M-205631', memberName: '林先生', level: '铂金', reason: '企业高净值客群', expiry: '2099-12-31' }
];

const blacklistRows = [
  { memberId: 'M-438201', name: '赵某', reason: '异常退款行为', addedBy: '风控系统', status: '生效中' },
  { memberId: 'M-510783', name: '孙某', reason: '恶意占房', addedBy: '运营经理', status: '生效中' }
];

const memberChangeRows = [
  { time: '2026-03-28 10:25', field: '手机号', before: '136****2201', after: '138****6699', operator: '客服-王倩' },
  { time: '2026-03-20 16:44', field: '会员等级', before: '普通', after: '银卡', operator: '系统自动升档' },
  { time: '2026-03-08 09:17', field: '通讯偏好', before: '短信', after: '短信+微信', operator: '会员自助修改' }
];

const pointsRows = [
  { memberId: 'M-20394481', changeType: '消费入账', points: '+680', balance: '12,860', ref: 'PO202603290012' },
  { memberId: 'M-20394481', changeType: '活动奖励', points: '+200', balance: '12,180', ref: 'ACT20260326' },
  { memberId: 'M-20394481', changeType: '积分兑换', points: '-520', balance: '11,980', ref: 'EX20260318' }
];

const couponRows = [
  { couponNo: 'CPN-882301', couponName: '周末房券', type: '满减券', status: '未使用', expire: '2026-06-30' },
  { couponNo: 'CPN-882587', couponName: '餐饮抵扣券', type: '代金券', status: '已使用', expire: '2026-04-10' },
  { couponNo: 'CPN-883002', couponName: '升级礼遇券', type: '权益券', status: '已锁定', expire: '2026-05-15' }
];

const storedValueRows = [
  { txnNo: 'SV20260328001', type: '充值', amount: '+¥2,000', channel: '微信支付', balance: '¥3,500' },
  { txnNo: 'SV20260320012', type: '消费扣减', amount: '-¥680', channel: '订单抵扣', balance: '¥1,500' },
  { txnNo: 'SV20260309021', type: '充值', amount: '+¥1,200', channel: '前台收银', balance: '¥2,180' }
];

const marketingRows = [
  { campaign: '春季亲子节', segment: '家庭客群', touch: '短信+企微', conv: '18.6%', result: '进行中' },
  { campaign: '银卡促活计划', segment: '银卡低活跃', touch: 'App Push', conv: '12.4%', result: '已完成' },
  { campaign: '高净值专享礼遇', segment: '铂金会员', touch: '专属顾问', conv: '26.1%', result: '进行中' }
];

const memberPortraitTags = ref([
  '亲子出游',
  '高频周末入住',
  '偏好早餐',
  '价格敏感',
  '高积分活跃',
  '常住华南'
]);

const memberPortraitPrefs = ref([
  { label: '酒店偏好', value: '广州保利洲际' },
  { label: '房型偏好', value: '行政大床房' },
  { label: '餐饮偏好', value: '粤菜 / 西式早餐' },
  { label: '出行场景', value: '家庭亲子 / 周末度假' }
]);

const memberAddressRows = ref([
  { name: '家庭地址', country: '中国', province: '广东', city: '广州', district: '天河区', detail: '珠江新城***号' },
  { name: '公司地址', country: '中国', province: '广东', city: '广州', district: '越秀区', detail: '中山路***号' }
]);

const memberInvoiceRows = ref([
  { title: '广州某科技有限公司', taxNo: '9144**********66', type: '增值税专票', email: 'finance@example.com' },
  { title: '个人发票', taxNo: '-', type: '电子普票', email: 'member@example.com' }
]);

const memberFamilyRows = ref([
  { name: '张小宝', relation: '子女', mobile: '139****8844', birthday: '2015-03-02', tag: '亲子会员' },
  { name: '王女士', relation: '配偶', mobile: '137****2288', birthday: '1992-07-16', tag: '同住人' }
]);

const memberMoreContactRows = ref([
  { id: 1, type: '微信', value: 'poly_member_001', remark: '常用沟通渠道' },
  { id: 2, type: 'QQ', value: '987654321', remark: '历史档案同步' }
]);

const addMoreContact = () => {
  memberMoreContactRows.value.push({
    id: Date.now(),
    type: '微信',
    value: '',
    remark: ''
  });
};

const removeMoreContact = (id: number) => {
  memberMoreContactRows.value = memberMoreContactRows.value.filter((x) => x.id !== id);
};

type MemberLevel = '普通' | '银卡' | '金卡' | '铂金' | '黑金';
type MemberStatus = '可用' | '冻结' | '黑名单' | '注销';

interface MemberRow {
  id: number;
  memberNo: string;
  name: string;
  mobile: string;
  email: string;
  cardNo: string;
  level: MemberLevel;
  channel: '小程序' | '官网' | '前台' | '企业导入';
  hotel: '广州保利洲际' | '上海保利艾美' | '北京保利万丽' | '深圳保利皇冠';
  gender: '男' | '女';
  birthday: string;
  points: number;
  storedValue: number;
  status: MemberStatus;
  registerAt: string;
  fixedLevel: boolean;
}

interface MemberFilterForm {
  keyword: string;
  gender: '' | '男' | '女';
  level: '' | MemberLevel;
  status: '' | MemberStatus;
  channel: '' | MemberRow['channel'];
  hotel: '' | MemberRow['hotel'];
  startDate: string;
  endDate: string;
}

const memberRows = ref<MemberRow[]>([
  { id: 1, memberNo: '202500901', name: '张小刚', mobile: '18798989898', email: 'xiaogang.zhang@poly.com', cardNo: 'PM00199001', level: '银卡', channel: '小程序', hotel: '广州保利洲际', gender: '男', birthday: '1999-10-19', points: 789, storedValue: 0, status: '可用', registerAt: '2025-01-09 12:00:22', fixedLevel: false },
  { id: 2, memberNo: '202500902', name: '王倩', mobile: '13611223344', email: 'qian.wang@poly.com', cardNo: 'PM00199002', level: '金卡', channel: '官网', hotel: '上海保利艾美', gender: '女', birthday: '1994-03-11', points: 2380, storedValue: 1200, status: '可用', registerAt: '2025-01-08 12:00:22', fixedLevel: false },
  { id: 3, memberNo: '202500903', name: '刘海', mobile: '13955667788', email: 'hai.liu@poly.com', cardNo: 'PM00199003', level: '普通', channel: '前台', hotel: '北京保利万丽', gender: '男', birthday: '1988-12-03', points: 120, storedValue: 300, status: '冻结', registerAt: '2025-01-07 12:00:22', fixedLevel: false },
  { id: 4, memberNo: '202500904', name: '陈琳', mobile: '13833445566', email: 'lin.chen@poly.com', cardNo: 'PM00199004', level: '铂金', channel: '企业导入', hotel: '深圳保利皇冠', gender: '女', birthday: '1991-06-26', points: 5600, storedValue: 5200, status: '可用', registerAt: '2025-01-06 12:00:22', fixedLevel: true },
  { id: 5, memberNo: '202500905', name: '周宇', mobile: '13799887766', email: 'yu.zhou@poly.com', cardNo: 'PM00199005', level: '银卡', channel: '小程序', hotel: '广州保利洲际', gender: '男', birthday: '1996-09-15', points: 980, storedValue: 0, status: '黑名单', registerAt: '2025-01-05 12:00:22', fixedLevel: false },
  { id: 6, memberNo: '202500906', name: '罗婷', mobile: '13522334455', email: 'ting.luo@poly.com', cardNo: 'PM00199006', level: '普通', channel: '官网', hotel: '上海保利艾美', gender: '女', birthday: '2000-01-08', points: 60, storedValue: 200, status: '可用', registerAt: '2025-01-04 12:00:22', fixedLevel: false },
  { id: 7, memberNo: '202500907', name: '孙泽', mobile: '13166554433', email: 'ze.sun@poly.com', cardNo: 'PM00199007', level: '黑金', channel: '企业导入', hotel: '北京保利万丽', gender: '男', birthday: '1985-08-20', points: 10200, storedValue: 8800, status: '可用', registerAt: '2025-01-03 12:00:22', fixedLevel: true },
  { id: 8, memberNo: '202500908', name: '何雅', mobile: '13377889900', email: 'ya.he@poly.com', cardNo: 'PM00199008', level: '金卡', channel: '前台', hotel: '深圳保利皇冠', gender: '女', birthday: '1993-04-22', points: 3200, storedValue: 1600, status: '注销', registerAt: '2025-01-02 12:00:22', fixedLevel: false }
]);

const memberFilter = ref<MemberFilterForm>({
  keyword: '',
  gender: '',
  level: '',
  status: '',
  channel: '',
  hotel: '',
  startDate: '',
  endDate: ''
});

const memberPage = ref(1);
const memberPageSize = 6;
const editingMemberId = ref<number | null>(null);
const editDraft = ref<MemberRow | null>(null);

const levelRank: MemberLevel[] = ['普通', '银卡', '金卡', '铂金', '黑金'];

const filteredMembers = computed(() => {
  const f = memberFilter.value;
  return memberRows.value.filter((row) => {
    const keywordHit =
      !f.keyword ||
      [row.memberNo, row.name, row.mobile, row.email, row.cardNo].some((val) =>
        val.toLowerCase().includes(f.keyword.toLowerCase())
      );
    const genderHit = !f.gender || row.gender === f.gender;
    const levelHit = !f.level || row.level === f.level;
    const statusHit = !f.status || row.status === f.status;
    const channelHit = !f.channel || row.channel === f.channel;
    const hotelHit = !f.hotel || row.hotel === f.hotel;
    const startHit = !f.startDate || row.registerAt.slice(0, 10) >= f.startDate;
    const endHit = !f.endDate || row.registerAt.slice(0, 10) <= f.endDate;
    return keywordHit && genderHit && levelHit && statusHit && channelHit && hotelHit && startHit && endHit;
  });
});

const memberTotalPages = computed(() => Math.max(1, Math.ceil(filteredMembers.value.length / memberPageSize)));
const pagedMembers = computed(() => {
  const start = (memberPage.value - 1) * memberPageSize;
  return filteredMembers.value.slice(start, start + memberPageSize);
});

const resetMemberFilter = () => {
  memberFilter.value = {
    keyword: '',
    gender: '',
    level: '',
    status: '',
    channel: '',
    hotel: '',
    startDate: '',
    endDate: ''
  };
  memberPage.value = 1;
};

const queryMemberList = () => {
  memberPage.value = 1;
};

const startEditMember = (row: MemberRow) => {
  editingMemberId.value = row.id;
  editDraft.value = { ...row };
};

const cancelEditMember = () => {
  editingMemberId.value = null;
  editDraft.value = null;
};

const saveEditMember = () => {
  if (!editDraft.value) return;
  memberRows.value = memberRows.value.map((row) => (row.id === editDraft.value!.id ? { ...editDraft.value! } : row));
  cancelEditMember();
};

const adjustMemberRow = (row: MemberRow, action: 'upgrade' | 'downgrade' | 'freeze' | 'unfreeze' | 'blacklist' | 'cancel' | 'fixed') => {
  memberRows.value = memberRows.value.map((it) => {
    if (it.id !== row.id) return it;
    const next = { ...it };
    if (action === 'upgrade') {
      const idx = levelRank.indexOf(next.level);
      next.level = levelRank[Math.min(levelRank.length - 1, idx + 1)];
    }
    if (action === 'downgrade') {
      const idx = levelRank.indexOf(next.level);
      next.level = levelRank[Math.max(0, idx - 1)];
    }
    if (action === 'freeze') next.status = '冻结';
    if (action === 'unfreeze') next.status = '可用';
    if (action === 'blacklist') next.status = '黑名单';
    if (action === 'cancel') next.status = '注销';
    if (action === 'fixed') next.fixedLevel = !next.fixedLevel;
    return next;
  });
};

const formatMoney = (n: number) => `¥${n.toLocaleString('zh-CN')}`;

interface QuickAction {
  label: string;
  targetSlug: string;
  note: string;
}

interface FlowStep {
  label: string;
  slug: string;
}

interface DemoFlow {
  name: string;
  steps: FlowStep[];
}

const actionMap: Record<string, QuickAction[]> = {
  newMember: [
    { label: '提交并查看会员', targetSlug: '查看会员信息', note: '模拟新增完成后进入会员详情页' },
    { label: '补充用户画像', targetSlug: '用户画像', note: '继续完善会员标签与偏好' },
    { label: '维护地址及发票', targetSlug: '地址及发票', note: '完善开票与地址信息' }
  ],
  viewMember: [
    { label: '执行会员操作', targetSlug: '操作', note: '进入升级/冻结/黑名单等动作页' },
    { label: '查看会员订单', targetSlug: '会员订单', note: '查看该会员历史消费记录' },
    { label: '查看变更记录', targetSlug: '会员信息变更记录', note: '审计关键字段变更历史' }
  ],
  newCompanyProfile: [
    { label: '提交并返回公司档案', targetSlug: '公司档案', note: '模拟新增公司后回到档案主列表' },
    { label: '配置协议价格', targetSlug: '协议价格', note: '补齐公司合作价格策略' },
    { label: '配置发票规则', targetSlug: '发票', note: '补齐公司开票规范' }
  ],
  companyProfile: [
    { label: '查看历史订单', targetSlug: '历史订单', note: '查看公司维度订单明细' },
    { label: '查看日志', targetSlug: '日志', note: '追踪档案操作过程' }
  ],
  newAgencyProfile: [
    { label: '提交并返回中介档案', targetSlug: '中介档案', note: '模拟新增中介后回到主列表' },
    { label: '配置佣金与价格', targetSlug: '佣金设置-_（新增）p1', note: '补齐佣金配置策略' },
    { label: '维护协议价格_1', targetSlug: '协议价格_1', note: '中介维度价格规则维护' }
  ],
  agencyProfile: [
    { label: '查看历史订单_1', targetSlug: '历史订单_1', note: '查看中介维度订单轨迹' },
    { label: '查看日志_1', targetSlug: '日志_1', note: '追踪中介档案操作历史' }
  ],
  nonMemberProfile: [
    { label: '转化为会员', targetSlug: '新增会员', note: '将潜客转入会员流程' },
    { label: '进入营销触达', targetSlug: '营销', note: '对非会员客群做营销触达' }
  ],
  fixedLevel: [
    { label: '返回会员操作页', targetSlug: '操作', note: '继续进行等级策略管理' },
    { label: '查看会员详情', targetSlug: '查看会员信息', note: '核验固定等级会员档案' }
  ],
  blacklist: [
    { label: '进入操作页复核', targetSlug: '操作', note: '复核黑名单相关动作' },
    { label: '查看日志', targetSlug: '日志', note: '审计黑名单维护记录' }
  ],
  memberChangeLog: [
    { label: '返回会员详情', targetSlug: '查看会员信息', note: '回到会员主档案页' },
    { label: '查看日志', targetSlug: '日志', note: '定位具体操作来源' }
  ],
  points: [
    { label: '查看异常日志', targetSlug: '日志', note: '核查积分异常预警对应日志' },
    { label: '进入营销页', targetSlug: '营销', note: '用积分活动驱动转化' }
  ],
  coupon: [
    { label: '进入营销页', targetSlug: '营销', note: '联动营销策略进行券投放' },
    { label: '查看会员订单', targetSlug: '会员订单', note: '核验券核销订单表现' }
  ],
  storedValue: [
    { label: '查看历史订单', targetSlug: '历史订单', note: '核对储值扣减对应订单' },
    { label: '查看日志', targetSlug: '日志', note: '追踪储值变更来源' }
  ],
  marketing: [
    { label: '查看优惠券', targetSlug: '优惠券', note: '回看活动券投放状态' },
    { label: '查看积分页', targetSlug: '积分', note: '评估积分活动拉动效果' }
  ],
  pricing: [
    { label: '返回公司档案', targetSlug: '公司档案', note: '回到档案主页面' }
  ],
  invoice: [
    { label: '返回公司档案', targetSlug: '公司档案', note: '继续维护档案信息' }
  ],
  orderHistory: [
    { label: '查看发票页', targetSlug: '发票', note: '关联订单与发票规则' },
    { label: '查看日志页', targetSlug: '日志', note: '追溯订单同步记录' }
  ],
  log: [
    { label: '返回公司档案', targetSlug: '公司档案', note: '回到业务主页面继续操作' }
  ]
};

const demoFlows: DemoFlow[] = [
  {
    name: '会员新增转化流程',
    steps: [
      { label: '新增会员', slug: '新增会员' },
      { label: '查看会员信息', slug: '查看会员信息' },
      { label: '会员操作', slug: '操作' },
      { label: '变更记录', slug: '会员信息变更记录' }
    ]
  },
  {
    name: '公司档案维护流程',
    steps: [
      { label: '新增公司档案', slug: '新增公司档案' },
      { label: '公司档案', slug: '公司档案' },
      { label: '协议价格', slug: '协议价格' },
      { label: '发票', slug: '发票' },
      { label: '日志', slug: '日志' }
    ]
  },
  {
    name: '中介档案维护流程',
    steps: [
      { label: '新增中介档案', slug: '新增中介档案' },
      { label: '中介档案', slug: '中介档案' },
      { label: '协议价格_1', slug: '协议价格_1' },
      { label: '历史订单_1', slug: '历史订单_1' },
      { label: '日志_1', slug: '日志_1' }
    ]
  },
  {
    name: '营销运营闭环',
    steps: [
      { label: '积分', slug: '积分' },
      { label: '优惠券', slug: '优惠券' },
      { label: '营销', slug: '营销' },
      { label: '会员订单', slug: '会员订单' }
    ]
  }
];

const activeFlow = computed(() => {
  const current = slug.value;
  return demoFlows.find((flow) => flow.steps.some((step) => step.slug === current)) || null;
});

const activeFlowStepIndex = computed(() => {
  if (!activeFlow.value) return -1;
  return activeFlow.value.steps.findIndex((step) => step.slug === slug.value);
});

const quickActions = computed(() => {
  const detailKey = pageDetailKind.value;
  const detailActions = actionMap[detailKey] || [];
  const baseActions =
    detailActions.length > 0
      ? detailActions
      : pageKind.value === 'member'
        ? [
            { label: '进入新增会员', targetSlug: '新增会员', note: '从会员列表进入新增流程' },
            { label: '进入会员操作', targetSlug: '操作', note: '进行升级/冻结等动作' }
          ]
        : pageKind.value === 'archive'
          ? [
              { label: '进入公司档案', targetSlug: '公司档案', note: '切换到公司档案视图' },
              { label: '进入中介档案', targetSlug: '中介档案', note: '切换到中介档案视图' }
            ]
          : [];

  return baseActions.filter((item) => allPages.some((page) => page.slug === item.targetSlug));
});

const runQuickAction = (action: QuickAction) => {
  actionFeedback.value = `已执行: ${action.label}，正在跳转到「${action.targetSlug}」`;
  if (actionTimer) clearTimeout(actionTimer);
  actionTimer = setTimeout(() => {
    actionFeedback.value = '';
  }, 2200);
  goBySlug(action.targetSlug);
};
</script>

<template>
  <article v-if="currentPage || functionPage" class="page-card">
    <div class="page-head">
      <div>
        <p class="page-kicker">业务页面演示</p>
        <h1>{{ pageTitle }}</h1>
      </div>
      <span class="badge">{{ pageBadge }}</span>
    </div>

    <div class="breadcrumb">
      <span v-for="(item, idx) in breadcrumb" :key="item.id">
        <button v-if="item.slug" class="link-chip" @click="goBySlug(item.slug)">{{ item.name }}</button>
        <span v-else class="link-chip">{{ item.name }}</span>
        <span v-if="idx < breadcrumb.length - 1">/</span>
      </span>
    </div>

    <p v-if="!isMemberListPage" class="summary">{{ pageSummary }}</p>

    <section v-if="isLoginUnifiedPage" class="login-unified">
      <div class="login-menu">
        <button class="login-item" :class="{ active: loginMethod === 'sso' }" @click="switchLoginMethod('sso', 'SSO登录')">SSO登录</button>
        <button class="login-item" :class="{ active: loginMethod === 'wechat' }" @click="switchLoginMethod('wechat', '企业微信扫码登录')">企业微信扫码登录</button>
        <button class="login-item" :class="{ active: loginMethod === 'third' }" @click="switchLoginMethod('third', '第三方SSO登录')">第三方SSO登录</button>
      </div>

      <div class="login-main">
        <h3>统一登录入口</h3>
        <div class="login-form-grid">
          <label class="filter-item">
            <span>系统语言</span>
            <select v-model="loginLanguage">
              <option value="zh-CN">中文</option>
              <option value="en-US">English</option>
            </select>
          </label>
          <label class="filter-item">
            <span>组织架构</span>
            <select v-model="loginOrg">
              <option v-for="org in orgOptions" :key="org.value" :value="org.value">{{ org.label }}</option>
            </select>
          </label>
          <label v-if="loginMethod !== 'wechat'" class="filter-item">
            <span>账号</span>
            <input v-model="loginAccount" placeholder="请输入账号" />
          </label>
          <label v-if="loginMethod !== 'wechat'" class="filter-item">
            <span>密码</span>
            <input v-model="loginPassword" type="password" placeholder="请输入密码" />
          </label>
        </div>

        <div v-if="loginMethod === 'wechat'" class="wechat-box">
          <div class="qr-placeholder">企业微信扫码区域</div>
          <p>请使用企业微信扫码登录后进入系统</p>
        </div>

        <div class="member-toolbar">
          <div class="left-actions">
            <button class="primary-btn">登录</button>
            <button class="ghost-btn">重置</button>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="functionPage && !isLoginUnifiedPage && !isMemberListPage && pageKind === 'general' && pageDetailKind === 'none'"
      class="system-board"
    >
      <div class="member-filter-grid">
        <label class="filter-item">
          <span>关键字</span>
          <input v-model="functionKeyword" placeholder="请输入关键字" />
        </label>
        <label class="filter-item">
          <span>状态</span>
          <select v-model="functionStatus">
            <option value="">全部</option>
            <option value="启用">启用</option>
            <option value="待配置">待配置</option>
          </select>
        </label>
      </div>

      <div class="member-toolbar">
        <div class="left-actions">
          <button
            v-for="act in functionActions.slice(0, 8)"
            :key="act.name"
            class="ghost-btn"
            @click="handleFunctionAction(act.name)"
          >
            {{ act.name }}
          </button>
        </div>
      </div>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th v-for="c in functionTableColumns" :key="c">{{ c }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in filteredFunctionRows" :key="idx">
              <td v-for="c in functionTableColumns" :key="c">{{ row[c] }}</td>
              <td class="row-actions">
                <button
                  v-for="act in functionActions.slice(0, 4)"
                  :key="`${idx}-${act.name}`"
                  class="mini-btn"
                  @click="handleFunctionAction(act.name)"
                >
                  {{ act.name }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-if="pageKind === 'dashboard'">
      <div class="metric-grid">
        <div v-for="card in metricCards" :key="card.label" class="metric-card">
          <p>{{ card.label }}</p>
          <h3>{{ card.value }}</h3>
          <span>{{ card.trend }}</span>
        </div>
      </div>
      <div class="canvas-card">经营趋势看板（演示区）: 近 12 周会员活跃度、消费额、转化率联动。</div>
    </section>

    <section class="demo-zone" v-else-if="isMemberListPage">
      <div class="member-board">
        <div class="member-filter-grid">
          <label class="filter-item">
            <span>关键字</span>
            <input v-model="memberFilter.keyword" placeholder="会员编号/姓名/手机号/邮箱/身份证号/护照号" />
          </label>
          <label class="filter-item">
            <span>性别</span>
            <select v-model="memberFilter.gender">
              <option value="">请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </label>
          <label class="filter-item">
            <span>会员等级</span>
            <select v-model="memberFilter.level">
              <option value="">请选择</option>
              <option v-for="lv in levelRank" :key="lv" :value="lv">{{ lv }}</option>
            </select>
          </label>
          <label class="filter-item">
            <span>会员状态</span>
            <select v-model="memberFilter.status">
              <option value="">请选择</option>
              <option value="可用">可用</option>
              <option value="冻结">冻结</option>
              <option value="黑名单">黑名单</option>
              <option value="注销">注销</option>
            </select>
          </label>
          <label class="filter-item">
            <span>注册渠道</span>
            <select v-model="memberFilter.channel">
              <option value="">请选择</option>
              <option value="小程序">小程序</option>
              <option value="官网">官网</option>
              <option value="前台">前台</option>
              <option value="企业导入">企业导入</option>
            </select>
          </label>
          <label class="filter-item">
            <span>注册酒店</span>
            <select v-model="memberFilter.hotel">
              <option value="">请选择</option>
              <option value="广州保利洲际">广州保利洲际</option>
              <option value="上海保利艾美">上海保利艾美</option>
              <option value="北京保利万丽">北京保利万丽</option>
              <option value="深圳保利皇冠">深圳保利皇冠</option>
            </select>
          </label>
          <label class="filter-item">
            <span>注册日期(起)</span>
            <input v-model="memberFilter.startDate" type="date" />
          </label>
          <label class="filter-item">
            <span>注册日期(止)</span>
            <input v-model="memberFilter.endDate" type="date" />
          </label>
        </div>

        <div class="member-toolbar">
          <div class="left-actions">
            <button class="primary-btn" @click="goBySlug('新增会员')">新增会员</button>
            <button class="ghost-btn">导出</button>
          </div>
          <div class="right-actions">
            <button class="primary-btn" @click="queryMemberList">查询</button>
            <button class="ghost-btn" @click="resetMemberFilter">重置</button>
          </div>
        </div>

        <div class="table-card">
          <table class="member-table">
            <thead>
              <tr>
                <th>会员编号</th>
                <th>姓名</th>
                <th>注册手机号</th>
                <th>邮箱</th>
                <th>会员卡号</th>
                <th>会员等级</th>
                <th>注册渠道</th>
                <th>注册酒店</th>
                <th>性别</th>
                <th>生日</th>
                <th>可用积分</th>
                <th>可用储值</th>
                <th>状态</th>
                <th>注册时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pagedMembers" :key="row.id">
                <template v-if="editingMemberId === row.id && editDraft">
                  <td>{{ row.memberNo }}</td>
                  <td><input v-model="editDraft.name" /></td>
                  <td><input v-model="editDraft.mobile" /></td>
                  <td><input v-model="editDraft.email" /></td>
                  <td>{{ row.cardNo }}</td>
                  <td>
                    <select v-model="editDraft.level">
                      <option v-for="lv in levelRank" :key="lv" :value="lv">{{ lv }}</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="editDraft.channel">
                      <option value="小程序">小程序</option>
                      <option value="官网">官网</option>
                      <option value="前台">前台</option>
                      <option value="企业导入">企业导入</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="editDraft.hotel">
                      <option value="广州保利洲际">广州保利洲际</option>
                      <option value="上海保利艾美">上海保利艾美</option>
                      <option value="北京保利万丽">北京保利万丽</option>
                      <option value="深圳保利皇冠">深圳保利皇冠</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="editDraft.gender">
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </td>
                  <td><input v-model="editDraft.birthday" type="date" /></td>
                  <td><input v-model.number="editDraft.points" type="number" min="0" /></td>
                  <td><input v-model.number="editDraft.storedValue" type="number" min="0" /></td>
                  <td>
                    <select v-model="editDraft.status">
                      <option value="可用">可用</option>
                      <option value="冻结">冻结</option>
                      <option value="黑名单">黑名单</option>
                      <option value="注销">注销</option>
                    </select>
                  </td>
                  <td>{{ row.registerAt }}</td>
                  <td class="row-actions">
                    <button class="mini-btn" @click="saveEditMember">保存</button>
                    <button class="mini-btn" @click="cancelEditMember">取消</button>
                  </td>
                </template>
                <template v-else>
                  <td>{{ row.memberNo }}</td>
                  <td>{{ row.name }}</td>
                  <td>{{ row.mobile }}</td>
                  <td>{{ row.email }}</td>
                  <td>{{ row.cardNo }}</td>
                  <td>
                    {{ row.level }}
                    <span v-if="row.fixedLevel" class="tiny-tag">固定</span>
                  </td>
                  <td>{{ row.channel }}</td>
                  <td>{{ row.hotel }}</td>
                  <td>{{ row.gender }}</td>
                  <td>{{ row.birthday }}</td>
                  <td>{{ row.points }}</td>
                  <td>{{ formatMoney(row.storedValue) }}</td>
                  <td>{{ row.status }}</td>
                  <td>{{ row.registerAt }}</td>
                  <td class="row-actions">
                    <button class="mini-btn" @click="goBySlug('查看会员信息')">查看</button>
                    <button class="mini-btn" @click="startEditMember(row)">编辑</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'upgrade')">升级</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'downgrade')">降级</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'freeze')">冻结</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'unfreeze')">解冻</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'blacklist')">黑名单</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'cancel')">注销</button>
                    <button class="mini-btn" @click="adjustMemberRow(row, 'fixed')">固定等级</button>
                    <button class="mini-btn" @click="goBySlug('操作')">操作页</button>
                  </td>
                </template>
              </tr>
              <tr v-if="pagedMembers.length === 0">
                <td colspan="15" class="empty-note">无符合条件的数据</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="member-pagination">
          <button class="ghost-btn" :disabled="memberPage <= 1" @click="memberPage -= 1">上一页</button>
          <span>第 {{ memberPage }} / {{ memberTotalPages }} 页（共 {{ filteredMembers.length }} 条）</span>
          <button class="ghost-btn" :disabled="memberPage >= memberTotalPages" @click="memberPage += 1">下一页</button>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'newMember'">
      <div class="onboard-layout">
        <div class="onboard-main">
          <div class="module-nav-tabs">
            <button
              v-for="tab in memberFlowTabs"
              :key="tab.slug"
              class="member-tab"
              :class="{ active: tab.slug === slug }"
              @click="goBySlug(tab.slug)"
            >
              {{ tab.label }}
            </button>
          </div>
          <h3>会员基本信息</h3>
          <div class="onboard-basic-grid">
            <div class="onboard-col">
              <div class="form-row"><label>会员卡号:</label><input value="PM900012131" disabled /></div>
              <div class="form-row"><label>*会员等级:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>* 姓/中/名:</label><div class="name-triplet"><input placeholder="请输入" /><input placeholder="请输入" /><input placeholder="请输入" /></div></div>
              <div class="form-row"><label>证件类型:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>证件号:</label><input placeholder="请输入" /></div>
              <div class="form-row"><label>护照:</label><input placeholder="请输入" /></div>
              <div class="form-row"><label>性别:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>生日:</label><input type="date" /></div>
              <div class="form-row"><label>国籍:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>地址类型:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>国家:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>市:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>详细地址:</label><input placeholder="请输入" /></div>
              <div class="form-row"><label>发卡方式:</label><select><option>注册</option></select></div>
            </div>

            <div class="onboard-col">
              <div class="form-row"><label>*姓名:</label><input placeholder="请输入" /></div>
              <div class="form-row"><label>*注册手机号:</label><div class="phone-group"><span>中国+86</span><input placeholder="请输入" /></div></div>
              <div class="form-row"><label>手机号:</label><div class="phone-group"><span>中国+86</span><input placeholder="请输入" /></div></div>
              <div class="form-row"><label>电话:</label><div class="phone-group"><span>中国+86</span><input placeholder="请输入" /></div></div>
              <div class="form-row"><label>传真:</label><input placeholder="请输入" /></div>
              <div class="form-row"><label>邮箱:</label><input placeholder="请输入" /></div>
              <div class="form-row"><label>称谓:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>民族:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>语言:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>省/直辖市:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>县/区:</label><select><option>请选择</option></select></div>
              <div class="form-row"><label>邮编:</label><input placeholder="请输入" /></div>
              <button class="more-contact-link" @click="goBySlug('更多通讯')">更多通讯</button>
            </div>
          </div>
          <div class="member-toolbar">
            <div class="left-actions">
              <button class="primary-btn">保存</button>
              <button class="ghost-btn" @click="goBySlug('会员')">返回</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'memberMoreContact'">
      <div class="onboard-layout">
        <div class="onboard-main">
          <div class="module-nav-tabs">
            <button class="member-tab" @click="goBySlug('新增会员')">基本信息</button>
            <button class="member-tab active">更多通讯</button>
          </div>
          <h3>更多通讯地址</h3>
          <div class="table-card">
            <table>
              <thead>
                <tr><th>通讯类型</th><th>通讯地址</th><th>备注</th><th>操作</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in memberMoreContactRows" :key="row.id">
                  <td>
                    <select v-model="row.type">
                      <option>微信</option>
                      <option>QQ</option>
                      <option>Telegram</option>
                      <option>邮箱</option>
                    </select>
                  </td>
                  <td><input v-model="row.value" placeholder="请输入通讯地址" /></td>
                  <td><input v-model="row.remark" placeholder="请输入备注" /></td>
                  <td><button class="mini-btn" @click="removeMoreContact(row.id)">删除</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="member-toolbar">
            <div class="left-actions">
              <button class="ghost-btn" @click="addMoreContact">添加通讯地址</button>
              <button class="primary-btn" @click="goBySlug('新增会员')">保存并返回基本信息</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'memberPortrait'">
      <div class="onboard-layout">
        <div class="onboard-main">
          <div class="module-nav-tabs">
            <button
              v-for="tab in memberFlowTabs"
              :key="tab.slug"
              class="member-tab"
              :class="{ active: tab.slug === slug }"
              @click="goBySlug(tab.slug)"
            >
              {{ tab.label }}
            </button>
          </div>
          <h3>用户画像标签</h3>
          <div class="tag-row">
            <span v-for="tag in memberPortraitTags" :key="tag" class="soft-tag">{{ tag }}</span>
          </div>
          <div class="table-card">
            <table>
              <thead>
                <tr><th>画像维度</th><th>当前偏好</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in memberPortraitPrefs" :key="row.label">
                  <td>{{ row.label }}</td>
                  <td>{{ row.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'memberAddressInvoice'">
      <div class="onboard-layout">
        <div class="onboard-main">
          <div class="module-nav-tabs">
            <button
              v-for="tab in memberFlowTabs"
              :key="tab.slug"
              class="member-tab"
              :class="{ active: tab.slug === slug }"
              @click="goBySlug(tab.slug)"
            >
              {{ tab.label }}
            </button>
          </div>
          <h3>地址信息</h3>
          <div class="table-card">
            <table>
              <thead>
                <tr><th>地址类型</th><th>国家</th><th>省</th><th>市</th><th>区</th><th>详细地址</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in memberAddressRows" :key="row.name">
                  <td>{{ row.name }}</td><td>{{ row.country }}</td><td>{{ row.province }}</td><td>{{ row.city }}</td><td>{{ row.district }}</td><td>{{ row.detail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>发票信息</h3>
          <div class="table-card">
            <table>
              <thead>
                <tr><th>发票抬头</th><th>税号</th><th>类型</th><th>邮箱</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in memberInvoiceRows" :key="row.title">
                  <td>{{ row.title }}</td><td>{{ row.taxNo }}</td><td>{{ row.type }}</td><td>{{ row.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'memberFamily'">
      <div class="onboard-layout">
        <div class="onboard-main">
          <div class="module-nav-tabs">
            <button
              v-for="tab in memberFlowTabs"
              :key="tab.slug"
              class="member-tab"
              :class="{ active: tab.slug === slug }"
              @click="goBySlug(tab.slug)"
            >
              {{ tab.label }}
            </button>
          </div>
          <h3>家庭成员</h3>
          <div class="table-card">
            <table>
              <thead>
                <tr><th>姓名</th><th>关系</th><th>手机号</th><th>生日</th><th>标签</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in memberFamilyRows" :key="row.mobile">
                  <td>{{ row.name }}</td><td>{{ row.relation }}</td><td>{{ row.mobile }}</td><td>{{ row.birthday }}</td><td>{{ row.tag }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'viewMember'">
      <div class="metric-grid">
        <div v-for="row in memberAssetRows" :key="row.label" class="metric-card">
          <p>{{ row.label }}</p>
          <h3>{{ row.value }}</h3>
          <span>实时同步</span>
        </div>
      </div>
      <div class="table-card">
        <h3>会员关键信息卡</h3>
        <table>
          <tbody>
            <tr v-for="row in memberFormRows" :key="row.label">
              <th>{{ row.label }}</th>
              <td>{{ row.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'companyProfile'">
      <div class="dual-grid">
        <div class="table-card">
          <h3>公司档案信息</h3>
          <table>
            <tbody>
              <tr v-for="row in companyArchiveRows" :key="row.label">
                <th>{{ row.label }}</th>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-card">
          <h3>档案关联模块</h3>
          <div class="tag-row">
            <span class="soft-tag">协议价格</span>
            <span class="soft-tag">下挂会员</span>
            <span class="soft-tag">发票</span>
            <span class="soft-tag">历史订单</span>
            <span class="soft-tag">日志</span>
          </div>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'agencyProfile'">
      <div class="dual-grid">
        <div class="table-card">
          <h3>中介档案信息</h3>
          <table>
            <tbody>
              <tr v-for="row in agencyArchiveRows" :key="row.label">
                <th>{{ row.label }}</th>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-card">
          <h3>佣金与结算提醒</h3>
          <ul class="timeline">
            <li>当前佣金规则已生效，需每月对账。</li>
            <li>若调整佣金比例，请走审批流并同步历史记录。</li>
            <li>发票与附件资料需在结算前补齐。</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'newCompanyProfile'">
      <div class="dual-grid">
        <div class="table-card">
          <h3>新增公司档案表单</h3>
          <table>
            <tbody>
              <tr v-for="row in newCompanyRows" :key="row.label">
                <th>{{ row.label }}</th>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-card">
          <h3>提交前检查</h3>
          <ul class="timeline">
            <li>统一社会信用代码与公司名称一致性校验。</li>
            <li>默认关联“协议价格/发票/日志”子模块。</li>
            <li>提交后自动进入“公司档案”主列表。</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'newAgencyProfile'">
      <div class="dual-grid">
        <div class="table-card">
          <h3>新增中介档案表单</h3>
          <table>
            <tbody>
              <tr v-for="row in newAgencyRows" :key="row.label">
                <th>{{ row.label }}</th>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-card">
          <h3>佣金策略提醒</h3>
          <ul class="timeline">
            <li>建议同步维护“佣金设置”与“发票配置”。</li>
            <li>中介等级决定可售房型与折扣上限。</li>
            <li>创建成功后可直接跳转“协议价格_1”。</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'nonMemberProfile'">
      <div class="table-card">
        <h3>非会员档案池</h3>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>手机号</th>
              <th>来源渠道</th>
              <th>标签</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in nonMemberRows" :key="row.mobile">
              <td>{{ row.name }}</td>
              <td>{{ row.mobile }}</td>
              <td>{{ row.source }}</td>
              <td>{{ row.tag }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'fixedLevel'">
      <div class="table-card">
        <h3>固定等级名单</h3>
        <table>
          <thead>
            <tr>
              <th>会员ID</th>
              <th>会员姓名</th>
              <th>固定等级</th>
              <th>设置原因</th>
              <th>有效期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in fixedLevelRows" :key="row.memberId">
              <td>{{ row.memberId }}</td>
              <td>{{ row.memberName }}</td>
              <td>{{ row.level }}</td>
              <td>{{ row.reason }}</td>
              <td>{{ row.expiry }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'blacklist'">
      <div class="table-card">
        <h3>黑名单管理</h3>
        <table>
          <thead>
            <tr>
              <th>会员ID</th>
              <th>姓名</th>
              <th>加入原因</th>
              <th>操作来源</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in blacklistRows" :key="row.memberId">
              <td>{{ row.memberId }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.reason }}</td>
              <td>{{ row.addedBy }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'memberChangeLog'">
      <div class="table-card">
        <h3>会员信息变更记录</h3>
        <table>
          <thead>
            <tr>
              <th>变更时间</th>
              <th>字段</th>
              <th>变更前</th>
              <th>变更后</th>
              <th>操作人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in memberChangeRows" :key="row.time + row.field">
              <td>{{ row.time }}</td>
              <td>{{ row.field }}</td>
              <td>{{ row.before }}</td>
              <td>{{ row.after }}</td>
              <td>{{ row.operator }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'points'">
      <div class="metric-grid">
        <div class="metric-card">
          <p>累计发放积分</p>
          <h3>5,892,320</h3>
          <span>本月 +3.1%</span>
        </div>
        <div class="metric-card">
          <p>累计消耗积分</p>
          <h3>4,738,110</h3>
          <span>本月 +2.4%</span>
        </div>
        <div class="metric-card">
          <p>当前积分池</p>
          <h3>1,154,210</h3>
          <span>可用于活动运营</span>
        </div>
        <div class="metric-card">
          <p>异常积分预警</p>
          <h3>12</h3>
          <span>待人工复核</span>
        </div>
      </div>
      <div class="table-card">
        <h3>积分流水</h3>
        <table>
          <thead>
            <tr>
              <th>会员ID</th>
              <th>变更类型</th>
              <th>积分变动</th>
              <th>变更后余额</th>
              <th>关联单号</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in pointsRows" :key="row.ref">
              <td>{{ row.memberId }}</td>
              <td>{{ row.changeType }}</td>
              <td>{{ row.points }}</td>
              <td>{{ row.balance }}</td>
              <td>{{ row.ref }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'coupon'">
      <div class="table-card">
        <h3>优惠券台账</h3>
        <table>
          <thead>
            <tr>
              <th>券号</th>
              <th>券名称</th>
              <th>券类型</th>
              <th>状态</th>
              <th>到期日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in couponRows" :key="row.couponNo">
              <td>{{ row.couponNo }}</td>
              <td>{{ row.couponName }}</td>
              <td>{{ row.type }}</td>
              <td>{{ row.status }}</td>
              <td>{{ row.expire }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'storedValue'">
      <div class="table-card">
        <h3>储值流水</h3>
        <table>
          <thead>
            <tr>
              <th>流水号</th>
              <th>类型</th>
              <th>金额</th>
              <th>渠道</th>
              <th>余额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in storedValueRows" :key="row.txnNo">
              <td>{{ row.txnNo }}</td>
              <td>{{ row.type }}</td>
              <td>{{ row.amount }}</td>
              <td>{{ row.channel }}</td>
              <td>{{ row.balance }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'marketing'">
      <div class="table-card">
        <h3>营销活动成效</h3>
        <table>
          <thead>
            <tr>
              <th>活动名称</th>
              <th>目标客群</th>
              <th>触达方式</th>
              <th>转化率</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in marketingRows" :key="row.campaign">
              <td>{{ row.campaign }}</td>
              <td>{{ row.segment }}</td>
              <td>{{ row.touch }}</td>
              <td>{{ row.conv }}</td>
              <td>{{ row.result }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'pricing'">
      <div class="table-card">
        <h3>协议价格规则表</h3>
        <table>
          <thead>
            <tr>
              <th>协议类型</th>
              <th>房型</th>
              <th>平日价</th>
              <th>周末价</th>
              <th>不可用规则</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in pricingRows" :key="row.channel + row.roomType">
              <td>{{ row.channel }}</td>
              <td>{{ row.roomType }}</td>
              <td>{{ row.weekday }}</td>
              <td>{{ row.weekend }}</td>
              <td>{{ row.blackout }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'invoice'">
      <div class="table-card">
        <h3>发票配置清单</h3>
        <table>
          <thead>
            <tr>
              <th>抬头/主体</th>
              <th>发票类型</th>
              <th>税率</th>
              <th>开票周期</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in invoiceRows" :key="row.title">
              <td>{{ row.title }}</td>
              <td>{{ row.type }}</td>
              <td>{{ row.taxRate }}</td>
              <td>{{ row.cycle }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'orderHistory'">
      <div class="table-card">
        <h3>历史订单追踪</h3>
        <table>
          <thead>
            <tr>
              <th>订单号</th>
              <th>客户主体</th>
              <th>订单金额</th>
              <th>入住日期</th>
              <th>订单状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in historyOrderRows" :key="row.no">
              <td>{{ row.no }}</td>
              <td>{{ row.customer }}</td>
              <td>{{ row.total }}</td>
              <td>{{ row.checkin }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageDetailKind === 'log'">
      <div class="table-card">
        <h3>操作日志</h3>
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>操作人</th>
              <th>动作</th>
              <th>执行结果</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in logRows" :key="row.time + row.action">
              <td>{{ row.time }}</td>
              <td>{{ row.user }}</td>
              <td>{{ row.action }}</td>
              <td>{{ row.result }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageKind === 'member'">
      <div class="dual-grid">
        <div class="panel-card">
          <h3>会员画像</h3>
          <p>会员ID: M-20394481</p>
          <p>姓名: 王女士 | 手机: 138****6699</p>
          <div class="tag-row">
            <span v-for="tag in memberTags" :key="tag" class="soft-tag">{{ tag }}</span>
          </div>
        </div>
        <div class="panel-card">
          <h3>最近沟通记录</h3>
          <ul class="timeline">
            <li>03-28 回访: 关注五一亲子产品，已发送报价。</li>
            <li>03-21 投诉处理: 订单发票信息已修复。</li>
            <li>03-10 会员活动: 参与积分兑换活动。</li>
          </ul>
        </div>
      </div>
      <div class="table-card">
        <h3>订单信息</h3>
        <table>
          <thead>
            <tr>
              <th>订单号</th>
              <th>产品</th>
              <th>金额</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in orderRows" :key="row.orderNo">
              <td>{{ row.orderNo }}</td>
              <td>{{ row.product }}</td>
              <td>{{ row.amount }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageKind === 'archive'">
      <div class="table-card">
        <h3>档案台账</h3>
        <table>
          <thead>
            <tr>
              <th>档案名称</th>
              <th>协议信息</th>
              <th>发票规则</th>
              <th>合作级别</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in archiveRows" :key="row.name">
              <td>{{ row.name }}</td>
              <td>{{ row.contract }}</td>
              <td>{{ row.invoice }}</td>
              <td>{{ row.level }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageKind === 'operation'">
      <div class="panel-card">
        <h3>会员操作流程</h3>
        <ol class="flow-list">
          <li v-for="step in actionSteps" :key="step">{{ step }}</li>
        </ol>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageKind === 'report'">
      <div class="table-card">
        <h3>经营报表摘要</h3>
        <table>
          <thead>
            <tr>
              <th>分析维度</th>
              <th>核心指标</th>
              <th>指标值</th>
              <th>占比/变化</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in reportRows" :key="row.dim">
              <td>{{ row.dim }}</td>
              <td>{{ row.metric }}</td>
              <td>{{ row.value }}</td>
              <td>{{ row.ratio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else-if="pageKind === 'settings'">
      <div class="table-card">
        <h3>系统设置项</h3>
        <table>
          <thead>
            <tr>
              <th>配置项</th>
              <th>责任团队</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in settingRows" :key="row.name">
              <td>{{ row.name }}</td>
              <td>{{ row.owner }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="demo-zone" v-else>
      <div class="panel-card">该页面属于流程节点页，建议演示时通过下方“页面跳转”进入上下游页面串讲业务流程。</div>
    </section>

  </article>

  <article v-else class="page-card">
    <h1>页面不存在</h1>
    <p>请从左侧导航选择页面进行演示。</p>
  </article>
</template>
