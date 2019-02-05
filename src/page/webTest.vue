<template>
    <div class="fillcontain">
       <div id="test" class="w_1200">
		<div class="main_left">
			<div class="singleChoice">
				<h4 class="title">单选题</h4>
				<ul>
					<li v-if="singleChoiceList!=[]"  v-for="(item,index) in singleChoiceList" :id="'singleChoice_'+index">
						<div class="test_content_nr_tt">
							<i>{{index+1}}</i>
							<span>{{'('+item.scort+'分)'}}</span>
							<font>{{item.questionContent}}</font>
						</div>
						<div class="test_content_nr_main">
							<ul>
								<img v-if="item.pic!=null" :src="item.pic" class="avatar">
								<el-radio-group v-model="singleChoice[index].answer">
									<li class="option" v-for="(option,i) in item.options">
										<el-radio :label="questLabelListToCase[i]">{{questLabelList[i]}}.{{option}}</el-radio>
									</li>	
								</el-radio-group>										
							</ul>
						</div>
					</li>	
				</ul>
			</div>
			<div class="multipleChoice">
				<h4 class="title">多选题</h4>
				<ul>
					<li v-if="multipleChoiceList!=[]" v-for="(item,index) in multipleChoiceList" :id="'multipleChoice_'+index">
						<div class="test_content_nr_tt">
							<i>{{index+1}}</i>
							<span>{{'('+item.scort+'分)'}}</span>
							<font>{{item.questionContent}}</font>
						</div>
						<div class="test_content_nr_main">
							<ul>
								<img v-if="item.pic!=null" :src="item.pic" class="avatar">
								<el-checkbox-group v-model="multipleChoice[index].answer">
									<li class="option" v-for="(option,i) in item.options">
										<el-checkbox :label="questLabelListToCase[i]">{{questLabelList[i]}}.{{option}}</el-checkbox>
									</li>	
								</el-checkbox-group>										
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<div class="trueOrFalse" >
				<h4 class="title">判断题</h4>
				<ul style="padding:20px 0px;">
					<li v-if="trueOrFalseList!=[]" v-for="(item,index) in trueOrFalseList" :id="'trueOrFalse_'+index">
						<div class="test_content_nr_tt">
							<i>{{index+1}}</i>
							<span>{{'('+item.scort+'分)'}}</span>
							<font>{{item.questionContent}}</font>
							<el-radio-group v-model="trueOrFalse[index].answer">
							    <el-radio :label="false">对</el-radio>
							    <el-radio :label="true">错</el-radio>
							 </el-radio-group>
							<img v-if="item.pic!=null" :src="item.pic" class="avatar">
						</div>
					</li>
				</ul>
			</div>
			<div class="blankQuestion">
				<h4 class="title">填空题</h4>
				<ul>
					<li v-if="blankQuestionList!=[]" v-for="(item,index) in blankQuestionList" :id="'blankQuestion_'+index">
						<div class="test_content_nr_tt">
							<i>{{index+1}}</i>
							<span>{{'('+item.scort+'分)'}}</span>
							<font>{{item.questionContent}}</font>
						</div>
						<div class="clear" style="padding: 20px;text-align: right;padding-right: 40px">
							<img v-if="item.pic!=null" :src="item.pic" class="avatar">
							<el-input
							style="width: 100px;"
							  placeholder="请输入内容"
							  v-model="blankQuestion[index].answer">
							</el-input>
						</div>
					</li>
				</ul>
			</div>
			<div class="questionsAndAnswer">
				<h4 class="title">问答题</h4>
				<ul>
					<li v-if="questionsAndAnswerList!=[]" v-for="(item,index) in questionsAndAnswerList" :id="'questionsAndAnswer_'+index">
						<div class="test_content_nr_tt">
							<i>{{index+1}}</i>
							<span>{{'('+item.scort+'分)'}}</span>
							<font>{{item.questionContent}}</font>
						</div>
						<img v-if="item.pic!=null" :src="item.pic" class="avatar">
						<div style="padding: 20px">
							<!--  <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script> -->
							<el-input
							type="textarea"
							:rows="3"
							  placeholder="请输入内容"
							  v-model="questionsAndAnswer[index].answer">
							</el-input> 
						</div>
					</li>
				</ul>
			</div>
			<div style="height: 70px;line-height: 70px;text-align: center;">
				<el-button type="primary" @click="handlerClick">提交试卷</el-button>
			</div>
		</div>
		<div class="nr_right">
			<div class="nr_rt_main">
				<div class="rt_nr1">
					<div class="rt_nr1_title">
						<h1>
							答题卡
						</h1>
						<p class="test_time">
							<b class="alt-1">{{str}}</b>
						</p>
					</div>
					
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>单选题</h2>
								<p>
									<span>共</span><i class="content_lit">{{singleChoiceList.length}}</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>	
									<li :class="{'hasDo':item.answer!=''&&item.answer!=[]}" v-for="(item,index) in singleChoice"><a :href="'#singleChoice_'+index">{{index+1}}</a></li>								
								</ul>
							</div>
						</div>
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>多选题</h2>
								<p>
									<span>共</span><i class="content_lit">{{multipleChoice.length}}</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>	
									<li :class="{'hasDo':item.answer!=''&&item.answer!=[]}" v-for="(item,index) in multipleChoice"><a :href="'#multipleChoice_'+index">{{index+1}}</a></li>								
								</ul>
							</div>
						</div>
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>判断题</h2>
								<p>
									<span>共</span><i class="content_lit">{{trueOrFalse.length}}</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>	
									<li :class="{'hasDo':item.answer!=null}" v-for="(item,index) in trueOrFalse"><a :href="'#trueOrFalse_'+index">{{index+1}}</a></li>								
								</ul>
							</div>
						</div>
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>填空题</h2>
								<p>
									<span>共</span><i class="content_lit">{{blankQuestion.length}}</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>	
									<li :class="{'hasDo':item.answer!=''}" v-for="(item,index) in blankQuestion"><a :href="'#blankQuestion_'+index">{{index+1}}</a></li>								
								</ul>
							</div>
						</div>
						<div class="rt_content">
							<div class="rt_content_tt">
								<h2>问答题</h2>
								<p>
									<span>共</span><i class="content_lit">{{questionsAndAnswer.length}}</i><span>题</span>
								</p>
							</div>
							<div class="rt_content_nr answerSheet">
								<ul>	
									<li :class="{'hasDo':item.answer!=''}" v-for="(item,index) in questionsAndAnswer"><a :href="'#questionsAndAnswer_'+index">{{index+1}}</a></li>								
								</ul>
							</div>
						</div>
				</div>

			</div>
		</div>
	</div>
    </div>
