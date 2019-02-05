<template>
    <div class="fillcontain">
        <head-top></head-top>
         <el-collapse>
          <el-collapse-item title="关键字查询：学号、姓名、班级" name="1">
                <el-row :gutter="30">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                        学号：<el-input v-model="studentNo" size="small"></el-input>   
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">    
                        姓名：<el-input v-model="name" size="small"></el-input>
                    </div>
                  </el-col>
                 <el-col :span="6">
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
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="性别"
                  prop="sex">
                </el-table-column>
                <el-table-column
                  label="班级"
                  prop="tclass">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="addFood(scope.$index, scope.row)">新增学生</el-button>
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
            <el-dialog title="修改学生信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="学号">
                        <el-input v-model="selectTable.stuNo" auto-complete="off"></el-input>
                    </el-form-item>
                   <el-form-item label="姓名">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio class="radio" v-model="selectTable.sex" label="男">男</el-radio>
                        <el-radio class="radio" v-model="selectTable.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-input v-model="selectTable.tclass" auto-complete="off"></el-input>
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
                studentNo:'',
                name:'',
                tClass:'',
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
                    var url=port+'/StudentController/findStudentAll';
                    let param = new URLSearchParams();
                    if (this.studentNo!='') {
                        param.append("stuNo",this.studentNo)
                    }
                    if (this.name!='') {
                        param.append("name",this.name)
                    }
                    if (this.tClass!='') {
                        param.append("tClass",this.tClass)
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
                        this.studentNo='';
                        this.name='';
                        this.tClass='';
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
                this.$router.push({ path: 'addStudent', query: { restaurant_id: row.id }})
            },
            handleDelete(index, row) {
                try{
                    var url=port+'/StudentController/deleteStudent';
                        let param = new URLSearchParams();
                        param.append("ids",row.id);
                        axios.post(url,param).then(res=>{
                            this.deleteData=res.data
                        }).then(lay=>{
                             if (this.deleteData.result) {
                                this.$message({
                                    type: 'success',
                                    message: '删除学生成功'
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
                    console.log('删除学生失败')
                }
            },
            updateShop(){
                this.dialogFormVisible = false;
                try{
                    var url=port+'/StudentController/updateStudent';
                        let param = new URLSearchParams();
                        param.append("id", this.selectTable.id);
                        if (this.selectTable.name!='') {
                            param.append("name", this.selectTable.name);
                        }
                        if (this.selectTable.stuNo!='') {
                            param.append("stuNo",this.selectTable.stuNo);
                        }
                        if (this.selectTable.sex!='') {
                            param.append("sex",this.selectTable.sex);
                        }
                         if (this.selectTable.tClass!='') {
                            param.append("tClass",this.selectTable.tclass);
                        }
                        axios.post(url,param).then(res=>{
                            this.updateData=res.data
                        }).then(lay=>{
                            if (this.updateData.result) {
                                this.$message({
                                    type: 'success',
                                    message: '更新学生信息成功'
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
                    console.log('更新学生信息失败', err);
                }
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
