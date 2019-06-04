import Vue from 'vue'
import App from './App'
import http from '@/config/http'

Vue.config.productionTip = false

App.mpType = 'app'

// 声明 http 插件
http.use()

const app = new Vue({
    ...App
})
app.$mount()
