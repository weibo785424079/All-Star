<template>
  <div id='chat'>
      <span style="color:green;font-size:40px;">{{userInfo&&userInfo.name}}</span> chatting with some friends!!
      <!-- <div class="right">在线：{{active}}</div> -->
      <ul class="msg-box">
          <li class="msg" v-for="(item,index) in msgs" :style="userInfo&& userInfo.name==item.author?'text-align:right':'text-align:left'" :key="index"> 
             <p>{{item.author==userInfo.name?'我':item.author}}:  {{item.content}}</p> 
          </li>
      <div id="msg-bottom"></div>          
      </ul>
      <section class="insert">
          <input v-model="msgSend" type="text">&nbsp;
          <mt-button class="default" size='small' @click="send">发送</mt-button>
      </section>
  </div>
</template>

<script>

import chatApi from '@/api/chat'
import server from '@/models/server'
import tools from '@/utils/tools'
import { mapState } from 'vuex'

export default {
  name: 'chat',
  data () {
    return {
      msgs: [],
      msgSend: '',
      active: 0
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created () {
    const _this = this
    _this.ws = new window.WebSocket(server.wsServer + '/chat')
    // 响应onmessage事件
    _this.ws.onmessage = (message) => {
      if (message && message.data) {
        let msg = JSON.parse(message.data)
        _this.active = msg.num
        _this.msgs.push(JSON.parse(msg.data))
        _this.msgSend = ''
        tools.scrollToMsgBottom()
      }
    }
    chatApi.getAllMsgs().then(res => {
      const { data, status } = res.data
      if (status === 200) {
        _this.msgs = data.msg
        tools.scrollToMsgBottom()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
  },
  methods: {
    send () {
      const _this = this
      const content = _this.msgSend
      if (content === '') return
      chatApi.sendMsg(
        {
          author: _this.userInfo.name,
          target: 'all',
          content
        }
      ).then(res => {
      // 发送成功了菜给ws服务器发送消息内容
        if (res.data.status === 200) {
          _this.ws.send(JSON.stringify({
            type: 'info',
            content,
            author: _this.userInfo.name,
            target: 'all'
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
        overflow: scroll;
        .msg {
            margin-bottom: 10px;
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
            border-radius: 5px;
            margin-right: 30px;
            font-size: 18px;
        }
    }
</style>
