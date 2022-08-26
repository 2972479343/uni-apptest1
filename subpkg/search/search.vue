<template>
	<view>
		<view class="search-box">
		<!-- 使用 uni-ui 提供的搜索组件 -->
		<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<view class="search-list" v-if="querylist.length!=0">
			<view v-for="(item,index) in querylist" :key="item.goods_id" class="search-list-item">{{item.goods_name}}</view>
		</view>
		<view v-if="querylist.length==0" class="history-list">
			<uni-icons type="trash" size="17" @click="cleanHistory" v-if="historylist.length!=0"></uni-icons>
			<uni-tag v-for="(item1,index) in historylist" :key="index" @click="golist()" class="history-list-item" :text="item1"></uni-tag>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				word:'',
				querylist:[],
				historylist:[]
			};
		},
		onLoad(){
			this.historylist = JSON.parse(uni.getStorageSync('word') || '[]')
		},
		methods:{
			
			input(value){
				clearInterval(this.timer);
				this.timer=setTimeout(()=>{
					this.word=value;
					this.historylist.unshift(value);
					this.historylist=[...new Set(this.historylist)];
					uni.setStorageSync('word',JSON.stringify(this.historylist))
						
					this.loadSearch()
				},1000)
					
				
			},
			async loadSearch(){
				if(this.word==''){
					this.querylist=[];
					return;
				}
				let url='http://192.168.7.59:3000/searchlist1?q='+this.word;
				const res=await uni.$http.get(url);
				console.log(res);
				this.querylist=res.data;
				console.log(this.querylist);
			},
			cleanHistory(){
				this.historylist=[];
				uni.setStorageSync('word',[]);
			},
			golist(){
				console.log(1);
				uni.navigateTo({
					url:'/subpkg/shop_list/shop_list?id=1'
				})
			}
			
			
		}
	}
</script>

<style lang="less">
.uni-searchbar {
/* #ifndef APP-NVUE */
display: flex;
/* #endif */
flex-direction: row;
position: relative;
padding: 16rpx;
/* 将默认的 #FFFFFF 改为 #C00000 */
background-color: #c00000;
}
.search-list{
	margin-top: 20rpx;
.search-list-item{
	widows: 100%;
	height: 90rpx;
	line-height: 90rpx;
	border: 1px solid #efefef;;
	// bor-shadow:5rpx 5rpx 5rpx gray;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	padding: 0 10rpx;
	// margin: 10rpx 5rpx;
	// background-color: gray;
	
}}
.history-list{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	margin-top: 30rpx;
	position: relative;
	 .history-list-item{
		 margin: 10rpx 10rpx;
		 background-color: #e4dfdb;
		 color: white;
		 // border: 1px solid gray;
		 
	 }
}
.uniui-trash:before{
	position: absolute;
	right:5rpx;
	top: -12rpx;
}
</style>
