<template>

<el-row :gutter="24" style="margin-top:20px">
  <el-col :span="4">
      <div class=" bg-purple">
           <!-- <el-tree :data="tree" show-checkbox :check-strictly="true" :highlight-current="true"	:expand-on-click-node="false"  node-key="id"  default-expand-all :props="defaultProps"  @check-change="checkChange" @node-click="nodeClick"  ></el-tree>  -->
            <el-tree
		  	:data="tree"
		  	:props="defaultProps"
		  	show-checkbox
		  	node-key="id"
		  	:check-strictly="true"
			:highlight-current="true"	
		  	default-expand-all
		  	:expand-on-click-node="false"
		  	:render-content="renderContent"
		  	ref="tree"
		  	@check-change="checkChange"
		  	@node-click="nodeClick"
		  	>
		</el-tree>
      </div>
  </el-col>
  <el-col :span="20">
      <div class="grid-content bg-purple">
          <el-col :span="24"  style="padding-bottom: 0px;">
			<el-form :inline="true" style="text-align:right">
				
				<el-form-item  >
					<el-button type="primary" v-on:click="showAddPanel">{{this.$t("localization.add")}}</el-button>
				</el-form-item>
               
				
			</el-form>
		</el-col>
          <el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
		
			
			<el-table-column prop="userName" :label="this.$t('localization.userName2')" width="150" sortable>
			</el-table-column>
			<!-- <el-table-column prop="loginName" label="登录名" width="150" sortable>
			</el-table-column> -->
            <el-table-column prop="connect" :label="this.$t('localization.connent2')" width="150" sortable>
			</el-table-column>
			<el-table-column prop="mobile" :label="this.$t('localization.mobile2')" width="180" sortable>
			</el-table-column>
            <el-table-column prop="address" :label="this.$t('localization.address2')" width="220" sortable>
			</el-table-column>
            <!-- <el-table-column prop="code" label="代理商编号" width="140" sortable>
			</el-table-column> -->
			<el-table-column  :label="this.$t('localization.createTime')" min-width="130">
				<template slot-scope="scope">{{ scope.row.createTime | moment('YYYY-MM-DD') }}</template>
			</el-table-column>
			
         
			<el-table-column  :label="this.$t('localization.state')" min-width="100">
				<template slot-scope="scope">{{ state(scope.row.state)}}</template>
			</el-table-column>

            <el-table-column prop="remark" :label="this.$t('localization.remark')" width="150" sortable>
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
                        <el-input v-model="subData.loginName" :placeholder="this.$t('localization.loginName1Please')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.updateNew')">
                      <el-input v-bind:disabled="isEdit" v-model="subData.password"  :placeholder="this.$t('localization.updateOldPlease')"></el-input>
                    </el-form-item>
                     <!-- <el-form-item label="*厂商编号">
                      <el-input type="number" v-bind:disabled="isEdit" v-model="subData.code"  placeholder="请输入厂商编号"></el-input>
                    </el-form-item> -->
                    <el-form-item :label="this.$t('localization.connent')">
                        <el-input v-model="subData.connect"  :placeholder="this.$t('localization.connentPlease')"></el-input>
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
    </el-col>
</el-row>

</template>

