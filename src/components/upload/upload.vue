<template>
  <div id='out'>
      <img id="J_UploadPictureBtn" class="J_UploadPictureBtn" :src="imgUrl" v-if="imgUrl" alt="">
      <button v-else class="btn J_UploadPictureBtn">上传图片</button>
       
<!-- <p>上传进度<span id="J_UploadProgress">0</span>%</p> -->
    <!-- <p>上传结果图片</p> -->
<div id="J_PicturePreview" class="preview-picture">
</div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'upload',
  data () {
    return {
      utilType: {
        isPrototype: function (data) {
          return Object.prototype.toString.call(data).toLowerCase()
        },
        isJSON: function (data) {
          return this.isPrototype(data) === '[object object]'
        },
        isFunction: function (data) {
          return this.isPrototype(data) === '[object function]'
        }
      }
    }
  },
  props: ['imgUrl'],
  mounted () {
    this.upload()
  },
  methods: {
    upload () {
      const _this = this
      let btn = document.querySelector('.J_UploadPictureBtn')
      let progressElem = document.getElementById('J_UploadProgress')
      let previewElem = document.getElementById('J_PicturePreview')
      btn.addEventListener('click', function () {
        _this.uploadAction({
          success: function (result) {
            console.log(result)
            if (result && result.success && result.data && result.data.pictureUrl) {
              _this.$emit('setPic', result.data.pictureUrl)
              previewElem.innerHTML = '<img id=previewImg src="' + result.data.pictureUrl + '" style="max-width: 100%;width:150px;">'
            }
          },
          progress: function (data) {
            if (data && data * 1 > 0) {
              progressElem.innerText = data
            }
          }
        })
      })
    },
    uploadAction (options) {
      // if (this.utilType().isJSON(options)) {
        // console.log('upload is null')
        // return
      // }
      let _option = {}
      _option.success = this.utilType.isFunction(options.success) ? options.success : function () {}
      _option.fail = this.utilType.isFunction(options.fail) ? options.fail : function () {}
      _option.progress = this.utilType.isFunction(options.progress) ? options.progcess : function () {}
      this.uploadEvent(_option)
    },
    requestEvent (options) {
      try {
        let formData = options.formData
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            options.success(JSON.parse(xhr.responseText))
          }
        }
        xhr.upload.onprogress = function (evt) {
          // let loaded = evt.loaded
          // let tot = evt.total
          // let per = Math.floor(100 * loaded / tot)
          // options.progress(per)
          console.log('onprogress')
        }
        xhr.open('post', '/api/asyncuplod/')
        xhr.send(formData)
      } catch (err) {
        console.log(err)
      }
    },
    uploadEvent (options) {
      let _this = this
      let file
      let formData = new FormData()
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('name', 'files')
      input.setAttribute('accept', 'image/*')
      input.click()
      input.onchange = function () {
        file = input.files[0]
        formData.append('files', file)
        _this.requestEvent({
          formData,
          success: options.success,
          fail: options.fail,
          progcess: options.progress
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
#out {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
 #previewImg {
   width: 100px
 }
 img{
   width: 375px;
   height: 110px;
 }
}
</style>
