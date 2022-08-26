<template>
	<view>
		<block v-for="(item,index) in shoplist" :key="index" >
			<view @click="goshopdetail(item)">
				<mylist :shoplist="item" @click="goshopdetail(item)"></mylist>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:[],
				shoplist:[],
				pageno:1,
				pagesize:5,
				total:null,
				isloading:false
			}
		},
		onLoad(options){
			console.log(options);
			this.loadshop()
		},
		onReachBottom() {
			if (this.isloading) return;
			this.pageno++;
			if(this.pageno*this.pagesize>this.total){
				return uni.$showMsg('到底了');
				return;
				
			}
			this.loadshop();
			
			
		},
		onPullDownRefresh(){
			console.log('下拉');
			this.pageno=1;
			this.shoplist=[];
			this.loadshop(() => uni.stopPullDownRefresh())
		}
		,
		methods: {
			async loadshop(){
				this.isloading=true;
				this.datalist=this.shoplist;
				const res=await uni.$http.get('http://192.168.7.59:3000/searchlist2?_page='+this.pageno+'&_limit='+this.pagesize);
				this.isloading=false;
				this.shoplist=res.data;
				this.total=res.header['X-Total-Count'];
				console.log(res.header['X-Total-Count']); 
				console.log(res);
				this.shoplist=this.shoplist.concat(this.datalist);
				console.log(this.shoplist);
				
			},
			goshopdetail(item){
				console.log(item);
				uni.navigateTo({
					url:'/subpkg/shopdetail/shopdetail'
				})
			}
		}
	}
</script>

<style lang="less">
	
</style>
