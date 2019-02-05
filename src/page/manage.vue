<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="visitor"><i class="el-icon-menu"></i>成绩分析</el-menu-item>
					<el-menu-item index="questionList"><i class="el-icon-edit"></i>题目管理</el-menu-item>
					<el-menu-item index="paperList"><i class="el-icon-document"></i>试卷管理</el-menu-item>
					<el-menu-item index="studentList"><i class="el-icon-menu"></i>学生管理</el-menu-item>
					<el-menu-item index="adminList"><i class="el-icon-star-on"></i>管理员管理</el-menu-item>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addQuestions">添加题目</el-menu-item>
						<el-menu-item index="addPaper">添加试卷</el-menu-item>
						<el-menu-item index="addStudent">添加学生</el-menu-item>
						<el-menu-item index="addAdmin">添加管理员</el-menu-item>
					</el-submenu>
					<el-menu-item index="checkPaper"><i class="el-icon-menu"></i>批阅试卷</el-menu-item>
					<el-menu-item index="gradeList"><i class="el-icon-menu"></i>成绩查询</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<router-view></router-view>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
