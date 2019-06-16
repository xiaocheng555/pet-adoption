<template>
	<view class="c-form-item" :class="[noBorderTop ? 'no-border-top' : '', block ? 'c-form-item_block' : '' ]">
		<label class="c-form-item-label" :style="{ 'width': labelWidth }">
			{{ label }}
			<text v-if="required" class="c-form-item-star">*</text>
		</label>
		<view class="c-form-item-content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String
			},
			labelWidth: {
				type: String
			},
			required: {
				type: Boolean,
				default: false
			},
			noBorderTop: {
				type: Boolean,
				default: false
			},
			// block 从上到下布局
			block: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss">
.c-form-item {
	box-sizing: border-box;
	display: flex;
	min-height: 50px;
	padding: 5px 16px;
	font-size: 16px;
	background-color: #ffffff;
}
.c-form-item_block {
	display: block;
}
.c-form-item.no-border-top {
	&:before {
		border-top: none;
	}
}
.c-form-item-label {
	display: block;
	color: $uni-color-title;
	padding-right: 11px;
	padding-top: 8px;
	padding-bottom: 8px;
}
.c-form-item-star {
	color: red;
}
.c-form-item-content {
	flex: 1;
	align-self: center;
}
</style>