</template>

<script>
	import {port} from '../config/env'
	import axios from 'axios'
	axios.defaults.withCredentials=true;
    export default {
    	data() {
    		return {
    /*			editor:null,*/
    			login:'',
    			paperId:0,
    			message:'',
    			res:'',
		        time:61,
		        str:'',
		    	singleChoiceList:[],
		        singleChoice:[],
		        multipleChoiceList:[],
		        multipleChoice:[],
		        trueOrFalseList:[],
		        trueOrFalse:[],
		        blankQuestionList:[],
		        blankQuestion:[],
		        questionsAndAnswerList:[],
		        questionsAndAnswer:[],
		    	questLabelList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
		        questLabelListToCase:['a','b','c','d','e','f','g','h','i','j','k','l','m','n']
   			}
   		},
   		methods: {
   			logOut(){
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
                        }
                    })
   			},
   			initData(){
   			console.log("**********")
   			var url=port+'/PaperController/generatePapers';
			let param = new URLSearchParams();
			param.append("paperId",this.login.paperId)
			axios.post(url,param).then(res=>{
				console.log(res.data)
				var data=res.data;
				if (data.model.singleChoice!=null) {
					this.singleChoiceList=data.model.singleChoice
		            for(let d of this.singleChoiceList){
		            	if (d.pic!=null) {
			            	var p=d.pic.split('\/');
							p=p[p.length-1];
							d.pic=port+'/images/'+p;
		            	}
		                this.singleChoice.push({answer:'',questionId:d.id,questionScort:d.scort,studentId:this.login.studentId,paperId:this.login.paperId})
		            }
	       		}
	            if (data.model.multipleChoice!=null) {
		            this.multipleChoiceList=data.model.multipleChoice
		            for(let d of this.multipleChoiceList){
		            	if (d.pic!=null) {
			            	var p=d.pic.split('\/');
							p=p[p.length-1];
							d.pic=port+'/images/'+p;
		            	}
		                this.multipleChoice.push({answer:[],questionId:d.id,questionScort:d.scort,studentId:this.login.studentId,paperId:this.login.paperId})
		            }
	            }
	            if (data.model.trueOrFalse!=null) {
		            this.trueOrFalseList=data.model.trueOrFalse
		            for(let d of this.trueOrFalseList){
		            	if (d.pic!=null) {
			            	var p=d.pic.split('\/');
							p=p[p.length-1];
							d.pic=port+'/images/'+p;
		            	}
		                this.trueOrFalse.push({answer:null,questionId:d.id,questionScort:d.scort,studentId:this.login.studentId,paperId:this.login.paperId})
		            }
	        	}
	        	if (data.model.blankQuestion!=null) {
		            this.blankQuestionList=data.model.blankQuestion
		            for(let d of this.blankQuestionList){
		            	if (d.pic!=null) {
			            	var p=d.pic.split('\/');
							p=p[p.length-1];
							d.pic=port+'/images/'+p;
		            	}
		                this.blankQuestion.push({answer:'',questionId:d.id,questionScort:d.scort,studentId:this.login.studentId,paperId:this.login.paperId})
		            }
	        	}
	        	if (data.model.blankQuestion!=null) {
		            this.questionsAndAnswerList=data.model.questionsAndAnswer
		            for(let d of this.questionsAndAnswerList){
		            	if (d.pic!=null) {
			            	var p=d.pic.split('\/');
							p=p[p.length-1];
							d.pic=port+'/images/'+p;
		            	}
		                this.questionsAndAnswer.push({answer:'',questionId:d.id,questionScort:d.scort,studentId:this.login.studentId,paperId:this.login.paperId})
		            }
	        	}
			})	
   		},
   			 handlerClick(){
	            /*this.$confirm('此操作将提交试卷, 是否继续?', '提示', {
	              confirmButtonText: '确定',
	              cancelButtonText: '取消',
	              type: 'warning'
	            }).then(() => {*/
	              var multipleChoice=JSON.parse(JSON.stringify(this.multipleChoice))
	                multipleChoice.forEach(function(value, index, array) {
	                    value.answer=value.answer.join(',')
	                });
	                var data=this.singleChoice.concat(multipleChoice,this.trueOrFalse,this.questionsAndAnswer,this.blankQuestion)
	                var param={
	                    studentPaper:data
	                }
	                console.log(param)
	                var url=port+'/PaperController/submitPapers';
	                axios.defaults.withCredentials=false;
	                axios.post(url,param).then(res=>{
	                	this.message=res.data.message;
	                	console.log(this.message)
	                	this.res=res.data.result;
	                }).then(lay=>{
                        if (this.res) {
                      		this.$message({
                                type: 'success',
                                message: this.message
                            });
                            axios.defaults.withCredentials=true;
                            this.logOut();
	                		this.$router.push('/')
                        }else{
                        	this.$message({
                                type: 'error',
                                message: "提交失败"
                            });
                            throw new Error('获取数据失败');
                        }
                    })     
	              
	           /* }).catch(() => {
	              this.$message({
	                type: 'info',
	                message: '已取消操作'
	              });          
	            });*/
	        }
   		},
   		created:function(){
   			var url=port+'/AdminController/getLoginInfo';
                    let param = new URLSearchParams();
                    axios.post(url,param).then(res=>{
                        this.login=res.data.model;
                        this.time=this.login.paperTime;
                        console.log(this.login)
                        this.res=res.data.result;
                    }).then(lay=>{
            			this.initData();

                    })
	    },
	    mounted(){
	    	/*var ue = UE.getEditor('editor');*/
	        var i=0
	        var timer=setInterval(()=>{
	            i++;
	            if(i==60){
	                this.time--
	                i=0
	            }
	            this.str=''
	            if(this.time>60){
	                var hour= Math.floor(this.time/60)
	                var min= this.time%60-1
	                var sec=(60-i)%60           
	                if(hour>0&&hour<10){
	                    if(min<10){
	                        this.str=this.str+'0'+hour+':0'+min+':'+sec
	                    }else{
	                        this.str=this.str+'0'+hour+':'+min+':'+sec
	                    }
	                    
	                }else{
	                    if(min<10){
	                        this.str=this.str+hour+':0'+min+':'+sec
	                    }else{
	                       this.str=this.str+hour+':'+min+':'+sec
	                    }
	                     
	                }
	            }else if(this.time<60&&this.time>0){
	                var min= this.time%60-1
	                var sec=(60-i)%60
	                if(min<10){
	                     this.str=this.str+'00:0'+min+':'+sec
	                }else{
	                    this.str=this.str+'00:'+min+':'+sec
	                }
	            }else if(this.time==60){
	                var min=59
	                var sec=(60-i)%60   
	                this.str=this.str+'00:'+min+':'+sec
	            }else{
	                this.str='00:00:00'
	                clearInterval(timer)
	                var multipleChoice=JSON.parse(JSON.stringify(this.multipleChoice))
	                multipleChoice.forEach(function(value, index, array) {
	                    value.answer=value.answer.join(',')
	                });
	                var data=this.singleChoice.concat(multipleChoice,this.trueOrFalse,this.questionsAndAnswer,this.blankQuestion)
	                var param={
	                    studentPaper:data
	                }
	                console.log(param)
	                var url=port+'/PaperController/submitPapers';
	                axios.post(url,param).then(res=>{
	                	this.message=res.data.message;
	                	console.log(this.message)
	                	this.res=res.data.result;
	                }).then(lay=>{
                        if (this.res) {
                      		this.$message({
                                type: 'success',
                                message: this.message
                            });
	                		this.$router.push('/')
                        }else{
                        	this.$message({
                                type: 'error',
                                message: "提交失败"
                            });
                            throw new Error('获取数据失败');
                        }
                    })     
	            }
	        },1000)
	    }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.w_1200{
	width: 1200px;
	margin: 15px auto 0;;
}
*{
	margin: 0;
	padding: 0;
}
.avatar {
		margin: 0 auto;
	    width: 150px;
	    height: 150px;
	    display: block;
	}
