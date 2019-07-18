<template> 
 <div class="block">   
	 	<!-- <el-col :span="20" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item style="width:300px">
					<el-input v-model="page.criteria"  @keyup.enter.native="query"  placeholder="请输入设备[编号|名称]" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item  >
					<el-button type="primary" v-on:click="query">查询</el-button>
				</el-form-item>
                <el-form-item  >
					<el-button type="success" v-on:click="query">刷新</el-button>
				</el-form-item>
				
				
			</el-form>
		</el-col> -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" style="text-align:right" >
				<!-- <el-form-item>
					<el-input  placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				
				<el-form-item>
					<el-button type="primary" @click="add()">{{this.$t('localization.add')}}</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        
		<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">

			  <el-table-column prop="code" :label="this.$t('localization.agentNo')" width="150" sortable>
			</el-table-column>
          
			<el-table-column prop="userName" :label="this.$t('localization.userName2')" width="150" sortable>
			</el-table-column>
            
			<el-table-column prop="loginName" :label="this.$t('localization.loginName2')" width="150" sortable>
			</el-table-column>
            <el-table-column prop="connect" :label="this.$t('localization.connent2')" width="150" sortable>
			</el-table-column>
			<el-table-column prop="mobile" :label="this.$t('localization.mobile2')" width="180" sortable>
			</el-table-column>
            <el-table-column prop="address" :label="this.$t('localization.address2')" width="200" sortable>
			</el-table-column>

          
			<el-table-column  :label="this.$t('localization.createTime')" min-width="120">
				<template slot-scope="scope">{{ scope.row.createTime | moment('YYYY-MM-DD') }}</template>
			</el-table-column>
			
         
			<el-table-column  :label="this.$t('localization.state')" min-width="120">
				<template slot-scope="scope">{{ state(scope.row.state)}}</template>
			</el-table-column>

            <el-table-column prop="remark" :label="this.$t('localization.remark')" width="200" sortable>
			</el-table-column>
			
			
			<el-table-column :label="this.$t('localization.complete')" min-width="150">
				<template scope="scope">
				 <el-button size="small" type="primary"  @click="edit(scope.$index,scope.row)">{{update1}}</el-button>
			     <el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)">{{delete1}}</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
		 	class="pull-right clearfix"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="totalsize" 
			layout="total, prev, pager, next, jumper"
			:total="total" 
		>
		</el-pagination>

        <el-dialog   :title="formtitle" :visible.sync="dialogFormVisible" >
			<el-form ref="subData" :model="subData" label-width="150px" @submit.prevent="onSubmit" style="margin:20px;">
                    <el-form-item :label="this.$t('localization.userName1')">
                      <el-input v-bind:disabled="isEdit" v-model="subData.userName"  :placeholder="this.$t('localization.userName1Please')"></el-input>
                    </el-form-item>    
                    <el-form-item :label="this.$t('localization.loginName1')">
                        <el-input v-model="subData.loginName"  :placeholder="this.$t('localization.loginName1Please')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.agentPwd')">
                      <el-input v-bind:disabled="isEdit" v-model="subData.password"  :placeholder="this.$t('localization.agentPwdPlease')"></el-input>
                    </el-form-item>
                     <el-form-item :label="this.$t('localization.agentNo2')">
                      <el-input type="number" v-bind:disabled="isEdit" v-model="subData.code"  :placeholder="this.$t('localization.agentNoPlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.connent')">
                        <el-input v-model="subData.connect" :placeholder="this.$t('localization.connentPlease')"></el-input>
                    </el-form-item>
                     <el-form-item :label="this.$t('localization.mobile')">
                        <el-input v-model="subData.mobile"  :placeholder="this.$t('localization.mobilePlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.address')">
                        <el-input v-model="subData.address"  :placeholder="this.$t('localization.addressPlease')"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="状态">
                        <el-radio-group v-model="subData.roleId">
                            <el-radio :label="item.id" :key="item.id" v-for="item in roles">{{item.roleName}}</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                    <el-form-item :label="this.$t('localization.remark')">
                        <el-input v-model="subData.remark"  :placeholder="this.$t('localization.equipmentRemarkPlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.state')">
					<el-radio-group v-model="subData.state">
						<el-radio label="10">{{this.$t('localization.ok')}}</el-radio>
						<el-radio label="20">{{this.$t('localization.disok')}}</el-radio>
					</el-radio-group>
                     
				</el-form-item>
			</el-form>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{this.$t('localization.false')}}</el-button>
				<el-button type="primary" @click="open()">{{this.$t('localization.true')}}</el-button>
			</div>
        </el-dialog>

		 

  </div>
