<template>
    <div class="fillcontain">
        <head-top></head-top>
          <el-collapse>
            <el-collapse-item title="关键字查询：课程、试卷名" name="1">
              <el-row :gutter="30">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                        课程：<el-input v-model="subject" size="small"></el-input>   
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">    
                        试卷名：<el-input v-model="paperName" size="small"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="4" :push="1">
                    <div class="grid-content bg-purple-light">    
                         <el-button type="primary" @click="initData">查询</el-button>
                    </div>
                  </el-col>
                </el-row>
            </el-collapse-item>
          </el-collapse>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="单选题数量">
                        <span>{{ props.row.singleChoiceNum }}</span>
                      </el-form-item>
                      <el-form-item label="单选题分数">
                        <span>{{ props.row.singleChoiceScort }}</span>
                      </el-form-item>
                      <el-form-item label="多选题数量">
                        <span>{{ props.row.multipleChoiceNum }}</span>
                      </el-form-item>
                      <el-form-item label="多选题分数">
                        <span>{{ props.row.multipleChoiceScort }}</span>
                      </el-form-item>
                       <el-form-item label="判断题数量">
                        <span>{{ props.row.trueOrFalseNum }}</span>
                      </el-form-item>
                      <el-form-item label="判断题分数">
                        <span>{{ props.row.trueOrFalseScort }}</span>
                      </el-form-item>
                       <el-form-item label="填空题数量">
                        <span>{{ props.row.blankQuestionNum }}</span>
                      </el-form-item>
                      <el-form-item label="填空题分数">
                        <span>{{ props.row.blankQuestionScort }}</span>
                      </el-form-item>
                         <el-form-item label="问答题数量">
                        <span>{{ props.row.questionsAndAnswersNum }}</span>
                      </el-form-item>
                      <el-form-item label="问答题分数">
                        <span>{{ props.row.questionsAndAnswersScorts }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="课程"
                  prop="subject">
                </el-table-column>
                <el-table-column
                  label="试卷名"
                  prop="paperName">
                </el-table-column>
                <el-table-column
                  label="考试时间"
                  prop="paperTime">
                </el-table-column>
                <el-table-column
                  label="考试开始时间"
                  prop="paperStartTime">
                </el-table-column>
                 <el-table-column
                  label="考试结束时间"
                  prop="paperEndTime">
                </el-table-column>
                 <el-table-column
                  label="是否随机"
                  prop="isRandomStr">
                </el-table-column>
                <el-table-column label="操作" width="300">
                  <template scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="addFood(scope.$index, scope.row)">新增试卷</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      <template v-if="!scope.row.isRandom">
                       <el-button
                          size="mini"
                          @click="addQuestion(scope.$index, scope.row)">添加题目</el-button>
                      </template>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改试卷信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-row :gutter="20">
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
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
              </div>
            </el-dialog>

              <el-dialog title="添加题目" v-model="dialogQuestVisible">
                <el-form >
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="课程" prop="subject">
                                    <el-input v-model="contionSubject" size="small"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="题目类型" prop="questionContent">
                                     <el-input v-model="contionQuestType" size="small"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8" :push="1">
                            <div class="grid-content bg-purple" >
                                <el-button type="primary" @click="selectQuest">查询</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <el-collapse>
                  <el-collapse-item title="已插入题目数量" name="1">
                      <el-form :model="selectTable">
                     <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="单选题数量" prop="singleChoiceNum">
                                    {{row.singleChoiceNum}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前单选题数量" prop="singleChoiceScort">
                                     {{currentNum.singleChoiceNumCurrent}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前单选题分数" prop="singleChoiceScort">
                                      {{currentNum.singleChoiceScort}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="多选题数量" prop="multipleChoiceNum">
                                    {{row.multipleChoiceNum}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前多选题数量" prop="multipleChoiceScort">
                                     {{currentNum.multipleChoiceNumCurrent}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前多选题分数" prop="multipleChoiceScort">
                                    {{currentNum.multipleChoiceScort}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="判断题数量" prop="trueOrFalseNum">
                                    {{row.trueOrFalseNum}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前判断题数量" prop="trueOrFalseScort">
                                     {{currentNum.trueOrFalseNumCurrent}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前判断题分数" prop="trueOrFalseScort">
                                     {{currentNum.trueOrFalseScort}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="填空题数量" prop="blankQuestionNum">
                                     {{row.blankQuestionNum}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前填空题数量" prop="blankQuestionScort">
                                     {{currentNum.blankQuestionNumCurrent}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                 <el-form-item label="当前填空题分数" prop="blankQuestionScort">
                                    {{currentNum.blankQuestionScort}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="问答题数量" prop="questionsAndAnswersNum">
                                    {{row.questionsAndAnswersNum}}
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="当前问答题数量" prop="questionsAndAnswersNum">
                                     {{currentNum.questionsAndAnswersNumCurrent}}
                                </el-form-item>
                            </div>
                        </el-col>
                          <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="当前问答题分数" prop="questionsAndAnswersNum">
                                    {{currentNum.questionsAndAnswersNumCurrent}}
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>   
                <el-table  ref="multipleTable" :data="tableDataQ" style="width: 100%"  height="250" border @selection-change="changeFun">
                   <el-table-column
                    type="selection" @selection-change="changeFun"
                    width="55">
                  </el-table-column>
                  <el-table-column type="expand">
                    <template scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="选项A">
                          <span>{{ props.row.optionA }}</span>
                        </el-form-item>
                        <el-form-item label="选项B">
                          <span>{{ props.row.optionB }}</span>
                        </el-form-item>
                        <el-form-item label="选项C">
                          <span>{{ props.row.optionC }}</span>
                        </el-form-item>
                        <el-form-item label="选项D">
                          <span>{{ props.row.optionD }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="课程"
                    prop="subject">
                  </el-table-column>
                  <el-table-column
                    label="题目类型"
                    prop="questionType">
                  </el-table-column>
                  <el-table-column
                    label="题目内容"
                    prop="questionContent">
                  </el-table-column>
                  <el-table-column
                    label="题目答案"
                    prop="answer">
                  </el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogQuestVisible = false">取 消</el-button>
                <el-button type="primary" @click="addQuestionPost">添 加</el-button>
              </div>
            </el-dialog>

        </div>
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
                subject:'',
                paperName:'',
                currentNum:'',
                row:'',
                message:'',
                contionSubject:'',
                contionQuestType:'',
                tableDataQ:[],
                resQ:true,
                modelQ:'',
                currentPageQ:1,
                pageSizeQ:20,
                port:port,
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                pageSize:20,
                selectTable: {},
                dialogFormVisible: false,
                dialogQuestVisible : false,
                res:true,
                model:'',
                deleteData:'',
                updateData:'',
                paperId:'',
                multipleSelection: [],
                paperQuestion:[]
            }
        },
        created(){
            this.initData();
        },
    	components: {
    		headTop,
    	},
        methods: {
           //复选框状态改变
          changeFun(val) {
            this.multipleSelection=val;
          },
            handleCheckAllChange(val) {
              this.checkedCities = val ? cityOptions : [];
              this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
              let checkedCount = value.length;
              this.checkAll = checkedCount === this.cities.length;
              this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            initData(){
                try{
                    var url=port+'/PaperController/findPaper';
                    let param = new URLSearchParams();
                     if (this.paperName!='') {
                        param.append("paperName",this.paperName)
                    }
                    if (this.subject!='') {
                        param.append("subject",this.contionSubject)
                    }
                    param.append("currentPage", this.currentPage);
                    param.append("pageSize", this.pageSize);
                    axios.post(url,param).then(res=>{
                        this.tableData=res.data.model.items;
                        this.model=res.data.model;
                        this.res=res.data.result;
                    }).then(lay=>{
                        if (this.res) {
                        this.count = this.model.numRows;
                        this.paperName='';
                        this.subject='';
                        }else{
                            throw new Error('获取数据失败');
                        }
                    })     
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.initData()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;
                console.log(this.selectTable)
            },
            addFood(index, row){
                this.$router.push({ path: 'addPaper', query: { restaurant_id: row.id }})
            },
            addQuestion(index, row){
                this.dialogQuestVisible  = true;
                this.paperId=row.id;
                this.row=row;
                console.log(row)
                 try{
                  console.log("---------------------")
                    //查询题目数量
                    var url1=port+'/ExamQuestController/getCurrentNum';
                    let param1 = new URLSearchParams();
                    param1.append("id",row.id);
                    axios.post(url1,param1).then(res=>{
                        this.currentNum=res.data.model;
                        console.log(this.currentNum)
                        this.resQ=res.data.result;
                    }).then(lay=>{
                        if (this.resQ) {
                      
                        }else{
                            throw new Error('获取数据失败');
                        }
                    })
                    //查询题目
                    var url=port+'/ExamQuestController/findQuestionForAdd';
                    let param = new URLSearchParams();
                    param.append("paperId",row.id);
                    axios.post(url,param).then(res=>{
                        this.tableDataQ=res.data.model.items;
                        this.modelQ=res.data.model;
                        this.resQ=res.data.result;
                    }).then(lay=>{
                        if (this.resQ) {
                      
                        }else{
                            throw new Error('获取数据失败');
                        }
                    })     
                }catch(err){
                    console.log('获取数据失败', err);
                }

            },
            addQuestionPost(){
               this.paperQuestion = []
                for (var i = 0; i < this.multipleSelection.length; i++) {
                   this.paperQuestion.push({
                    paperId:this.paperId,
                    questionId:this.multipleSelection[i].id
                   })
                }
                var paramData = {paperQuestion:this.paperQuestion};
                try{
                    var url=port+'/ExamQuestController/addQuestFixedPaper';
                    axios.defaults.withCredentials=false;
                    axios.post(url,paramData).then(res=>{
                        this.resQ=res.data.result;
                        this.message=res.data.message;
                    }).then(lay=>{
                     if (this.resQ) {
                       axios.defaults.withCredentials=true;
                        this.$message({
                                      type: 'success',
                                      message: this.message
                                  });
                        }else{
                        axios.defaults.withCredentials=true;
                        this.$message({
                                      type: 'error',
                                      message: this.message
                                  });
                            throw new Error('获取数据失败');
                        }
                    }) .then(l=>{  
                       this.selectQuest(); 
                       //查询题目数量
                      var url1=port+'/ExamQuestController/getCurrentNum';
                      let param1 = new URLSearchParams();
                      param1.append("id",this.row.id);
                      axios.post(url1,param1).then(res=>{
                          this.currentNum=res.data.model;
                          console.log(this.currentNum)
                          this.resQ=res.data.result;
                      }).then(lay=>{
                          if (this.resQ) {
                        
                          }else{
                              throw new Error('获取数据失败');
                          }
                      })
                    })   
                   
                  }catch(err){
                      console.log('获取数据失败', err);
                  }

            },
            selectQuest(){
                  try{
                    var url=port+'/ExamQuestController/findQuestionForAdd';
                    let param = new URLSearchParams();
                     param.append("paperId",this.row.id);
                    axios.post(url,param).then(res=>{
                        this.tableDataQ=res.data.model.items;
                        this.modelQ=res.data.model;
                        this.resQ=res.data.result;
                        this.message=res.data.message
                    }).then(lay=>{
                        if (this.resQ) {
                          
                        }else{
                            this.$message({
                                      type: 'error',
                                      message: this.message
                                  });
                        }
                    })     
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleDelete(index, row) {
                try{
                    var url=port+'/PaperController/deletePaper';
                        let param = new URLSearchParams();
                        param.append("ids",row.id);
                        axios.post(url,param).then(res=>{
                            this.deleteData=res.data
                        }).then(lay=>{
                             if (this.deleteData.result) {
                                this.$message({
                                    type: 'success',
                                    message: '删除题目成功'
                                });
                                this.initData()
                            }else{
                                throw new Error(this.deleteData.message)
                            }
                        })
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除题目失败')
                }
            },
            updateShop(){
                this.dialogFormVisible = false;
                try{
                    var url=port+'/PaperController/updatePaper';
                        let param = new URLSearchParams();
                        param.append("id", this.selectTable.id);
                        param.append("paperName",this.selectTable.paperName);
                        if (this.selectTable.subject!='') {
                            param.append("subject", this.selectTable.subject);
                        }
                        if (this.selectTable.paperTime!='') {
                            param.append("paperTime",this.selectTable.paperTime);
                        }
                        param.append("paperStartTime", this.formatDateTime(this.selectTable.testDate[0]));
                        param.append("paperEndTime",this.formatDateTime(this.selectTable.testDate[1]));
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
                        axios.post(url,param).then(res=>{
                            this.updateData=res.data
                        }).then(lay=>{
                            if (this.updateData.result) {
                                this.$message({
                                    type: 'success',
                                    message: '更新题目信息成功'
                                });
                                this.initData();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: this.updateData.message
                                });
                            }
                        })
                }catch(err){
                    console.log('更新题目信息失败', err);
                }
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
        },
    }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>
