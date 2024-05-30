// ==UserScript==
// @name         CSDN文库免vip阅读全文，解锁复制限制
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  CSDN文库阅读全文，去除VIP登录遮罩，解锁鼠标复制功能
// @author       icescat
// @match        *://*.csdn.net/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict'

  const adjustArticle = () => {
    // 移除遮罩层
    for (const el of document.querySelectorAll('.open, .vip')) el.remove()

    // 展开被限制高度的内容
    const articleContainer = document.querySelector('.article-box .cont.first-show[data-v-6487a68f]')
    if (articleContainer) {
      articleContainer.style.maxHeight = 'none'
    }
  }

  // 启用复制功能
  const enableCopy = () => {
    document.body.oncopy = null
    document.oncopy = null
    for (const el of document.querySelectorAll('*')) {
      el.style.userSelect = 'auto'
    }
  }

  // 使用MutationObserver来监视文档的变化
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        adjustArticle()
        enableCopy()
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // 页面加载时尝试执行一次
  window.addEventListener('load', () => {
    adjustArticle()
    enableCopy()
  })
})()
