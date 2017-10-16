<template>
  <div>
      <section class="box">
          <div class="wrap" v-for="(item,index) in news" :key="index">
              <img :src="item.imgUrl" alt="img">
              <div class="cont">
                  <div class="head">{{item.title}}</div>
                  <div class="body">{{item.detail.substr(0,100)+'...'}}</div>
                  <div class="foot">{{item.date}}</div>
              </div>
          </div>
      </section>
  </div>
  
</template>

<script>
import starCtrl from '@/api/star'
export default {
  data () {
    return {
      news: []
    }
  },
  mounted () {
    starCtrl.getAllNews().then(res => {
      this.news = res.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../../static/mixin';
    .box {
     padding: 0 5px;
    }
    .wrap {
        width: 100%;
        height: 200px;
        overflow: hidden;
        // @include fj;
        align-items: flex-start;
        img {
            margin: 5px 20px 0 5px;
            float: left;
            @include wh(100px,100px);
            @include borderRadius(10px)
        }
        .cont {
            padding: 5px;
            @include sc(12px,$green);
            padding-bottom: 5px;
            .head {
                @include sc(18px,red)
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

