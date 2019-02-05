<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {port} from '../config/env'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
	import axios from 'axios'
    axios.defaults.withCredentials=true;

    export default {
    	data(){
    		return {
    			baseImgPath,
    			message:'',
    			res:'',
    		}
    	},
    	created(){
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'singout'){
					var url=port+'/AdminController/logOut';
   				 let param = new URLSearchParams();
                    axios.post(url,param).then(res=>{
                        this.message=res.data.message;
                        this.res=res.data.result;
                    }).then(lay=>{
                        if (this.res) {
                      		this.$message({
                                type: 'success',
                                message: this.message
                            });
                            this.$router.push('/');
                        }
                    })
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
