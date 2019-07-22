<template>
  <c-page title="申请内容">
    <c-form class="c-form_label-row" ref="cForm">
			<view v-for="(item, key) in applyFormData" :key="key">
				<view class="c-gutter-md"></view>
				<!-- 单选框 radio -->
				<template v-if="item.type === 'radio'">
					<c-form-item class="c-padding-bottem-sm" :label="item.label" :required="item.required" block>
						<c-radio :options="item.options" v-model="item.value" disabled></c-radio>
					</c-form-item>
				</template>
				<!-- 多选框 -->
				<template v-else-if="item.type === 'checkbox'">
					<c-form-item class="c-padding-bottem-sm" :label="item.label" :required="item.required" block>
						<c-checkbox :options="item.options" v-model="item.value" disabled></c-checkbox>
					</c-form-item>
				</template>
				<!-- 富文本框 textarea -->
				<template v-else>
					<c-form-item :label="item.label" block>
            <view class="input-text">{{ item.value || '未填写' }}</view>
					</c-form-item>
				</template>
			</view>
		</c-form>
		<view class="c-fixed-bottom-bar-wrapper">
			<view class="c-fixed-bottom-bar">
				<!-- 审批操作 -->
				<view v-if="applyData.state === PET_APPLY_STATE.wait.value" class="bottom-bar-inner">
					<button class="bottom-bar-item c-button-danger" @tap="showRefusePopup">拒绝</button>
					<button class="bottom-bar-item c-button-primary" @tap="submitApprove(PET_APPLY_STATE.success.value)">通过</button>
				</view>
				<!-- 显示审批结果 -->
				<view v-else class="bottom-bar-result">
					审批状态: 
					<text class="bottom-bar-state-text" :class="[ getApplyStateObj(applyData.state).class ]">
						{{ getApplyStateObj(applyData.state).label }}
					</text> 
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
				 <button class="refuse-popup-button c-button-danger" @tap="submitApprove(PET_APPLY_STATE.fail.value, refuseContent)">确定拒绝</button>
			</view>
		</uni-popup>
  </c-page>
</template>

<script>
import { PET_APPLY_STATE } from '@/library/constant'
import uniPopup from '@/library/components/uni-ui/uni-popup/uni-popup.vue'

export default {
  components: {
		uniPopup
	},
  data () {
    return {
			PET_APPLY_STATE,
			applyData: {},
			applyFormData: {},
			refusePopupVisible: false,
			refuseContent: ''
    }
	},
	methods: {
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
		submitApprove (state, remark) {
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
            uni.hideLoading()
            this.applyData.state = state
          }).catch(() => {
            uni.showToast({
              icon: 'none',
              title: '操作失败'
            })
          })
        }
			})
		}
	},
  onLoad (params) {
		this.applyData = JSON.parse(params.data)
    this.applyFormData = this.applyData.infos
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
</style>