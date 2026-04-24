export interface FunctionAction {
  name: string;
  desc: string;
  status: string;
}

export interface FunctionSecondMenu {
  name: string;
  slug: string;
  status: string;
  optimize: string;
  actions: FunctionAction[];
}

export interface FunctionFirstMenu {
  name: string;
  children: FunctionSecondMenu[];
}

export const functionMenus: FunctionFirstMenu[] = [
  {
    "name": "Login 登录",
    "children": [
      {
        "name": "SSO登录",
        "slug": "fn-1",
        "status": "已完成",
        "optimize": "",
        "actions": []
      },
      {
        "name": "企业微信扫码登录",
        "slug": "fn-2",
        "status": "已完成",
        "optimize": "",
        "actions": []
      },
      {
        "name": "第三方SSO登录",
        "slug": "fn-3",
        "status": "已完成",
        "optimize": "",
        "actions": []
      },
      {
        "name": "系统语言选择",
        "slug": "fn-4",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "中文、英文",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "组织架构选择",
        "slug": "fn-5",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "选择具体门店",
            "desc": "",
            "status": "已完成"
          }
        ]
      }
    ]
  },
  {
    "name": "Dashboard 系统看板",
    "children": [
      {
        "name": "会员数据统计",
        "slug": "dashboard____",
        "status": "已完成",
        "optimize": "按年，月，周",
        "actions": [
          {
            "name": "会员总数",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "今日新增会员量",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增会员总趋势图",
            "desc": "按年，月，周",
            "status": "已完成"
          },
          {
            "name": "会员消费金额总趋势图",
            "desc": "按年，月，周",
            "status": "已完成"
          },
          {
            "name": "会员等级分布图",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "会员状态分布图",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "..",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "积分数据统计",
        "slug": "积分",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "全部积分发放总量",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "今日积分发放量",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "当前积分总使用量",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "今日积分使用量",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "累计已使用积分",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "...",
            "desc": "",
            "status": "已完成"
          }
        ]
      }
    ]
  },
  {
    "name": "Member 会员档案",
    "children": [
      {
        "name": "会员信息",
        "slug": "会员",
        "status": "已完成",
        "optimize": "参见盟广，结合PMS的字段信息，都是基于档案来延展的信息",
        "actions": [
          {
            "name": "查询会员信息",
            "desc": "参见盟广，结合PMS的字段信息，都是基于档案来延展的信息",
            "status": "已完成"
          },
          {
            "name": "新增会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "编辑会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "会员标签",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "升级会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "降级会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "冻结会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "注销会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "加入黑名单",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "合并会员账号信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "重置密码",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "固定等级",
            "desc": "设置为永久等级",
            "status": "已完成"
          },
          {
            "name": "导出会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "批量导入",
            "desc": "暂不处理",
            "status": "已完成"
          },
          {
            "name": "变更记录",
            "desc": "查看会员信息的变更记录",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "会员卡管理",
        "slug": "fn-9",
        "status": "已完成",
        "optimize": "查询会员卡的信息，对其进行操作",
        "actions": [
          {
            "name": "查询会员卡",
            "desc": "查询会员卡的信息，对其进行操作",
            "status": "已完成"
          },
          {
            "name": "发卡",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "挂失会员卡",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "恢复会员卡",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "冻结会员卡",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "黑名单管理",
        "slug": "黑名单管理",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "查询黑名单会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "添加黑名单",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "解除黑名单",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "会员卡变更记录",
        "slug": "会员信息变更记录",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "查询会员卡的变更历史",
            "desc": "",
            "status": "已完成"
          }
        ]
      }
    ]
  },
  {
    "name": "用户画像",
    "children": [
      {
        "name": "画像标签查询列表",
        "slug": "fn-12",
        "status": "未开始",
        "optimize": "",
        "actions": []
      },
      {
        "name": "画像标签分类",
        "slug": "fn-13",
        "status": "未开始",
        "optimize": "建画像的标签组，标签的顺序",
        "actions": []
      },
      {
        "name": "批量打标签功能",
        "slug": "fn-14",
        "status": "未开始",
        "optimize": "批量给会员、非会员打标签",
        "actions": []
      }
    ]
  },
  {
    "name": "积分",
    "children": [
      {
        "name": "会员积分",
        "slug": "积分",
        "status": "未开始",
        "optimize": "积分获取记录、积分消费记录",
        "actions": [
          {
            "name": "查询会员积分",
            "desc": "积分获取记录、积分消费记录",
            "status": "未开始"
          },
          {
            "name": "添加积分",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "扣除积分",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "积分导入",
        "slug": "fn-16",
        "status": "未开始",
        "optimize": "通过模版批量导入（手机号、过期时间、添加原因、积分类型、积分、订单编号、酒店编号、备注），默认24个有效期；委管酒店，是没跟他们PMS对接的，所以这些订单要进去导入，计算积分；",
        "actions": []
      },
      {
        "name": "订单积分检查",
        "slug": "fn-17",
        "status": "未开始",
        "optimize": "待定",
        "actions": [
          {
            "name": "查询订单获得的积分数据（有效、无效）",
            "desc": "待定",
            "status": "未开始"
          }
        ]
      }
    ]
  },
  {
    "name": "储值- P1",
    "children": [
      {
        "name": "会员储值",
        "slug": "储值",
        "status": "未开始",
        "optimize": "查询储值记录、会员的储值卡消费记录",
        "actions": [
          {
            "name": "查询会员的储值记录及消费记录",
            "desc": "查询储值记录、会员的储值卡消费记录",
            "status": "未开始"
          },
          {
            "name": "充值",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "消费",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "编辑",
            "desc": "调整储值过期时间",
            "status": "未开始"
          },
          {
            "name": "反冲",
            "desc": "反冲掉储值金额",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "储值活动管理",
        "slug": "fn-19",
        "status": "未开始",
        "optimize": "支持到预览样式，充值档位、赠送的储值、赠送等级、赠送积分（积分的有效期）、赠送的优惠券、活动说明",
        "actions": [
          {
            "name": "查询活动",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "新增储值活动",
            "desc": "支持到预览样式，充值档位、赠送的储值、赠送等级、赠送积分（积分的有效期）、赠送的优惠券、活动说明",
            "status": "未开始"
          },
          {
            "name": "编辑储值活动",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "推广储值活动",
            "desc": "复制推广链接、下载推广二维码（进行中的活动才有）",
            "status": "未开始"
          },
          {
            "name": "终止活动",
            "desc": "进行中的活动才有",
            "status": "未开始"
          },
          {
            "name": "删除活动",
            "desc": "删除的动作，都要二次确认才能删除，软删。",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "批量制卡储值",
        "slug": "fn-20",
        "status": "未开始",
        "optimize": "通过模版，会员号，会员卡号，储值金额，赠送金额，批量导入储值金额",
        "actions": []
      },
      {
        "name": "储值卡类型管理",
        "slug": "fn-21",
        "status": "未开始",
        "optimize": "待定；一人一卡的模式，只有一种。待定，每个酒店集团只有一种会员卡类型",
        "actions": [
          {
            "name": "会员卡类型",
            "desc": "待定；一人一卡的模式，只有一种。待定，每个酒店集团只有一种会员卡类型",
            "status": "未开始"
          }
        ]
      }
    ]
  },
  {
    "name": "营销- P1",
    "children": [
      {
        "name": "会员细分",
        "slug": "fn-22",
        "status": "未开始",
        "optimize": "设置细分的名称，日期，细分的条件规则",
        "actions": [
          {
            "name": "查询会员细分群体记录",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "新增会员细分",
            "desc": "设置细分的名称，日期，细分的条件规则",
            "status": "未开始"
          },
          {
            "name": "编辑会员细分",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "重新计算会员细分",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "删除会员细分",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "营销模板",
        "slug": "fn-23",
        "status": "未开始",
        "optimize": "短信、邮件、微信、模板信息的内容；\n支持添加积分，优惠券的发放模板，如发放多少积分，发放多少优惠券等；",
        "actions": [
          {
            "name": "查询营销模板信息",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "新增模板",
            "desc": "短信、邮件、微信、模板信息的内容；\n支持添加积分，优惠券的发放模板，如发放多少积分，发放多少优惠券等；",
            "status": "未开始"
          },
          {
            "name": "编辑模板",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "删除模板",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "会员营销",
        "slug": "营销",
        "status": "未开始",
        "optimize": "执行时间，细分人群，执行内容等，添加多个营销模板",
        "actions": [
          {
            "name": "查询营销活动记录",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "新增营销活动",
            "desc": "执行时间，细分人群，执行内容等，添加多个营销模板",
            "status": "未开始"
          },
          {
            "name": "查看营销活动执行明细",
            "desc": "查看执行的人数统计，具体的会员信息",
            "status": "未开始"
          },
          {
            "name": "编辑营销活动",
            "desc": "未执行，可编辑执行的开始结束时间等",
            "status": "未开始"
          },
          {
            "name": "删除营销活动",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "事件营销",
        "slug": "营销-2",
        "status": "未开始",
        "optimize": "会员住店周期事件、会员生命周期事件、会员资产变动事件\n不同类型的时间，执行内容可添加多个营销模板，如短信，发放积分，券等等；（升级送券等的）",
        "actions": [
          {
            "name": "查询各分类事件营销活动",
            "desc": "会员住店周期事件、会员生命周期事件、会员资产变动事件\n不同类型的时间，执行内容可添加多个营销模板，如短信，发放积分，券等等；（升级送券等的）",
            "status": "未开始"
          },
          {
            "name": "新增事件营销活动",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "查看营销活动执行明细",
            "desc": "查看执行的人数统计信息",
            "status": "未开始"
          },
          {
            "name": "编辑事件营销活动",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "删除事件营销活动",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "素材库-P1",
        "slug": "fn-26",
        "status": "未开始",
        "optimize": "",
        "actions": [
          {
            "name": "新增、删除",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "会员赠卡-P1",
        "slug": "fn-27",
        "status": "未开始",
        "optimize": "查看赠卡报表等",
        "actions": [
          {
            "name": "查询赠卡活动",
            "desc": "查看赠卡报表等",
            "status": "未开始"
          },
          {
            "name": "新增赠卡活动",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "编辑赠卡活动",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "删除赠卡活动",
            "desc": "",
            "status": "未开始"
          }
        ]
      }
    ]
  },
  {
    "name": "优惠券",
    "children": [
      {
        "name": "优惠券分类",
        "slug": "fn-28",
        "status": "已完成",
        "optimize": "分类名称，编码，启用，禁用",
        "actions": [
          {
            "name": "查看分类列表",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增优惠券分类",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "编辑优惠券分类",
            "desc": "分类名称，编码，启用，禁用",
            "status": "已完成"
          },
          {
            "name": "删除优惠券分类",
            "desc": "已被使用的不用删除，只能禁用",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "优惠券模板-P1",
        "slug": "fn-29",
        "status": "已完成",
        "optimize": "前期可用 复制新增的快捷操作平替",
        "actions": [
          {
            "name": "自定义模板",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "模板快速创建入口",
            "desc": "前期可用 复制新增的快捷操作平替",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "优惠券信息",
        "slug": "优惠券",
        "status": "已完成",
        "optimize": "查看优惠券的状态，发放情况",
        "actions": [
          {
            "name": "查询优惠券信息",
            "desc": "查看优惠券的状态，发放情况",
            "status": "已完成"
          },
          {
            "name": "编辑优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "复制新增优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "启用优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "禁用优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增内部券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增外部券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "导出优惠券",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "优惠券券包",
        "slug": "优惠券-2",
        "status": "已完成",
        "optimize": "支持多张优惠券打包",
        "actions": [
          {
            "name": "券包列表查询",
            "desc": "支持多张优惠券打包",
            "status": "已完成"
          },
          {
            "name": "新增券包",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "上架券包",
            "desc": "上架的券包，才能在【券包绑定】中展示，绑定到会员",
            "status": "已完成"
          },
          {
            "name": "下架券包",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "编辑券包",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除券包",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "批量绑定优惠券",
        "slug": "fn-32",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "查询导入记录",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "下载模板",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "查看绑定明细",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "优惠券发放明细",
        "slug": "优惠券-3",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "查询优惠券发放明细",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "转赠优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "延期优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "撤销优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "核销优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "批量延期优惠券",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "导出优惠券发放明细",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "优惠券操作历史",
        "slug": "fn-34",
        "status": "已完成",
        "optimize": "反核销等等；",
        "actions": [
          {
            "name": "查询优惠券操作信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "优惠券延期历史",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "优惠券核销历史",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "优惠券撤销历史",
            "desc": "反核销等等；",
            "status": "已完成"
          }
        ]
      }
    ]
  },
  {
    "name": "档案",
    "children": [
      {
        "name": "散客-非会员",
        "slug": "非会员档案",
        "status": "已完成",
        "optimize": "目前是在单店管理",
        "actions": [
          {
            "name": "查询非会员信息",
            "desc": "目前是在单店管理",
            "status": "已完成"
          },
          {
            "name": "新增非会员信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "编辑非会员信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除非会员信息",
            "desc": "注意权限控制，软删",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "公司",
        "slug": "公司档案",
        "status": "已完成",
        "optimize": "参考PMS的档案中心内容字段，增加画像的内容展示，后续增加AI分析的板块",
        "actions": [
          {
            "name": "查询公司信息",
            "desc": "参考PMS的档案中心内容字段，增加画像的内容展示，后续增加AI分析的板块",
            "status": "已完成"
          },
          {
            "name": "新增公司信息",
            "desc": "小程序后台- 企业预订",
            "status": "已完成"
          },
          {
            "name": "编辑公司信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "查看下挂会员",
            "desc": "新增-小程序，回传，打标-订房人；",
            "status": "已完成"
          },
          {
            "name": "绑定会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "解绑会员",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "上传附件信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除公司信息",
            "desc": "注意权限控制",
            "status": "已完成"
          },
          {
            "name": "合并公司信息",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "中介",
        "slug": "中介档案",
        "status": "已完成",
        "optimize": "佣金设置",
        "actions": [
          {
            "name": "查询中介信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增中介",
            "desc": "佣金设置",
            "status": "已完成"
          },
          {
            "name": "编辑中介",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "上传附件信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除中介信息",
            "desc": "注意权限控制",
            "status": "已完成"
          },
          {
            "name": "合并中介信息",
            "desc": "",
            "status": "已完成"
          }
        ]
      }
    ]
  },
  {
    "name": "设置",
    "children": [
      {
        "name": "会员等级维护",
        "slug": "设置",
        "status": "已完成",
        "optimize": "✅",
        "actions": [
          {
            "name": "查看等级",
            "desc": "✅",
            "status": "已完成"
          },
          {
            "name": "等级排序",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增等级",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "关联权益",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "修改等级",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除等级",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "主动升级设置",
        "slug": "fn-39",
        "status": "已完成",
        "optimize": "启用，禁用",
        "actions": [
          {
            "name": "查看升级配置信息",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增升级配置",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "查看",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "修改",
            "desc": "启用，禁用",
            "status": "已完成"
          },
          {
            "name": "删除",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "等级规则维护",
        "slug": "fn-40",
        "status": "已完成",
        "optimize": "升级需要的条件，间夜量，消费金额配置 ✅",
        "actions": [
          {
            "name": "查看等级规则列表",
            "desc": "升级需要的条件，间夜量，消费金额配置 ✅",
            "status": "已完成"
          },
          {
            "name": "新增等级规则",
            "desc": "升级，降级，保级的配置",
            "status": "已完成"
          },
          {
            "name": "修改等级规则",
            "desc": "启用，禁用",
            "status": "已完成"
          },
          {
            "name": "删除等级规则",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "积分规则维护",
        "slug": "fn-41",
        "status": "已完成",
        "optimize": "通用积分规则；",
        "actions": [
          {
            "name": "查询积分规则列表",
            "desc": "通用积分规则；",
            "status": "已完成"
          },
          {
            "name": "新增积分规则",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "修改积分规则",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "查看积分规则",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除积分规则",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "有效间夜规则维护",
        "slug": "fn-42",
        "status": "已完成",
        "optimize": "",
        "actions": [
          {
            "name": "查询间夜规则列表",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增间夜有效规则",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "查看",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "修改",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "会员偏好设置= 用户画像标签",
        "slug": "fn-43",
        "status": "已完成",
        "optimize": "等同于 用户画像标签管理,在用户画像统一管理",
        "actions": [
          {
            "name": "会员偏好查询",
            "desc": "等同于 用户画像标签管理,在用户画像统一管理",
            "status": "已完成"
          },
          {
            "name": "新增会员偏好",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "修改会员偏好",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "排序",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增偏好大类",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "会员权益设置",
        "slug": "fn-44",
        "status": "已完成",
        "optimize": "✅",
        "actions": [
          {
            "name": "会员权益大类查询",
            "desc": "✅",
            "status": "已完成"
          },
          {
            "name": "新增会员权益大类",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "查看会员权益",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "新增会员权益",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "修改会员权益",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "删除会员权益",
            "desc": "",
            "status": "已完成"
          }
        ]
      },
      {
        "name": "数据字典配置",
        "slug": "fn-45",
        "status": "已完成",
        "optimize": "放到配置中心研发，由配置中心团队开发",
        "actions": [
          {
            "name": "积分获取方式",
            "desc": "放到配置中心研发，由配置中心团队开发",
            "status": "已完成"
          },
          {
            "name": "积分扣除方式",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "等级变化原因",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "间夜获取方式",
            "desc": "",
            "status": "已完成"
          },
          {
            "name": "...",
            "desc": "",
            "status": "已完成"
          }
        ]
      }
    ]
  },
  {
    "name": "报表",
    "children": [
      {
        "name": "小分类",
        "slug": "fn-46",
        "status": "未开始",
        "optimize": "报表字段，业务提供，增加可视化图标，方便业务使用",
        "actions": [
          {
            "name": "具体报表",
            "desc": "报表字段，业务提供，增加可视化图标，方便业务使用",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "订房人",
        "slug": "fn-47",
        "status": "未开始",
        "optimize": "订房人（一定是下挂公司）， 活动策划者的分类，积分规则；",
        "actions": [
          {
            "name": "会员，积分规则；标记",
            "desc": "订房人（一定是下挂公司）， 活动策划者的分类，积分规则；",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "活动策划者",
        "slug": "fn-48",
        "status": "未开始",
        "optimize": "后续：促销积分规则；前置条件判定， 多间夜，获取相应的积分",
        "actions": [
          {
            "name": "标记",
            "desc": "后续：促销积分规则；前置条件判定， 多间夜，获取相应的积分",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "系统的组织架构",
        "slug": "fn-49",
        "status": "未开始",
        "optimize": "",
        "actions": [
          {
            "name": "总部、单店，经理，财务看具体的报表信息",
            "desc": "",
            "status": "未开始"
          },
          {
            "name": "结合业务提供的表格；",
            "desc": "",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "线下Wi-Fi获客",
        "slug": "fn-50",
        "status": "未开始",
        "optimize": "支持到调用会员注册接口就行",
        "actions": [
          {
            "name": "注册会员",
            "desc": "支持到调用会员注册接口就行",
            "status": "未开始"
          }
        ]
      },
      {
        "name": "数据迁移",
        "slug": "fn-51",
        "status": "未开始",
        "optimize": "",
        "actions": []
      }
    ]
  }
];

export const flatFunctionMenus = () => functionMenus.flatMap((f) => f.children);