</template>
<script>
	//2
	import { RequestPost } from '../../api/api';
    import { RequestGet } from '../../api/api';
	import { url } from '../../api/api';
	import {timeFormat} from '../../api/format';
	import {dateFormat} from '../../api/format';
	import {state} from '../../api/format';
	import { PageSize } from '../../api/api';
	import moment from 'moment';
  	export default {
	  
    methods: {
	  dateFormat,	
	  timeFormat,
	  state,	
      handleSizeChange(val) {
		console.log(`每页 ${val} 条`);
		

      },
      handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
		this.pageNumber = val;

		
		this.page.pageNumber = val;
		/**
		 * 1.get 请求传参数，必须是json前面加一个params
		 * 2.post传参数不需要在json对象传值前面带params
		 */
		this.loadData();


	  },
       /**
        * 查询
        */
        query(){
            this.loadData();
        },

      add(){
            this.loadMaxCode();
           this.isEdit = false;
           this.dialogFormVisible = true;
		   this.formtitle =this.$t('localization.add');   
		   
           this.subData = {
                userName: '',
                loginName: '',
                password: '1q2w3e',
                mobile: '',
                roleId: '',
                connect: '',
                address: '',
                roleName: '',
                state: '10',
                code:'',
                remark:''
            };
            for(let obj in this.roles){
                //this.subData.roleId = this.roles[obj].id;
                //this.subData.roleName = this.roles[obj].roleName;
                if(this.subData.roleName == '厂商管理员'){
                    this.subData.roleId = this.roles[obj].id;
                    break;
                }
                
            }


      },

      validate(){
          if(this.subData.userName.trim() =="" || this.subData.userName == null){
            this.$message({
                message:this.$t('localization.userName1Null'),
                type: 'error'
            });
            return false;
          }

          if(this.subData.loginName.trim() =="" || this.subData.loginName == null){
            this.$message({
                message:this.$t('localization.loginName1Null'),
                type: 'error'
            });
            return false;
          }
          if(this.subData.password.trim() =="" || this.subData.password == null){
            this.$message({
                message:this.$t('localization.loginName1Null'),
                type: 'error'
            });
            return false;
          }

          if(this.subData.code=="" || this.subData.code == null){
            this.$message({
                message:this.$t('localization.agentNoNull'),
                type: 'error'
            });
            return false;
          }

          
          if(this.subData.connect=="" || this.subData.connect == null){
            this.$message({
                message:this.$t('localization.connentNull'),
                type: 'error'
            });
            return false;
          }

          
          if(this.subData.address=="" || this.subData.address == null){
            this.$message({
                message:this.$t('localization.addressNull'),
                type: 'error'
            });
            return false;
          }






      },
    
       edit(index, rows){
            this.isEdit = true;
            this.dialogFormVisible = true;
		    this.formtitle =this.$t('localization.update');   
            this.subData = rows;
            this.subData.password = "******";
        //alert("asdf");


      },
      loadMaxCode(){
            this.subData.code = 0;
            RequestGet("/user/findMax",{parentId:'66b7ef552d9e4e4599e853c7d6101373'}).then(response => {
                        if(response.code == '0000'){
                                this.subData.code = parseInt(response.data)+1;
                        }else{
                            this.$message({
                                message: response.message,
                                type: 'error'
                            });
                        }
                    
            }).catch(error => {
                            this.$router.push({ path: '/login' });
                            
            })  
      },
      /**
        * 加载角色
        */
        loadRoles(){
                RequestGet("/user/findRoles").then(response => {
                        if(response.code == '0000'){
                                this.roles = response.data;
                        }else{
                            this.$message({
                                message: response.message,
                                type: 'error'
                            });
                        }
                    
                }).catch(error => {
                                this.$router.push({ path: '/login' });
                                
                })  
        
        },
      open(){
          if(this.formtitle == this.$t('localization.add')){
              this.subData.parentId ='66b7ef552d9e4e4599e853c7d6101373';  //admin
              this.subData.roleId='70220c5ee71e11e8987f5254003ad144';
              this.subData.roleName='厂商管理员';
               
              if(this.validate() == false){
                  return;
              }

              RequestPost("/user/firmAdd",this.subData).then(response => {
						
						//this.logining = false; 
						if(response.code=='0000'){
							this.$message({
								message:  this.$t('localization.compluteSuccess'),
								type: 'success'
							});  
							this.dialogFormVisible = false;
						}else{
							this.$message({
								message: this.$t('localization.compluteError'),
								type: 'error'
							});
						}
						this.loadData();
            }).catch(error => {
            this.$router.push({ path: '/login' });
            })

          }else{
              
              if(this.validate() == false){
                  return;
              }
              RequestPost("/user/update",this.subData).then(response => {
						
						//this.logining = false; 
						if(response.code=='0000'){
							this.$message({
								message: this.$t('localization.compluteSuccess'),
								type: 'success'
							});  
							this.dialogFormVisible = false;
						}else{
							this.$message({
								message: this.$t('localization.compluteError'),
								type: 'error'
							});
						}
						this.loadData();
            }).catch(error => {
            this.$router.push({ path: '/login' });
            })
          }
          
          
      },  
	  deleteRow(index, rows) {
       this.$confirm(this.$t('localization.equipmentdeletePlease'), this.$t('localization.equipmentdeleteTitle'), {
            confirmButtonText: this.$t('localization.true'),
            cancelButtonText:  this.$t('localization.false'),
            type: 'warning'
            }).then(() => {
            // this.$message({
            //     type: 'success',
            //     message: '删除成功!'
            // });

            RequestPost("/user/delete",rows).then(response => {
						
						//this.logining = false; 
                if(response.code=='0000'){
                    this.$message({
                        message: this.$t('localization.compluteSuccess'),
                        type: 'success'
                    });  
                    this.dialogFormVisible = false;
                }else{
                    this.$message({
                        message:  this.$t('localization.compluteError'),
                        type: 'error'
                    });
                }
                this.loadData();
            }).catch(error => {
            this.$router.push({ path: '/login' });
            })


            
            this.dialogFormVisible = false;
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: this.$t('localization.equipmentdeleteOver')
            });          
            });
      },
     

	
	loadData(){
       
		RequestGet("/user/findAllChild",{ parentId:"66b7ef552d9e4e4599e853c7d6101373"}).then(response => {
						if(response.code == '0000'){
                                 
                                 this.datalist = response.data;
                                 for(var i= 0 ;i<this.datalist.length;i++){
                                    
                                    // if(this.datalist[i].code != null && this.datalist[i].code != "" ){
                                    //     this.datalist[i].code = this.datalist[i].code.toString(16);
                                    // }
                                    
                                 }   
                                 
                                 
								 this.total = response.page.totalCount; 
								 this.totalsize  = response.page.pageSize;
						 }
					
		}).catch(error => {
						 this.$router.push({ path: '/login' });
						
		})  
        
						
	
	},

  
    
   

	},
	//1
	created:function(){
		//3
		this.loadData();
		 this.loadRoles();
	
	},
    data() {
      return {
		total:0,     //数据的总数量
		totalsize:0,  //总的页数 = 总数量/每页显示的条数
		currentPage:1,
		page:{
			pageSize:PageSize,   //一页显示的条数
            criteria:''
		},
		datalist:[],
		
		listLoading: false,
		form:{},
        subData:{},
        isEdit:true, //是否禁用
        dialogFormVisible:false,
        roles:[],
        formtitle:"",
        update1:this.$t("localization.update"),
        delete1:this.$t("localization.delete"),
      };
    }
  }
</script>
<style>
	.el-dialog--small {
		 width: 30%; 
	}
    .span {
        position:relative;
        padding:8px;
    }
    .tip {
        display:block;
        background:#f00;
        border-radius:50%;
        width:8px;
        height:8px;
        top:12px;
        right:0px;
        position:absolute;
    }
</style>
