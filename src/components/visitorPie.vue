<template>
    <div class="visitorpie">
        <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData(){
                console.log(this.pieData)
                const option = {
                    title : {
                        text: '成绩分布',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['优秀（85-100）','良好（75-85）','及格（60-75）',"不及格（0-60）"]
                    },
                    series : [
                        {
                            name: '人数百分比',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:this.pieData.excellent, name:'优秀（85-100）'},
                                {value:this.pieData.good, name:'良好（75-85）'},
                                {value:this.pieData.pass, name:'及格（60-75）'},
                                {value:this.pieData.faild, name:'不及格（0-60）'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            pieData:{
                handler:function (){
                    console.log(this.pieData);
                    this.initData()
                },
                deep:true
            } 
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .visitorpie{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
