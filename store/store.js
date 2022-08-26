import Vue from 'vue'
import Vuex from 'vuex'
import mycarts from './cart'
Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		mycart:mycarts
	}
})
	
