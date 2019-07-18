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
		
			
			<el-table-column prop="paraName" :label="this.$t('localization.paramName')" width="180" sortable>
			</el-table-column>
			<el-table-column prop="paraCnName" :label="this.$t('localization.paramCNName')" width="250" sortable>
			</el-table-column>
			<el-table-column prop="paraValue" :label="this.$t('localization.paramValue')" width="250" sortable>
			</el-table-column>
			<el-table-column  :label="this.$t('localization.createTime')" min-width="120">
				<template slot-scope="scope">{{ scope.row.createTime | moment('YYYY-MM-DD') }}</template>
			</el-table-column>
			<el-table-column  :label="this.$t('localization.updateTime')" min-width="120">
				<template slot-scope="scope">{{ scope.row.updateTime | moment('YYYY-MM-DD') }}</template>
			</el-table-column>
            <el-table-column prop="remark" :label="this.$t('localization.remark')" width="180" sortable>
			</el-table-column>
			<el-table-column  :label="this.$t('localization.state')" min-width="120">
				<template slot-scope="scope">{{ state(scope.row.state)}}</template>
			</el-table-column>
            
			
			
			<el-table-column :label="this.$t('localization.complete')" min-width="250">
				<template scope="scope">
				 <el-button size="small" type="primary"  @click="edit(scope.$index,scope.row)">{{update1}}</el-button>
				<!--<el-button size="small" type="primary"  v-if='scope.row.sysUserId=="" ||  scope.row.sysUserId ==null' @click="addAdmin(scope.$index,scope.row)">新增物业</el-button>
				<el-button size="small" type="warning"  v-if='scope.row.sysUserId!="" ||  scope.row.sysUserId !=null' @click="editAdmin(scope.$index,scope.row)">修改物业</el-button> -->
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
			<el-form ref="subData" :model="subData" label-width="200px" @submit.prevent="onSubmit" style="margin:20px;">
                    <el-form-item :label="this.$t('localization.paramName1')">
                      <el-input v-model="subData.paraName"  :placeholder="this.$t('localization.paramNamePlease')"></el-input>
                    </el-form-item>    
                    <el-form-item :label="this.$t('localization.paramValue1')">
                        <el-input v-model="subData.paraValue" :placeholder="this.$t('localization.paramValuePlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.paramCNName1')">
                      <el-input v-model="subData.paraCnName"  :placeholder="this.$t('localization.paramCNNamePlease')"></el-input>
                    </el-form-item>

                    <el-form-item :label="this.$t('localization.remark')">
                      <el-input type="textarea" v-model="subData.remark"   :placeholder="this.$t('localization.equipmentRemarkPlease')"></el-input>
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
           this.dialogFormVisible = true;
		   this.formtitle =this.$t('localization.add');   
		   this.subData = {}; 
           this.communityId = ''; 
           this.buildingId = '';
           this.unitNo = '';
            this.loadCommunitys();
            this.isEdit = true;
            this.subData = {
                paraName: '',
                paraValue: '',
                paraCnName: '',
                remark: '',
                state: '10'
            };


      },
    
       edit(index, rows){
            this.dialogFormVisible = true;
		    this.formtitle =this.$t('localization.update');   
             this.subData = rows;
        //alert("asdf");


      },
      open(){
          if(this.formtitle == this.$t('localization.add')){
              RequestPost("/parameter/add",this.subData).then(response => {
						
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

          }else{
              RequestPost("/parameter/update",this.subData).then(response => {
						
						//this.logining = false; 
						if(response.code=='0000'){
							this.$message({
								message: this.$t('localization.compluteSuccess'),
								type: 'success'
							});  
							this.dialogFormVisible = false;
						}else{
							this.$message({
								message:this.$t('localization.compluteError'),
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
            cancelButtonText: this.$t('localization.false'),
            type: 'warning'
            }).then(() => {
            // this.$message({
            //     type: 'success',
            //     message: '删除成功!'
            // });

            RequestPost("/parameter/delete",rows).then(response => {
						
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


            
            this.dialogFormVisible = false;
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: this.$t('localization.equipmentdeleteOver')
            });          
            });
      },
     

	
	loadData(){

		RequestGet("/parameter/findAll",this.page).then(response => {
						if(response.code == '0000'){
								 this.datalist = response.data;
								 this.total = response.page.totalCount; 
								 this.totalsize  = response.page.pageSize;
						 }
					
		}).catch(error => {
						 this.$router.push({ path: '/login' });
						
		})  
        
						
	
	},

  
    
    /**
    * 选择设备类型
    */
    selectEquType(){
        if(this.subData.equipmentType === '30'){
            this.isEdit = false;
        }else{
            this.isEdit = true;
        }
    },

    // /**
    // * 选择小区
    // */
    selectCommunity(selectIdx){
        
        this.communityId = selectIdx;
        this.subData.communityId = selectIdx;
        this.buildingId = '';
        this.subData.buildingId = "";
        this.buildings = [];
        this.unitNo = '';
        this.loadBuildings();
    },

    // /**
    // * 选择楼栋
    // */
    selectBuild(selectIdx){
        //this.buildingId = this.buildings[selectIdx].value;
        this.buildingId = selectIdx;
        this.subData.buildingId = this.buildingId;
        this.subData.unitName = '';
        this.units = [];
        this.unitNo = '';
        this.loadUnits();
    },

    // /**
    // * 选择单元
    // */
    selectUnit(selectIdx){
        this.unitNo = selectIdx;
        this.subData.unitName = this.unitNo;
    },

    /**
    * 加载小区
    */
    loadCommunitys(){

        RequestGet("/equipment/findCommunitys").then(response => {
          
						if(response.code == '0000'){
								this.communitys = response.data;
                                
                                
						 }
					
        }).catch(error => {
                this.$router.push({ path: '/login' });
						
		})  
      
    },

    /**
    * 加载楼栋
    */
    loadBuildings(){

        RequestGet("/equipment/findBuildings",{
                communityId:this.communityId
            }).then(response => {
          
						if(response.code == '0000'){
								 this.buildings = response.data;
                                 if(this.buildings.length>0){
                                     this.subData.buildingId = this.buildings[0].value;
                                 }
                                 
                                // for(let obj in this.buildings){
                                //     this.selectBuild(0);
                                //     break;
                                // }
						 }
					
        }).catch(error => {
                this.$router.push({ path: '/login' });
						
		})  
       
    },

    // /**
    // * 加载单元
    // */
    loadUnits(){

         RequestGet("/equipment/findUnits",{
                buildingId:this.buildingId
            }).then(response => {
          
						if(response.code == '0000'){
								  this.units = response.data;
                                   if(this.units.length>0){
                                     this.subData.unitName = this.units[0].value;
                                 }
                                // for(let obj in this.buildings){
                                //     this.selectBuild(0);
                                //     break;
                                // }
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
        communitys:[],
        buildings:[],
        units:[],
        communityId:"",
        buildingId:"",
        unitNo:"",
        formtitle:"",
         options: [{
          value: '10',
          label: '管理机'
        }, {
          value: '20',
          label: '围墙机'
        }, {
          value: '30',
          label: '单元门口机'
        }],
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
