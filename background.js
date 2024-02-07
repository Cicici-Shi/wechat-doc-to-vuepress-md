let markdownContent = '1'
let frontmatterInfo = {}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'downloadImage') {
    downloadAndRenameImage(message.imageSrc, message.newName)
  } else if (message.type === 'markdownConverted') {
    markdownContent = message.markdown
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
