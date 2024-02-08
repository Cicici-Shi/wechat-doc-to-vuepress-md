let markdown = ''
let imgSrc = ''

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.generate-btn')
    .addEventListener('click', generateFrontmatter)
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'getImageSrc' },
      function (response) {
        if (response && response.src) {
          imgSrc = response.src
        }
      }
    )
  })
  chrome.runtime.sendMessage({ action: 'getMarkdown' }, function (response) {
    if (response.markdown) {
      markdown = response.markdown
      document.getElementById('markdownContent').textContent = response.markdown
    }
  })
})

function generateFrontmatter() {
  const category = document.getElementById('category').value
  chrome.runtime.sendMessage(
    { action: 'getFrontmatterInfo' },
    function (response) {
      const { title, author, date } = response.frontmatterInfo
      const frontmatter = `---
title: ${title}
author: ${author}
date: ${date}
cover: ${imgSrc}
head:
  - - meta
    - name: ${category}
---
      
`
      document.getElementById('markdownContent').textContent =
        frontmatter + markdown
    }
  )
}
