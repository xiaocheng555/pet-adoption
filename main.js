import Vue from 'vue'
import App from './App'
import http from '@/config/http'
import store from './store'
import { promisify } from '@/library/utils'
import CHeader from '@/library/components/c-header'
import CPage from '@/library/components/c-page'
import CForm from '@/library/components/c-form'
import CFormItem from '@/library/components/c-form/c-form-item'
import CInput from '@/library/components/c-input'
import CChecker from '@/library/components/c-checker'
import CCheckerItem from '@/library/components/c-checker/c-checker-item'
import CInlineLoading from '@/library/components/c-inline-loading'

Vue.config.productionTip = false

App.mpType = 'app'

// 声明全局变量
Vue.prototype.$store = store
Vue.prototype.$promisify = promisify
Vue.prototype.$http = http

// 声明全局组件
Vue.component('c-header', CHeader)
Vue.component('c-page', CPage)
Vue.component('c-form', CForm)
Vue.component('c-form-item', CFormItem)
Vue.component('c-input', CInput)
Vue.component('c-checker', CChecker)
Vue.component('c-checker-item', CCheckerItem)
Vue.component('c-inline-loading', CInlineLoading)

const app = new Vue({
    ...App,
		store
})
app.$mount()
