export default{
	namespaced: true,
	state:{
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
		// [
		// 	{goods_id:1,title:'电脑',price:6785,goods_state:1},
		// 	{goods_id:2,title:'手机',price:4533,goods_state:1}
		// 		]
	},
	mutations:{
		saveToStorage(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		addCart(state,goods){
			
			let findgoods=state.cart.find((item)=>item.goods_id===goods.goods_id)
			console.log(findgoods);
			if(!findgoods){
				state.cart.push(goods);
			}else{
				findgoods.goods_state++;
				console.log(state.cart);
			}
			this.commit('mycart/saveToStorage')
		}
	},
	getters:{
		total(state){
			let arr=0;
		 state.cart.forEach(item=>
				 arr+=item.goods_state
			)
			// console.log(arr);
			return arr;
		}
	}
}