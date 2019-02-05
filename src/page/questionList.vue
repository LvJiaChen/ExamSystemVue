<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-collapse>
          <el-collapse-item title="关键字查询：课程、题目类型、题目内容" name="1">
            <el-row :gutter="30">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                        课程：<el-input v-model="subject" size="small"></el-input>   
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">    
                        题目类型：<el-input v-model="questionType" size="small"></el-input>
                    </div>
                  </el-col>
                 <el-col :span="6">
                    <div class="grid-content bg-purple-light">    
                        题目内容：<el-input v-model="questionContent" size="small"></el-input>
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
                <el-table-column label="操作" width="200">
                  <template scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="addFood(scope.$index, scope.row)">新增题目</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <el-dialog title="修改题目信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="题目类型">
                        <el-input v-model="selectTable.questionType" auto-complete="off" disabled></el-input>
                    </el-form-item>
                   <el-form-item label="课程" prop="subject">
                        <el-input v-model="selectTable.subject"></el-input>
                    </el-form-item>
                    <el-form-item label="题目内容" prop="questionContent">
                        <el-input   
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="selectTable.questionContent">
                        </el-input>
                    </el-form-item>
                    <el-row v-if="(selectTable.questionType == '单选题')||(selectTable.questionType == '多选题')">
                        <el-form-item label="选项A" prop="optionA">
                            <el-input v-model="selectTable.optionA"></el-input>
                        </el-form-item>
                        <el-form-item label="选项B" prop="optionB">
                            <el-input v-model="selectTable.optionB"></el-input>
                        </el-form-item>
                        <el-form-item label="选项C" prop="optionC">
                            <el-input v-model="selectTable.optionC"></el-input>
                        </el-form-item>
                        <el-form-item label="选项D" prop="optionD">
                            <el-input v-model="selectTable.optionD"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-form-item label="图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="port+'/ExamQuestController/uploadPic'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="this.image_url" :src="this.image_url" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="答案">
                        <el-row v-if="selectTable.questionType == '判断题'">
                            <el-radio class="radio" v-model="selectTable.answer" label="true">正确</el-radio>
                            <el-radio class="radio" v-model="selectTable.answer" label="false">错误</el-radio>
                        </el-row>
                        <el-row v-else-if="selectTable.questionType== '多选题'">
                            <el-checkbox-group v-model="selectTable.answerList">
                                <el-checkbox label="a">选项 A</el-checkbox>
                                <el-checkbox label="b">选项 B</el-checkbox>
                                <el-checkbox label="c">选项 C</el-checkbox>
                                <el-checkbox label="d">选项 D</el-checkbox>
                            </el-checkbox-group>
                        </el-row>
                        <el-row v-else-if="selectTable.questionType == '单选题'">
                            <el-radio class="radio" v-model="selectTable.answer" label="a">选项 A</el-radio>
                            <el-radio class="radio" v-model="selectTable.answer" label="b">选项 B</el-radio>
                            <el-radio class="radio" v-model="selectTable.answer" label="c">选项 C</el-radio>
                            <el-radio class="radio" v-model="selectTable.answer" label="d">选项 D</el-radio>
                        </el-row>
                        <el-row v-else> 
                            <el-input   
                              type="textarea"
                              :rows="2"
                              placeholder="请输入内容"
                              v-model="selectTable.answer">
                            </el-input>
                        </el-row>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
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
                questionType:'',
                questionContent:'',
                port:port,
                image_path: '',
                image_url:'',
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                pageSize:20,
                selectTable: {},
                dialogFormVisible: false,
                res:true,
                model:'',
                deleteData:'',
                updateData:''
            }
        },
        created(){
            this.initData();
        },
    	components: {
    		headTop,
    	},
        methods: {
            initData(){
                try{
                    var url=port+'/ExamQuestController/findQuestion';
                    let param = new URLSearchParams();
                    if (this.subject!='') {
                        param.append("subject",this.subject)
                    }
                    if (this.questionType!='') {
                        param.append("questionType",this.questionType)
                    }if (this.questionContent!='') {
                        param.append("questionContent",this.questionContent)
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
                        this.subject='';
                        this.questionContent='';
                        this.questionType='';
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
                this.image_url='';
                this.selectTable = row;
                this.selectTable.answerList=this.selectTable.answer.split(',');
                if (row.pic!=null) {
                    var arr=row.pic.split('\/')
                    arr=arr[arr.length-1];
                    this.image_url=port+'/images/'+arr;       
                    console.log(this.image_url);
                }
                console.log(this.selectTable)
                this.dialogFormVisible = true;
            },
            addFood(index, row){
                this.$router.push({ path: 'addQuestions', query: { restaurant_id: row.id }})
            },
            async handleDelete(index, row) {
                try{
                    var url=port+'/ExamQuestController/deleteQuest';
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
            handleServiceAvatarScucess(res, file) {
                if (res.result) {
                    this.image_path = res.model;
                    var arr = this.image_path.split('\/');
                    arr=arr[arr.length-1];
                    this.image_url=port+'/images/'+arr;
                    console.log(this.image_path)
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
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
            async updateShop(){
                this.dialogFormVisible = false;
                try{
                    var url=port+'/ExamQuestController/updateQuest';
                        let param = new URLSearchParams();
                        param.append("id", this.selectTable.id);
                        param.append("questionType",this.selectTable.questionType);
                        if(this.image_path!=''){
                            param.append("pic",this.image_path);
                        }
                        if (this.selectTable.subject!='') {
                            param.append("subject", this.selectTable.subject);
                        }
                        if (this.selectTable.questionContent!='') {
                            param.append("questionContent",this.selectTable.questionContent);
                        }
                        if (this.selectTable.questionType=='多选题') {
                            if (this.selectTable.answerList!=[]) {
                                param.append("answer", this.selectTable.answerList);
                            }
                        }else{
                            if (this.selectTable.answer!='') {
                                param.append("answer", this.selectTable.answer);
                            }
                        }
                        param.append("optionA", this.selectTable.optionA);
                        param.append("optionB",this.selectTable.optionB);
                        param.append("optionC", this.selectTable.optionC);
                        param.append("optionD",this.selectTable.optionD);
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
        },
    }
</script>

<style lang="less">
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
