<template>
	<view class="c-form-item c-1px-t" :class="[noBorderTop ? 'no-border-top' : '']">
		<label class="c-form-item-label" :style="{ 'width': labelWidthValue }">
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
			}
		},
		inject: ['cForm'],
		data () {
			return {
				labelWidthValue: null,
				bar: this.formData
			}
		},
		methods: {
			setLabelWidth () {
				if (this.labelWidth) {
					this.labelWidthValue = this.labelWidth
				} else {
					let formLabelWidth = this.$parent.labelWidth || this.cForm.labelWidth
					this.labelWidthValue = formLabelWidth
				}
			}
		},
		mounted () {
			this.setLabelWidth()
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
	align-items: center;
}
.c-form-item.no-border-top {
	&:before {
		border-top: none;
	}
}
.c-form-item-label {
	color: $uni-color-title;
	padding-right: 4px;
}
.c-form-item-star {
	color: red;
}
.c-form-item-content {
	flex: 1;
}
</style>
