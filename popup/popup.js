let markdown = ''
let frontmatterInfo = ''

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.generate-btn')
    .addEventListener('click', generateFrontmatter)

  document
    .getElementById('img-download')
    .addEventListener('click', function () {
      const filename = document.getElementById('filename').value
      chrome.runtime.sendMessage({
        action: 'downloadImages',
        prefix: filename,
      })
    })

  chrome.runtime.sendMessage(
    { action: 'fetchMarkdownForPopup' },
    function (response) {
      if (response && response.markdown) {
        document.getElementById('markdownContent').textContent =
          response.markdown.markdownContent

        //保存以生成带 frontmatter 的 markdown
        markdown = response.markdown.markdownContent
        frontmatterInfo = response.markdown.frontmatterInfo
      }
    }
  )
})

function generateFrontmatter() {
  const categoryZh = {
    news: '新闻',
    activity: '活动',
    blog: '博客',
  }
  const category = document.getElementById('category').value
  const filename = document.getElementById('filename').value
  const { title, author, date } = frontmatterInfo
  const frontmatter = `---
title: ${title}
author: ${author}
date: ${date}
cover: /assets/img/${category}/${filename}-0.png
head:
  - - meta
    - name: ${categoryZh[category]}
---
      
`
  document.getElementById('markdownContent').textContent =
    frontmatter + markdown
}
