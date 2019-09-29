<template> 
 <div class="block">   
	 	<el-col :span="20" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item style="width:300px">
					<el-input v-model="remark"  @keyup.enter.native="query"  :placeholder="this.$t('localization.equipmentRemarkPlease')" style="width:300px"></el-input>
				</el-form-item>

                <el-form-item style="width:200px">
					<el-select  v-model="type" :placeholder="this.$t('localization.meteType')">
                            <el-option value="" label="">{{this.$t('localization.equipmentAll')}}</el-option>
                            <el-option value="10" label="图片">{{this.$t('localization.equipmentImage')}}</el-option>
                            <el-option value="20" label="视频">{{this.$t('localization.equipmentVideo')}}</el-option>
                             
                    </el-select>
				</el-form-item>

                <el-form-item style="width:200px">
					<el-select  v-model="standards" :placeholder="this.$t('localization.metegui')">
                            <el-option value="" label="">{{this.$t('localization.equipmentAll')}}</el-option>
                            <el-option value="10" label="427*400">427*400</el-option>
                            <el-option value="20" label="640*400">640*400</el-option>
                            <el-option value="30" label="853*400">853*400</el-option>
                            <el-option value="40" label="1280*400">1280*400</el-option>
                             
                    </el-select>
				</el-form-item>


				<el-form-item  >
					<el-button type="primary" v-on:click="query">{{this.$t('localization.select')}}</el-button>
				</el-form-item>
                <!-- <el-form-item  >
					<el-button type="success" v-on:click="query">刷新</el-button>
				</el-form-item> -->
				
				
			</el-form>
		</el-col>
        <el-col :span="4" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				
				<el-form-item  style="text-align:right">
					<el-button type="primary" @click="add()">{{this.$t('localization.uploadmete')}}</el-button>
				</el-form-item>
			</el-form>
		</el-col>
      
        
		<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
		
			<el-table-column prop="type" :label="this.$t('localization.meteType1')" width="200" sortable>
                <template slot-scope="scope">{{scope.row.type =='10'?image:video}}</template>
			</el-table-column>
			
			
            <el-table-column prop="equipmentName" :label="this.$t('localization.metegui1')" width="200" sortable>
                <template slot-scope="scope">{{scope.row.standards =='10'?'427*400':scope.row.standards =='20'?'640*400':scope.row.standards =='30'?'853*400':'1280*400' }}</template>
			</el-table-column>
            <el-table-column prop="fileUrl" :label="this.$t('localization.fileAddress')" width="250" sortable>
                <template slot-scope="scope">

                    <div v-if="scope.row.type=='10'"><img :src="files+scope.row.fileUrl" style="height:30%; width:30%"></div>
                    <div v-if="scope.row.type=='20'"><video  :src="files+scope.row.fileUrl" style="height:30%; width:30%"/></div>
                    
                    <!-- <video  :src="files+scope.row.fileUrl" style="height:30%; width:30%"/> -->
                
                </template>
			</el-table-column>
            <el-table-column prop="userName" :label="this.$t('localization.userName')" width="200" sortable>
			</el-table-column>
            
            <el-table-column  :label="this.$t('localization.createTime')" width="170">
				<template slot-scope="scope">{{ scope.row.createTime | moment('YYYY-MM-DD HH:mm:ss') }}</template>
			</el-table-column>
            <el-table-column  :label="this.$t('localization.remark')"  width="170">
				<template slot-scope="scope">{{ state(scope.row.state)}}</template>
			</el-table-column>
			 <el-table-column prop="remark" :label="this.$t('localization.remark')" width="250">
				
			</el-table-column>
			
            <el-table-column :label="this.$t('localization.complete')" min-width="160">
				<template scope="scope">
				<!-- <el-button size="small" type="primary"  @click="edit(scope.$index,scope.row)">编辑</el-button>
				<el-button size="small" type="primary"  v-if='scope.row.sysUserId=="" ||  scope.row.sysUserId ==null' @click="addAdmin(scope.$index,scope.row)">新增物业</el-button>
				<el-button size="small" type="warning"  v-if='scope.row.sysUserId!="" ||  scope.row.sysUserId !=null' @click="editAdmin(scope.$index,scope.row)">修改物业</el-button> -->
                <el-button size="small" type="danger"  @click="deleteRow(scope.$index, scope.row)">{{deleteBtn}}</el-button>
                <!-- <el-button size="small" type="warning" @click="updateRow(scope.$index, scope.row)">替换</el-button> -->
				</template>
			</el-table-column>

            <!-- <el-table-column prop="fileUrl" label="文件地址" width="200" sortable>
                <template slot-scope="scope"><img :src="scope.row.fileUrl"></template>
			</el-table-column> -->
            
		
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
			<el-form ref="subData" :model="subData" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;"  id="formid" action=""  method="post" enctype="multipart/form-data" target="frameName">
                    
                    <!-- <el-form-item label="设备类型">
                       <el-select  v-model="subData.equipmentType" placeholder="请选择设备类型" @change="selectEquType(subData.equipmentType)">
                           <el-option :label="item.label" :key="item.value" :value="item.value" v-for="item in options">{{item.label}}</el-option>
					    </el-select>
                    </el-form-item>  -->

                    <el-form-item :label="this.$t('localization.meteType1')">
					<el-radio-group v-model="subData.type">
						<el-radio label="10">{{this.$t('localization.equipmentImage')}}</el-radio>
						<el-radio label="20">{{this.$t('localization.equipmentVideo')}}</el-radio>
					</el-radio-group>
                     </el-form-item>
                    <el-form-item :label="this.$t('localization.metegui1')">
					<el-radio-group v-model="subData.standards">
						<el-radio label="10">427*400</el-radio>
						<el-radio label="20">640*400</el-radio>
                        <el-radio label="30">853*400</el-radio>
                        <el-radio label="40">1280*400</el-radio>
					</el-radio-group>
                     </el-form-item>   

                    <!-- <el-form-item label="*设备编号">
                        <el-input v-model="subData.equNo" type="number"  placeholder="请输入6位设备编号"></el-input>
                    </el-form-item> -->
                   <el-form-item :label="this.$t('localization.equipmentNo')"> 
                   <el-upload
                    class="upload-demo"
                    action="http://49.235.254.152:8080/cms/file/upload"
                    :data="subData"
                    :limit="1"
                    :on-preview="handlePreview"
                    :on-success="uploadok"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">{{this.$t('localization.uploadmete')}}</el-button>
                    <div slot="tip" class="el-upload__tip">{{this.$t('localization.metemes')}}</div>
                    </el-upload>        
                    </el-form-item>
                    
                 
                    <el-form-item :label="this.$t('localization.state')">
                        <el-radio-group  name="state" v-model="subData.state">
                            <el-radio label="10">{{this.$t('localization.ok')}}</el-radio>
                            <el-radio label="20">{{this.$t('localization.disok')}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
        
                    <el-form-item :label="this.$t('localization.remark')">
                        <el-input name="remark"  v-model="subData.remark"  :placeholder="this.$t('localization.equipmentRemarkPlease')"></el-input>
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
    import { fileUrls } from '../../api/api';
    
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
      


    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        alert(file);
        console.log(file);
      },
      uploadok(res,file){  //上传成功后调用方法
        this.paths = this.paths+res.data+",";
         
          
      },
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

           this.fileList = [];     
           this.dialogFormVisible = true;
		   this.formtitle =this.$t('localization.uploadmete');   
           this.subData = {}; 
          
            this.isEdit = true;
            this.subData = {
                 type:"10",
                 standards:"10",
                 state:"10"
                
            };

            this.paths = "";
            this.subData.userName = sessionStorage.getItem("loginName");
           this.subData.userId = sessionStorage.getItem("userId"); 


      },

       deleteRow(index, rows) {
       this.$confirm(this.$t('localization.equipmentdeletePlease'), this.$t('localization.equipmentdeleteTitle'), {
            confirmButtonText:  this.$t('localization.true'),
            cancelButtonText: this.$t('localization.false'),
            type: 'warning'
            }).then(() => {
           

            rows.state = '20';        
            //删除功能暂时不开放
            RequestPost("/file/update",rows).then(response => {
						
						//this.logining = false; 
                if(response.code=='0000'){
                    this.$message({
                        message: this.$t('localization.compluteSuccess'),
                        type: 'success'
                    });  
                    this.dialogFormVisible = false;
                    this.loadData();
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


            
            this.dialogFormVisible = false;
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: this.$t('localization.equipmentdeleteOver')
            });          
            });
      },
     
      open(){
        this.subData.fileUrl =  this.paths.substr(0,this.paths.length-1);
         
        // var uploadfile = document.getElementById("uploadfile"); 
        // this.subData.file = uploadfile.files[0];
        //alert(this.subData.file);
        // $("#formid").attr("action",$base_path+"/file/upload");
		// $("#formid").submit();


        RequestPost("/file/addFile",this.subData).then(response => {
            if(response.code == '0000'){
                	this.$message({
                        message:this.$t('localization.compluteSuccess'),
                        type: 'success'
                    });  
                    this.dialogFormVisible = false;
                    this.loadData();   
            }
					
		}).catch(error => {
						 this.$router.push({ path: '/login' });
						
		})  

      },


     
    

	
	loadData(){

        this.page.userName = sessionStorage.getItem("loginName");
        this.page.state = '10';
        this.files = fileUrls;    


        this.page.remark = this.remark;
        this.page.type = this.type;
        this.page.standards = this.standards;
        

		RequestGet("/file/findAll",this.page).then(response => {
						if(response.code == '0000'){
								 this.datalist = response.data;
								 this.total = response.page.totalCount; 
								 this.totalsize  = response.page.pageSize;
						 }
					
		}).catch(error => {
						 this.$router.push({ path: '/login' });
						
		})  
        
						
	
	},

  
    
 
    validate(){
        // if(this.subData.equNo.trim()=="" || this.subData.equNo == null){
        //     this.$message({
        //         type: 'error',
        //         message: '设备编号不能为空'
        //     });         
        //     return false;
        // }
        
        // if(this.subData.equipmentName.trim()=="" || this.subData.equipmentName == null){
        //     this.$message({
        //         type: 'error',
        //         message: '设备名称不能为空'
        //     });         
        //     return false;
        // }

        // if(this.subData.communityId.trim()=="" || this.subData.communityId == null){
        //     this.$message({
        //         type: 'error',
        //         message: '所属小区不能为空'
        //     });         
        //     return false;
        // }

        // if(this.subData.equNo.trim().length>6){
        //     this.$message({
        //         type: 'error',
        //         message: '请输入6位设备序列号'
        //     });         
        //     return false;
        // }

        


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
        remark:"",
        type:"",
        standards:"",
		page:{
			pageSize:PageSize,   //一页显示的条数
            userName:''
		},
        datalist:[],
        formtitle:"",
        fileList: [],
        paths:"",
        files:"",
        
		
		listLoading: false,
        dialogFormVisible:false,
      
        subData:{
            type:"",
            standards:""
        },
        image:this.$t('localization.equipmentImage'),
        video:this.$t('localization.equipmentVideo'),
        updateBtn:this.$t("localization.update"),
        deleteBtn:this.$t("localization.delete"),
        equipmentAuth:this.$t("localization.equipmentAuth")

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
