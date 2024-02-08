chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchMarkdownForPopup') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'getMarkdown' },
        function (response) {
          if (response && response.markdown) {
            sendResponse({ markdown: response.markdown })
          }
        }
      )
    })
    return true // 保持sendResponse函数在异步响应后仍然有效
  }
})

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
