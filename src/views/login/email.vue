<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="emailLoginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">邮箱登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="emailLoginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="box01"
          style="width: 50%;"
        />
        <span style="float: right;padding-top: 6px;padding-right: 10px;">
            <el-button size="small" @click="sendMsg" round class="box02" >发送验证码</el-button>
        </span>
        
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="emailLoginForm.password"
          :type="passwordType"
          placeholder="6位验证码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 20px"
        @click.native.prevent="handleLogin"
        >登录
      </el-button>

      <div class="clearfix">
        <div class="box1">
          <p>注册</p>
        </div>
        <div class="box2">
          <p>忘记密码</p>
        </div>
        <div class="box3">
          <slot></slot>
        </div>
      </div>
    </el-form>
  </div>
</template>
  
<script>
import { validUsername } from "@/utils/validate";
import { sendMsg } from "@/api/user";

export default {
  name: "Email",
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      callback();
      // }
    };
    const validatePassword = (rule, value, callback) => {
      if (false) {
        callback(new Error("验证码为六位数"));
      } else {
        callback();
      }
    };
    return {
      emailLoginForm: {
        username: "1596232649@qq.com",
        password: "566305",
      },
      loading: false,
      passwordType: "",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    sendMsg() {
      sendMsg(this.emailLoginForm).then((res) => {
        console.log(`发送邮件成功`);
      });
    },
    handleLogin() {
      console.log("0");
      this.$refs.loginForm.validate((valid) => {
        console.log("1");
        if (valid) {
          console.log("2");
          this.loading = true;
          this.$store
            .dispatch("user/login", this.emailLoginForm)
            .then(() => {
              console.log(this.emailLoginForm);
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
  
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  * {
    box-sizing: border-box;
  }



  .box1 {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    float: left;
    width: 20%;

  }

  .box2 {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    float: left;
    width: 55%;

  }

  .box3 {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    float: right;
    width: 25%;

  }

  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
  
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
  