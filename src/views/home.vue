<template>
  <div>
    <el-container>
      <el-aside class="aside">
        <h1 class="aside-logo">
          <router-link :to="{name: 'home.index'}">Wang-Xiansheng</router-link>
        </h1>
        <el-menu class="aside-menu">
          <router-link :to="{ name:'home.index' }">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">
                <router-link :to="{name: 'home.index'}">首页</router-link>
              </span>
            </el-menu-item>
          </router-link>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>表格</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link :to="{name: 'Stable'}">表格查询</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link :to="{name: 'ediTable'}">表格操作</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header class="head">
          <div class="head-title">
            <h1>后台管理系统</h1>
          </div>
          <div class="head-person">
            <i class="el-icon-search"></i>
            <i class="el-icon-bell"></i>
            <i class="el-icon-full-screen"></i>
            <div>
              <img :src="image" alt="" width="50px" height="50px">
              <el-dropdown>
                <span class="el-dropdown-link">
                  admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return{
      image: '',
      iscollapse: true
    }
  },
  created() {
    this.image = window.sessionStorage.getItem('img')
  },
  methods: {
    loginOut() {
      window.sessionStorage.removeItem('data')
      window.sessionStorage.removeItem('img')
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style lang="scss">
body {
  background-color:#F8F8F8;
}
.aside {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid #ccc;
  z-index: 3096;
  &::-webkit-scrollbar {
    width: 0;
  }
  &-logo {
    line-height: 60px;
    color:black;
    text-align: center;
  }
  &-menu {
     border-right: none !important;
     
  }
}
.head {
  display: flex;
  margin-left: 300px;
  position: sticky;
  top: 0;
  line-height: 60px;
  box-shadow: 0px 2px 4px 0px #ccc;
  z-index: 2048;
  background-color: #fff;
  &-title {
    margin-right: auto;
    color: #3c4a54;
  }
  &-person {
    
    & > i {
      margin-right: 20px;
    }
  & > div {
    display: inline-block;
    & > img {
      margin-right: 8px;
      border-radius: 50%;
    }
   }
  }
}

.main {
  margin-left: 300px;
  overflow: hidden;
  padding: 20px;
}

</style>
  
