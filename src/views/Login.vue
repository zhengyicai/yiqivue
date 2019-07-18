<!--:style="{backgroundImage:'url('+require('./../assets/logo.png')+')'}"-->
<template  >
    <div class="login-wrap">
       <el-select v-model="value"  @change="switchLanguage(value)" class="el-select" style="margin:1% 5% 0% 85%">
            <el-option
                  v-for="item in language"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
            </el-option>
      </el-select> 
            <div class="ms-login">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container"  >
        <h3 class="title"> {{this.$t("localization.logintitle")}}<div></div></h3>
        <el-form-item prop="account">
          <el-input type="text" @keyup.enter.native="handleSubmit2" v-model="data.loginName" auto-complete="off" :placeholder="this.$t('localization.loginuser')"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" @keyup.enter.native="handleSubmit2" v-model="data.password" auto-complete="off" :placeholder="this.$t('localization.loginpwd')"></el-input>
        </el-form-item>
        

        <el-row>
            <el-col :span="14">
            
                <el-form-item prop="account">
                    <el-input  type="text"   @keyup.enter.native="handleSubmit2"   v-model="data.picCode" auto-complete="off" :placeholder="this.$t('localization.logincode')"></el-input>
                </el-form-item>
            
            </el-col>
            <el-col :span="10" style="padding-left:20px"> <img :span="10"  :src="imgStr"  @click="loadImg"> </el-col>
        </el-row>
        <el-checkbox v-model="checked" checked class="remember">{{this.$t("localization.localpwd")}}</el-checkbox>
        
        
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;"   @click.native.prevent="handleSubmit2" :loading="logining">{{this.$t("localization.loginbtn")}}</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      
      </el-form>
            </div>
    </div>          
</template>

<script>
  // import { requestLogin } from '../api/api';
  import { url } from '../api/api';
  import { RequestPost } from '../api/api';
    import { RequestGet } from '../api/api';
  
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        value: this.$i18n.locale, //为了把下拉框的默认值和全局变量的值一致，以此实现载入页面时显示的语言和数据配置一致
        language: [
            {
            value: "en-US",
            label: "English"
            },
            {
            value: "zh-CN",
            label: "中文简体"
            },
            {
            value: "zh-TW",
            label: "中文繁體"
            }
        ],
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: this.$t("localization.loginplaceuser"), trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: this.$t("localization.loginplacepwd"), trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true,
        data:{
            loginName:"",
            password:"",
            imgKey:"",
            picCode:""
        },
        imgStr:""
      };
    },
    created:function(){
        this.loadImg();

    },
    methods: {
      switchLanguage(value) {
        if (this.value == "zh-CN") {
            this.$i18n.locale = "zh-CN";
        } else if (this.value == "en-US") {
            this.$i18n.locale = "en-US";
        } else if (this.value == "zh-TW") {
            this.$i18n.locale = "zh-TW";
        }
        var _this = this;        //在选择了显示的语言后，将配置保存到Cookie中
        localStorage.setItem("defaultLanguage",_this.value);
        
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      loadImg(){
        // this.$axios.get(url+'/login/loadImgCode').then(response => {
        //           this.data.imgKey  = response.data.data.imgKey;
        //           this.imgStr = "data:image/jpg;base64,"+response.data.data.imgStr;
                 
        //         }).catch(error => {
        //           console.log(error)
        //   })
        RequestGet("/login/loadImgCode").then(response => {
                
                this.data.imgKey  = response.data.imgKey;
                this.imgStr = "data:image/jpg;base64,"+response.data.imgStr;
            }).catch(error => {
                // this.$message({
                //     message:"error",
                //     type: 'error'
                // });
              })
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            
          // this.$axios.post(url+'/login/loginIn',this.data, {
          // headers: { 
          //   'token':'asdf'
          // }
          // }).then(response => {
                  //this.testData = response.data
                 
                //   if(response.data.code=='0000'){
                //     sessionStorage.setItem('user', JSON.stringify(response.data.data));
                //     this.$router.push({ path: '/table' });
                //   }else{
                //     this.$message({
                //         message: response.data.message,
                //         type: 'error'
                //     });
                //   }
                // }).catch(error => {
                //     this.$message({
                //         message:"error",
                //         type: 'error'
                //     });
                //  })


         
         
            this.logining = true;

            //登录接口
            RequestPost("/login/loginIn",this.data).then(response => {
                  
                  this.logining = false; 
                 // alert( this.$t("localization.loginplacepwd"));
                  if(response.code=='0000'){
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                    sessionStorage.setItem('token', response.data);
                   
                    this.$router.push({ path: '/homeIndex' });
                  }else{

                    var ddd = "";
                    if("用户名不能为空！" ==response.message){
                      ddd = this.$t("localization.loginplaceuser1")
                    }else  if("密码不能为空！" ==response.message){
                      ddd = this.$t("localization.loginplacepwd1")
                    }else  if("验证码不能为空！" ==response.message){
                      ddd = this.$t("localization.loginplacecode1")
                    }else  if("验证码输入有误或已失效" ==response.message){
                      ddd = this.$t("localization.loginplacecode2")
                    }else  if("登录用户不存在" ==response.message){
                      ddd = this.$t("localization.loginUserError")
                    }else  if("登录密码错误！" ==response.message){
                      ddd = this.$t("localization.loginPwdError")
                    }else  if("验证码输入有误或已失效" ==response.message){
                      ddd = this.$t("localization.loginplacecode2")
                    }
                    
                    

                    this.$message({
                        message: ddd,
                        type: 'error'
                    });
                  }
            }).catch(error => {
               this.$router.push({ path: '/login' });
              })
           
          
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    //background-image: url("../assets/bg1.jpg");
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
   // box-shadow: 0 0 25px #cac6c6;
    .title {
       margin: 0px auto 20px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    
  }

   .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        
       // background-image: url(/static/login-bg.jpg);
       background-color: #323639;
        //background-size: 100%;
       background-size:cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        //width:350px;
        margin:-390px 0 0 -175px;
        border-radius: 5px;
        //background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>