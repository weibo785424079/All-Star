<template>
    <div style="height:100%;width:100%;">
         <canvas  ref="canvas"></canvas>
         <div class="start-game-box" v-if="startGanmeBox" @click="start">
             Start SpaceShip War!!
         </div>
    </div>
  
</template>

<script>
import { Observable, Subject } from 'rxjs'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      startGanmeBox: true,
      score: 0
    }
  },
  mounted () {
    const canvas = this.$refs['canvas']
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    const ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.ctx = ctx
    // this.createGame()
  },
  methods: {
    createGame () {
      let StarsStream = this.initStars()
      let SpaceShip = this.initHero()
      let EnemysStream = this.initEnemy()
      let HeroFireStream = this.initHeroFire()
      let ScoreStream = this.initScore()
      this.ScoreStream = ScoreStream
      this.ScoreStream.subscribe(res => {
        this.paintScore(res)
      })
      var HeroShots = Observable
        .combineLatest(HeroFireStream, SpaceShip, (shotEvents, spaceShip) => {
          return {x: spaceShip.x, y: spaceShip.y, timestamp: shotEvents.timestamp}
        })
        .scan(function (shotArray, shot) {
          shotArray.push({x: shot.x, y: shot.y})
          return shotArray
        }, [])
        //   .distinctUntilChanged(shot => shot.timestamp)
      const Game = Observable.combineLatest(StarsStream, SpaceShip, EnemysStream, HeroShots, function (stars, spaceship, enemies, shots, score) {
        return {stars, spaceship, enemies, shots}
      })
      this.Game = Game
    },
    start () {
      this.createGame()
      var subscribtion = this.Game.subscribe(this.renderScence)
      this.couldGame = subscribtion
      this.startGanmeBox = false
    },
    renderScence (actors) {
      const isOver = this.ganeOver(actors.spaceship, actors.enemies)
      const _this = this
      if (isOver) {
        MessageBox({
          message: '飞船被击毁，game over！！',
          complete (res) {
            // debugger
          }
        })
        _this.startGanmeBox = true
        _this.couldGame.unsubscribe()
        return
      }
      this.paintStars(actors.stars)
      this.paintSpaceShip(actors.spaceship.x, actors.spaceship.y)
      this.paintEnemys(actors.enemies)
      this.paintHeroShot(actors.shots, actors.enemies)
    },
    initStars () {
      const _this = this
      var SPEED = 100
      var STAR_NUM = 30
      var StarsStream = Observable.range(1, STAR_NUM)
        .map(() => {
          return {
            x: parseInt(Math.random() * this.canvas.width),
            y: parseInt(Math.random() * this.canvas.height),
            size: Math.random() * 1 + 1
          }
        })
        .toArray()
        .flatMap((startArray) => {
          return Observable.interval(SPEED).map(() => {
            startArray.forEach(function (star) {
              if (star.y > _this.canvas.height) {
                star.y = 0
              }
              star.y += 3
            })
            return startArray
          })
        })
    //   StarsStream.subscribe(function (startArray) {
        // paintStars(startArray)
    //   })
      return StarsStream
    },
    initHero () {
      const _this = this
      var HERO_Y = _this.canvas.height - 15
      var mouseMove = Observable.fromEvent(_this.canvas, 'mousemove')
      var SpaceSip = mouseMove
        .map(function (event) {
          return {
            x: event.clientX / 2,
            y: HERO_Y
          }
        })
        .startWith({
          x: _this.canvas.width / 2,
          y: HERO_Y
        })
      return SpaceSip
    //   SpaceSip.subscribe(source => {
        // paintSpaceShip(...source)
    //   })
    },
    initEnemy () {
      const _this = this
      const SPEED = 1500
      let Enemys = Observable.interval(SPEED)
        .scan((enemyArray) => {
          var enemy = {
            x: parseInt(Math.random() * _this.canvas.width),
            y: -30
          }
          enemyArray.push(enemy)
          return enemyArray
        }, [])
      return Enemys
    },
    initHeroFire () {
      var playerFiring = Observable
        .merge(
        Observable.fromEvent(this.canvas, 'click'),
        Observable.fromEvent(this.canvas, 'keydown')
        .filter(function (evt) { return evt.keycode === 32 })
        )
        // .sample(Observable.interval(200))
        .timestamp()
      return playerFiring
    },
    initScore () {
      var ScoreSubject = new Subject()
      .scan((prev, cur) => {
        return prev + cur
      }, 0)
      return ScoreSubject
    },
    drawTriangle (x, y, width, color, direction) {
      const ctx = this.ctx
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x - width, y)
      ctx.lineTo(x, direction === 'up' ? y - width : y + width)
      ctx.lineTo(x + width, y)
      ctx.lineTo(x - width, y)
      ctx.fill()
    },
    paintStars (stars) {
      const _this = this
      const ctx = _this.canvas.getContext('2d')
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height)
      ctx.fillStyle = '#ffffff'
      stars.forEach(function (star) {
        ctx.fillRect(star.x, star.y, star.size, star.size)
      })
    },
    paintEnemys (enemies) {
      const _this = this
      enemies.forEach(function (enemy) {
        enemy.y += 3
        enemy.x += _this.getRandomInt(-5, 5)
        if (!enemy.isDead) {
          _this.drawTriangle(enemy.x, enemy.y, 10, '#00ff00', 'down')
        }
      })
    },
    paintScore (score) {
      this.score = score
      this.ctx.fillStyle = '#fff'
      this.ctx.font = 'bold 14px sans-serif'
      this.ctx.fillText('score: ' + score, 20, 15)
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    paintSpaceShip (x, y) {
      this.drawTriangle(x, y, 20, '#ff0000', 'up')
    },
    paintHeroShot (heroShots, enemies) {
      var SHOT_SPEED = 10
      var SCORE_INCREASE = 10
      var ScoreSubject = this.ScoreStream
      const _this = this
      heroShots.forEach(function (shot) {
        for (var l = 0; l < enemies.length; l++) {
          var enemy = enemies[l]
          if (!enemy.isDead && _this.collision(shot, enemy)) {
            ScoreSubject.next(SCORE_INCREASE)
            enemy.isDead = true
            shot.x = shot.y = -100
            break
          }
        }
        shot.y -= SHOT_SPEED
        ScoreSubject.next(0)
        _this.drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up')
      })
    },
    collision (target1, target2) {
      return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
      (target1.y > target2.y - 20 && target1.y < target2.y + 20)
    },
    ganeOver (ship, enemies) {
      return enemies.some(enemy => {
        if (!enemy.isDead && this.collision(ship, enemy)) {
          return true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../static/mixin';
 .start-game-box {
     height: 50px;
     width: 200px;
     background: #fff;
     line-height: 50px;
     font-weight: bold;
     z-index: 1000;        
     @include sc(14px,black);
     @include center;
     @include borderRadius(5px);
 }
</style>
