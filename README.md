# Codex UI For Obsidian

面向 Obsidian 的简洁主题，提供深浅配色、七彩文件夹、紧凑的 Markdown 排版和悬浮功能区。当前版本 **2.5.1**，最低需要 Obsidian **1.6.0**。

配套增强插件：[Better Obsidian](https://github.com/Plantforlife/better-obsidian)，提供自动源码 / 阅读双栏、平滑同步滚动、文档分割和文件列表增强。主题可独立使用；悬浮功能区的文件列表可见性识别由配套插件提供。

## 安装

1. 从 [Releases](https://github.com/Plantforlife/Codex-UI-For-Obsidian/releases/latest) 下载 `theme.css` 和 `manifest.json`。
2. 在笔记库中新建 `.obsidian/themes/Codex UI For Obsidian/`，将两个文件放入该目录。
3. 在 Obsidian「设置 → 外观 → 主题」中选择 **Codex UI For Obsidian**。

浅色 / 深色随 Obsidian 的基础颜色切换。安装并启用 **Style Settings** 后，可在「设置 → Style Settings → Codex UI For Obsidian」调整主题选项。

## 特点

- 灰阶界面、系统字体，无需下载外部字体。
- 正文基准 16px、宽度 728px、行高 1.5；阅读、源码和实时预览共享主要排版设置。
- H1 / H2 / H3 使用 28 / 24 / 20px，H4–H6 使用 16px；支持调整正文、段落和标题间距。
- 七彩文件夹按同级顺序循环配色，支持柔和色块、简约图标、描边色条三种样式。
- 文件夹配色支持奶油、莫兰迪、鲜明、自定义，分别提供深浅色板。
- 代码高亮提供奶油、GitHub、One、Catppuccin、单色预设，代码块支持语言标签和自动换行。
- 左侧悬浮功能区、文件图标、文件夹缩进线和设置界面间距可调整。
- 保留 Obsidian 原生方框复选框、任务交互、数学公式、Mermaid、内部链接和 Callout。

文件夹颜色取决于同级位置，调整排序或新增文件夹会改变后续颜色。纯 CSS 无法让阅读视图逐处还原源码空行，复杂内容仍由 Obsidian 渲染。

## 开发

需要 Node.js 18 或更高版本，无需安装 npm 依赖。

```sh
node build.cjs
```

此命令仅在项目目录生成 `theme.css`，不会修改本机笔记库。源码按职责放在 `src/`，包括设置元数据、配色、工作区、功能区、文件列表、设置布局和 Markdown 排版。

仓库保留了当前安装版本对任务复选框的调整，重新构建的 CSS 与上传时的已安装版本一致。

### 从 2.3 迁移 Style Settings 配置

先关闭 Style Settings 插件，再指定其配置文件运行：

```sh
node migrate-settings.cjs "/path/to/vault/.obsidian/plugins/obsidian-style-settings/data.json"
```

迁移会保留已有配置，将旧的深浅色变量转换为独立变量，并转换文件夹色条开关。需要修改时，原文件会在同目录备份；已有新变量优先，重复运行不会重复修改。完成后重新启用 Style Settings。

## 设计参考

界面与正文样式参考 OpenAI / ChatGPT 的设计语言；排版间距参考 [Minimal](https://github.com/kepano/obsidian-minimal) 与 [Things](https://github.com/colineckert/obsidian-things)，七彩文件夹参考 [AnuPpuccin](https://github.com/AnubisNekhet/AnuPpuccin) 与 Minimal。这里的数值和实现是本主题的调整。

这是独立的社区主题，与 OpenAI 没有隶属关系。
