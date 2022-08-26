<template>
	<view>
		<view>{{one}}</view>
		<view>{{two}}</view>
		<view>{{three}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				one:'',
				two:'',
				three:''
			};
		},
		onLoad(options){
			console.log(options);
				if(options.goods_id==38){
					this.one='1';
					console.log(this.one);
				}else if(options.goods_id==129){
					this.two='2';
					console.log(2);
				}else if(options.goods_id==395){
					this.three='3';
					console.log(3);
				}else{
					console.log(66);
				}
		}
	}
</script>

<style lang="less">

</style>
