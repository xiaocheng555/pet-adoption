<template>
  <view class="c-tab">
    <view 
      class="c-tab-item" 
      :class="[ currTab.value === tab.value ? 'c-tab-item_active' : '' ]"
      v-for="(tab, index) in data" 
      :key="index"
      @tap="handleTap(tab)">
      {{ tab.label }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currTab: null
    }
  },
  methods: {
    setTabValue (tab) {
      this.currTab = tab
      this.$emit('change', tab)
    },
    // 处理tap事件
    handleTap (tab) {
      this.currTab = tab
      this.$emit('change', tab)
    }
  },
  created () {
    if (this.data[0]) {
      this.currTab = this.data[0]
    }
  }
}
</script>

<style lang='scss'>
.c-tab {
  position: relative;
  z-index: 10;
  display: flex;
  padding: 0 16px;
  margin-top: -2px;
  // margin-top: 10px;
  border-radius: 12px 12px 0 0;
  background-color: #ffffff;
  overflow: auto;
  box-shadow: 0 0.5px 3px #DFE3E6;
}
.c-tab-item {
  flex: 1;
  display: inline-block;
  height: 54px;
  padding: 0 18px;
  line-height: 54px;
  font-size: 16px;
  text-align: center;
  color: $M09;
}
.c-tab-item_active {
  position: relative;
  color: $A06;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    border-radius: 2px 2px 0 0;
    bottom: 0;
    left: 50%;
    width: 80px;
    transform: translateX(-50%);
    border: 1.5px solid $A06;
  }
}
</style>