.main_left{
	float: left;
	width: 900px;
	border: 1px solid #E1D9D9;
}
.rt_nr1 {
    width: 280px;
    position: fixed;
    top: 15px;
    z-index: 1000;
}
.singleChoice .title{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    background: #f7f7f7;
}
.singleChoice ul li{
	list-style: none;
}
.rt_content_nr .hasDo a{
    background: #13A1EF;
    color:white;
}
.multipleChoice .title{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    background: #f7f7f7;
}
.multipleChoice ul li{
    list-style: none;
}
.trueOrFalse .title{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    background: #f7f7f7;
}
.trueOrFalse ul li{
    list-style: none;
}
.blankQuestion .title{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    background: #f7f7f7;
}
.blankQuestion ul li{
     list-style: none;
}
.questionsAndAnswer ul li{
     list-style: none;
}
.questionsAndAnswer .title{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    background: #f7f7f7;
}
.test_content_nr_tt{
    width: 85%;
    height: auto;
    line-height: 32px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
}
.test_content_nr_tt i {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    display: block;
    float: left;
    background: #5d9cec;
    border-radius: 50%;
    margin-left: -50px;
    color: #fff;
    margin-top: 8px;
    font-size: 16px;
}
.test_content_nr_tt font {
    font-size: 14px;
}
.test_content_nr_main {
    width: 85%;
    margin: 0 auto;
    padding: 10px 0;
    height: auto;
}

