<template>
    <div class="fillcontain">
        <head-top></head-top>
         <el-collapse>
          <el-collapse-item title="关键字查询：学号、姓名、班级" name="1">
                <el-row :gutter="30">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">
                        学号：<el-input v-model="stuNo" size="small"></el-input>   
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple-light">    
                        姓名：<el-input v-model="name" size="small"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple-light">    
                        试卷名：<el-input v-model="paperName" size="small"></el-input>
                    </div>
                  </el-col>
                 <el-col :span="5">
                    <div class="grid-content bg-purple-light">    
                        班级：<el-input v-model="tClass" size="small"></el-input>
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
                <el-table-column
                  label="学号"
                  prop="stuNo">
                </el-table-column>
                <el-table-column
                  label="姓名"
                  prop="studentName">
                </el-table-column>
                 <el-table-column
                  label="试卷名"
                  prop="paperName">
                </el-table-column>
                <el-table-column
                  label="性别"
                  prop="sex">
                </el-table-column>
                <el-table-column
                  label="班级"
                  prop="tClass">
                </el-table-column>
                 <el-table-column
                  label="成绩"
                  prop="sumScort">
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
                stuNo:'',
                name:'',
                tClass:'',
                paperName:'',
                port:port,
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
                    var url=port+'/AdminController/selectScore';
                    let param = new URLSearchParams();
                    if (this.stuNo!='') {
                        param.append("stuNo",this.stuNo)
                    }
                    if (this.name!='') {
                        param.append("name",this.name)
                    }
                    if (this.tClass!='') {
                        param.append("tClass",this.tClass)
                    }
                     if (this.paperName!='') {
                        param.append("paperName",this.paperName)
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
                        this.stuNo='';
                        this.name='';
                        this.tClass='';
                        this.paperName='';
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
