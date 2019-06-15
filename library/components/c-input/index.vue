<template>
	<view class="c-input">
		<textarea 
			v-if="type === 'textarea'"
			class="c-input-textarea"
			v-model="inputVal" 
			:placeholder="placeholder" 
			:placeholder-style="placeholderStyle" 
			:focus="focus"
			:disabled="disabled"
			:auto-height="autoHeight"
			:maxlength="maxlength"
			:style="height ? { height: height } : ''"
			 @focus="handleFocus"
			 @blur="handleBlur"/>
		<input 
			v-else
			class="c-input-inner" 
			v-model="inputVal" 
			:type="type"
			:disabled="disabled"
			:maxlength="maxlength"
			:placeholder="placeholder" 
			:placeholder-style="placeholderStyle" 
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
			placeholderStyle: {
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: Number,
				default: 100
			},
			clear: {
				type: Boolean,
				default: false
			},
			focus: {
				type: Boolean,
				default: false
			},
			/* textarea 专属属性 */
			// 
			autoHeight: {
				type: Boolean,
				default: false
			},
			height: {
				type: String,
				default: 'auto'
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
			value (val) {
				this.inputVal = val
			}
		}
	}
</script>

<style lang="scss">
.c-input {
	display: flex;
	align-items: center;
}
.c-input-textarea {
	box-sizing: border-box;
	width: 100%;
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 16px;
}
.c-input-inner {
	flex: 1;
	height: 28px;
	line-height:28px;
	font-size: 16px;
	background: #ffffff;
	border: none;
	outline: none;
}
.c-input-clear {
	width: 20px;
	height: 20px;
}
</style>
