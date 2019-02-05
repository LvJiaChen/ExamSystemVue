<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
	  			<header class="form_header">新增管理员</header>
	  			<el-form :model="selectTable" ref="selectTable" label-width="110px" class="form food_form">
	  				<el-form-item label="工号">
                    	<el-input v-model="selectTable.teacherNo" auto-complete="off"></el-input>
                    </el-form-item>
                   	<el-form-item label="姓名">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="selectTable.password" auto-complete="off" type='password'></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="selectTable.department" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">
						    <el-option
						      	v-for="item in categoryForm.categoryList"
						      	:key="item.value"
						      	:label="item.value"
						      	:value="item.label">
						    </el-option>
					  	</el-select>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addFood('selectTable')">确定新增</el-button>
					</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
	import {port} from '../config/env'
 	import headTop from '@/components/headTop'
    import axios from 'axios'
    axios.defaults.withCredentials=true;
    export default {
    	data(){
    		return {
    			port:port,
    			categoryForm: {
    				categoryList: [{value:'超级管理员',label: '1'},{value:'普通管理员',label: '0'}],
    				categorySelect: ''
    			},
    			selectTable:{
    				teacherNo:'',
    				name:'',
    				department:'',
    				types:'',
    			},
    			message:'',
    		}
    	},
    	computed: {
    		selectValue: function (){
    			console.log(this.categoryForm.categorySelect)
    			return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    		}
    	},
    	components: {
    		headTop,
    	},
    	methods: {
		    addFood(selectTable){
		    	this.$refs[selectTable].validate(async (valid) => {
					if (valid) {
						var url=port+'/AdminController/insertAdmin';
						let param = new URLSearchParams();
						if(this.selectTable.teacherNo!=''){
							param.append("teacherNo",this.selectTable.teacherNo);
						}
						if (this.selectTable.name!='') {
							param.append("name", this.selectTable.name);
						}
						if (this.selectTable.password!='') {
							param.append("password", this.selectTable.password);
						}
						if (this.selectTable.department!='') {
							param.append("department", this.selectTable.department);
						}
						if (this.categoryForm.categorySelect!='') {
							param.append("types", this.categoryForm.categorySelect);
						}
						try{
							axios.post(url,param).then(res=>{
								this.message=res.data
							}).then(lay=>{
							if (this.message.result) {
								this.$message({
					            	type: 'success',
					            	message: '新增成功'
					          	});
					            this.$router.push({ path: 'adminList'})
					          	this.selectTable={
				    				teacherNo:'',
				    				name:'',
				    				department:'',
				    				types:'',
				    			}
							}else{
								this.$message({
					            	type: 'error',
					            	message: this.message.message
					          	});
							}})
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
		    },
		}
    }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;	
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.cell{
		text-align: center;
	}
</style>
