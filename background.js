let filenamePrefix = ''

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
  } else if (request.action === 'downloadImages') {
    filenamePrefix = request.prefix
    // 发送请求给content以拿到本页面的图片
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'downloadImagesFromContent',
      })
    })
  } else if (request.action === 'downloadImage' && request.url) {
    // 使用chrome.downloads API下载图片
    chrome.downloads.download({
      url: request.url,
      filename: `images/${filenamePrefix}-${request.index}.png`, // 你可以根据需要修改文件名的格式
      saveAs: false, // 这里设置为false表示不弹出另存为对话框，直接下载到默认位置
    })
  }
})
