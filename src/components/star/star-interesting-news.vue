<template>
  <div>
      <section class="box" v-load-more = 'loadMore' type='1'>
          <a class="wrap" v-for="(item,index) in news" :href="item.weburl" :key="index">
              <img v-lazy="item.pic" alt="img">
              <div class="cont">
                  <div class="head">{{item.title}}</div>
                  <div class="body" v-html="item.content.substr(0,100)+'...'"></div>
                  <div class="foot">{{item.time}}</div>
              </div>
          </a>
      </section>
  </div>
  
</template>

<script>
import starCtrl from '@/api/star'
import { Observable } from 'rxjs'
import server from '@/models/server'
import Tools from '@/utils/tools'
import { Loadmore } from 'mint-ui'
export default {
  data () {
    return {
      news: [],
      allLoaded: false,
      num: 5,
      start: 0,
      dataIsEnd: false
    }
  },
  mounted () {
    // https://way.jd.com/jisuapi/get?channel=头条&num=10&start=0&appkey
    // starCtrl.getAllNews().then(res => {
    //   this.news = res.data.data
    // }).catch(err => {
    //   console.log(err)
    // })
    this.getNews().subscribe(res => {
      this.news = res
      Tools.setSessionStore('news', res)
    })
  },
  components: {
    Loadmore
  },
  methods: {
    getNews () {
      return Observable.defer(function () {
        if (Tools.getSessionStore('news')) {
          return Observable.of(JSON.parse(Tools.getSessionStore('news')))
        } else {
          return Observable.fromPromise(starCtrl.getJDNews({
            channel: 'NBA',
            num: this.num,
            start: this.start,
            appkey: server.JDAppKey
          })).pluck('data', 'result', 'result', 'list')
        }
      })
    },
    loadMore () {
      if (this.load_more_ing === true || this.dataIsEnd === true) return
      this.load_more_ing = true
      this.start += 5
      Observable.fromPromise(starCtrl.getJDNews({
        channel: 'NBA',
        num: this.num,
        start: this.start,
        appkey: server.JDAppKey
      })).pluck('data', 'result', 'result', 'list').subscribe(res => {
        if (res.length < this.num) {
          this.dataIsEnd = true
        }
        this.news = this.news.concat(res)
        this.load_more_ing = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../static/mixin';
    .box {
     padding: 0 5px;
     height: 120vmax;
     overflow: scroll
    }
    .wrap {
        width: 100%;
        height: 160px;
        overflow: hidden;
        // @include fj;
        align-items: flex-start;
        display: block;
        img {
            margin: 10px 20px 0 10px;
            float: left;
            @include wh(100px,100px);
            @include borderRadius(10px)
        }
        .cont {
            padding: 10px;
            @include sc(12px,$green);
            background: #fff;
            padding-bottom: 5px;
            border-radius: 10px;
            height: 155px;
            .head {
                @include sc(14px,red)
            }
            .body {
                padding-top: 3px;
                text-indent: 2em;
                @include sc(12px,#333)
            }
            .foot {
                text-align: right;
                height: 1em;
            }
        }
    }
</style>

