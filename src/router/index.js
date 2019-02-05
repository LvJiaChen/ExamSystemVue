import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addPaper = r => require.ensure([], () => r(require('@/page/addPaper')), 'addPaper');
const addQuestions = r => require.ensure([], () => r(require('@/page/addQuestions')), 'addQuestions');
const studentList = r => require.ensure([], () => r(require('@/page/studentList')), 'studentList');
const questionList = r => require.ensure([], () => r(require('@/page/questionList')), 'questionList');
const paperList = r => require.ensure([], () => r(require('@/page/paperList')), 'paperList');
const addStudent = r => require.ensure([], () => r(require('@/page/addStudent')), 'addStudent');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const gradeList = r => require.ensure([], () => r(require('@/page/gradeList')), 'gradeList');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const addAdmin = r => require.ensure([], () => r(require('@/page/addAdmin')), 'addAdmin');
const webTest = r => require.ensure([], () => r(require('@/page/webTest')), 'webTest');
const checkPaper = r => require.ensure([], () => r(require('@/page/checkPaper')), 'checkPaper');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/webTest',
		component: webTest
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addPaper',
			component: addPaper,
			meta: ['添加数据', '添加试卷'],
		},{
			path: '/addQuestions',
			component: addQuestions,
			meta: ['添加数据', '添加题目'],
		},{
			path: '/studentList',
			component: studentList,
			meta: ['数据管理', '学生列表'],
		},{
			path: '/questionList',
			component: questionList,
			meta: ['数据管理', '题目管理'],
		},{
			path: '/paperList',
			component: paperList,
			meta: ['数据管理', '试卷管理'],
		},{
			path: '/addStudent',
			component: addStudent,
			meta: ['添加数据', '添加学生'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '成绩分析'],
		},{
			path: '/gradeList',
			component: gradeList,
			meta: ['成绩查询'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/addAdmin',
			component: addAdmin,
			meta: ['数据添加', '添加管理员'],
		},{
			path: '/checkPaper',
			component: checkPaper,
			meta: ['批阅试卷'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
