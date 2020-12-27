import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/mock/mock.js'
import '@/mock/table.js'
import ElementUI from 'element-ui'  //引用element-ui 组件库
import 'element-ui/lib/theme-chalk/index.css'  //引入样式库
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件
import VueAnimateNumber from 'vue-animate-number'  // 动态数据
Vue.use(VueAnimateNumber)
Vue.use(ElementUI)





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
