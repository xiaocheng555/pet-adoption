import Vue from 'vue'
import App from './App'
import http from '@/config/http'
import CHeader from '@/library/components/c-header'

Vue.config.productionTip = false

App.mpType = 'app'

// 声明 http 插件
http.use()

// 声明全局组件
Vue.component('c-header', CHeader)

const app = new Vue({
    ...App
})
app.$mount()
