<template>
  <div id='out'>
      <input type="file" ref="file">
      <input type="button" ref="upload" value="上传" @click="upload" name="" id="">
     
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'upload',
  methods: {
    upload () {
      var formData = new FormData()
      var file = this.$refs.file.files[0]
      formData.append('img', file)
      debugger
      $.ajax({
        type: 'POST',
        url: '/api/upload/',
        processData: false,
        contentType: false,
        data: formData,
        success: function (res) {
          debugger
        }
      })
    }
  },
  mounted () {
    $.get('api/static/timg.jpeg').done(res => {
      debugger
    })
  }
}
</script>

<style lang='scss' scoped> 
  #out {
    margin-top: 1rem;
  }
</style>
