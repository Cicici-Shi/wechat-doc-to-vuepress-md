let markdown = ''
let frontmatterInfo = ''
let category = ''
let filename = ''

document.addEventListener('DOMContentLoaded', function () {
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

  document
    .querySelector('.generate-btn')
    .addEventListener('click', generateFrontmatter)

  document.getElementById('img-download').addEventListener(
    'click',
    (function () {
      // 3秒内防重
      let clickable = true

      return function () {
        if (!clickable) return

        clickable = false
        this.classList.add('disabled')

        const filename = document.getElementById('filename').value || 'default'
        chrome.runtime.sendMessage({
          action: 'downloadImages',
          prefix: filename,
        })

        setTimeout(() => {
          clickable = true
          this.classList.remove('disabled')
        }, 3000)
      }
    })()
  )

  document.getElementById('md-download').addEventListener('click', function () {
    const content = document.getElementById('markdownContent').textContent
    const filename =
      document.getElementById('filename').value || 'default-filename' // 如果没有输入，则使用默认文件名

    // 创建一个blob对象，指定内容类型为markdown
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    chrome.downloads.download(
      {
        url: url,
        filename: `${filename}.md`,
        saveAs: false,
        conflictAction: 'uniquify', // 如果有重名的文件，则自动重命名
      },
      function () {
        // 下载完成后释放URL
        URL.revokeObjectURL(url)
      }
    )
  })
})

function generateFrontmatter() {
  const categoryZh = {
    news: '新闻',
    activity: '活动',
    blog: '博客',
  }
  category = document.getElementById('category').value
  filename = document.getElementById('filename').value
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
    frontmatter + convertToLocalImages(markdown)
}

// 由于微信文章中的图片不支持用URL预览，将md的图片替换为本地路径。搭配下载图片按钮，把图片放到对应位置即可展示。
function convertToLocalImages() {
  const imageRegex = /!\[.*?\]\((http.*?mmbiz_(\w+).*?)\)/g

  let index = 0
  const replacementFunction = (match, imageUrl, format) => {
    // 检查图片URL中的格式
    const extension = format || 'png'

    const localImagePath = `/assets/img/${category}/${filename}-${index}.${extension}`
    index++
    return `![](${localImagePath})`
  }

  // 替换Markdown中的图片URL为本地路径
  const newMarkdown = markdown.replace(imageRegex, replacementFunction)

  return newMarkdown
}
