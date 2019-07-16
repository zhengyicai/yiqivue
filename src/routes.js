import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import TableTest from './views/nav1/TableTest.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/updatePwd1',
        component: resolve => require(['./views/system/UpdatePw.vue'], resolve),
        name: '修改密码'
       
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '我的桌面',
        iconCls: 'fa fa-id-card-o',//图标样式class




    //     role1:"首页",
    //  role2:"账户管理", 
    //  role3:"设备管理",
    //  role4:"素材管理",
    //  role5:"系统菜单",
    //  role6:"系统管理",
    //  role7:"用户管理列表",
    //  role8:"用户管理",
    //  role9:"添加设备",
    //  role10:"权限管理",
    //  role11:"我的桌面",
    //  role12:"基本信息",
    //  role13:"发货管理",
    //  role14:"参数设置",
    //  role15:"修改密码",
    //  role16:"代理商管理",
    //  role17:"代理商发货管理"



        children: [
            { path: '/homeIndex',component: resolve => require(['./views/desktop/HomeIndex.vue'], resolve),  name: "localization.role1" },
            { path: '/community',component: resolve => require(['./views/desktop/Community.vue'], resolve), name: 'localization.logintitle' },
            { path: '/building',component: resolve => require(['./views/desktop/Building.vue'], resolve), name: 'localization.logintitle' },
            { path: '/room',component: resolve => require(['./views/desktop/Room.vue'], resolve), name: 'localization.logintitle' },
            { path: '/resident',component: resolve => require(['./views/desktop/Resident.vue'], resolve), name: 'localization.logintitle' },
            { path: '/equipmentRecord',component: resolve => require(['./views/desktop/EquipmentRecord.vue'], resolve), name: 'localization.logintitle' },
            { path: '/material',component: resolve => require(['./views/desktop/Material.vue'], resolve), name: 'localization.role4' },
            { path: '/equipment',component: resolve => require(['./views/desktop/Equipment.vue'], resolve), name: 'localization.role3' },
            { path: '/equipmentAdd',component: resolve => require(['./views/desktop/EquipmentAdd.vue'], resolve), name: 'localization.role9' },
            { path: '/equipmentAuth',component: resolve => require(['./views/desktop/EquipmentAuth.vue'], resolve), name: 'localization.role13' },
            { path: '/equipmentAgeetAuth',component: resolve => require(['./views/desktop/EquipmentAgeetAuth.vue'], resolve), name: 'localization.role17' },
            { path: '/firm',component: resolve => require(['./views/desktop/Firm.vue'], resolve), name: 'localization.role16' },
            // { path: '/work',component: resolve => require(['./views/desktop/Work.vue'], resolve), name: '工程商管理' },
            { path: '/worklist',component: resolve => require(['./views/desktop/WorkList.vue'], resolve), name: 'localization.role7' },
            { path: '/residentList',component: resolve => require(['./views/desktop/ResidentList.vue'], resolve), name: 'localization.role7' },
            { path: '/authlist',component: resolve => require(['./views/desktop/AuthList.vue'], resolve), name: 'localization.logintitle' },
            { path: '/lockRecord',component: resolve => require(['./views/desktop/LockRecord.vue'], resolve), name: 'localization.logintitle' },
            { path: '/adminCard',component: resolve => require(['./views/desktop/AdminCard.vue'], resolve), name: 'localization.logintitle' },
            { path: '/tableTest', component: TableTest, name: 'localization.logintitle' },
            { path: '/form', component: Form, name: 'localization.logintitle' },
            { path: '/user', component: user, name: 'localization.logintitle' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
            { path: '/message',component: resolve => require(['./views/system/Message.vue'], resolve),  name: 'localization.logintitle' },
            { path: '/notice',component: resolve => require(['./views/system/Notice.vue'], resolve), name: 'localization.logintitle' },
            { path: '/parameter',component: resolve => require(['./views/system/Parameter.vue'], resolve), name: 'localization.role14' },
            { path: '/role',component: resolve => require(['./views/system/Role.vue'], resolve), name: 'localization.role10' },
            { path: '/updatePw',component: resolve => require(['./views/system/UpdatePw.vue'], resolve), name: 'localization.role15' },
            { path: '/userInfo',component: resolve => require(['./views/system/UserInfo.vue'], resolve), name: 'localization.role2' },
            { path: '/userMessage',component: resolve => require(['./views/system/UserMessage.vue'], resolve), name: 'localization.role12' },
            
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;