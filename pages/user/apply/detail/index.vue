<template>
  <c-page title="申请内容">
		<c-inline-loading align="center" v-if="pageLoading"></c-inline-loading>
		<template v-else>
			<apply-form-detail :form="applyFormData"></apply-form-detail>
			<view class="c-fixed-bottom-bar-wrapper">
				<view class="c-fixed-bottom-bar">
					<!-- 显示审批结果 -->
					<view class="bottom-bar-result">
						状态: 
						<text class="bottom-bar-state-text" :class="[ getApplyStateObj(applyData.state).class ]">
							{{ getApplyStateObj(applyData.state).label }}
						</text> 
						<text 
							class="bottom-bar-state-link" 
							v-if="hasRefuseContent"
							@click="viewRefuseContent">(说明)</text>
					</view>
				</view>
			</view>
		</template>
  </c-page>
</template>

<script>
import { PET_APPLY_STATE } from '@/library/constant'
import ApplyFormDetail from '@/library/components/apply-form-detail'

export default {
  components: {
		ApplyFormDetail
	},
  data () {
    return {
			PET_APPLY_STATE,
			pageLoading: true,
			applyData: {},
			applyFormData: {}
    }
	},
	computed: {
		hasRefuseContent () {
			return this.applyData.state === PET_APPLY_STATE.fail.value && this.applyData.remark
		}
	},
	methods: {
		// 获取审批详情
		fetchApplyDetail (applyId) {
			this.$http.get(`/pet/api/v1/adoption/application/${applyId}`).then(res => {
				if (res) {
					this.pageLoading = false
					this.applyData = {
						petId: res.pet_id,
						applyId: res.uuid,
						infos: res.infos ? JSON.parse(res.infos) : {},
						state: res.state,
						remark: res.remark.trim()
					}
					this.applyFormData = Object.values(this.applyData.infos).sort((a, b) => {
						return a.no - b.no
					})
				}
			})
		},
		// 获取审批状态的对象
		getApplyStateObj (state) {
			let stateObj = {}
			Object.values(PET_APPLY_STATE).some(item => {
				console.log(item, 'value')
				if (item.value === state) {
					stateObj = item
					return true
				}
			})
			return stateObj
		},
		// 查看拒绝的原因
		viewRefuseContent () {
			this.$promisify(uni.showModal)({ 
				title: '说明',
        content: this.applyData.remark,
				showCancel: false,
      })
		}
	},
  onLoad (params) {
		this.$app.ready(() => {
      this.fetchApplyDetail(params.applyId)
    })
  }
}
</script>

<style lang='scss'>
.input-text {
	padding: 5px 0;
	min-height: 60px;
}
.bottom-bar-inner {
	display: flex;
}
.bottom-bar-item {
	flex: 1;
	margin-left: 10px;
	margin-right: 10px;
}
.refuse-popup-inner {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	padding: 12px 16px;
	text-align: left;
}
.refuse-popup-textarea {
	box-sizing: border-box;
	width: 100%;
	padding: 8px 10px;
	height: 120px;
	border-radius: 8px;
	font-size: 16px;
	line-height: 26px;
	background-color: $M03;
}
.refuse-popup-button {
	margin-top: 12px;
}
.bottom-bar-result {
	line-height: 36px;
	font-size: 15px;
	color: $M10;
}
.bottom-bar-state-text {
	margin-left: 6px;
}
.bottom-bar-state-link {
	margin-left: 10px;
	color: $A06;
	text-decoration: underline;
}
</style>