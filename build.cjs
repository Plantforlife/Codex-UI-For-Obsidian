const fs = require('node:fs');
const path = require('node:path');

// The installed theme remains a standalone CSS theme; this builder needs only Node.
const sourceDir = path.join(__dirname, 'src');
const sections = ['settings.css', 'tokens.css', 'workspace.css', 'ribbon.css', 'folders.css', 'style-settings.css', 'markdown.css'];
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
const languages = {
  javascript: ['javascript', 'js'],
  typescript: ['typescript', 'ts'],
  jsx: ['jsx'], tsx: ['tsx'], python: ['python', 'py'],
  css: ['css'], scss: ['scss'], less: ['less'], html: ['html', 'markup'],
  xml: ['xml'], svg: ['svg'], json: ['json'], jsonc: ['jsonc'],
  bash: ['bash', 'sh', 'shell'], powershell: ['powershell', 'ps1'],
  sql: ['sql'], yaml: ['yaml', 'yml'], toml: ['toml'], ini: ['ini'],
  markdown: ['markdown', 'md'], diff: ['diff'], text: ['text', 'txt', 'plaintext'],
  c: ['c'], cpp: ['cpp', 'c++'], csharp: ['csharp', 'cs'],
  java: ['java'], kotlin: ['kotlin', 'kt'], go: ['go'], rust: ['rust', 'rs'],
  ruby: ['ruby', 'rb'], php: ['php'], swift: ['swift'], dart: ['dart'],
  r: ['r'], lua: ['lua'], dockerfile: ['dockerfile', 'docker'],
  graphql: ['graphql'], latex: ['latex', 'tex'], vue: ['vue'], svelte: ['svelte']
};
const labels = Object.entries(languages).map(([label, aliases]) => {
  const selectors = aliases.flatMap(alias => [
    `.markdown-rendered pre:has(> code.language-${alias.replaceAll('+', '\\+')})`,
    `.markdown-rendered pre.language-${alias.replaceAll('+', '\\+')}`
  ]).join(',\n');
  return `${selectors} { --codex-code-language: "${label}"; }`;
}).join('\n\n');
const css = `/* Codex ${manifest.version}. Generated from src; edit the source then run node build.cjs. */\n\n` +
  sections.map(file => fs.readFileSync(path.join(sourceDir, file), 'utf8').trim()).join('\n\n') +
  '\n\n/* Native fenced-code labels, including common aliases. */\n' + labels + '\n';
fs.writeFileSync(path.join(__dirname, 'theme.css'), css);
console.log(`Built Codex ${manifest.version} (${Buffer.byteLength(css)} bytes).`);
