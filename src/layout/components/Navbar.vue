<template>
  <div class="navbar">


    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
  
    <breadcrumb class="breadcrumb-container" />


    
    <div class="right-menu">

      <a style="">        
        <span style="color: #666;margin-right: 10px;margin-top: 5px;float: left;">{{ YYYYMMDD }}</span>
        <span style="color: #666;margin-right: 10px;margin-top: 5px;float: left;">{{ HHMMSS }}</span>
     </a>
      
      <el-dropdown class="avatar-container" trigger="click" >


        <div class="avatar-wrapper" >

          <!-- <img src="http://111.230.194.21:8012/demo/WPS%E5%9B%BE%E7%89%87-%E4%BF%AE%E6%94%B9%E5%B0%BA%E5%AF%B8.png" width="200" height="200" /> -->
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <img src="http://111.230.194.21:8012/demo/WPS%E5%9B%BE%E7%89%87-%E4%BF%AE%E6%94%B9%E5%B0%BA%E5%AF%B8.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>



  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import moment from 'moment'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },

  data () {
    return {
      HHMMSS: moment().format('HH:mm:ss'),
      YYYYMMDD: moment().format('YYYY/MM/DD'),
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },

  mounted () {
    this.setNowTime()
  },

  methods: {

    // 设置当前时间
    setNowTime () {
      setInterval(() => {
        this.HHMMSS = moment().format('HH:mm:ss')
      }, 500)
    },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  // .right {
  //   margin-right: 40px;

  //   .infoUl {
  //     display: flex;
  //     align-items: center;
  //     font-size: 16px;
  //     color: #666;

  //     &>li {
  //       margin-left: 20px;
  //     }

  //     .logout {
  //       padding: 8px 27px;
  //       background: #508A7D;
  //       border-radius: 5px;
  //       color: #fff;
  //       cursor: pointer;
  //     }
  //   }
  // }

}
</style>
