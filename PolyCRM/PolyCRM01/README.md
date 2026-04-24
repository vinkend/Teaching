# 保利会员管理系统 - 前端演示版

## 项目说明
- 基于 `保利会员管理系统.zip` 原型站点结构生成。
- 使用 Vue 3 + Vue Router 搭建。
- 左侧树形导航对应原型页面层级（55 个页面节点）。
- 页面内提供三类业务跳转：上级页面、子页面、同级常用页面，便于业务演示。

## 启动方式
```bash
npm install
npm run dev
```

## 重新同步原型站点树（可选）
当原型更新后可执行：
```bash
npm run gen:sitemap
```

脚本会读取：`prototype_axure/保利会员管理系统/data/document.js`，并刷新 `src/data/sitemap.ts`。
