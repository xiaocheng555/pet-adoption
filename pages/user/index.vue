<template>
  <c-page ref="cPage" :has-header="false">
    <view class="user-info">
      <image class="user-info-bg" mode="aspectFill" src="/static/images/user-info-bg.jpeg"></image>
      <view class="user-info-main">
        <image class="user-info-avatar" :src="userInfo.avatarUrl || '/static/images/default-avatar.png'"></image>
        <view>
          <text v-if="hasLogin" class="user-info-name">{{ userInfo.nickName }}</text>
          <button 
						v-else
            class="user-login-button" 
            open-type="getUserInfo" 
            @getuserinfo="toLogin">登录</button>
        </view>
      </view>
    </view>
    <view class="nav-list">
      <view 
        class="nav-list-item" 
        :class="[ nav.class || '' ]"
        v-for="(nav, index) in navList" 
        :key="index">
        <view class="nav-list-content" @tap="handleNavTap(nav)">
          <image class="nav-list-icon" :src="nav.icon"></image>
          <text class="nav-list-text">{{ nav.text }}</text>
          <image class="nav-list-arrow" src="/static/icons/arrow-right.svg"></image>
        </view>
      </view>
    </view>
  </c-page>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import rewardImgUrl from '@/static/images/reward-qr-code.jpg'
  import defaultAvatar from '@/static/images/default-avatar.png'
  
  const APPRECIATE = 'appreciate'
  
  export default {
    data() {
      return {
        defaultAvatar,
        navList: [
          {
            icon: '/static/icons/user__apply.svg',
            text: '我的申请',
            url: '/pages/user/apply/index'
          },
          {
            icon: '/static/icons/user__feed.svg',
            text: '我的送养',
            url: '/pages/user/feed/index'
          },
          {
            icon: '/static/icons/user__search-people.svg',
            text: '我的寻主启示',
            url: '/pages/user/owner-search/index',
            status: 'developing'
          },
          {
            icon: '/static/icons/user__search-pet.svg',
            text: '我的寻宠启示',
            url: '/pages/user/pet-search/index',
            status: 'developing'
          },
          {
            icon: '/static/icons/user__appreciate.svg',
            text: '赞赏支持',
            key: APPRECIATE,
            class: 'margin-top'
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'userInfo',
      ]),
      ...mapGetters([
        'hasLogin'
      ])
    },
    methods: {
			...mapActions([
				'getUserInfo'
			]),
      // 登录
      toLogin () {
        this.getUserInfo()
      },
      // nav点击事件
      handleNavTap (nav) {
        if (nav.key === APPRECIATE) {
          this.previewImage()
          return
        }
        if (nav.status === 'developing') {
					return uni.showToast({
						icon: 'none',
						title: '努力开发中，敬请期待...'
					})
				}
				if (!this.hasLogin) {
					return uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
        if (nav.url) {
          uni.navigateTo({
            url: nav.url
          })
        }
      },
      // 预览打赏图片
      previewImage () {
        uni.previewImage({
          current: 0,
          urls: [rewardImgUrl]
        })
      }
    }
  }
</script>

<style lang="scss">
.user-info {
  position: relative;
  width: 100%;
  height: 150px;
  padding-top: 70px;
  text-align: center;
}
.user-info-bg {
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.user-info-main {
  position: relative;
  z-index: 1;
}
.user-info-avatar {
  width: 60px;
  height: 60px;
  border-radius: 100px;
}
.user-info-name {
  font-size: 16px;
  text-align: center;
  color: $A06;
}
.user-login-button {
	display: inline-block;
	height: 30px;
	line-height: 30px;
	margin-top: 5px;
	padding: 0 10px;
	font-size: 14px;
	text-align: center;
  color: $M08;
}
.nav-list {
  margin-bottom: 10px;
}
.nav-list-item {
  &.margin-top {
    margin-top: 12px;
  }
}
.nav-list-content {
  display: flex;
  background-color: #ffffff;
  padding: 0 16px;
  line-height: 55px;
  align-items: center;
}
.nav-list-icon {
  width: 20px;
  height: 20px;
  margin-right: 16px;
}
.nav-list-text {
  flex: 1;
  font-size: 16px;
  color: $M10;
}
.nav-list-arrow {
  width: 8px;
  height: 13.5px;
}
</style>
