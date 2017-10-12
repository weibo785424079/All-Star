export default {
     // 消息滚动到底部
  scrollToMsgBottom () {
    setTimeout(() => {
      const dom = document.querySelector('#msg-bottom')
      console.log(dom)
      document.querySelector('#msg-bottom').scrollIntoView(false)
    }, 500)
  }
}
