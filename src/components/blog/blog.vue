<template>
  <div class="out">
      blog页面
      <div class="box" ref="img_box"></div>
      <div class="fixd-bottom" @click="readOneImg">上传</div>
      <div class="show" ref="show"></div>
      <span class='drag' id="drag" ref="drag">拖拽区域</span>
  </div>
</template>

<script>
export default {
  name: 'imgRef',
  data () {
    return {}
  },
  mounted () {
    const _this = this
    var drag = this.$refs['drag']
    drag.addEventListener('dragenter', function (e) {
      this.className = 'drag_hover'
    }, false)
    drag.addEventListener('dragleave', function (e) {
    // 拖拽鼠标离开区域时
      this.className = ''
    }, false)
    drag.addEventListener('drop', function (e) {
    // 当鼠标执行‘放’的动作时，执行读取文件操作
      var files = e.dataTransfer.files
      this.className = ''
      if (files.length !== 0) {
        _this.checkFile(files)
      };
      e.preventDefault()
      e.stopPropagation()
    }, false)
    drag.addEventListener('dragover', function (e) {
      // 当对象拖动到目标对象时触发
      e.dataTransfer.dragEffect = 'copy'
      e.preventDefault()
      e.stopPropagation()
    }, false)
  },
  methods: {
    readOneImg () {
      var input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('multiple', 'multiple')
      this.$refs['img_box'].appendChild(input)
      input.click()
      const _this = this
      input.addEventListener('change', function () {
        var files = this.files
        if (files.length) {
          _this.checkFile(files)
        }
      })
    },
    checkFile (files) {
      const show = this.$refs['show']
      if (!(window.FileReader && window.File && window.FileList && window.Blob)) {
        show.innerHTML = '您的浏览器不支持fileReader'
        return false
      }
      var i = 0
      var html = ''
      var func = function () {
        if (i >= files.length) {
          show.innerHTML = html
          return
        }
        var file = files[i]
        let reader = new FileReader()
        if (!/image\/.*/.test(file.type)) {
          show.innerHTML = '请确保文件为图像类型'
          return false
        }
        // async
        reader.onload = function (e) {
          html += '<img width= "100%"  src= ' + e.target.result + '><br>'
          i++
          func() // 下一张
        }
        reader.readAsDataURL(file)
      }
      func()
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../../static/mixin.scss';
.out {
  margin-top: 1rem;

}
.fixd-bottom {
  line-height: 40px;
  background: $blue;
  text-align: center;
  color: #fff;
  
}

 .drag{ box-sizing: border-box;width: 100%;height: 100px;border: 1px dotted #333; text-align: center; line-height: 100px; color: #aaa; display: inline-block;}
    .drag_hover{background: #FAD6F9;}
</style>
