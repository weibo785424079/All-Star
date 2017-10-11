<template>
  <div id='chat'>
      chat with some friends!!
      <div class="right">在线：6</div>
      <ul class="msg-box">
          <li class="msg" v-for="(item,index) in msgs" :style="userInfo&& userInfo.name==item.target?'text-align:right':'text-align:left'" :key="index"> 
             <p>{{item.content}}</p> 
          </li>
      </ul>
      <section class="insert">
          <input v-model="msgSend" type="text">&nbsp;
          <mt-button class="info" @click="send">发送</mt-button>
      </section>
  </div>
</template>

<script>
import chatApi from '@/api/chat'
import server from '@/models/server'
import { mapState } from 'vuex'
export default {
  name: 'chat',
  data () {
    return {
      msgs: [
          {content: '波哥点了个赞！', target: 'weibo'},
          {content: 'six点了个赞！', target: 'six'},
          {content: '波哥点了个赞！', target: 'weibo'},
          {content: 'six点了个赞！', target: 'six'},
          {content: '波哥点了个赞！', target: 'weibo'},
          {content: 'six点了个赞！', target: 'six'}
      ],
      msgSend: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created () {
    const _this = this
    this.ws = new window.WebSocket(server.wsServer + '/chat')
    // 响应onmessage事件
    this.ws.onmessage = (message) => {
      if (message && message.data) {
        let msg = JSON.parse(message.data)
        _this.msgs.push(JSON.parse(msg.data))
        _this.msgSend = ''
      }
    }
  },
  mounted () {
  },
  methods: {
    send () {
      const _this = this
      const content = _this.msgSend
      chatApi.sendMsg(
        {
          username: _this.userInfo.name,
          target: _this.userInfo.name,
          content
        }
      ).then(res => {
      // 发送成功了菜给ws服务器发送消息内容
        if (res.data.status === 200) {
          _this.ws.send(JSON.stringify({
            type: 'info',
            content: content,
            target: _this.userInfo.name
          }))
        }
      }).catch(e => {
        console.log(e)
      })
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
            font-size: 24px;
        }
    }
</style>
