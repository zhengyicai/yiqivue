<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" style="font-size:18px;font-weight:bold">
				{{collapsed?'':sysName}}
				<span style="font-size:10px">{{sysNo}}</span>
			</el-col>
			<el-col :span="10">
				<!-- <div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div> -->
			</el-col>


			<!-- 
				myMessage:"我的消息",
				myPwd:"修改密码",
				myOut:"退出登录",
				outTitle:"确认退出吗?"
			 -->
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>{{this.$t('localization.myMessage')}}</el-dropdown-item>
						<el-dropdown-item @click.native="updatePwd">{{this.$t('localization.myPwd')}}</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">{{this.$t('localization.myOut')}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in roleData" >
						<el-submenu :index="index+''"  v-bind:key="item.id">
							<template slot="title"><i :class="item.iconCls"></i>{{item.resName}}</template>
							<el-menu-item v-for="child in item.children" :index="child.resPath" :key="child.resPath">{{child.resName}}</el-menu-item>
						</el-submenu>
						<!-- <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item> -->
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<!-- <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul> -->
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{this.$t($route.name)}}</strong>
						<!-- 显示右边tab，  暂时隐藏-->
						<!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb> -->
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
 import { url } from '../api/api';
 import { RequestGet } from '../api/api';
	export default {
		data() {
			return {
				sysName: this.$t("localization.role1"),
				sysNo:'v1.0.0',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				roleData:[]
			}
		},
		created:function(){
			
			RequestGet("/user/findUser").then(response => {
				this.sysUserName = response.data.userName;
				sessionStorage.setItem("communityId",response.data.communityId);
				sessionStorage.setItem("userId",response.data.id);
				sessionStorage.setItem("loginName",response.data.loginName);
				sessionStorage.setItem("code",response.data.code);
				 this.sysUserAvatar = "";
				 
				 var person = {
					 "roleId":response.data.roleId
				 }

				 RequestGet("/main/findVueMenus",person).then(response1 => {
						this.roleData = response1.data;


						// role1:"首页",
						// role2:"账户管理", 
						// role3:"设备管理",
						// role4:"素材管理",
						// role5:"系统菜单",
						// role6:"系统管理",
						// role7:"用户管理列表",
						// role8:"用户管理",
						// role9:"添加设备",
						// role10:"权限管理",
						// role11:"我的桌面",
						// role12:"基本信息",
						// role13:"发货管理",
						// role14:"参数设置",
						// role15:"修改密码",
						// role16:"代理商管理",
						// role17:"代理商发货管理"	
						for(var j =0;j<this.roleData.length;j++){

							if(this.roleData[j].resName =="我的桌面"){
								this.roleData[j].resName = this.$t("localization.role11");
							
							}else	if(this.roleData[j].resName =="系统管理"){
								this.roleData[j].resName = this.$t("localization.role6");
							}

							var obj1 = this.roleData[j].children;
							for(var i =0;i<this.roleData[j].children.length;i++){
								if(obj1[i].resName =="首页"){
									obj1[i].resName = this.$t("localization.role1");
								}else if(obj1[i].resName =="账户管理"){
									obj1[i].resName = this.$t("localization.role2");
								}else if(obj1[i].resName =="设备管理"){
									obj1[i].resName = this.$t("localization.role3");
								}else if(obj1[i].resName =="素材管理"){
									obj1[i].resName = this.$t("localization.role4");
								}else if(obj1[i].resName =="系统菜单"){
									this.roleData[i].resName = this.$t("localization.role5");
								}else if(obj1[i].resName =="系统管理"){
									obj1[i].resName = this.$t("localization.role6");
								}else if(obj1[i].resName =="用户管理列表"){
									obj1[i].resName = this.$t("localization.role7");
								}else if(obj1[i].resName =="用户管理"){
									obj1[i].resName = this.$t("localization.role8");
								}else if(obj1[i].resName =="添加设备"){
									obj1[i].resName = this.$t("localization.role9");
								}else if(obj1[i].resName =="权限管理"){
									obj1[i].resName = this.$t("localization.role10");
								}else if(obj1[i].resName =="我的桌面"){
									obj1[i].resName = this.$t("localization.role11");
								}else if(obj1[i].resName =="基本信息"){
									obj1[i].resName = this.$t("localization.role12");
								}else if(obj1[i].resName =="发货管理"){
									obj1[i].resName = this.$t("localization.role13");
								}else if(obj1[i].resName =="参数设置"){
									obj1[i].resName = this.$t("localization.role14");
								}else if(obj1[i].resName =="修改密码"){
									obj1[i].resName = this.$t("localization.role15");
								}else if(obj1[i].resName =="代理商管理"){
									obj1[i].resName = this.$t("localization.role16");
								}else if(obj1[i].resName =="代理商发货管理"){
									obj1[i].resName = this.$t("localization.role17");
								}

						}

						}

						



					
					}).catch(error => {
						 this.$router.push({ path: '/login' });
						
					})  
					
				
              
            }).catch(error => {
				 this.$router.push({ path: '/login' });
                
			  })
			
			
			


		// 	  this.$axios.get(url+'/main/findVueMenus?='+'').then(response => {
        //          this.roleData = response.data.data;
                 
        //         }).catch(error => {
        //           console.log(error)
        //   })		
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			
			//修改密码
			updatePwd: function () {
				var _this = this;
				_this.$router.push('/updatePwd1');
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm(this.$t('localization.outTitle'), this.$t('localization.equipmentdeleteTitle'), {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			// var user = sessionStorage.getItem('user');
			// if (user) {
			// 	user = JSON.parse(user);
			 	
			// }

		}
	}

</script>

<style scoped lang="scss">
	 @import './element-variables';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $--color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>