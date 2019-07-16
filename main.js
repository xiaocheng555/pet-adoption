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
import CRadio from '@/library/components/c-radio'
import CCheckbox from '@/library/components/c-checkbox'
import CInlineLoading from '@/library/components/c-inline-loading'
import CTag from '@/library/components/c-tag'
import CTab from '@/library/components/c-tab'
import CNoData from '@/library/components/c-no-data'

Vue.config.productionTip = false

App.mpType = 'app'

// 声明全局变量
Vue.prototype.$http = http
console.log(http.get, 'http')
Vue.prototype.$store = store
Vue.prototype.$promisify = promisify

// 声明全局组件
Vue.component('c-header', CHeader)
Vue.component('c-page', CPage)
Vue.component('c-form', CForm)
Vue.component('c-form-item', CFormItem)
Vue.component('c-input', CInput)
Vue.component('c-checker', CChecker)
Vue.component('c-radio', CRadio)
Vue.component('c-checkbox', CCheckbox)
Vue.component('c-checker-item', CCheckerItem)
Vue.component('c-inline-loading', CInlineLoading)
Vue.component('c-tag', CTag)
Vue.component('c-tab', CTab)
Vue.component('c-no-data', CNoData)

const app = new Vue({
    ...App,
		store
})
app.$mount()
