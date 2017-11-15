<template>
  <div id="out">
    <div class="title">
        极品球星卡等你来拿！ {{userInfo&&userInfo.name}}    
    </div>
    <div class="tip">
       <!-- <span>每日有五次抽取机会 </span>  -->
       <span>剩余：{{userInfo&&userInfo.leftTimes}}次 </span> 
    </div>
    <div v-if="randomBoxVisiable" class="random-box" ref="box">
      <!-- <span  @click="getStar" class="get">点击抽奖</span> -->
      <span ref="get" class="get">点击抽奖</span>
    </div>
    <alert-tip v-if="alertTipVisiable" @closeTip="closeTip" :starInfo="starInfo"></alert-tip>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip.vue'
import starApi from '@/api/star'
import { MessageBox } from 'mint-ui'
import { Observable } from 'rxjs'
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
  mounted () {
    const btn = this.$refs['get']
    Observable.fromEvent(btn, 'click').throttleTime(2000)
    .switchMap(event => {
      this.startAnimation()
      return Observable.fromPromise(starApi.getStarRandom({id: this.userInfo.id}))
    }).delay(2000).pluck('data').subscribe(res => {
      this.stopAnimation()
      if (this.userInfo.leftTimes >= 1) {
        this.userInfo.leftTimes--
      }
      if (res.status === 200) {
        this.showStar(res.data)
      } else {
        MessageBox({
          message: res.message
        })
      }
    })
    // this.$subscribeTo(Observable.fromPromise(starApi.getStarRandom({id: 1})), function (count) {
      // console.log(count)
    // })
    // Observable.interval(3000).flatMap(function (result) {
    //   return Observable.from([result])
    // }).subscribe(res => {
    //   console.log(res)
    // })
    // var subject = new Subject()
    // var source = Observable.interval(300).take(5)
    // source.subscribe(subject)
    // subject.subscribe(res => {
    //   console.log(res)
    // })
    // subject.next('1')
  },
  methods: {
    showStar (starInfo) {
      this.starInfo = starInfo
      this.alertTipVisiable = true
    },
    startAnimation () {
      const _this = this
      const box = _this.$refs.box
      box.classList.add('dump-animation')
      if (_this.couldGet === false) return
      _this.couldGet = false
    },
    stopAnimation () {
      const _this = this
      const box = this.$refs.box
      box.classList.remove('dump-animation')
      _this.couldGet = true
    },
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
    padding-top: 1rem;
    height: 100%;
    overflow: hidden;
  }
  .title {
    @include sc(24px,black);
    // margin-top: 9px;
    margin-bottom: 5px;
    text-shadow: 2px 2px 2px #ccc;
  }
  .tip {
    @include fj;
    span {
      font-size:18px;
    }
    span:first-child {
      color: $blue
    } 
    span:last-child {
      color:$blue
    }
  }
  .random-box {
    width: 300px;
    height: 400px;
    position: relative;
    border: 3px solid black;
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
      background: black;
      color: #fff;
      border-radius: 50%;
      text-align: center;
      line-height: 200px;
      font-weight: bold;
      font-size: 30px;
    }
  }
</style>

