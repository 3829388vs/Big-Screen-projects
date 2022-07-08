import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style/reset.css"
import "./uitls/flexible"
import * as echarts from 'echarts'
import ElementUI from 'element-ui';
// import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
