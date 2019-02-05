<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>物联网专业课程考试系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.userNo" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.passWord"></el-input>
					</el-form-item>  	
					<el-form-item label="">
		                <el-radio-group v-model="loginForm.isUser">
		                    <el-radio :label="0">教师登陆</el-radio>
		                    <el-radio :label="1">学生登陆</el-radio>
		                </el-radio-group>
		            </el-form-item>
		            <el-select v-if="loginForm.isUser==1" v-model="value" placeholder="请选择试卷" @change="handleChange">
			            <el-option
			              v-for="item in options"
			              :key="item.value"
			              :label="item.paperName"
			              :value="item.id">
			            </el-option>
			         </el-select>
					<el-form-item>
					<el-row :gutter="20">
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
					  		<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
					  	</div>
					  </el-col>
					  <el-col :span="8">
					  	<div class="grid-content bg-purple">
					  		<el-button type="primary" @click="updatePswd()" class="submit_btn">修改密码</el-button>
					  	</div>
					  </el-col>
					</el-row>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
	  	   <el-dialog title="修改密码" v-model="dialogFormVisible">
                <el-form :model="selectTable">
		            <el-radio-group v-model="isUser">
		                <el-radio :label="0">教师</el-radio>
		                <el-radio :label="1">学生</el-radio>
		            </el-radio-group>
                    <el-form-item label="学号/工号">
                        <el-input v-model="selectTable.userNo" auto-complete="off"></el-input>
                    </el-form-item>
                   <el-form-item label="旧密码">
                        <el-input type="password" v-model="selectTable.odlPasd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="selectTable.newPasd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="再输一遍">
                        <el-input type="password" v-model="selectTable.aginPasd" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePost">确定修改</el-button>
              </div>
        </el-dialog>
  	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
	import {port} from '../config/env'
	import axios from 'axios'
	axios.defaults.withCredentials=true;
	export default {
	    data(){
			return {
				message:'',
				isUser:1,
				dialogFormVisible: false,
				selectTable: {},
				options:[],
				value:'',
				res:'',
				loginForm: {
					userNo: '',
					passWord: '',
					isUser:''
				},
				rules: {
					userNo: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					passWord: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				showLogin: false,
			}
		},
		created: function () {
		// `this` 指向 vm 实例
			var url=port+'/StudentController/selectParer';
			let param = new URLSearchParams();
			axios.post(url,param).then(res=>{
				this.options=res.data.model;
				console.log(this.options);
			})
		},
		mounted(){
			this.showLogin = true;
			if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			updatePost(){
				if (this.isUser==1) {
					//学生
					var url=port+'/StudentController/updatePassword';
					let param = new URLSearchParams();
					param.append("stuNo",this.selectTable.userNo);
					param.append("password",this.selectTable.odlPasd)
					param.append("newPassword",this.selectTable.newPasd);
					axios.post(url,param).then(res=>{
						this.message=res.data.message;
						this.res=res.data.result;
					}).then(lay=>{
                        if (this.res) {
                            this.$message({
                                type: 'success',
                                message: this.message
                            });
                            this.dialogFormVisible=false;
                            this.teacherNo='';
                            this.password='';
                            this.newPassword='';
                        }else{
                        	this.$message({
                                type: 'error',
                                message: this.message
                            });
                            throw new Error(this.deleteData.message)
                        }
                    })
				}else{
					//教师
					var url=port+'/AdminController/updatePassword';
					let param = new URLSearchParams();
					param.append("teacherNo",this.selectTable.userNo);
					param.append("password",this.selectTable.odlPasd)
					param.append("newPassword",this.selectTable.newPasd);
					axios.post(url,param).then(res=>{
						this.message=res.data.message;
						this.res=res.data.result;
					}).then(lay=>{
                        if (this.res) {
                            this.$message({
                                type: 'success',
                                message: this.message
                            });
                            this.dialogFormVisible=false;
                            this.teacherNo='';
                            this.password='';
                            this.newPassword='';
                        }else{
                        	this.$message({
                                type: 'error',
                                message: this.message
                            });
                            throw new Error(this.deleteData.message)
                        }
                    })
				}
			},
			updatePswd(){
				this.dialogFormVisible=true;
			},
			handleChange(){
				console.log(this.value)
			},
			handleCommand(command) {
		        this.$message('click on item ' + command);
		    },
			...mapActions(['getAdminData']),
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						var url=port+'/AdminController/login';
						let param = new URLSearchParams();
						if (this.loginForm.userNo!='') {
							param.append("userNo", this.loginForm.userNo);
						}
						if (this.loginForm.passWord!='') {
							param.append("passWord", this.loginForm.passWord);
						}
						param.append("paperId",this.value);
						param.append("isUser",this.loginForm.isUser);
						axios.post(url,param).then(res=>{
							this.res=res.data
							console.log(this.res)
						}).then(lay=>{
						if (this.res.result) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
		                    if (this.loginForm.isUser==1) {
		                    	this.$router.push('webTest')
		                    }else{
								this.$router.push('visitor')
		                    }
						}else{
							this.$message({
		                        type: 'error',
		                        message: this.res.message
		                    });
						}})
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 110%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
	 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
	 }
	  .el-icon-arrow-down {
	    font-size: 12px;
	 }
</style>
