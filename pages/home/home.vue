<template>
	
	<view>
		<view class="search-box">
		
		<search @click='goSearch()'></search>
		</view>
		<swiper autoplay="true" indicator-dots="true" circular="true" duration="1000" interval="3000">
			<swiper-item v-for="(item,index) in swiperImg" :key="item.goods_id">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view id="nav">
			
			<view v-for="(item,index) in cateImg" :key="index" >
				<image :src="item.image_src" @click="nicktab(item)"></image>
				<!-- <view>{{item.name}}</view> -->
			</view>
		</view>
		<view id="floor" v-for="(item,index) in floorList" :key="index">
			<image :src="item.floor_title.image_src" mode="" style=""></image>
			<view class="fimg">
				
			<navigator :url="item.product_list[0].navigator_url" class="listleft">
			<view >
				<image :src="item.product_list[0].image_src" mode="" :style="{width: item.product_list[0].image_width+'rpx'}"></image>
			</view>
			</navigator>
			<view class="listright">
			<view  v-for="(item1,index1) in item.product_list" v-if="index1!=0" :key="index">
				<image :src="item1.image_src"  :style="{width: item1.image_width+'rpx'}"></image>
			</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import tabMixin from '../../mixins/tabbar-icon.js'
	import search from"../../components/search/search.vue"
	export default {
		// mixins:[tabMixin],
		data() {
			return {
				swiperImg: [],
				cateImg:[],
				floorList:[],
			
			};
		},
		
		onLoad() {
			this.loadSwiper(),
			this.loadCate(),
			this.loadFloor(),
			this.settabbar()
		},
		methods: {
			async loadSwiper() {
				const res = await uni.$http.get("http://192.168.7.59:3000/swiperimg");
				console.log(res);
				this.swiperImg = res.data;
			},
			async loadCate(){
				const res=await uni.$http.get("http://192.168.7.59:3000/indexCate");
				console.log(res);
				this.cateImg=res.data
			},
			nicktab(item){
				if(item.name=='分类'){
					uni.switchTab({
					url:'/pages/category/category'
				})
			
				}else{
					console.log('无');
				}
				
			},
			async loadFloor(){
				const res=await uni.$http.get('http://192.168.7.59:3000/floorlist');
				console.log(res);
				this.floorList=res.data;
			},
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		onHide() {
			
		}

	}
</script>

<style lang="less">
	swiper {
		    width: 100%;
			height: 300rpx;
		navigator{
			height: 320rpx;
		image {
			width: 100%;
			height: 100%;
			
		}
		}
		  
	}
	
		
		#nav{
			// width: 100%;
			// height: 100rpx;
			display: flex;
			// flex-direction: row;
			justify-content: space-around;
			margin-top: 20rpx;
			image{
				width:100rpx ;
				height: 120rpx;
			}
		
	}
	#floor {
		margin-top: 20rpx;
		image{
		width: 100%;
		height: 60rpx;
		}
		.fimg{
			width: 100%;
			display: flex;
			 .listleft image{
			 height: 350rpx;
			 margin-right: 20rpx;
		 }
		 .listright{
			 display: flex;
			 flex-wrap: wrap;
			 image{
				 height: 170rpx;
				 margin-right: 20rpx;
			 }
		 }
		}
		
	}
	.search-box{
		position: sticky;
		top:0
	}
</style>
