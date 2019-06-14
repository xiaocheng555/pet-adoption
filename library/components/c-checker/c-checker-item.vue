<template>
	<view 
		class="c-checker-item" 
		:class="[isChecked ? 'c-checker-item_checked' : '']"
		@tap="handleTap">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				default: ''
			}
		},
		inject: ['cChecker'],
		data () {
			return {
				isChecked: false
			}
		},
		methods: {
			// 点击事件
			handleTap () {
				this.isChecked = !this.isChecked
				
				const checker = this.cChecker || this.$parent
				if (checker) {
					// 如果是多选
					if (checker.multiple) {
						// 如果选中
						if (this.isChecked) {
							checker.addCheckedListVal(this.value)
						} else { // 如果取消徐泽
							checker.deleteCheckedListVal(this.value)
						}
					} else { // 如果是单选
						// 如果选中
						if (this.isChecked) {
							// 清空所有选中项
							checker.clearCheckedListVal()
							// 添加当前项
							checker.addCheckedListVal(this.value)
							this.isChecked = true
						} else { // 如果取消徐泽
							checker.deleteCheckedListVal(this.value)
						}
					}
				}
			}
		},
		watch: {
			'checker.value' (val) {
				console.log('======')
				val.forEach(item => {
					this.isChecked = item.value === this.value
				})
			}
		},
		mounted () {
			const checker = this.cChecker || this.$parent
			const _this = this
			if (checker) {
				checker.checkerItems.push({
					getCheckerItem () {
						return _this
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.c-checker-item {
	display: inline-block;
	margin-right: 10px;
	margin-top: 5px;
	margin-bottom: 5px;
	padding: 0 14px;
	border: 1px solid $M05;
	border-radius: 30px;
	font-size: 15px;
	line-height: 28px;
	color: $M07;
	background-color: #ffffff;
}

.c-checker-item_checked {
	border-color: $A04;
	color: $A06;
	background-color: $A01;
}
</style>
