document.addEventListener('DOMContentLoaded', function () {
  // 请求Markdown内容
  chrome.runtime.sendMessage({ action: 'getMarkdown' }, function (response) {
    if (response.markdown) {
      console.log('popup:', response.markdown)
      document.getElementById('markdownContent').textContent = response.markdown
    }
  })
})
