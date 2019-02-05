<template>
    <div>
        <head-top></head-top>
        <template>
          <el-select v-model="value" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.paperName"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <visitor-pie :pieData="pieData"></visitor-pie>
    </div>
</template>

<script>
    import axios from 'axios'
	import headTop from '../components/headTop'
    import visitorPie from '@/components/visitorPie'
	import {port} from '@/config/env'
  axios.defaults.withCredentials=true;
    export default {
    	data(){
    		return {
           port:port,
           options: [],
          value: '',
          model:'',
    			pieData: {excellent:0,good:0,pass:0,faild:0}
    		}
    	},
    	components: {
    		headTop,
            visitorPie,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		initData(){
    			 try{
                var url=port+'/StudentController/selectParer';
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
            var url=port+'/StudentController/performanceAnalysis';
              let param = new URLSearchParams();
              param.append("id", this.value);
              axios.post(url,param).then(res=>{
              this.model=res.data.model;
              for (var i = 0; i < this.model.length; i++) {
                if (this.model[i].scort=="0-60") {
                  this.pieData.faild=this.model[i].num;
                }else if (this.model[i].scort=="60-75") {
                  this.pieData.pass=this.model[i].num;
                }else if (this.model[i].scort=="75-85") {
                  this.pieData.good=this.model[i].num;
                }else{
                  this.pieData.excellent=this.model[i].num;
                }
              }
              this.res=res.data.result;
              }).then(lay=>{
                if (this.res) {
                  this.$message({
                    type: 'success',
                    message: '查询成功'
                  });
                }else{
                  throw new Error('获取数据失败');
                }
              })
        }
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	
</style>
