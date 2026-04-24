import fs from 'node:fs';
import vm from 'node:vm';

const source = 'prototype_axure/保利会员管理系统/data/document.js';
const code = fs.readFileSync(source, 'utf8');
let doc = null;
const sandbox = {
  $axure: {
    loadDocument(obj) {
      doc = obj;
    }
  }
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const rootNodes = doc?.sitemap?.rootNodes ?? [];

const toSlug = (url) => (url ? url.replace(/\.html$/i, '') : 'folder');

const normalizeNode = (node, parentUrl = null, depth = 0) => {
  const url = node.url || `folder-${node.id}`;
  return {
    id: node.id,
    name: node.pageName,
    url,
    slug: toSlug(url),
    type: node.type,
    depth,
    parentUrl,
    children: (node.children || []).map((child) => normalizeNode(child, url, depth + 1))
  };
};

const tree = rootNodes.map((n) => normalizeNode(n));

const lines = [];
lines.push('export interface SiteMapNode {');
lines.push('  id: string;');
lines.push('  name: string;');
lines.push('  url: string;');
lines.push('  slug: string;');
lines.push('  type: string;');
lines.push('  depth: number;');
lines.push('  parentUrl: string | null;');
lines.push('  children: SiteMapNode[];');
lines.push('}');
lines.push('');
lines.push('export const siteMapTree: SiteMapNode[] = ' + JSON.stringify(tree, null, 2) + ';');

lines.push('');
lines.push('export const flattenSiteMap = (nodes: SiteMapNode[]): SiteMapNode[] => {');
lines.push('  const arr: SiteMapNode[] = [];');
lines.push('  const walk = (items: SiteMapNode[]) => {');
lines.push('    items.forEach((item) => {');
lines.push('      arr.push(item);');
lines.push('      if (item.children.length) walk(item.children);');
lines.push('    });');
lines.push('  };');
lines.push('  walk(nodes);');
lines.push('  return arr;');
lines.push('};');

fs.writeFileSync('src/data/sitemap.ts', lines.join('\n'));
console.log('generated src/data/sitemap.ts');
