<template>
  <c-page title="申请内容">
		<c-inline-loading align="center" v-if="pageLoading"></c-inline-loading>
		<template v-else>
			<apply-form-detail :form="applyFormData"></apply-form-detail>
			<view class="c-fixed-bottom-bar-wrapper">
				<view class="c-fixed-bottom-bar">
					<!-- 审批操作 -->
					<view v-if="applyData.state === PET_APPLY_STATE.wait.value" class="bottom-bar-inner">
						<button class="bottom-bar-item c-button-danger" @tap="showRefusePopup">拒绝</button>
						<button class="bottom-bar-item c-button-primary" @tap="submitApprove(PET_APPLY_STATE.success.value, '申请通过后领养将自动下架，确认是否通过？')">通过</button>
					</view>
					<!-- 显示审批结果 -->
					<view v-else class="bottom-bar-result">
						审批状态: 
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
			<!-- 拒绝时填写内容的弹窗 -->
			<uni-popup 
				:show="refusePopupVisible" 
				position="bottom" 
				@hidePopup="hideRefusePopup">
				<view class="refuse-popup-inner">
					<textarea 
						class="refuse-popup-textarea"
						v-model="refuseContent" 
						fixed="true"
						cursor-spacing="85"
						placeholder="请输入拒绝原因（选填）" 
						maxlength="100" />
					 <button class="refuse-popup-button c-button-danger" @tap="submitApprove(PET_APPLY_STATE.fail.value, '确定是否拒绝' ,refuseContent)">确定拒绝</button>
				</view>
			</uni-popup>
		</template>
  </c-page>
</template>

<script>
import { mapMutations } from 'vuex'
import { PET_APPLY_STATE } from '@/library/constant'
import uniPopup from '@/library/components/uni-ui/uni-popup/uni-popup.vue'
import ApplyFormDetail from '@/library/components/apply-form-detail'

export default {
  components: {
		uniPopup,
		ApplyFormDetail
	},
  data () {
    return {
			PET_APPLY_STATE,
			pageLoading: true,
			applyData: {},
			applyFormData: [],
			refusePopupVisible: false,
			refuseContent: ''
    }
	},
	computed: {
		hasRefuseContent () {
			return this.applyData.state === PET_APPLY_STATE.fail.value && this.applyData.remark
		}
	},
	methods: {
		...mapMutations('feed', [
			'updateRefreshApplyApproval'
		]),
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
		// 显示拒绝内容的弹窗
		showRefusePopup () {
			this.refusePopupVisible = true
		},
		// 隐藏拒绝内容的弹窗
		hideRefusePopup () {
			this.refusePopupVisible = false
		},
		// 提交审批
		submitApprove (state, tip, remark) {
			let { applyId, petId } = this.applyData
			this.$promisify(uni.showModal)({ 
        title: '提示',
        content: '确定提交？'
      }).then(res => {
        if (res.confirm) {
          uni.showLoading({
						title: '正在提交...'
					})
          this.$http.put(`/pet/api/v1/adoption/pet/${petId}/application/${applyId}`, {
						state: state,
						remark: remark
          }).then(() => {
						this.refusePopupVisible = false
            uni.hideLoading()
						this.applyData.state = state
						// 更新领养申请人列表数据
						this.updateRefreshApplyApproval(true)
          }).catch(() => {
						this.refusePopupVisible = false
            uni.showToast({
              icon: 'none',
              title: '操作失败'
            })
          })
        }
			})
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