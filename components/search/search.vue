<template>
	
		<view class="containerser">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" @click="searchItem">
		<uni-icons type="search" size="17"></uni-icons>
		<text class="placeholder">搜索</text>
		</view>
		</view>
	
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		methods:{
			searchItem(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.containerser{
		background-color: #C00000;
		height: 100rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		.my-search-box{
			width: 90%;
			height: 70rpx;
			background-color: #fff;
			border-radius: 16px;
			margin-left: 35rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>