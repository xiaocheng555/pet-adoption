import Vue from 'vue'
import App from './App'
import httpUse from '@/config/http/use'

Vue.config.productionTip = false

App.mpType = 'app'

// 声明 http 插件
httpUse()

const app = new Vue({
    ...App
})
app.$mount()
