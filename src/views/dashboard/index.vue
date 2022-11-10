<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}</div>
    <ul>
      <li v-for="file in list" :key="file.id">
      
        <div>
          {{file.name}}
          <el-button  size="small" type="primary"  @click=fileReview(file.url) >预览</el-button>
          <el-button  size="small" type="primary"  @click=deletByName(file.name) >删除</el-button>
        </div>

      </li>
      
    </ul>


    <el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:8012/fileUpload" :on-preview="handlePreview"
      :file-list="fileList" :auto-upload="false">
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
      console.log('refresh')
      queryByLimit(0, 100).then(res => {
        this.list = res;
      })

      // axios.get('http://localhost:8333/files/21').then( res => {
      //   console.log(res.data.name);
      // })
    },
    fileReview(url) {
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + url);
    },

    deletByName(name) {
      axios.get('http://127.0.0.1:8012/deleteFile', { //params参数必写, 如果没有可传参数，传{}以
        params: {
          fileName: encodeURIComponent(name)
        }}).then(res => {
          this.refresh();
        })
    },

    async submitUpload() {
      await this.$refs.upload.submit();
      this.$refs.upload.clearFiles();
      setTimeout(() =>{
        this.refresh();
      }, 1000);
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
