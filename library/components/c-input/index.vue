<template>
	<view class="c-input">
		<input 
			class="c-input-inner" 
			v-model="inputVal" 
			:placeholder="placeholder" 
			:focus="focus"
			@focus="handleFocus"
			@blur="handleBlur"/>
			<image :src="clearIcon" class="c-input-clear" v-if="clear && inputVal.length > 0" @click="handleClear"></image>
	</view>
</template>

<script>
	import clearIcon from './assets/clear.svg'
	
	export default {
		props: {
			value: {
				type: String | Number,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			clear: {
				type: Boolean,
				default: false
			},
			focus: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				clearIcon,
				inputVal: ''
			}
		},
		methods: {
			handleClear () {
				this.inputVal = ''
			},
			handleFocus () {
				this.$emit('focus')
			},
			handleBlur () {
				this.$emit('blur')
			}
		},
		watch: {
			inputVal (val) {
				this.$emit('input', val)
			},
			input (val) {
				this.inputVal = val
			}
		}
	}
</script>

<style lang="scss" scoped>
.c-input {
	display: flex;
	align-items: center;
}
.c-input-inner {
	flex: 1;
	height: 28px;
	padding: 5px 12px;
	line-height:28px;
	font-size: 16px;
	background: #ffffff;
}
.c-input-clear {
	width: 20px;
	height: 20px;
}

</style>
