<template>
  <div>
      <section class="box">
          <div class="wrap" v-for="(item,index) in news" :key="index">
              <img src="../../assets/stars/tangpusen1.jpg" alt="">
              <div class="cont">
                  <div class="head">{{item.title}}</div>
                  <div class="body">{{item.detail}}</div>
                  <div class="foot">{{item.date}}</div>
              </div>
          </div>
      </section>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      news: [
        {
          title: '汤普森面包机趣闻',
          imgUrl: '../../../assets/stars/tangpusen1.jpg',
          name: '',
          detail: '在2017的3月15日，一位名叫罗尼的勇士球迷，竟然拿着一个烤面包机找克莱签名。没想到，自从克莱在烤面包机上签下名后，勇士在之后的33场比赛中,取得了31胜2负的疯狂战绩.在那段时间里,勇士取得了本赛季常规赛联盟最长的14连胜的连胜纪录,并且在季后赛中拿到了15连胜，创造了联盟的历史纪录。勇士这段时间里,唯一输掉的一场常规赛比赛是对阵爵士的一场,而那一场比赛克莱恰好没有上场。',
          date: '2017-10-12'
        }
      ]
    }
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
            }
        }
    }
</style>

