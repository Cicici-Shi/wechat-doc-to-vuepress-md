let markdown = ''
let frontmatterInfo = ''

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.generate-btn')
    .addEventListener('click', generateFrontmatter)
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
  const category = document.getElementById('category').value
  const { title, author, date } = frontmatterInfo
  const frontmatter = `---
title: ${title}
author: ${author}
date: ${date}
head:
  - - meta
    - name: ${category}
---
      
`
  document.getElementById('markdownContent').textContent =
    frontmatter + markdown
}
