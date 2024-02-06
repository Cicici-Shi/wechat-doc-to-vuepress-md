const htmlContent = document.documentElement.innerHTML
chrome.runtime.sendMessage({ type: 'markdownConverted', htmlContent })
