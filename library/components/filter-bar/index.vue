<template>
  <view class="home-section-header c-1px-b" :style="{ top: customBar + 'px' }">
		<view class="section-header-title">
			宠物领养
		</view>
		<view class="section-header-right">
			<view class="action-item section-header-filter c-1px-r">
				<picker 
					:value="petClassIndex" 
					:range="petClassOptions" 
					range-key="label" 
					@change="handlePetClassChange">
        	<image class="action-item-icon" src="/static/icons/filter-blue.svg"></image>
					{{ petClassLabel || '宠物类型' }}
				</picker>
			</view>
			<view class="action-item">
				<!-- 省市区选择器 -->
				<citypicker 
	        v-if="cityData"
					:city-data="cityData" 
					@confirm="handleCitypickerConfirm">
        	<image class="action-item-icon" src="/static/icons/location-blue.svg"></image>
          {{ addressLabel || '地址' }}
				</citypicker>
			</view>
		</view>
	</view>
</template>

<script>
import Citypicker from '@/library/components/citypicker'
import { mapState } from 'vuex'

export default {
  components: {
    Citypicker
  },
  data () {
    return {
      customBar: this.$customBar,
      petClassLabel: '',
      petClassIndex: -1,
      addressLabel: ''
    }
	},
	computed: {
    ...mapState([
      'cityData',
      'petClassOptions'
    ])
  },
  methods: {
    // 地址选择器的确认事件
		handleCitypickerConfirm ({labels, values}) {
      this.addressLabel = labels[1]
      this.$emit('address-change', {
        labels, 
        values
      })
    },
    // 宠物类型改变事件
    handlePetClassChange (e) {
      this.petClassIndex = e.target.value
			const petClassOption = this.petClassOptions[this.petClassIndex]
      this.petClassLabel = petClassOption.label
      this.$emit('pet-class-change', petClassOption.value)
    }
  }
}
</script>

<style lang='scss'>
.home-section-header {
	position: sticky !important;
	z-index: 1;
	display: flex;
	margin-top: 12px;
	padding: 0 16px;
	align-items: center;
	background-color: #ffffff;
}
.section-header-title {
	flex: 1;
	font-size: 15px;
	color: #000000;
	line-height: 50px;
}
.section-header-right {
	display: flex;
}
.section-header-filter {
	margin-right: 16px;
	padding-right: 16px;
	
	&:after {
		border-color: $M04;
	}
}
.action-item {
	display: flex;
	font-size: 14px;
	line-height: 20px;
	color: $M08;
}
.action-item-icon {
	position: relative;
	top: 2px;
	display: inline-block;
	margin-right: 5px;
	width: 18px;
	height: 18px;
}
.action-item-text {
	display: inline-block;
	max-width: 60px;
}
</style>