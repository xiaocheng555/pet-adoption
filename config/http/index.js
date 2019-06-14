import Vue from 'vue'
import Http from '@/library/plugins/http'
import httpConfig from '@/config/http/base'
import CONFIG from '@/config'

export default {
 install () {
		Vue.use(Http, {
			config: httpConfig,
			baseUrl: CONFIG.host
		})
	}
}