.nr_right {
    width: 280px;
    height: 100%;
    float: right;
}
.rt_nr1_title h1 {
    width: 130px;
    height: 45px;
    background: #389fc3;
    text-align: center;
    font-size: 14px;
    display: block;
    line-height: 45px;
    float: left;
    color: #fff;
}

.rt_nr1_title p {
    width: 141px;
    height: 43px;
    padding-right: 8px;
    border: 1px solid #e4e4e4;
    border-left: 0;
    display: block;
    float: right;
}
.test_time {
    color: #f00;
    line-height: 45px;
}
.test_time b {
    font-size: 16px;
    height: 45px;
    display: block;
    float: left;
    margin-left: 10px;
}
/*.nr_right{
    position: fixed;
    right: 0;
}*/
.nr_right {
    width: 280px;
    height: 100%;
    float: right;
}
.rt_nr1_title{
    height: 40px;
}
.rt_content {
    width: 278px;
    height: 100%;
    border: 1px solid #e4e4e4;
    border-top: 0;
}
.rt_content_tt {
    width: 95%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
}
.rt_content_tt h2 {
    width: 150px;
    font-size: 14px;
    display: inline-block;
}
.rt_content_tt p {
    width: 100px;
    display: inline-block;
}
.rt_content_tt i{
    display: inline-block;
    padding: 0 5px;
    font-family: normal;
}
.answerSheet ul {
    padding: 10px;
    text-align: left;
}
.answerSheet li {
    display: inline-block;
    margin-bottom: 5px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
}
ul li{
    list-style: none;
}
.answerSheet li a {
    display: block;
    text-decoration: none;
    color: #666;
}
</style>
