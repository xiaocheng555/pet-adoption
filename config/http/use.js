import Vue from 'vue'
import Http from '@/library/plugins/http'
import httpConfig from '@/config/http'
import CONFIG from '@/config'

export default function() {
	Vue.use(Http, {
		config: httpConfig,
		baseUrl: CONFIG.host
	})
}
