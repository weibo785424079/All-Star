<template>
  <div style="
  height:100%;">
      Stars: {{userInfo&&userInfo.name}}
      <section class="my-cards"  :style="{'-webkit-overflow-scrolling': scrollMode}">
          <!-- <v-loadmore style="height:100%;overflow:scroll;" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
          <div class="item" v-for="(item, index) in cardList" :key="index">
              <img :src="item.pic" alt="pic">
              <div class="num">{{map[item.id]}}</div>
              <div class="cont">
                  <div class="head">{{item.name}}</div>
                  <div class="body">{{item.desc}}</div>
                  <div class="foot">{{item.desc_detail.substr(0,100)+'...'}}</div>
              </div>
          </div>
          <!-- </v-loadmore> -->
      </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'
import starApi from '@/api/star'
export default {
  data () {
    return {
      title: '',
      cardList: [],
      allLoaded: true,
      scrollMode: 'auto',
      map: {}
    }
  },
  computed: {
    ...mapState(['userInfo']),
    cards () {
      return this.userInfo.cards.split(',') || []
    }
  },
  components: {
    'v-loadmore': Loadmore
  },
  mounted () {
    const _this = this
    const id = _this.userInfo.id
    starApi.getStarsById({ id }).then(res => {
      let m = {}
      let arr = []
      if (res.data.status === 200) {
        let cards = res.data.data
        for (let card of cards) {
          if (!m[card.cid]) {
            m[card.cid] = 1
            arr.push(card.cid)
          } else {
            m[card.cid]++
          }
        }
        _this.map = m
        starApi.getStars(arr).then(res => {
          if (res.data.status === 200) {
            _this.cardList = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    loadTop () {
    //   location.reload()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      debugger
      this.$refs.loadmore.onBottomLoaded()
    },
    loadData () {
      // 查询数据
      // this.api.PageList(this.searchCondition).then(data =>{
      // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
      // this.isHaveMore(data.result.haveMore)
      // this.pageList = data.result.pageList
      // this.$nextTick(function () {
      // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写
      // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果
      // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
      // this.scrollMode = "touch"
      // })
      // })
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../../../static/mixin';
  .my-cards {
      padding: 5px;
      padding-bottom: 50px;
      // height: 100%;
      .item {
          padding: 5px;
          display: flex;
          align-items: center;
          border: solid 1px #ccc;
          margin-bottom: 10px;
          position: relative;
          box-shadow: 2px 2px 2px #ccc;
          .num {
            position: absolute;
            height: 25px;
            width: 25px;
            background: $green;
            color: white;
            border-radius: 50%;
            line-height: 25px;
            font-weight: bold;
            font-size: 15px;
            right: 10px;
            top: 10px;
          }
          img {
              height: 100px;
              width: 100px;
              border-radius: 5px;
          }
          .cont {
              flex: 1;
              text-align: left;
              padding-left: 5px;
              .head {
                  color: red;
                  text-align: center;
              }
          }
      }
  }  
</style>

