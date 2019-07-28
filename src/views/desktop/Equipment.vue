<template> 
 <div class="block">   
	 	<el-col :span="20" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item style="width:300px">
					<el-input v-model="equipmentNo"  @keyup.enter.native="query"  :placeholder="this.$t('localization.equipmentSearch')" style="width:300px"></el-input>
				</el-form-item>

                <!-- 

                    createTime:"创建时间",
                    state:"状态",
                    remark:"备注",
                    complete:"操作",
                    update:"编辑",
                    delete:"删除",
                    select："查询",

                    equipmentSearch: "请输入设备[编号|名称]",
                    equipmentType: "请选择展示类型",
                    equipmentAll: "全部",
                    
                    equipmentNo:"设备编号",
                    equipmentName1:"设备名称",
                    equipmentName:"显示格式",
                    equipmentAgentUserName:"代理商",
                    equipmentUserName:"用户",
                    equipmentAuth:"绑定素材",



                
                
                
                
                 -->

                <el-form-item style="width:200px">
					<el-select  v-model="type" :placeholder="this.$t('localization.equipmentType')">
                            <el-option value="" label="">{{this.$t('localization.equipmentAll')}}</el-option>
                             <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                </el-option>
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
					<el-button type="primary" @click="add()">{{this.$t('localization.add')}}</el-button>
				</el-form-item>
			</el-form>
		</el-col>
      
        
		<el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
		
			<el-table-column prop="equipmentNo" :label="this.$t('localization.equipmentNo')" width="150" sortable>
                
			</el-table-column>
			<el-table-column prop="equipmentName1" :label="this.$t('localization.equipmentName1')" width="150" sortable>
			</el-table-column>
            <el-table-column prop="equipmentName" :label="this.$t('localization.equipmentName')" width="200" sortable>
                <template slot-scope="scope">{{ showType(scope.row.type)}}</template>
			</el-table-column>
        
            <el-table-column  :label="this.$t('localization.createTime')" width="170">
				<template slot-scope="scope">{{ scope.row.createTime | moment('YYYY-MM-DD HH:mm:ss') }}</template>
			</el-table-column>
            <el-table-column  :label="this.$t('localization.state')" width="170">
				<template slot-scope="scope">{{ state(scope.row.state)}}</template>
			</el-table-column>
			 <el-table-column  :label="this.$t('localization.remark')" width="200">
				<template slot-scope="scope">{{ state(scope.row.remark)}}</template>
            </el-table-column>
            
            <el-table-column  :label="this.$t('localization.equipmentAgentUserName')" width="120" v-if="adminUser ==1">
				<template slot-scope="scope">{{scope.row.agentUserName}}</template>
            </el-table-column>
            <el-table-column  :label="this.$t('localization.equipmentUserName')" width="120" v-if="adminUser ==1">
				<template slot-scope="scope">{{scope.row.userName}}</template>
			</el-table-column>
			
            <el-table-column :label="this.$t('localization.complete')" min-width="160">
				<template scope="scope">
		        <el-button size="small" v-if="adminUser!=1" type="primary"  @click="addFile(scope.$index,scope.row)">{{equipmentAuth}}</el-button>
                <el-button size="small"  v-if="adminUser!=1" type="primary"  @click="update(scope.$index,scope.row)">{{updateBtn}}</el-button>
                <el-button size="small" type="danger"  @click="deleteRow(scope.$index, scope.row)">{{deleteBtn}}</el-button>
         
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
			<el-form ref="subData" :model="subData" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;"  id="formid" action=""  method="post" enctype="multipart/form-data" target="frameName">
                    
                    <!-- <el-form-item label="设备类型">
                       <el-select  v-model="subData.equipmentType" placeholder="请选择设备类型" @change="selectEquType(subData.equipmentType)">
                           <el-option :label="item.label" :key="item.value" :value="item.value" v-for="item in options">{{item.label}}</el-option>
					    </el-select>
                    </el-form-item>  -->



                    <!-- 
                            equipmentNoPlease:"请输入设备编号",
                            equipmentName1Please:"请输入设备名称",
                            equipmentTypePlease:"请选择展示类型",
                            equipmentRemarkPlease:"请输入备注",
                            equipmentImage:"图片",
                            equipmentVideo:"视频",
                            equipmentImageL:"左图片",
                            equipmentImageR:"右图片",



                     -->

                    <el-form-item :label="this.$t('localization.equipmentNo')">
                        <el-input name="equipmentNo"  v-model="subData.equipmentNo"  :placeholder="this.$t('localization.equipmentNoPlease')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.equipmentName1')">
                        <el-input name="equipmentName"  v-model="subData.equipmentName1"  :placeholder="this.$t('localization.equipmentName1Please')"></el-input>
                    </el-form-item>
                    <el-form-item :label="this.$t('localization.equipmentName')">
                     
                        <el-select  v-model="subData.type" :placeholder="this.$t('localization.equipmentTypePlease')">
                             <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                </el-option>
                        </el-select>
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



         <el-dialog   :title="equipmentAuth" :visible.sync="dialogFormTypeVisible" >
             <!-- {{rows.type}} -->
			<el-form  >
                <el-col :span="24" v-if="allFileListLeft2.length ==0">    
                  <el-col :span="12">
                  {{allFileListLeft.length>0?this.$t('localization.equipmentImage'):""}}
                  <el-checkbox-group v-model="checkList1" >
                        <el-checkbox style="margin-left:0px;height:50px" v-for="item in allFileListLeft" :label="item.id" :key="item.id"><img :src="files+item.fileUrl" style="height:30%; width:30%"><span>{{item.remark}}</span></el-checkbox>
                   </el-checkbox-group>  
                  </el-col> 
                  <el-col :span="12">
                  {{allFileListRight.length>0?this.$t('localization.equipmentVideo'):""}}
                  <el-checkbox-group v-model="checkList2" >
                        <el-checkbox style="margin-left:0px;height:50px" v-for="item in allFileListRight" :label="item.id" :key="item.id"><video  :src="files+item.fileUrl" style="height:30%; width:30%"/><span>{{item.remark}}</span></el-checkbox>
                   </el-checkbox-group>  
                  </el-col> 
                </el-col>


                <el-col :span="24" v-if="allFileListLeft2.length>0">    
                  <el-col :span="12">
                  {{allFileListLeft1.length>0?this.$t('localization.equipmentImageL'):""}}
                  <el-checkbox-group v-model="checkList1" >
                        <el-checkbox style="margin-left:0px;height:50px" v-for="item in allFileListLeft1" :label="item.id" :key="item.id"><img :src="files+item.fileUrl" style="height:30%; width:30%"><span>{{item.remark}}</span></el-checkbox>
                   </el-checkbox-group>  
                  </el-col> 
                  <el-col :span="12">
                  {{allFileListLeft2.length>0?this.$t('localization.equipmentImageR'):""}}
                  <el-checkbox-group v-model="checkList2" >
                        <el-checkbox style="margin-left:0px;height:50px" v-for="item in allFileListLeft2" :label="item.id" :key="item.id"><img :src="files+item.fileUrl" style="height:30%; width:30%"><span>{{item.remark}}</span></el-checkbox>
                   </el-checkbox-group>  
                  </el-col> 
                </el-col>    

                  


			</el-form>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormTypeVisible = false">{{this.$t('localization.false')}}</el-button>
				<el-button type="primary" @click="open1()">{{this.$t('localization.true')}}</el-button>
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
    import {showType} from '../../api/format';
	import { PageSize } from '../../api/api';
	import moment from 'moment';
  	export default {
	  
    methods: {
	  dateFormat,	
	  timeFormat,
      state,
      showType,	
      


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
		   this.formtitle =this.$t('localization.add');   
           this.subData = {}; 
           this.show = "1";
          
            this.isEdit = true;
            this.subData = {
                 type:"10",
                 state:"10"
                
            };
           this.subData.userName = sessionStorage.getItem("loginName");
           this.subData.userId = sessionStorage.getItem("userId"); 


      },

      /**
       *  equipmentdeletePlease:"确认删除, 是否继续",
       *  equipmentdeleteTitle:"提示", 
       *   equipmentdeleteOver:"已取消删除",
       *   equipmentOnlineUser:"当前账户还没有上传素材",
       */

       deleteRow(index, rows) {
       this.$confirm(this.$t('localization.equipmentdeletePlease'), this.$t('localization.equipmentdeleteTitle'), {
            confirmButtonText: this.$t('localization.true'),
            cancelButtonText: this.$t('localization.false'),
            type: 'warning'
            }).then(() => {
           


            //删除功能暂时不开放
            RequestPost("/sysEquipment/delete",rows).then(response => {
						
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


      update(index, rows) {
        this.formtitle = this.updateBtn;
        this.dialogFormVisible = true;
        this.show = "2";
        this.subData =  rows;    
      
            
      },

      addFile(index, rows){
            this.allFileListLeft= [];
            this.allFileListLeft2 = [];
            this.allFileListLeft1 = [];
            this.allFileListRight= [];


            this.checkList1 = [];
            this.checkList2 = [];
            this.allFileListIds =[];


            this.equipmentId = rows.id;
            RequestGet("/sysEquipment/equipmentFile/findAllType",{userId:sessionStorage.getItem("userId")}).then(response => {
						if(response.code == '0000'){

                            this.allFileList = response.data;


                            for(var i = 0;i<response.data.length;i++){
                                this.allFileListIds.push(response.data[i].id);
                            }
                            if(this.allFileList.length<=0){
                                this.$message({
                                    message: this.$t('localization.equipmentOnlineUser'),
                                    type: 'success'
                                });    
                                return;
                            }
                            
                            if(rows.type == '10'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                  
                                    if(this.allFileList[i].standards =="40" && this.allFileList[i].type =="10" ){
                                        this.allFileListLeft.push(this.allFileList[i]);
                                    }else if(this.allFileList[i].standards =="40" && this.allFileList[i].type =="20" ){
                                        
                                        //this.allFileListRight.push(this.allFileList[i]);
                                    }
       
                                }
                                
                            }else if(rows.type == '20'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                    
                                    if(this.allFileList[i].standards =="40" && this.allFileList[i].type =="20" ){    
                                        this.allFileListRight.push(this.allFileList[i]);
                                    }                                       
                                }
                                
                            }else if(rows.type == '30'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                    
                                    if(this.allFileList[i].standards =="10" && this.allFileList[i].type =="10" ){    
                                        this.allFileListLeft.push(this.allFileList[i]);
                                    }else if(this.allFileList[i].standards =="30" && this.allFileList[i].type =="20" ){
                                        
                                        this.allFileListRight.push(this.allFileList[i]);
                                    }

                                }
                                
                            }else if(rows.type == '40'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                    
                                    if(this.allFileList[i].standards =="10" && this.allFileList[i].type =="10" ){    
                                        this.allFileListLeft.push(this.allFileList[i]);
                                    }else if(this.allFileList[i].standards =="30" && this.allFileList[i].type =="20" ){
                                        
                                        this.allFileListRight.push(this.allFileList[i]);
                                    }

                                }
                                
                            }else if(rows.type == '50'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                    
                                    if(this.allFileList[i].standards =="10" && this.allFileList[i].type =="10" ){    
                                        this.allFileListLeft1.push(this.allFileList[i]);
                                    }else if(this.allFileList[i].standards =="30" && this.allFileList[i].type =="10" ){
                                        
                                        this.allFileListLeft2.push(this.allFileList[i]);
                                    }

                                }
                                
                            }else if(rows.type == '60'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                    
                                    if(this.allFileList[i].standards =="30" && this.allFileList[i].type =="10" ){    
                                       this.allFileListLeft1.push(this.allFileList[i]);
                                    }else if(this.allFileList[i].standards =="10" && this.allFileList[i].type =="10" ){
                                        this.allFileListLeft2.push(this.allFileList[i]);
                                    }

                                }
                                
                            }else if(rows.type == '70'){

                                for(var i = 0;i<this.allFileList.length;i++){
                                    
                                    if(this.allFileList[i].standards =="20" && this.allFileList[i].type =="10" ){    
                                       this.allFileListLeft1.push(this.allFileList[i]);
                                       this.allFileListLeft2.push(this.allFileList[i]);
                                    }

                                }
                                
                            }



                            RequestGet("/sysEquipment/equipmentFile/findSelectType",{equipmentId:this.equipmentId}).then(response => {
                                            if(response.code == '0000'){
                                                 if(response.data.length>0){
                                                      for(var i=0;i<response.data.length;i++){

                                                          if(this.allFileListIds.indexOf(response.data[i].fileId) !=-1){
                                                                if(response.data[i].type =='10'){
                                                            
                                                                    if(response.data[i].align =="20"){
                                                                            this.checkList2.push(response.data[i].fileId);       
                                                                    }else{
                                                                        this.checkList1.push(response.data[i].fileId);
                                                                    }   


                                                                }else if(response.data[i].type =='20' || this.allFileListLeft2.length>0){
                                                                
                                                                    this.checkList2.push(response.data[i].fileId);    
                                                                }
                                                          }
                                                          
                                                      }  


                                                 }
                                            }
                                        
                            }).catch(error => {
                                            this.$router.push({ path: '/login' });
                                            
                            })  

                            
                            





							
						 }
                        
            }).catch(error => {
                            this.$router.push({ path: '/login' });
                            
            })  
             this.dialogFormTypeVisible = true;



      },

      open1(){


            /**
             *  equipmentdImagePlease:"请绑定图片素材",
             *  equipmentdVideoOnePlease: "绑定视频素材只能选一个",
             *  equipmentdNoPlease:"设备编号不能为空",
             *  equipmentdName1Please:"设备名称不能为空"
             *  
             * 
             * 
             * 
             * 
             */
            

           if(this.allFileListLeft.length>0 && this.checkList1.length ==0){
                this.$message({
                    message: this.$t('localization.equipmentdImagePlease'),
                    type: 'error'
                });  
                return;
           }

           if(this.allFileListRight.length>0 && this.checkList2.length!=1){
                this.$message({
                    message: this.$t('localization.equipmentdVideoOnePlease'),
                    type: 'error'
                });  
                return;
           }

           if(this.allFileListLeft2.length>0 && this.checkList1.length ==0){
                this.$message({
                    message: this.$t('localization.equipmentdImagePlease'),
                    type: 'error'
                });  
                return;
           }

            if(this.allFileListLeft2.length>0 && this.checkList2.length ==0){
                this.$message({
                    message: this.$t('localization.equipmentdImagePlease'),
                    type: 'error'
                });  
                return;
           }
           

           var person = {
              imageList:this.checkList1,
              videoList:this.checkList2,
              userId:sessionStorage.getItem("userId"),
              equipmentId:  this.equipmentId,
              align:""
           } ;


           if(this.allFileListLeft2.length>0){
               
               person.align = "10";
           }

           RequestPost("/sysEquipment/equipmentFile/updateFile",person).then(response => {
						
				
                if(response.code=='0000'){
                    this.$message({
                        message: this.$t('localization.compluteSuccess'),
                        type: 'success'
                    });  
                    this.dialogFormTypeVisible = false;
                
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


       
      },
     
      open(){
        
         
        // var uploadfile = document.getElementById("uploadfile"); 
        // this.subData.file = uploadfile.files[0];
        //alert(this.subData.file);
        // $("#formid").attr("action",$base_path+"/file/upload");
		// $("#formid").submit();

        this.validate();


        if(this.show =="1"){

            RequestPost("/sysEquipment/addFile",this.subData).then(response => {
                if(response.code == '0000'){
                        this.$message({
                            message: this.$t('localization.compluteSuccess'),
                            type: 'success'
                        });  
                        this.dialogFormVisible = false;
                        this.loadData();
                        
                }else{

                    if("该设备号已经存在" == response.message){
                        
                         this.$message({
                            message: this.$t('localization.compluteOver'),
                            type: 'error'
                        });
                    }else{
                       this.$message({
                            message: this.$t('localization.compluteError'),
                            type: 'error'
                        });     
                    }

                    

                }
                        
            }).catch(error => {
                            this.$router.push({ path: '/login' });
                            
            })  

        }else{
             //删除功能暂时不开放
            RequestPost("/sysEquipment/update",this.subData).then(response => {
                        
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


     
    

	
	loadData(){
        if(sessionStorage.getItem("loginName") == 'admin'){
            this.page.userName = "";
            this.adminUser = 1;
        }else{
            this.page.userName = sessionStorage.getItem("loginName");
            this.adminUser = 0;
        }
        
        this.page.state = '10';
        this.files = fileUrls;    
        this.page.equipmentNo = this.equipmentNo;
            this.page.type = this.type;
		RequestGet("/sysEquipment/findAll",this.page).then(response => {
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
        if(this.subData.equipmentNo.trim()=="" || this.subData.equipmentNo == null){
            this.$message({
                type: 'error',
                message: this.$t('localization.equipmentdNoPlease')
            });         
            return false;
        }
        
        if(this.subData.equipmentName1.trim()=="" || this.subData.equipmentName1 == null){
            this.$message({
                type: 'error',
                message: this.$t('localization.equipmentdName1Please')
            });         
            return false;
        }

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
        show:"1", //1新增
		totalsize:0,  //总的页数 = 总数量/每页显示的条数
        currentPage:1,
        type:"",
		page:{
			pageSize:PageSize,   //一页显示的条数
            userName:''
		},
        datalist:[],
        formtitle:"",
        fileList: [],
        paths:"",
        files:"",
        equipmentNo:"",
		listLoading: false,
        dialogFormVisible:false,
        dialogFormTypeVisible:false,
        equipmentId:"", //当前设备编号
        adminUser:0,  //是否为admin      
        subData:{
            type:""
            
        },

         checkList1: [],  //图片
         checkList2: [],  //视频
         allFileList:[], //所有图片资源
         allFileListIds:[], //所有图片资源
         allFileListLeft:[], //左边图片资源
         allFileListRight:[], //右边视频资源
         allFileListLeft1:[],
         allFileListLeft2:[], //右边图片资源


        
     

        options: [{
          value: '10',
          label: this.$t("localization.equipmentShow10"),
        }, {
          value: '20',
          label: this.$t("localization.equipmentShow20"),
        }, {
          value: '30',
          label: this.$t("localization.equipmentShow30"),
        }, {
          value: '40',
          label: this.$t("localization.equipmentShow40"),
        }, {
          value: '50',
          label: this.$t("localization.equipmentShow50"),
        },{
          value: '60',
          label: this.$t("localization.equipmentShow60"),
        },{
          value: '70',
          label: this.$t("localization.equipmentShow70"),
        }],
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
