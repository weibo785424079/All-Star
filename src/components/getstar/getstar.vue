<template>
  <div id="out" style="height:100%;">
    <div class="title">
        极品球星卡等你来拿！ {{userInfo&&userInfo.name}}    
    </div>
    <div class="tip">
       <!-- <span>每日有五次抽取机会 </span>  -->
       <span>剩余：{{userInfo&&userInfo.leftTimes}}次 </span> 
    </div>
    <div v-if="randomBoxVisiable" class="random-box" ref="box">
      <span @click="getStar" class="get">点击抽奖</span>
    </div>
    <alert-tip v-if="alertTipVisiable" @closeTip="closeTip" :starInfo="starInfo"></alert-tip>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip.vue'
import starApi from '@/api/star'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      title: '',
      cardList: [],
      allLoaded: true,
      starInfo: {},
      randomBoxVisiable: true,
      alertTipVisiable: false,
      couldGet: true
    }
  },
  computed: {
    ...mapState(['userInfo']),
    cards () {
      return this.userInfo.cards.split(',') || []
    }
  },
  components: {
    alertTip
  },
  mounted () {},
  methods: {
    getStar () {
      const _this = this
      const box = _this.$refs.box
      box.classList.add('dump-animation')
      if (_this.couldGet === false) return
      _this.couldGet = false
      starApi.getStarRandom({id: _this.userInfo.id}).then(res => {
        setTimeout(() => {
          if (_this.userInfo.leftTimes >= 1) {
            _this.userInfo.leftTimes--
          }
          if (res.data.status === 200) {
            let star = res.data.data
            this.showTip(star)
            // 减少用户抽奖剩余次数 将球员添加到用户所有
            var o = {}
            o.cid = star.id
            o.uid = _this.userInfo.id
            starApi.insertStarById(o).then(res => {
            }).catch(err => {
              console.log(err)
            })
          } else {
            MessageBox(res.data.message)
            const box = this.$refs.box
            box.classList.remove('dump-animation')
            _this.couldGet = true
          }
        }, 2000)
      }).catch(err => {
        console.log(err)
      })
    },
    showTip (star) {
      const box = this.$refs.box
      box.classList.remove('dump-animation')
      this.couldGet = true
      this.alertTipVisiable = true
      this.randomBoxVisiable = false
      if (star) {
        this.starInfo = star
      }
    },
    closeTip () {
      this.alertTipVisiable = false
      this.randomBoxVisiable = true
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../../../static/mixin';
  @keyframes dump {
    0% {
      transform: scale(1)
    }
    25% {
      transform: scale(1.1)
    }
    50% {
      transform: scale(1)
    }
    75% {
      transform: scale(0.9)
    }
    100% {
      transform: scale(1)
    }
  }
  .dump-animation {
    animation: dump 1s linear  infinite;
  }
  #out {
    padding: 0 10px;
  }
  .title {
    color: $green;
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .tip {
    @include fj;
    span {
      font-size:18px;
    }
    span:first-child {
      color: $green
    } 
    span:last-child {
      color:red
    }
  }
  .random-box {
    width: 300px;
    height: 400px;
    position: relative;
    border: 1px solid $green;
    margin-top: 30px;
    margin-left: 30px;
    background: #fff;
    // @include fj;
    // justify-content: center;
    // align-items: center;
    .get {
      display: block;
      margin-top: 100px;
      margin-left: 50px;
      @include wh(200px,200px);
      background: $green;
      color: #fff;
      border-radius: 50%;
      text-align: center;
      line-height: 200px;
      font-weight: bold;
      font-size: 30px;
    }
  }
</style>

