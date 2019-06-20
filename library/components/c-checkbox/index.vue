<template>
	<checkbox-group @change="checkboxChange">
		<label class="c-checkbox-item" v-for="item in options" :key="item.value">
			<view class="c-checkbox-checkbox">
				<checkbox :value="item.value" :checked="item.checked" />
			</view>
			<view class="c-checkbox-label">{{item.name || item.value}}</view>
		</label>
	</checkbox-group>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array,
				default: () => []
			},
			value: {
				default: () => [],
				default: []
			}
		},
		methods: {
			checkboxChange (e) {
				let values = e.detail.value
				this.handleCheckboxChange(values)
			},
			handleCheckboxChange (values) {
				let options = this.options
				for (var i = 0, lenI = options.length; i < lenI; ++i) {
					const item = options[i]
					if(values.includes(item.value)) {
						this.$set(item, 'checked', true)
						this.addItemValue(item.value)
					} else{
						this.$set(item, 'checked', false)
						this.deleteItemValue(item.value)
					}
				}
			},
			addItemValue (val) {
				let _value = [].concat(this.value)
				_value.push(val)
				this.$emit('inupt', _value)
			},
			deleteItemValue (val) {
				let _value = [].concat(this.value)
				let index = this.value.indexOf(val)
				if (index > -1) {
					_value.splice(index, 1)
					this.$emit('inupt', _value)
				}
			}
		},
		watch: {
			value (val) {
				this.handleCheckboxChange(val)
			}
		},
		created () {
			if (this.value.length > 0) {
				console.log(this.value, 'this.va')
				this.handleCheckboxChange(this.value)
			}
		}
	}
</script>

<style lang="scss">
.c-checkbox-item {
	display: flex;
	padding: 8px 0;
	align-items: center;
}
.c-checkbox-checkbox {
	margin-right: 10px;
}
.c-checkbox-label {
	font-size: 16px;
	color: $M10;
}
</style>
