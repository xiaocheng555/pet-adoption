<template>
	<view class="c-checker">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Array,
				default: () => []
			},
			multiple : {
				type: Boolean,
				default: false
			}
		},
		provide () {
			return {
				cChecker: this
			}
		},
		data () {
			return {
				checkedListVal: [],
				checkerItems: []
			}
		},
		methods: {
			// checkedListVal添加选项值
			addCheckedListVal (checkItemVal) {
				this.checkedListVal.push(checkItemVal)
			},
			// checkedListVal 删除某个选项值
			deleteCheckedListVal (checkItemVal) {
				let index = this.checkedListVal.indexOf(checkItemVal)
				if (index > -1) {
					this.checkedListVal.splice(index, 1)
				}
			},
			// checkedListVal 清空选项值
			clearCheckedListVal () {
				this.checkerItems.forEach(item => {
					const checkerItem = item.getCheckerItem()
					checkerItem.isChecked = false
				})
				this.checkedListVal = []
			}
		},
		watch: {
			checkedListVal (val) {
				this.$emit('input', val)
			},
			value (val) {
				this.checkedListVal = val
			}
		}
	}
</script>

<style lang="scss">
.c-checker {
	padding: 0 12px;
}
</style>
