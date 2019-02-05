<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
	  			<header class="form_header">新增学生</header>
	  			<el-upload
				  class="upload-demo"
				  :action="port+'/StudentController/importExcel'"
				  :show-file-list="false"
				  :on-success="uploadExcle"
				  :before-upload="beforeExcleUpload"> 	
				  <el-col :span="6">
				 	 <el-button size="small" type="primary">批量导入</el-button>
				  </el-col>
				</el-upload>
	  			<el-form :model="selectTable" ref="selectTable" label-width="110px" class="form food_form">
	  				 <el-form-item label="学号">
                        <el-input v-model="selectTable.stuNo" auto-complete="off"></el-input>
                    </el-form-item>
                   <el-form-item label="姓名">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="selectTable.password" auto-complete="off" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="selectTable.sex" label="男">男</el-radio>
                        <el-radio class="radio" v-model="selectTable.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-input v-model="selectTable.tClass" auto-complete="off"></el-input>
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
    			selectTable:{
    				stuNo:'',
    				name:'',
    				sex:'',
    				tClass:'',
    			},
    			message:'',
    		}
    	},
    	components: {
    		headTop,
    	},
    	methods: {
    		//文件上传
			uploadExcle(res, file) {
				if (res.result) {
					this.$message({
					    type: 'success',
					    message: '导入学生成功'
					});
				}else{
					this.$message({
					    type: 'error',
					    message: res.message
					});
				}
			},
			beforeExcleUpload(file) {
				const isRightType = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
				if (!isRightType) {
					this.$message.error('上传EXCLE文件只能是.xlsx 格式!');
				}
				return isRightType;
			},
		    addFood(selectTable){
		    	this.$refs[selectTable].validate(async (valid) => {
					if (valid) {
						var url=port+'/StudentController/insertStudent';
						let param = new URLSearchParams();
						if(this.selectTable.stuNo!=''){
							param.append("stuNo",this.selectTable.stuNo);
						}
						if(this.selectTable.password!=''){
							param.append("password",this.selectTable.password);
						}
						if (this.selectTable.name!='') {
							param.append("name", this.selectTable.name);
						}
						if (this.selectTable.sex!='') {
							param.append("sex", this.selectTable.sex);
						}
						if (this.selectTable.tClass!='') {
							param.append("tClass", this.selectTable.tClass);
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
					          	this.selectTable={
				    				stuNo:'',
				    				name:'',
				    				sex:'',
				    				tClass:'',
				    			}
				    			this.$router.push({ path: 'studentList'})
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
