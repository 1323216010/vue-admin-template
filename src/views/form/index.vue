<template>
  <div class="app-container">


    <div style="flex: 1;">
      <el-table  :data="list" >
        <el-table-column label="文件名" prop="name">

          <template slot-scope="scope">
            <el-button  size="mini" type="text" @click="fileReview(scope.row.url)">{{ scope.row.name }}</el-button>
          </template>

        </el-table-column>
        <el-table-column label="文件类型" prop="type" />
        <el-table-column  label="操作" prop="type">
          
          <template slot-scope="scope">
            <el-button  size="mini" type="text" @click="download(scope.row.name)">下载</el-button>
          </template>

        </el-table-column>

        <el-table-column label="文件大小" prop="volume" />

      </el-table>
    </div>



  </div>
</template>

<script>
import variables from '@/utils/variables';
import { deletByName, queryByLimit } from '@/api/files/files'

export default {
  data() {
    return {
      list: [],
    }
  },

  created() {
    this.refresh()
  },

  methods: {

    refresh() {
      queryByLimit(0, 100).then(res => {
        this.list = res;
      })
    },

    fileReview(url) {
      window.open(variables.onlinePreview + url);
    },

    download(name) {
      window.open(variables.downloadFile + name);
    },

  }
}
</script>

<style scoped>

</style>

