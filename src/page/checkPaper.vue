<template>
    <div>
        <head-top></head-top>
        <el-select v-model="value" placeholder="请选择批阅试卷" @change="handleChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.paperName"
              :value="item.id">
            </el-option>
        </el-select>
         <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="4">
        <el-form label-width="110px" class="form food_form">
            <li v-for="(item,index) in model">
                <div class="test_content_nr_tt">
                    <i>{{index+1}}</i>
                    <span>{{'('+item.scort+'分)'}}</span>
                    <font>{{item.questionContent}}</font>
                </div>
                <el-row :gutter="15">
                  <el-col :span="16">
                    <div class="test_content_nr_main"> 
                        <p>标准答案：</p>
                        <span>{{item.trueAnswer}}</span>
                        <p>学生答案：</p>
                        <span>{{item.answer}}</span>
                    </div>
                 </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple"> 
                        <div class="clear" style="padding: 20px;text-align: right;padding-right: 40px">
                            <el-input v-model="question[index]" placeholder="请输入得分"></el-input>
                        </div>
                    </div>
                  </el-col>
                </el-row>
            </li>
            <el-form-item>
                <el-button type="primary" @click="submit()">提交</el-button>
            </el-form-item>
        </el-form>
        </el-col>
        </el-row>
    </div>    
</template>

<script>
    import axios from 'axios'
	import headTop from '../components/headTop'
     import {port} from '@/config/env'
     axios.defaults.withCredentials=true;
    export default {
         data(){
            return {
                port:port,
                options: [],
                value: '',
                model:'',
                res:'',
                question:[],
                sumScort:0,
                paperId:'',
                studentId:'',
                message:'',
            }
        },
    	components: {
    		headTop,
    	},
        mounted(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                var url=port+'/PaperController/selectReadPaper';
                let param = new URLSearchParams();
                axios.post(url,param).then(res=>{
                  this.options=res.data.model;
                  this.res=res.data.result;
                }).then(lay=>{
                  if (this.res) {

                  }else{
                    throw new Error('获取数据失败');
                    }
                })
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleChange(){
                var url=port+'/PaperController/selectReadQuest';
                let param = new URLSearchParams();
                param.append("id", this.value);
                this.paperId=this.value;
                axios.post(url,param).then(res=>{
                    if (res.data.model!=null) {
                        this.model=res.data.model;
                        this.studentId=this.model[0].studentId;
                    }else{
                        this.model='';
                    }
                this.res=res.data.result;
                this.message=res.data.message;
                }).then(lay=>{
                   if (this.res) {
                       this.$message({
                           type: 'success',
                           message: this.message
                        });
                    }else{
                        this.$message({
                           type: 'error',
                           message: this.message
                        });
                        throw new Error('获取数据失败');
                    }
                })
            },
            submit(){
                for(var index in this.question){
                    this.sumScort+=parseInt(this.question[index])
                }
                var url=port+'/PaperController/getSumScort';
                let param = new URLSearchParams();
                param.append("paperId", this.paperId);
                param.append("studentId",this.studentId)
                param.append("sumScort",this.sumScort)
                axios.post(url,param).then(res=>{
                this.res=res.data.result;
                }).then(lay=>{
                   if (this.res) {
                        this.question=[];
                        this.handleChange()
                       this.$message({
                           type: 'success',
                           message: "提交成功"
                        });
                    }else{
                        throw new Error('获取数据失败');
                    }
                })
                
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .test_content_nr_tt{
    width: 85%;
    height: auto;
    line-height: 32px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
    }
    .food_form{
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
