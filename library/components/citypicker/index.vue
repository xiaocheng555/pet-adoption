<template>
	<view class="citypicker">
		<picker 
			mode="multiSelector" 
			:value="multiIndex" 
			:range="multiArray"
			:range-key="'label'"
			@columnchange="handleMultiPickerColumnChange"
			@change="handleConfirm">
			<slot></slot>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			cityData: {
				type: Array,
				default: () => []
			},
			defaultValue: {
				type: Array,
				default: () => []
			}
		},
		data () {
			return {
				multiIndex: [0, 0, 0],
				multiArray: []
			}
		},
		methods: {
			initMultiArray () {
				if (this.defaultValue.length > 0) {
					// TODO:
				} else {
					let provinces = this.cityData
					let citys = provinces[this.multiIndex[0]].children
					let localities = citys[this.multiIndex[1]].children
					this.multiArray[0] = provinces
					this.multiArray[1] = citys
					this.multiArray[2] = localities
				}
			},
			// picker的change事件
			handleMultiPickerColumnChange (e) {
				let value = e.detail.value
				let provinces = this.cityData
				let citys
				let localities
				
			  switch (e.detail.column) {
					// 第一列的值改变，省的值改变
      		case 0:
						this.multiIndex[0] = value
						this.multiIndex[1] = 0
						this.multiIndex[2] = 0
						citys = provinces[value].children
						localities = citys[0].children
						this.multiArray[1] = citys
						this.multiArray[2] = localities
						break
					// 第二列的值改变，市的值改变
					case 1:
						this.multiIndex[1] = value
						this.multiIndex[2] = 0
						citys = provinces[this.multiIndex[0]].children
						localities = citys[value].children
						this.multiArray[2] = localities
						break
					// 第三列的值改变，区的值改变
					case 2:
						this.multiIndex[2] = value
						break
				}
			},
			// 确定按钮
			handleConfirm () {
				let provinces = this.cityData
				let currProvince = provinces[this.multiIndex[0]]
				let currCity = currProvince.children[this.multiIndex[1]]
				let currLocality = currCity.children[this.multiIndex[2]]
				
				// 返回值
				let labels = [currProvince.label, currCity.label, currLocality.label]
				let values = [currProvince.value, currCity.value, currLocality.value]
				this.$emit('confirm', {
					labels, 
					values
				})
			}
		},
		created () {
			this.initMultiArray()
		}
	}
</script>

<style>
</style>
