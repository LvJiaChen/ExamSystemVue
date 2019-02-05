<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
	  			<header class="form_header">新增题目</header>
	  			<el-upload
				  class="upload-demo"
				  :action="port+'/ExamQuestController/importExcel'"
				  :show-file-list="false"
				  :on-success="uploadExcle"
				  :before-upload="beforeExcleUpload"> 	
				  <el-col :span="6">
				 	 <el-button size="small" type="primary">批量导入</el-button>
				  </el-col>
				</el-upload>
	  			<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
		  			<el-form-item label="题目类型">
			  			<el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%;">
						    <el-option
						      	v-for="item in categoryForm.categoryList"
						      	:key="item.value"
						      	:label="item.value"
						      	:value="item.value">
						    </el-option>
					  	</el-select>
					</el-form-item>
	  				<el-form-item label="课程" prop="subject">
						<el-input v-model="foodForm.subject"></el-input>
					</el-form-item>
					<el-form-item label="题目内容" prop="questionContent">
						<el-input   
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="foodForm.questionContent">
                        </el-input>
					</el-form-item>
					<el-row v-if="(categoryForm.categorySelect == '单选题')||(categoryForm.categorySelect == '多选题')">
						<el-form-item label="选项A" prop="optionA">
							<el-input v-model="foodForm.optionA"></el-input>
						</el-form-item>
						<el-form-item label="选项B" prop="optionB">
							<el-input v-model="foodForm.optionB"></el-input>
						</el-form-item>
						<el-form-item label="选项C" prop="optionC">
							<el-input v-model="foodForm.optionC"></el-input>
						</el-form-item>
						<el-form-item label="选项D" prop="optionD">
							<el-input v-model="foodForm.optionD"></el-input>
						</el-form-item>
					</el-row>
					<el-form-item label="图片">
						<el-upload
						  class="avatar-uploader"
						  :action="port+'/ExamQuestController/uploadPic'"
						  :show-file-list="false"
						  :on-success="uploadImg"
						  :before-upload="beforeImgUpload">
						  <img v-if="foodForm.image_path" :src="foodForm.image_url" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="答案">
						<el-row v-if="categoryForm.categorySelect == '判断题'">
							<el-radio class="radio" v-model="foodForm.answer" label="true">正确</el-radio>
		  					<el-radio class="radio" v-model="foodForm.answer" label="false">错误</el-radio>
						</el-row>
						<el-row v-else-if="categoryForm.categorySelect == '多选题'">
							<el-checkbox-group v-model="foodForm.answerList">
								<el-checkbox label="a">选项 A</el-checkbox>
								<el-checkbox label="b">选项 B</el-checkbox>
							    <el-checkbox label="c">选项 C</el-checkbox>
							    <el-checkbox label="d">选项 D</el-checkbox>
							</el-checkbox-group>
						</el-row>
						<el-row v-else-if="categoryForm.categorySelect == '单选题'">
							<el-radio class="radio" v-model="foodForm.answer" label="a">选项 A</el-radio>
							<el-radio class="radio" v-model="foodForm.answer" label="b">选项 B</el-radio>
		  					<el-radio class="radio" v-model="foodForm.answer" label="c">选项 C</el-radio>
		  					<el-radio class="radio" v-model="foodForm.answer" label="d">选项 D</el-radio>
						</el-row>
						<el-row v-else>	
							 <el-input   
                              type="textarea"
                              :rows="2"
                              placeholder="请输入内容"
                              v-model="foodForm.answer">
                            </el-input>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="addFood('foodForm')">确定新增</el-button>
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
    				categoryList: [{value:'单选题'},{value:'多选题'},{value:'判断题'},{value:'填空题'},{value:'问答题'}],
    				categorySelect: ''
    			},
    			foodForm: {
    				optionA: '',
    				optionB: '',
    				optionC:'',
    				optionD:'',
    				subject:'',
    				questionContent:'',
    				image_path: '',
    				image_url:'',
    				answer: '',
    				answerList:[],
    			},
    			message:'',
    			foodrules: {
					categorySelect: [
			            { required: true, message: '题目类型不能为空', trigger: 'blur' },
			        ]
				},
    		}
    	},
    	components: {
    		headTop,
    	},
    	computed: {
    		selectValue: function (){
    			return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    		}
    	},
    	methods: {
    		//图片上传
			uploadImg(res, file) {
				if (res.result) {
					this.foodForm.image_path = res.model;
					var arr = this.foodForm.image_path.split('\/');
					arr=arr[arr.length-1];
					this.foodForm.image_url=port+'/images/'+arr;
					console.log(this.foodForm.image_path)
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeImgUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			//文件上传
			uploadExcle(res, file) {
				if (res.result) {
					this.$message({
					    type: 'success',
					    message: '导入题目成功'
					});
				}else{
					this.$message.error('导入题目失败！');
				}
			},
			beforeExcleUpload(file) {
				const isRightType = (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
				if (!isRightType) {
					this.$message.error('上传EXCLE文件只能是.xlsx 格式!');
				}
				return isRightType;
			},
		    addFood(foodForm){
		    	this.$refs[foodForm].validate(async (valid) => {
					if (valid) {
						var url=port+'/ExamQuestController/insertQuestion';
						let param = new URLSearchParams();
						if(this.foodForm.image_path!=''){
							param.append("pic",this.foodForm.image_path);
						}
						if (this.categoryForm.categorySelect!='') {
							param.append("questionType", this.categoryForm.categorySelect);
						}
						if (this.foodForm.subject!='') {
							param.append("subject", this.foodForm.subject);
						}
						if (this.foodForm.questionContent!='') {
							param.append("questionContent",this.foodForm.questionContent);
						}
						if (this.categoryForm.categorySelect=='多选题') {
							if (this.foodForm.answerList!=[]) {
								param.append("answer", this.foodForm.answerList);
							}
						}else{
							if (this.foodForm.answer!='') {
								param.append("answer", this.foodForm.answer);
							}
						}
						param.append("optionA", this.foodForm.optionA);
						param.append("optionB",this.foodForm.optionB);
						param.append("optionC", this.foodForm.optionC);
						param.append("optionD",this.foodForm.optionD);
						try{
							axios.post(url,param).then(res=>{
								this.message=res.data
							}).then(lay=>{
							if (this.message.result) {
								this.$message({
					            	type: 'success',
					            	message: '新增成功'
					          	});
					          	this.categoryForm={
				    				categoryList: [{value:'单选题'},{value:'多选题'},{value:'判断题'},{value:'填空题'},{value:'问答题'}],
				    				categorySelect: ''
				    			};
					          	this.foodForm={
				    				optionA: '',
				    				optionB: '',
				    				optionC:'',
				    				optionD:'',
				    				subject:'',
				    				questionContent:'',
				    				image_path: '',
				    				answer: '',
				    				answerList:[],
				    			}
				    			this.$router.push({ path: 'questionList'})
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
		    }
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
