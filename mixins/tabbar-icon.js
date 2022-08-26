

import {mapGetters} from 'vuex'
export default{
	
		computed:{
		...mapGetters('mycart',['total'])
	},
	onShow(){
		this.settabbar()
	},
	methods:{
		settabbar(){
			uni.setTabBarBadge({
				index:2,
				text:this.total+''//只能是字符串
			})
		}
	}
	
}