const turndownService = new TurndownService({ headingStyle: 'atx' })
turndownService.use(turndownPluginGfm.gfm)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMarkdown') {
    const markdown = getMarkdown()
    console.log('markdown', markdown)
    sendResponse({ markdown })
  }
})

function getMarkdown() {
  return {
    markdownContent: getMarkdownContent(),
    frontmatterInfo: getFrontmatterInfo(),
  }
}

function getMarkdownContent() {
  const htmlContent = getArticleFromDom(document.documentElement.innerHTML)
  const markdownContent = htmlContent && turndownService.turndown(htmlContent)
  return markdownContent || '请在微信公众号文章中使用本扩展。'
}

function getArticleFromDom(domString) {
  const parser = new DOMParser()
  const dom = parser.parseFromString(domString, 'text/html')
  const targetDiv = dom.querySelector('.rich_media_content')

  if (targetDiv) {
    return targetDiv.innerHTML
  } else {
    return null
  }
}

function getFrontmatterInfo() {
  if (!document.querySelector('.rich_media_title')) {
    return null
  }
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
  return frontmatterInfo
}
