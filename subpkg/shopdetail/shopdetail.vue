<template>
	<view class="goods-detail-container">
		<swiper :autoplay="true" interval="3000" :indicator-dots="true" >
			<swiper-item v-for="(item,index) in detailList.pics" :key="index">
				<image :src="item.pics_big" mode="" @click="preview(item.pics_id)"></image>
			</swiper-item>
		</swiper>
		<view class="data-list" v-if="detailList.goods_name">
			<view class="data-list-money">￥{{detailList.goods_price}}</view>
			<view class="data-list-body">
				<view>{{detailList.goods_name}}</view>
			    <view class="data-list-body-item" >
					<uni-icons type='star' size="17"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view>快递：免运费{{total}}</view>
		</view>
		<view>
			<rich-text :nodes="detailList.goods_introduce"></rich-text>
		</view>
		<view class="nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {mapMutations} from 'vuex'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				detailList:[],
				length:0,
				options: [{
				icon: 'shop',
				text: '店铺'
				}, {
				icon: 'cart',
				text: '购物车',
				info: null
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
				text: '加入购物车',
				backgroundColor: '#ff0000',
				color: '#fff'
				},
				{
				text: '立即购买',
				backgroundColor: '#ffa200',
				color: '#fff'
				}
				]
			}
		},
		onLoad(){
			this.loaddetail()
			
		},
		computed:{
			...mapState('mycart',['cart']),
			...mapGetters('mycart',['total'])
			
		},
		watch:{
			//这样写初次渲染时不会执行，需要写完整写法
			// total(newval){
			// 	this.options[1].info=newval;
			// }
			//完整写法
			total:{
				handler(newval){
					this.options[1].info=newval
				},
				//声明该侦听是否在初次加载时就执行
				immediate:true
			}
		},
		methods: {
			...mapMutations('mycart',['addCart']),
		  async loaddetail(){
				const res=await uni.$http.get('http://192.168.7.59:3000/goods_detail')
				console.log(res);
				res.data[1].goods_introduce = res.data[1].goods_introduce.replace(/<img/g, '<img style="display:block;" ').replace(/webp/g,'jpg');
				this.detailList=res.data[1];
				console.log(this.detailList);
				console.log(this.total);
			},
			preview(i){
				console.log(i);
				let ImgList=this.detailList.pics.map(item=>
					  item.pics_big
				)
				
				uni.previewImage({
					current:i,
					urls:ImgList
				})
			},
			onClick(e){
				console.log(e);
				if(e.index==1){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				console.log(e);
				if(e.index==0){
					const goods={
					goods_id: this.detailList.goods_id, // 商品的Id
					goods_name: this.detailList.goods_name, // 商品的名称
					goods_price: this.detailList.goods_price, // 商品的价格
					goods_state: 1, // 商品的数量
					goods_small_logo: this.detailList.goods_small_logo, // 商品的图片
					goods_state: true,
					}
					this.addCart(goods)
				}
				console.log(this.total);
				
			}
		}
	}
</script>

<style lang="less">
	swiper{
		width: 100%;
		height: 550rpx;
		image{
		width: 100%;
		height:100%;
	}
	}
	.data-list{
		margin: 30rpx 0;
		padding: 0 20rpx;
		font-size: 30rpx;
		color: gray;
	.data-list-money{
		font-size: 34rpx;
		color: red;
		font-weight: bold;
	}	
	.data-list-body{
		display: flex;
		justify-content: space-between;
		margin: 10rpx 0;
		color: #333;
		view:nth-child(1){
			width: 75%;
		}
		.data-list-body-item{
			
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			right: 30rpx;
		}
		
	}}
	.goods-detail-container{
		padding-bottom: 50px;
	}
	.nav {
	// 为商品导航组件添加固定定位
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	}
</style>
