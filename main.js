import Vue from 'vue'
import App from './App'
import http from '@/config/http'
import CHeader from '@/library/components/c-header'
import CForm from '@/library/components/c-form'
import CFormItem from '@/library/components/c-form/c-form-item'
import CInput from '@/library/components/c-input'
import CInlineLoading from '@/library/components/c-inline-loading'

Vue.config.productionTip = false

App.mpType = 'app'

// 声明 http 插件
http.install()

// 声明全局组件
Vue.component('c-header', CHeader)
Vue.component('c-form', CForm)
Vue.component('c-form-item', CFormItem)
Vue.component('c-input', CInput)
Vue.component('c-inline-loading', CInlineLoading)

const app = new Vue({
    ...App
})
app.$mount()
