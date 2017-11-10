<template>
  <div class="out">
     <section class="user-info">
        <!-- <img  alt="上传头像">  -->
     <upload-tpl :imgUrl="info.pic" @setPic="setPic"></upload-tpl>       
        <!-- <div class="info">
            <p class="name">{{userInfo.nickname || '设置昵称'}}</p>
            <p class="level">lv: {{userInfo.level || '1'}}</p>
            <p class="team">拥有球队：野牛队{{interval$}}</p>
        </div> -->
     </section>      
     <section class="activity-module">
        <mt-field label="昵称" placeholder="请输入用户名" v-model="info.nick_name"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="info.email"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="info.phone"></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date" v-model="info.birthday"></mt-field>
        <mt-field label="球队名称" placeholder="请输入球队名称"  v-model="info.team"></mt-field>        
        <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="info.desc"></mt-field>
     </section>
     <section class="bottom-btn">
         <mt-button size="large" type="primary" @click.native="update">确认修改</mt-button>
     </section>
  </div>
</template>

<script>
import { Observable } from 'rxjs'
import userApi from '@/api/account'
import { mapState } from 'vuex'
import { Field, MessageBox } from 'mint-ui'
import uploadTpl from '../../upload/upload'

export default {
  name: 'home',
  mounted () {
    Observable.fromPromise(userApi.getUserMoreInfo({uid: this.userInfo.id})).pluck('data').subscribe(res => {
      if (res.status === 200) {
        this.info = res.data
      }
    })
  },
  data () {
    return {
      info: {
        nick_name: '',
        phone: '',
        email: '',
        birthday: '',
        introduction: '',
        team: ''
      }
    }
  },
  subscriptions () {
    return {
      interval$: Observable.interval(1000)
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  components: {
    Field,
    uploadTpl
  },
  methods: {
    setPic (data) {
      this.pic = data
    },
    update () {
      const params = Object.assign({...this.info}, {uid: this.userInfo.id}, {pic: this.pic})
      Observable.fromPromise(userApi.update(params)).pluck('data').subscribe(res => {
        MessageBox(res.message)
        if (res.status === 200) {
          setTimeout(() => {
            this.$router.push({
              path: '/home'
            })
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.out {
     padding-top: 1rem;
     overflow: hidden;
     height: 100%;
}
  .user-info {
      display: flex;
      background: #fff;
      height: 110px;
      img {
          height: 70px;
          width: 70px;
      }
      .info {
          flex: 1;
          height: 100%;
          padding: 10px;
          text-align: left;
          p {
              line-height: 24px;
              font-size: 18px;
              margin-bottom: 3px;
          }
      }
  }

  .activity-module {
      background: #fff;
      margin-top: 30px;
      
  }
  .bottom-btn {
      margin-top: 20px;
  }
#J_PicturePreview {
  img {
    width: 100px;
  }
}
</style>
