let markdownContent = '1'
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'downloadImage') {
    downloadAndRenameImage(message.imageSrc, message.newName)
  } else if (message.type === 'markdownConverted') {
    markdownContent = message.markdown
  }
})

// 监听popup请求Markdown内容的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getMarkdown') {
    sendResponse({ markdown: markdownContent })
  }
})
