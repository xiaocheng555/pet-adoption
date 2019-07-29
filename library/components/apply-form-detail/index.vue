<template>
  <c-form class="c-form_label-row" ref="cForm">
		<view v-for="(item, index) in form" :key="index">
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
</template>

<script>
export default {
  props: {
    form: {
      type: Array | Object,
      default: () => []  
    }
  }
}
</script>

<style lang='scss'>
.input-text {
	padding: 5px 0;
	min-height: 60px;
}
</style>