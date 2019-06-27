<template>
  <view class="home-filter c-1px-b">
    <view class="home-filter-item">
      <picker 
				:value="petClassIndex" 
				:range="petClassOptions" 
				range-key="label" 
				@change="handlePetClassChange">
				{{ petClassLabel || '宠物类型' }}
        <image class="arrow-icon" src="/static/icons/arrow-right.svg"></image>
			</picker>
    </view>
    <view class="home-filter-item">
			<!-- 省市区选择器 -->
			<citypicker 
        v-if="cityData"
				:city-data="cityData" 
				@confirm="handleCitypickerConfirm">
				<view class="citypicker-text">
          {{ addressLabel || '地址' }}
          <image class="arrow-icon" src="/static/icons/arrow-right.svg"></image>
        </view>
			</citypicker>
		</view>
  </view>
</template>

<script>
import Citypicker from '@/library/components/citypicker'
import { mapActions } from 'vuex'

export default {
  components: {
    Citypicker
  },
  data () {
    return {
      customBar: this.$customBar,
      petClassLabel: '',
      petClassOptions: [],
      petClassIndex: -1,
      cityData: null,
      addressLabel: ''
    }
  },
  methods: {
    ...mapActions([
			'fetchPetClass',
			'fetchChinaAddressData'
    ]),
    // 初始化数据
		initData () {
			this.fetchPetClass().then(data => {
				this.petClassOptions = data
			})
			this.fetchChinaAddressData().then((data) => {
				this.cityData = data
			})
    },
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
  },
  created () {
    this.$app.ready(() => {
			this.initData()
		})
  }
}
</script>

<style lang='scss'>
.home-filter {
  // position: sticky;
  // z-index: 10;
  display: flex;
  padding: 8px 16px;
  // margin-top: 10px;
  // border-radius: 10px 10px 0 0;
  background-color: #ffffff;
  
  &:after {
    border-color: $M03 !important;
  }
}
.home-filter-item {
  flex: 1;
  text-align: center;
  height: 25px;
  min-width: 40px;
  padding: 0 12px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  color: #333333;
}
.arrow-icon {
  display: inline-block;
  width: 12px;
  height: 10px;
  margin-left: 5px;
  transform: rotate(90deg);
}
</style>