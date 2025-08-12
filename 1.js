Vue.directive('dialogDrag', {
  bind (el) {
    const dragDomHeader = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')

    dragDomHeader.style.cursor = 'move'
    let dragDomOffsetX = 0
    let dragDomOffsetY = 0
    let mousePosX = 0
    let mousePosY = 0

    function onmousemove (e) {
      const clientX = e.clientX > window.innerWidth ? window.innerWidth : e.clientX
      const clientY = e.clientY > window.innerHeight ? window.innerHeight : (e.clientY < 0 ? 0 : e.clientY)
      const x = clientX - mousePosX + dragDomOffsetX
      const y = clientY - mousePosY + dragDomOffsetY
      dragDom.dataset.x = x
      dragDom.dataset.y = y
      dragDom.style.transform = `translate(${x}px,${y}px)`
    }
    function onmouseup (e) {
      document.removeEventListener('mousemove', onmousemove)
    }
    function onmousedown (e) {
      dragDomOffsetX = Number(dragDom.dataset.x || 0)
      dragDomOffsetY = Number(dragDom.dataset.y || 0)
      mousePosX = e.clientX
      mousePosY = e.clientY

      document.addEventListener('mousemove', onmousemove)
    }
    dragDomHeader.addEventListener('mousedown', onmousedown)
    document.addEventListener('mouseup', onmouseup)
  }
})
