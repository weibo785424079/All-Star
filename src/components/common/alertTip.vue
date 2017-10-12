 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <header class="title">球星卡</header>
            <!-- <div class="tip_icon">
                <span></span>
                <span></span>
            </div> -->
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim" @click="closeTip">确认</div>
        </section>
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
      mounted () {},
      props: ['alertText'],
      methods: {
        closeTip () {
          this.$emit('closeTip')
        }
      }
    }
</script>

<style lang="scss" scoped>
    @import '../../../static/mixin';

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
        position: absolute;
        top: 30vmax;
        left: 5vmin;
        // transform: translateX(-50%);
        width: 90vmin;
        animation: tipMove .2s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_text{
            @include sc(.7rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .8rem;
            padding: 0 .4rem;
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
    
</style>
