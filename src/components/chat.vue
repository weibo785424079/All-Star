<template>
  <div id='chat'>
      chat with some friends!!
      <div class="right">在线：6</div>
      <ul class="msg-box">
          <li class="msg" v-for="(item,index) in msgs">
             <p>{{item.content}}</p> 
          </li>
      </ul>
      <section class="insert">
          <input v-model="msgSend" type="text">&nbsp;
          <mt-button class="info" type='info' @click="send">发送</mt-button>
      </section>
  </div>
</template>

<script>
import chatApi from '@/api/chat'
import server from '@/models/server'
export default {
  name: 'chat',
  data () {
    return {
      msgs: [
          {content: '波哥点了个赞！'},
          {content: '波哥点了个赞！'},
          {content: '波哥点了个赞！'},
          {content: '波哥点了个赞！'},
          {content: '波哥点了个赞！'},
          {content: '波哥点了个赞！'}
      ],
      msgSend: ''
    }
  },
  created () {
    this.ws = new window.WebSocket(server.wsServer + '/chat')
    // 响应onmessage事件
    this.ws.onmessage = (message) => {
      debugger
    }
  },
  mounted () {
    const _this = this
    chatApi.sendMsg(
      {
        username: 'weibo',
        target: 'six',
        content: 'hello 这是第一条消息的内容。'
      }
    ).then(res => {
      // 发送成功了菜给ws服务器发送消息内容
      if (res.data.status === 200) {
        _this.ws.send(JSON.stringify({
          type: 'info',
          data: {
            msg: '发送给wsServer'
          }
        }))
      }
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    send () {
      const _this = this
      alert(_this.msgSend)
    }
  }
}
</script>

<style scoped lang="scss">
    .msg-box {
        text-align: left;
        padding: 10px;
        display: flex;
        flex-direction: column;
        height: 75vmax;
        .msg {
            margin-bottom: 5px;
          p{
            display: inline-block;
            padding: 3px 8px;
            background: #5bb683;
            color: white;
            font-weight: bold;
            border-radius: 5px;
            }
        }
    }
    .insert {
        padding: 0 30px;
        display: flex;
        
        input {
            margin: auto;
            flex: 1;
            height: 25px;
            border: 1px solid #5bb683;
        }
    }
</style>
