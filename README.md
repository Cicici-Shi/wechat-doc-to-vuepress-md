# 微信文章转 vuepress-md 文档

## 简介 📖

🚀 此 Chrome 扩展专为将微信公众号文章无缝转换成 VuePress 支持的 Markdown 格式而设计。它不仅自动化生成 Frontmatter 头部，还能下载文档和相关图片，极大简化了整个转换流程。虽然主要为 [dromara 官网](https://github.com/dromara/dromara.github.io) 定制，也欢迎广泛用于各种微信公众号文章的转换工作，即便可能需要微调 frontmatter 或图片路径。请随意 fork 并按需调整！

📦 与 mdnice 编辑器完美兼容，确保表格、代码块和标题等 Markdown 元素无损转换。

🖼️ 对于微信公众号的图片，由于存在版权问题通常不能在其他地方直接引用。通过此插件，您可以将图片下载到本地，无障碍展示。

## 安装指南 📦

### 从 Chrome 应用商店安装

您可以方便地从 Chrome 应用商店安装此扩展程序：

- 直接访问 [微信文章转 vuepress-md 文档](https://chromewebstore.google.com/detail/%E5%BE%AE%E4%BF%A1%E6%96%87%E7%AB%A0%E8%BD%ACvuepress-md%E6%96%87%E6%A1%A3/blapejlcolppjekempmodkbofkkgmaop?hl=zh-CN&utm_source=ext_sidebar) 安装。
- 或者，在 Chrome 应用商店搜索“微信文章转 vuepress-md 文档”。

### 通过 GitHub 仓库手动安装

如果您希望手动安装扩展程序，可以按照以下步骤操作：

1. 克隆扩展程序仓库到本地：

   ```bash
   git clone https://github.com/Cicici-Shi/wechat-doc-to-vuepress-md.git
   ```

2. 在本地文件系统中，找到克隆的仓库文件夹。

3. 在 Chrome 浏览器中，打开“扩展程序”页面（通过地址栏输入 `chrome://extensions/`）。

4. 启用页面右上角的“开发者模式”。

5. 点击“加载已解压的扩展程序”，并选择克隆的仓库文件夹。

6. 扩展程序现在应该已经添加到您的浏览器中。在“扩展程序”页面，找到您的扩展程序。

7. 点击扩展程序旁边的“固定”图标，将其固定到工具栏上。

现在，您应该能看到扩展程序的图标显示在 Chrome 工具栏上，点击即可使用。

## 使用指南 🛠️

![例图](https://raw.githubusercontent.com/Cicici-Shi/wechat-doc-to-vuepress-md/main/example.png)

1. **生成 Frontmatter：**
   从扩展的弹出界面中，选择文章分类，并为您的 Markdown 文件及图片前缀输入文件名。点击“生成 Frontmatter”，Markdown 文件头部信息将自动填充。

2. **下载 Markdown 文档：**
   点击“下载文档”，立即下载转换好的 Markdown 文档。
   对于 dromara 官网，下载后，直接将文件放入`src/zh/news`目录。

3. **下载文章图片：**
   “下载图片”功能允许您下载文章中全部图片，内部命名规则为输入的文件名加上序号。所有图片默认归类到单个文件夹，之后，您只需在这个文件夹中全选复制并粘贴到本地即可。
   在 dromara 官网中，简单将整个文件夹内容复制到`src/.vuepress/public/assets/img/news`路径即可。

## 注意事项 ⚠️

- 🔄 如果新文章包含之前文章已用过的图片，请优先复用旧链接，以节省存储空间并减轻克隆或部署的负担。
- 🖼️ 封面图片默认选用第一张图片，您也可以自行选择其他图片作为封面。
