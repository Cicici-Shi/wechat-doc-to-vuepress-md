let articleContent = '0'
let markdownContent = '1'
const turndownService = new TurndownService({ headingStyle: 'atx' })
turndownService.use(turndownPluginGfm.gfm)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'markdownConverted') {
    articleContent = getArticleFromDom(message.htmlContent)
    // 将页面的HTML内容转换为Markdown
    markdownContent = turndownService.turndown(articleContent)
  }
})

// 监听popup请求Markdown内容的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getMarkdown') {
    sendResponse({ markdown: markdownContent })
  }
})

function getArticleFromDom(domString) {
  // parse the dom
  const parser = new DOMParser()
  const dom = parser.parseFromString(domString, 'text/html')
  // 定位到特定的<div>元素
  const targetDiv = dom.querySelector('.rich_media_area_primary_inner')

  // 检查是否找到元素
  if (targetDiv) {
    return targetDiv.innerHTML
  } else {
    console.log('指定的元素未找到')
  }
}
