# PolyCRM（Vue 版）

统一使用 **Vue 3** 技术栈实现 CRM 后台系统，不使用 React。

## 技术栈
- Vue 3 + TypeScript
- Vite
- vue-router
- Tailwind CSS

## 功能模块（基于原型语义）
- 会员管理
- 会员等级设置
- 积分管理
- 优惠券管理
- 会员权益设置
- 标签分类管理
- 仪表盘

每个业务模块均包含：
- 列表页（筛选 + 表格 + 分页）
- 详情页
- 表单页（新增/编辑）

## 本地运行
```bash
npm install
npm run dev
```

## 构建
```bash
npm run build
```

## 关键目录
- `src/layouts`：后台布局（左侧菜单 + 顶部栏）
- `src/router`：路由配置（vue-router）
- `src/views`：模块页面
- `src/components/ui`：通用 UI 组件
- `src/mock`：Mock 数据
- `src/lib/crm.ts`：模块元数据与关联关系处理
