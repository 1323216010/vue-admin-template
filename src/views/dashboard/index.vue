<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}</div>
    <ul>
      <li v-for="file in list" :key="file.id">
      
        <div>
          {{file.name}}
          <el-button  size="small" type="primary"  @click=fileReview(file.url) >预览</el-button>
          <el-button  size="small" type="primary"  @click=fileReview2(file.name) >预览2</el-button>
        </div>

      </li>
      
    </ul>


    <el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:8012/fileUpload" :on-preview="handlePreview"
      :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">能上传任意格式文件，最好不超过500M</div>
    </el-upload>
  </div>
  

</template>

<script>
import { mapGetters } from 'vuex'
import Base64 from 'js-base64'
import {encode} from 'js-base64'
import axios from 'axios';
import { deletByName, queryByLimit } from '@/api/files/files'

export default {
  name: 'Dashboard',
  data() {
    return {
      list: [],
      fileList: [{ name: '样例.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      queryByLimit(0, 100).then(res => {
        console.log(res)
        var arr = [];
        for(let i = 0;i < res.length; ++i) {
          this.list.push(res[i])
        }
      })
      // userApi.getFile(1).then(res => {
      //   console.log(res);
      // })

      // deletByName("1").then(res => {
      //   console.log(res)
      // })

      // axios.get('http://localhost:8333/files/21').then( res => {
      //   console.log(res.data.name);
      // })
    },
    fileReview(url) {
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + url);
    },

    fileReview2(name) {
      var url = 'http://127.0.0.1:8080/file/' + name;
      console.log(url)
      console.log(encodeURIComponent(encode(url)))
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + encodeURIComponent(encode(url)));
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 20px;
    line-height: 46px;
  }
}
</style>
