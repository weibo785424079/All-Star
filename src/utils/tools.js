export default {
  // 消息滚动到底部
  scrollToMsgBottom () {
    setTimeout(() => {
      document.querySelector('#msg-bottom').scrollIntoView(false)
    }, 500)
  },
  // 存储localStorage
  setStore (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  setSessionStore (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
  },
  // 获取localStorage
  getStore (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  getSessionStore (name) {
    if (!name) return
    return window.sessionStorage.getItem(name)
  },
  // 删除localstorage
  removeStore (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
