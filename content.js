//在content.js中处理并发送数据
const turndownService = new TurndownService({ headingStyle: 'atx' })
turndownService.use(turndownPluginGfm.gfm)

// 将页面的HTML内容转换为Markdown
const htmlContent = getArticleFromDom(document.documentElement.innerHTML)
const markdown = turndownService.turndown(htmlContent)

const title = document.querySelector('.rich_media_title').textContent.trim()
const author = document
  .querySelector('.rich_media_meta_text')
  .textContent.trim()
const date = document
  .querySelector('#publish_time')
  .textContent.trim()
  .split(' ')[0]
const frontmatterInfo = {
  title,
  author,
  date,
}
chrome.runtime.sendMessage({ type: 'frontmatterInfo', frontmatterInfo })
// // 将Markdown内容发送到背景脚本以便进一步处理（如保存到剪贴板等）
chrome.runtime.sendMessage({ type: 'markdownConverted', markdown })

function getArticleFromDom(domString) {
  // parse the dom
  const parser = new DOMParser()
  const dom = parser.parseFromString(domString, 'text/html')
  // 定位到特定的<div>元素
  const targetDiv = dom.querySelector('.rich_media_content')

  // 检查是否找到元素
  if (targetDiv) {
    return targetDiv.innerHTML
  } else {
    console.log('指定的元素未找到')
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getImageSrc') {
    const imgSrc =
      document
        .querySelector('.rich_media_content img')
        .getAttribute('data-src') ||
      document.querySelector('.rich_media_content img').getAttribute('src')
    sendResponse({ src: imgSrc })
  }
})
