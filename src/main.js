import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//ueditor
import'../static/Ueditor/ueditor.config.js'

import'../static/Ueditor/ueditor.all.min.js'

import'../static/Ueditor/lang/zh-cn/zh-cn.js'

import'../static/Ueditor/ueditor.parse.min.js'

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
