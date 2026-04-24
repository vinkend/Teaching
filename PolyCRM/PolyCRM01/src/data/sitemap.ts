export interface SiteMapNode {
  id: string;
  name: string;
  url: string;
  slug: string;
  type: string;
  depth: number;
  parentUrl: string | null;
  children: SiteMapNode[];
}

export const siteMapTree: SiteMapNode[] = [
  {
    "id": "9l3kbp",
    "name": "修改历史",
    "url": "修改历史.html",
    "slug": "修改历史",
    "type": "Wireframe",
    "depth": 0,
    "parentUrl": null,
    "children": []
  },
  {
    "id": "jbcjab",
    "name": "概述",
    "url": "概述.html",
    "slug": "概述",
    "type": "Wireframe",
    "depth": 0,
    "parentUrl": null,
    "children": []
  },
  {
    "id": "7crxrx",
    "name": "CRM功能清单",
    "url": "crm功能清单.html",
    "slug": "crm功能清单",
    "type": "Wireframe",
    "depth": 0,
    "parentUrl": null,
    "children": []
  },
  {
    "id": "",
    "name": "会员管理系统",
    "url": "folder-",
    "slug": "folder-",
    "type": "Folder",
    "depth": 0,
    "parentUrl": null,
    "children": [
      {
        "id": "36zulb",
        "name": "登录",
        "url": "登录.html",
        "slug": "登录",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "t8deh1",
        "name": "Dashboard系统看板",
        "url": "dashboard____.html",
        "slug": "dashboard____",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "w8nf09",
        "name": "会员",
        "url": "会员.html",
        "slug": "会员",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": [
          {
            "id": "ipjum6",
            "name": "新增会员",
            "url": "新增会员.html",
            "slug": "新增会员",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "会员.html",
            "children": [
              {
                "id": "zejw68",
                "name": "用户画像",
                "url": "用户画像.html",
                "slug": "用户画像",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "新增会员.html",
                "children": []
              },
              {
                "id": "9poako",
                "name": "地址及发票",
                "url": "地址及发票.html",
                "slug": "地址及发票",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "新增会员.html",
                "children": []
              },
              {
                "id": "dhayst",
                "name": "家庭成员",
                "url": "家庭成员.html",
                "slug": "家庭成员",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "新增会员.html",
                "children": []
              },
              {
                "id": "vt3hca",
                "name": "更多通讯",
                "url": "更多通讯.html",
                "slug": "更多通讯",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "新增会员.html",
                "children": []
              }
            ]
          },
          {
            "id": "icr6ik",
            "name": "编辑会员",
            "url": "编辑会员.html",
            "slug": "编辑会员",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "会员.html",
            "children": []
          },
          {
            "id": "qnspfc",
            "name": "查看会员信息",
            "url": "查看会员信息.html",
            "slug": "查看会员信息",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "会员.html",
            "children": [
              {
                "id": "c92lct",
                "name": "用户画像",
                "url": "用户画像_1.html",
                "slug": "用户画像_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "查看会员信息.html",
                "children": []
              },
              {
                "id": "ycyppi",
                "name": "会员订单",
                "url": "会员订单.html",
                "slug": "会员订单",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "查看会员信息.html",
                "children": []
              },
              {
                "id": "repo6t",
                "name": "地址及发票",
                "url": "地址及发票_1.html",
                "slug": "地址及发票_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "查看会员信息.html",
                "children": []
              },
              {
                "id": "jdempx",
                "name": "家庭成员",
                "url": "家庭成员_1.html",
                "slug": "家庭成员_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "查看会员信息.html",
                "children": []
              }
            ]
          },
          {
            "id": "w7vyd6",
            "name": "操作",
            "url": "操作.html",
            "slug": "操作",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "会员.html",
            "children": [
              {
                "id": "x8nki7",
                "name": "画像标签",
                "url": "画像标签.html",
                "slug": "画像标签",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "7wbste",
                "name": "升级",
                "url": "升级.html",
                "slug": "升级",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "040lof",
                "name": "降级",
                "url": "降级.html",
                "slug": "降级",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "7l8uc2",
                "name": "冻结",
                "url": "冻结.html",
                "slug": "冻结",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "5fpo5w",
                "name": "注销",
                "url": "注销.html",
                "slug": "注销",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "61l28u",
                "name": "加入黑名单",
                "url": "加入黑名单.html",
                "slug": "加入黑名单",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "cqqwsx",
                "name": "合并帐户",
                "url": "合并帐户.html",
                "slug": "合并帐户",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "nonwra",
                "name": "重置密码",
                "url": "重置密码.html",
                "slug": "重置密码",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              },
              {
                "id": "j68817",
                "name": "固定等级",
                "url": "固定等级.html",
                "slug": "固定等级",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "操作.html",
                "children": []
              }
            ]
          },
          {
            "id": "kybh5z",
            "name": "黑名单管理",
            "url": "黑名单管理.html",
            "slug": "黑名单管理",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "会员.html",
            "children": []
          },
          {
            "id": "61wjnn",
            "name": "会员信息变更记录",
            "url": "会员信息变更记录.html",
            "slug": "会员信息变更记录",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "会员.html",
            "children": []
          }
        ]
      },
      {
        "id": "7i2l5c",
        "name": "用户画像",
        "url": "用户画像_2.html",
        "slug": "用户画像_2",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "9g01vm",
        "name": "积分",
        "url": "积分.html",
        "slug": "积分",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "exm8ii",
        "name": "优惠券",
        "url": "优惠券.html",
        "slug": "优惠券",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "pu1ifv",
        "name": "储值",
        "url": "储值.html",
        "slug": "储值",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "l8oxvs",
        "name": "营销",
        "url": "营销.html",
        "slug": "营销",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "ohnirj",
        "name": "档案",
        "url": "档案.html",
        "slug": "档案",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": [
          {
            "id": "lsi17y",
            "name": "公司档案",
            "url": "公司档案.html",
            "slug": "公司档案",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "档案.html",
            "children": [
              {
                "id": "n6secd",
                "name": "新增公司档案",
                "url": "新增公司档案.html",
                "slug": "新增公司档案",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              },
              {
                "id": "jituol",
                "name": "协议价格",
                "url": "协议价格.html",
                "slug": "协议价格",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              },
              {
                "id": "9gjs8c",
                "name": "下挂会员（新增）",
                "url": "下挂会员（新增）.html",
                "slug": "下挂会员（新增）",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              },
              {
                "id": "hffxkr",
                "name": "附件",
                "url": "附件.html",
                "slug": "附件",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              },
              {
                "id": "mis3gv",
                "name": "发票",
                "url": "发票.html",
                "slug": "发票",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              },
              {
                "id": "r22h85",
                "name": "历史订单",
                "url": "历史订单.html",
                "slug": "历史订单",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              },
              {
                "id": "bqmw8d",
                "name": "日志",
                "url": "日志.html",
                "slug": "日志",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "公司档案.html",
                "children": []
              }
            ]
          },
          {
            "id": "h62kk2",
            "name": "中介档案",
            "url": "中介档案.html",
            "slug": "中介档案",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "档案.html",
            "children": [
              {
                "id": "w2dw9n",
                "name": "新增中介档案",
                "url": "新增中介档案.html",
                "slug": "新增中介档案",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              },
              {
                "id": "8jmlrl",
                "name": "协议价格",
                "url": "协议价格_1.html",
                "slug": "协议价格_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              },
              {
                "id": "3t70zg",
                "name": "佣金设置- （新增）P1",
                "url": "佣金设置-_（新增）p1.html",
                "slug": "佣金设置-_（新增）p1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              },
              {
                "id": "eojs1n",
                "name": "附件",
                "url": "附件_1.html",
                "slug": "附件_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              },
              {
                "id": "eqk4g0",
                "name": "发票",
                "url": "发票_1.html",
                "slug": "发票_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              },
              {
                "id": "5ecblj",
                "name": "历史订单",
                "url": "历史订单_1.html",
                "slug": "历史订单_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              },
              {
                "id": "b581b0",
                "name": "日志",
                "url": "日志_1.html",
                "slug": "日志_1",
                "type": "Wireframe",
                "depth": 3,
                "parentUrl": "中介档案.html",
                "children": []
              }
            ]
          },
          {
            "id": "ifteok",
            "name": "非会员档案",
            "url": "非会员档案.html",
            "slug": "非会员档案",
            "type": "Wireframe",
            "depth": 2,
            "parentUrl": "档案.html",
            "children": []
          }
        ]
      },
      {
        "id": "sbo5a4",
        "name": "报表",
        "url": "报表.html",
        "slug": "报表",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      },
      {
        "id": "n8u1z7",
        "name": "设置",
        "url": "设置.html",
        "slug": "设置",
        "type": "Wireframe",
        "depth": 1,
        "parentUrl": "folder-",
        "children": []
      }
    ]
  }
];

export const flattenSiteMap = (nodes: SiteMapNode[]): SiteMapNode[] => {
  const arr: SiteMapNode[] = [];
  const walk = (items: SiteMapNode[]) => {
    items.forEach((item) => {
      arr.push(item);
      if (item.children.length) walk(item.children);
    });
  };
  walk(nodes);
  return arr;
};