<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
	  			<header class="form_header">新增试卷</header>
	  			<el-form :model="selectTable" ref="selectTable" label-width="110px" class="form food_form">
	  				<el-row :gutter="10">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="课程" prop="subject">
                                    <el-input v-model="selectTable.subject"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="考试时间" prop="questionContent">
                                     <el-input v-model="selectTable.paperTime"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-form-item label="试卷名">
                        <el-input v-model="selectTable.paperName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="考试日期" prop="testDate">
                        <div class="block">
                            <el-date-picker
                                v-model="selectTable.testDate"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否随机" prop='isRandom'>
                        <el-radio class="radio" v-model="selectTable.isRandom" label="true">是</el-radio>
                        <el-radio class="radio" v-model="selectTable.isRandom" label="false">否</el-radio>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="单选题数量" prop="singleChoiceNum">
                                    <el-input-number v-model="selectTable.singleChoiceNum" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="单选题分数" prop="singleChoiceScort">
                                     <el-input-number v-model="selectTable.singleChoiceScort" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="多选题数量" prop="multipleChoiceNum">
                                    <el-input-number v-model="selectTable.multipleChoiceNum" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="多选题分数" prop="multipleChoiceScort">
                                    <el-input-number v-model="selectTable.multipleChoiceScort" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="判断题数量" prop="trueOrFalseNum">
                                    <el-input-number v-model="selectTable.trueOrFalseNum" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="判断题分数" prop="trueOrFalseScort">
                                     <el-input-number v-model="selectTable.trueOrFalseScort" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="填空题数量" prop="blankQuestionNum">
                                    <el-input-number v-model="selectTable.blankQuestionNum" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="填空题分数" prop="blankQuestionScort">
                                     <el-input-number v-model="selectTable.blankQuestionScort" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="问答题数量" prop="questionsAndAnswersNum">
                                    <el-input-number v-model="selectTable.questionsAndAnswersNum" size="small"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                 <el-form-item  prop="questionsAndAnswersScorts">
                                    <el-input size="small" v-model="selectTable.questionsAndAnswersScorts"  placeholder="请输问答题分数,以逗号隔开如：7,8,9"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
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
    				subject:'',
    				paperTime:'',
    				paperName:'',
    				testDate:[],
    				isRandom:true,
    				singleChoiceNum:0,
    				singleChoiceScort:0,
    				multipleChoiceNum:0,
    				multipleChoiceScort:0,
    				trueOrFalseNum:0,
    				trueOrFalseScort:0,
    				blankQuestionNum:0,
    				blankQuestionScort:0,
    				questionsAndAnswersNum:0,
    				questionsAndAnswersScorts:''
    			},
    			message:'',
    		}
    	},
    	components: {
    		headTop,
    	},
    	methods: {
		    addFood(selectTable){
		    	this.$refs[selectTable].validate(async (valid) => {
					if (valid) {
						var url=port+'/PaperController/generatePaperObject';
						let param = new URLSearchParams();
						if(this.selectTable.subject!=''){
							param.append("subject",this.selectTable.subject);
						}
						if (this.selectTable.paperName!='') {
							param.append("paperName", this.selectTable.paperName);
						}
						if (this.selectTable.testDate.length!=0) {
							param.append("paperStartTime", this.formatDateTime(this.selectTable.testDate[0]));
							param.append("paperEndTime", this.formatDateTime(this.selectTable.testDate[1]));
						}
						param.append("paperTime",this.selectTable.paperTime);
						param.append("isRandom",this.selectTable.isRandom);
						param.append("singleChoiceNum", this.selectTable.singleChoiceNum);
						param.append("singleChoiceScort",this.selectTable.singleChoiceScort);
						param.append("multipleChoiceNum", this.selectTable.multipleChoiceNum);
						param.append("multipleChoiceScort",this.selectTable.multipleChoiceScort);
						param.append("trueOrFalseNum", this.selectTable.trueOrFalseNum);
						param.append("trueOrFalseScort",this.selectTable.trueOrFalseScort);
						param.append("blankQuestionNum", this.selectTable.blankQuestionNum);
						param.append("blankQuestionScort",this.selectTable.blankQuestionScort);
						param.append("questionsAndAnswersNum", this.selectTable.questionsAndAnswersNum);
						param.append("questionsAndAnswersScorts",this.selectTable.questionsAndAnswersScorts);
						try{
							axios.post(url,param).then(res=>{
								this.message=res.data
							}).then(lay=>{
							if (this.message.result) {
								this.$message({
					            	type: 'success',
					            	message: '新增成功'
					          	});
					            this.$router.push({ path: 'paperList'})
					          	this.selectTable={
				    				subject:'',
				    				paperTime:'',
				    				paperName:'',
				    				testDate:[],
				    				isRandom:true,
				    				singleChoiceNum:0,
				    				singleChoiceScort:0,
				    				multipleChoiceNum:0,
				    				multipleChoiceScort:0,
				    				trueOrFalseNum:0,
				    				trueOrFalseScort:0,
				    				blankQuestionNum:0,
				    				blankQuestionScort:0,
				    				questionsAndAnswersNum:0,
				    				questionsAndAnswersScorts:''
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
		    formatDateTime(inputTime) {    
                var date = new Date(inputTime);  
                var y = date.getFullYear();    
                var m = date.getMonth() + 1;    
                m = m < 10 ? ('0' + m) : m;    
                var d = date.getDate();    
                d = d < 10 ? ('0' + d) : d;    
                var h = date.getHours();  
                h = h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                var second = date.getSeconds();  
                minute = minute < 10 ? ('0' + minute) : minute;    
                second = second < 10 ? ('0' + second) : second;   
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
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
