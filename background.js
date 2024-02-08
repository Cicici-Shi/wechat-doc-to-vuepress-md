let markdownContent = '暂未获取到内容，请刷新页面重试。'
let frontmatterInfo = {}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'markdownConverted') {
    markdownContent = message.message
  } else if (message.type === 'frontmatterInfo') {
    frontmatterInfo = message.frontmatterInfo
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getMarkdown') {
    sendResponse({ markdown: markdownContent })
  } else if (message.action === 'getFrontmatterInfo') {
    sendResponse({ frontmatterInfo })
  }
})
