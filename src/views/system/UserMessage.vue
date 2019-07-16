<template> 
 <div class="block">   
	 	
      <!-- 
          updateBasicMessage:"修改用户基本信息",
          userName1:"*用户名",
          loginName1:"*登录名",
          connent:"*联系人",
          mobile:"*手机号",
          address:"*联系地址",
          userName1Please:"请输入用户名",
          loginName1Please:"请输入登录名",
          connentPlease:"请输入联系人",
          mobilePlease:"请输入手机号",
          addressPlease:"请输入联系地址",
          userName1Null:"用户名不能为空",
          loginName1Null:"登录名不能为空",
          connentNull:"联系人不能为空",
          mobileNull:"手机号不能为空",
          addressNull:"联系地址不能为空",
          basicUserTitle:"确认修改, 是否继续?"



       -->

         <el-card :header="this.$t('localization.updateBasicMessage')" style="width:400px;margin:auto auto;margin-top:50px">
			<el-form ref="subData" :model="subData" label-width="150px" @submit.prevent="onSubmit" style="margin:20px;">
                    <el-form-item :label="this.$t('localization.userName1')">
                      <el-input  v-model="subData.userName"  :placeholder="this.$t('localization.userName1Please')"></el-input>
                    </el-form-item>    
                    <el-form-item :label="this.$t('localization.loginName1')">
                        <el-input v-bind:disabled="true" v-model="subData.loginName"  :placeholder="this.$t('localization.loginName1Please')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.connent')">
                      <el-input  v-model="subData.connect"  :placeholder="this.$t('localization.connentPlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.mobile')">
                      <el-input  v-model="subData.mobile"  :placeholder="this.$t('localization.mobilePlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.address')">
                      <el-input  v-model="subData.address"  :placeholder="this.$t('localization.addressPlease')"></el-input>
                    </el-form-item>
                     <el-form-item style="text-align:right" >
                      <el-button type="primary" @click="UpdateRow()">{{this.$t('localization.true')}}</el-button>
                    </el-form-item>
                 
			</el-form>	
			
        </el-card>

		 

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
                message:  this.$t('localization.loginName1Null'),
                type: 'error'
            });
            return false;
        }

        if(this.subData.mobile.trim() =="" || this.subData.mobile == null){
             this.$message({
                message: this.$t('localization.mobileNull'),
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

      
     
	  UpdateRow() {
       this.$confirm(this.$t('localization.basicUserTitle'), this.$t('localization.equipmentdeleteTitle'), {
            confirmButtonText: this.$t('localization.true'),
            cancelButtonText: this.$t('localization.false'),
            type: 'warning'
            }).then(() => {
            
            
            RequestPost("/user/update",this.subData).then(response => {
						
						//this.logining = false; 
                if(response.code=='0000'){
                    this.$message({
                        message: this.$t('localization.compluteSuccess'),
                        type: 'success'
                    });  
                    this.$router.push({ path: '/login' });
         
                }else{
                    this.$message({
                        message: this.$t('localization.compluteError'),
                        type: 'error'
                    });
                }
         
            }).catch(error => {
            this.$router.push({ path: '/login' });
            })


            
         
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: this.$t('localization.equipmentdeleteOver')
            });          
            });
      },

      loadData(){
            RequestGet("/user/findUserMessage").then(response => {
                        if(response.code == '0000'){
                                this.subData = response.data;
                        }else{
                            this.$message({
                                message: this.$t('localization.compluteError'),
                                type: 'error'
                            });
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
        subData:{
            
        },
        isEdit:true, //是否禁用
        dialogFormVisible:true,
        roles:[],
        formtitle:"",
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
