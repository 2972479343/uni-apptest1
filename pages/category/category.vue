<template>
	<view>
		<search @click='goSearch()'></search>
		<view class="container" >
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh
			+ 'px'}" >
			<block v-for="(item,index) in catelist" :key="item.id">
			    <view :class="['left-scroll-view-item', index === active ? 'active' : '']"  @click='changeactive(index)'>{{item.cat_name}}</view>
			</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh
			+ 'px'}" :scroll-top="scrollTop">
			
			<view v-for="(item1,index) in datalist" :key="item1.cat_id">
				<view class="item-name">/{{item1.cat_name}}/</view>
				<view class="datas">
				<view v-for="(item2,index) in datalist[index].children" :key='index' class="data-view">
					<image :src="item2.cat_icon" mode=""></image>
					<view>{{item2.cat_name}}</view>
				</view>
				</view>
			</view>
			
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import tabMixin from '@/mixins/tabbar-icon.js'
	import search from"../../components/search/search.vue"
	export default {
		// mixins:[tabMixin],
		data() {
			return {
				wh:0,
				catelist:[],
				datalist:[],
				active:0,
				scrollTop:0
			}
		},
		components:{
			search
		},

		onLoad() {
		// 获取当前系统的信息
		const sysInfo = uni.getSystemInfoSync()
		// 为 wh 窗口可用高度动态赋值
		this.wh = sysInfo.windowHeight;
		this.loadCate(),
		this.settabbar()
		},
		methods: {
			async loadCate(){
				const res=await uni.$http.get('http://192.168.7.59:3000/cate');
				console.log(res);
				this.catelist=res.data;
				this.datalist=this.catelist[0].children;
				
				
			},
			changeactive(index){
				
				this.active=index;
				this.datalist=this.catelist[index].children;
				console.log(this.datalist);
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			goSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="less">
	
	.container{
		display: flex;
		.left-scroll-view{
			width: 240rpx;
			background-color:#f7f7f7;
			text-align: center;
			.left-scroll-view-item{
				width: 100%;
				height: 150rpx;
				line-height: 150rpx;
			}
			.active{
				background-color: white;
				position: relative;
				 &::before{
					 content: '';
					 display: block;
					 width: 10rpx;
					 height: 100rpx;
					 background-color: #C00000;
					 position: absolute;
					 top: 30rpx;
					 
				 }
				
			}
		}
		
		.right-scroll-view{
			.item-name{
				text-align: center;
				margin-top: 20rpx;
			}
			.datas{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: center;
			.data-view{
				display: flex;
				flex-direction: column;
				image{
					width: 150rpx;
					height: 120rpx;
				}
			}}
		}
	}
</style>