<style lang="scss" scoped>
    .page-container {
        font-size: 24px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
    .el-tree {
        cursor: default;
        background: #fff;
         border:none;
    }
</style>
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
    
	
	loadData(){

	
        this.loadTreeData();
       
						
	
    },


    showAddPanel(){
        this.isEdit = false;
        this.dialogFormVisible = true;
        this.formtitle =this.$t('localization.add');   
        
        this.subData = {
            userName: '',
            loginName: '',
            password: '1q2w3e',
            mobile: '',
            roleId: '',
            roleName: '',
            state: '10',
            address: '',
            connect: '',
            code:'',
            remark:''
        };

    },

    validate(){
        if(this.subData.userName.trim() =="" || this.subData.userName == null){
             this.$message({
                message: this.$t('localization.userName1Null'),
                type: 'error'
            });
            return false;
        }
        if(this.subData.loginName.trim() =="" || this.subData.loginName == null){
             this.$message({
                message: this.$t('localization.loginName1Null'),
                type: 'error'
            });
            return false;
        }
        if(this.subData.password.trim() =="" || this.subData.password == null){
             this.$message({
                message: this.$t('localization.pwdNull'),
                type: 'error'
            });
            return false;
        }
        if(this.subData.connect.trim() =="" || this.subData.connect == null){
             this.$message({
                message: this.$t('localization.connentNull'),
                type: 'error'
            });
            return false;
        }
        if(this.subData.address.trim() =="" || this.subData.address == null){
             this.$message({
                message: this.$t('localization.addressNull'),
                type: 'error'
            });
            return false;
        }        

    },
     edit(index, rows){
            this.isEdit = true;
            this.dialogFormVisible = true;
		    this.formtitle =this.$t("localization.update");   
            this.subData = rows;
            this.subData.password = "******";
        //alert("asdf");


      },
      deleteRow(index, rows) {
       this.$confirm(this.$t('localization.equipmentdeletePlease'), this.$t('localization.equipmentdeleteTitle'), {
            confirmButtonText: this.$t('localization.true'),
            cancelButtonText: this.$t('localization.false'),
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
                        message: this.$t('localization.compluteError'),
                        type: 'error'
                    });
                }
               this.loadCommunityData();
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
    open(){
        

        /**
         *  agentPlease:"请选择代理商"
         */

        if(this.formtitle == this.$t('localization.add')){
              
              if(this.communityId ==''){
                  this.$message({
                    message: this.$t('localization.agentPlease'),
                    type: 'error'
                  });
              }


              if(this.validate() == false){
                  return;
              }
              this.subData.parentId =this.communityId;  //admin
              this.subData.roleId='8fd0882be71e11e8987f5254003ad144';
              this.subData.roleName='代理商管理员';
              this.subData.code=sessionStorage.getItem("code");
            
            RequestPost("/user/workAdd",this.subData).then(response => {
						
						//this.logining = false; 
						if(response.code=='0000'){
							this.$message({
								message: this.$t('localization.compluteSuccess'),
								type: 'success'
							});  
                            this.dialogFormVisible = false;
                            this.$refs.tree.setCheckedKeys([this.communityId]);//预先选中id为1的节点;
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
    updateState(rows,state){

           this.$confirm('确认该操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
               

                var opt ={
                    id:rows.id,
                    state:state
                }

                RequestPost("/building/updateState",opt).then(response => {
                            
                          
                    if(response.code=='0000'){
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });  
                        this.dialogFormVisible = false;
                    }else{
                        this.$message({
                            message: response.message,
                            type: 'error'
                        });
                    }
                    //this.communityId = this.subData.communityId;
                    this.loadCommunityData();
                }).catch(error => {
                this.$router.push({ path: '/login' });
                })


                
                this.dialogFormVisible = false;
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });



      },
    
    /**
    * 加载楼栋数据
    */
    loadCommunityData(){
        
       
        RequestGet("/user/findAllWorkChild",{ parentId:this.communityId}).then(response => {
                    if(response.code == '0000'){
                                this.datalist = response.data;
                                this.total = response.page.totalCount; 
                                this.totalsize  = response.page.pageSize;
                    }
					
		}).catch(error => {
						 this.$router.push({ path: '/login' });
						
        })  


    },

    handleNodeClick(data) {
       // console.log(this);
        this.communityId = data.id;
       
        if(this.communityId!=""){
             this.loadCommunityData();
        }
       
    },

   checkChange(item, node, self){
        if (node==true) {//点击未选中复选框
            this.editCheckId = item.id;
            this.$refs.tree.setCheckedKeys([item.id]);
             this.communityId = item.id;
         if(this.communityId!=""){
             this.loadCommunityData();
        }
        } else {
            if (this.editCheckId == item.id) {//点击已选中复选框，保证至少一个选中
                this.$refs.tree.setCheckedKeys([item.id]);
            }
        }
      
    },	
    nodeClick(item, node, self){
        this.editCheckId = item.id;
        this.$refs.tree.setCheckedKeys([item.id]);
         this.communityId = item.id;
       
        if(this.communityId!=""){
             this.loadCommunityData();
        }
    },	
     /**
    * 加载小区树型数据
    */
    loadTreeData(){
        RequestGet("/user/findTree").then(response => {
            if(response.code == '0000'){
                //alert( response.data);
                
                var item = [];

                if(response.data.length>0){
                     for(var i= 0 ;i<response.data.length;i++){
                            var person ={
                                    label: response.data[i].value,
                                    id: response.data[i].id
                            };

                            if(i==0){
                               // this.communityId = response.data[i].id;
                                 this.$refs.tree.setCheckedKeys([this.communityId]);//预先选中id为1的节点;
                                 this.loadCommunityData();
                            }
                           
                           item.push(person);

                    }
                }
               

                this.tree = [{
                    label: this.$t('localization.role16'),
                    children: item,
                    id:'0'
                }];
                   //this.tree[0].children = response.data; 
                    //tree = response.data;
            }
					
		}).catch(error => {
			 this.$router.push({ path: '/login' });
						
		})  
        
    },



     /**
    * 加载小区树型数据
    */
    loadTreeLoadData(){
        RequestGet("/user/findTree").then(response => {
            if(response.code == '0000'){
                //alert( response.data);
                
                var item = [];

                if(response.data.length>0){
                     for(var i= 0 ;i<response.data.length;i++){
                            var person ={
                                    label: response.data[i].value,
                                    id: response.data[i].id
                            };

                            if(i==0){
                                this.communityId = response.data[i].id;
                                 this.$refs.tree.setCheckedKeys([this.communityId]);//预先选中id为1的节点;
                                 this.loadCommunityData();
                            }
                           
                           item.push(person);

                    }
                }
               

                this.tree = [{
                    label: this.$t('localization.role16'),
                    children: item,
                    id:'0'
                }];
                   //this.tree[0].children = response.data; 
                    //tree = response.data;
            }
					
		}).catch(error => {
			 this.$router.push({ path: '/login' });
						
		})  
        
    }
    
  



	},
	//1
	created:function(){
		//3
		this.loadTreeLoadData();
		
	
	},
    data() {
      return {
		total:0,     //数据的总数量
		totalsize:0,  //总的页数 = 总数量/每页显示的条数
        currentPage:1,
        listLoading: false,
        communityId:'',
        dialogFormVisible:false,
        subData:{},
		page:{
			pageSize:PageSize,   //一页显示的条数
            criteria:''
        },
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form:{},
        subData:{},
        isEdit:true, //是否禁用
        dialogFormVisible:false,
        roles:[],
        formtitle:"",
        datalist:[],
        update1:this.$t("localization.update"),
        delete1:this.$t("localization.delete"),
       
       
      };
    }
  }
</script>