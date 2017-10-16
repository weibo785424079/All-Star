 <template>
    <div class="alet_container">
        <transition name="box" mode="out-in">
	    <section :class="'tip_text_container box-color-'+level">
            <header class="title">球星卡</header>
            <div :class="'rating level-'+level">{{starInfo.rating}}</div>
            <div class="card-img"><img :src="starInfo.pic" alt=""></div>
            <div class="body">
            <p class="tip">姓名: {{starInfo.name}}</p>
            <p class="tip">英文名： {{starInfo.nick_name}}</p>
            <p class="tip">毕业学校： {{starInfo.school}}</p>
            <p class="tip">身高： {{starInfo.height}}cm</p>
            <p class="tip">体重： {{starInfo.weight}}kg</p>
            <p class="tip">位置：{{starInfo.position}}</p>
            <p class="tip">国籍：{{starInfo.country}}</p>
            <p class="tip">简介：{{starInfo.desc}}</p>
            <p class="tip" style="text-indent:2em;;height:3em;overflow:hidden;">{{starInfo.desc_detail}}</p>
            </div>
            <!-- <div class="tip_icon">
                <span></span>
                <span></span>
            </div> -->
            <!-- <p class="tip_text">{{alertText}}</p> -->
            <div class="confrim" @click="closeTip">确认</div>
        </section>
        </transition>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          positionY: 0,
          timer: null
        }
      },
      mounted () {
      },
      computed: {
        level () {
          return this.starInfo.rating
        }
      },
      props: ['alertText', 'starInfo'],
      methods: {
        closeTip () {
          this.$emit('closeTip')
        }
      }
    }
</script>

<style lang="scss" scoped>
    @import '../../../static/mixin';
    .box-fade-enter-active, .box-fade-leave-active {
	  	transition: opacity .3s;
	}
	.box-fade-enter, .box-fade-leave-active {
	  	opacity: 0;
	}
    @keyframes flowlight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
    }

  .title {
    font-size: 18px;
    background-image: -webkit-linear-gradient(left,#D81159, #E53A40 10%, #FFBC42 20%, #75D701 30%, #30A9DE 40%,#D81159 50%, #E53A40 60%, #FFBC42 70%, #75D701 80%, #30A9DE 90%,#D81159);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 100%;
    animation: flowlight 5s linear infinite;
  }
  .rating {
      position: absolute;
      right: 20px;
      font-size: 22px;
      top: 18px;
      color: green
  }
 
  .level-SSS {
      color: gold;
  }
  .level-SS {
      color: goldenrod;
  }
  .level-S {
      color: red;
  }
  .level-A {
      color: #2196f3;
  }
  .level-B {
      color: green;
  }
  .level-C {
      color: gray;
  }
  .card-img {
      img {
          @include wh(120px,120px);
          @include borderRadius(50%)
      }
  }
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.5)
    }
    .tip_text_container{
        // padding: 5px;
        position: absolute;
        top: 15vmax;
        left: 15vmin;
        height: 425px;
        width: 70vmin;
        animation: tipMove .2s;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        box-shadow: 1px 1px 1px $green,inset 1px 1px 1px $green,inset -1px -1px 1px $green;        
        border: solid 1px $green;
        
        .tip {
            text-align: left;
            display: block;
            width: 100%
        }
        .body {
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between
        }
        .confrim{
            @include sc(18px, #fff);
            font-weight: bold;
            margin-top: .8rem;
            background-color: $green;
            width: 100%;
            text-align: center;
            line-height: 30px;
            border: 1px;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }
     .box-color-SSS {
       box-shadow: 1px 1px 1px gold,inset 1px 1px 1px gold,inset -1px -1px 1px gold;        
       border: solid 1px gold;
       .confrim {
           background: gold;
       }
     }
     .box-color-SS {
       box-shadow: 1px 1px 1px goldenrod,inset 1px 1px 1px goldenrod,inset -1px -1px 1px goldenrod;        
       border: solid 1px goldenrod;
       .confrim {
           background: goldenrod;
       }
     }
     .box-color-S {
       box-shadow: 1px 1px 1px red,inset 1px 1px 1px red,inset -1px -1px 1px red;        
       border: solid 1px red;
       .confrim {
           background: red;
       }
     }
     .box-color-A {
       box-shadow: 1px 1px 1px #2196f3,inset 1px 1px 1px #2196f3,inset -1px -1px 1px #2196f3;        
       border: solid 1px #2196f3;
       .confrim {
           background: #2196f3;
       }
     }
     .box-color-B {
       box-shadow: 1px 1px 1px green,inset 1px 1px 1px green,inset -1px -1px 1px gold;        
       border: solid 1px green;
       .confrim {
           background: green;
       }
     }
     .box-color-C {
       box-shadow: 1px 1px 1px gray,inset 1px 1px 1px gray,inset -1px -1px 1px gray;        
       border: solid 1px gray;
       .confrim {
           background: gray;
       }
     }
</style>
