<template>
	<view class="text-list">
		
			<view class="text-list-left">
				<image :src="shoplist.goods_small_logo" mode=""></image>
			</view>
			
			<view class="text-list-right">
				<view>{{shoplist.goods_name}}</view>
				<view class="text-list-right-item">{{shoplist.goods_price}}</view>
			</view>
		
	</view>
</template>

<script>
	export default {
		name:"mylist",
		props:["shoplist"],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.text-list{
		display: flex;
		// justify-content:space-between;
		height: 250rpx;
		border-bottom: 1px solid #747474;
		 .text-list-left{
			margin-right: 20rpx;
			 image{
				 width: 250rpx;
				 height: 215rpx;
			}				  
		 }
		 .text-list-right{
			 font-size: 32rpx;
			 display: flex;
			 flex-direction: column;
			 justify-content: space-around;
			  .text-list-right-item{
				  color: red;
				  font-size: 34rpx;
			  }
		 }
	}
</style>