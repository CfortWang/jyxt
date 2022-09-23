<template>

        <el-container class="login-container" @keyup.enter="handleLogin">
            <el-header style="width: 80%;">
              <div style="width:100%;height: 93px;text-align: center; position: relative;top:10%;overflow:hidden;" >
                <h1 class="login-info-title" style="font-size: 40px;color:#a73a3a;">明鉴实验室信息管理系统</h1>
              </div>
            </el-header>

            <el-main style="width: 80%;height:100%; margin-top:60px; overflow: hidden; border:0px">

                    <div class="login-border" >
                      <div class="animated fadeIn jbd-login-page-main-img">
                      </div>

                      <div class="login-main animated fadeIn jbd-login-page-main ">

                        <h3><span>{{ $t('login.userLogin') }}</span>

                          <ibps-api-base-url-controller v-if="$nodeEnv === 'development'">
                            <el-tooltip
                              effect="dark"
                              :content="$t('navbar.switchEnvironment')"
                              placement="bottom"
                            >
                              <el-button type="text" class="ibps-fr ibps-mr-5 btn-text can-hover">
                                <ibps-icon name="wifi" style="font-size: 18px;" />
                              </el-button>
                            </el-tooltip>
                          </ibps-api-base-url-controller>
                        </h3>
                        <user-login />
                        <login-bottom />
                      </div>

                    </div>


            </el-main>
            <el-footer style=" width: 80%;" >

            <div style="font-size: 12px;text-align:right;">
                <hr>
                
                <p>
                  <!--<i style="margin-left: 50px;" class="el-icon-office-building"/> 深圳市明鉴细胞专业技术有限公司
                  <i style="margin-left: 20px;" class="el-icon-location-information"/> 深圳市南山区科技园高新北区源兴科技大厦东座303
                  <i style="margin-left: 20px;" class="el-icon-phone"/> 400-9919-863
                  <i style="margin-left: 20px;" class="el-icon-message"/> services@mingjiantech.com-->
                  <i class="el-icon-s-platform"/> 深圳市金源信通科技有限公司开发
                </p>
            </div>
         </el-footer>
        </el-container>
</template>
<script>
import '@/assets/styles/pages/login.scss'
import LoginBottom from './login-bottom'
import UserLogin from './user-login'
import IbpsPluginLanguage from '@/plugins/language'
import IbpsApiBaseUrlController from '@/plugins/api-base-url'

export default {
  name: 'login',
  components: {
    LoginBottom,
    UserLogin,
    IbpsPluginLanguage,
    IbpsApiBaseUrlController
  },
  data() {
    return {
      activeName: 'user'
    }
  },
  methods: {
    handleLogin() { }
  }
}
</script>
<style>
/*.jbd-login-page-bg{ 
    margin-top:70px;
    height: 1200px;
    width: 800px;
    
    background-image: url("../../../assets/images/login/MJ_bg01.png");
    background-repeat:no-repeat;
    background-size:100% ;
    
    
  }
*/
  .jbd-login-page-main{
    margin-top:140px;
    margin-left:3%;
    margin-bottom:20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px;
    height: 320px;
    width: 300px;
    background-repeat:no-repeat;
    border-radius: 5%;
    box-sizing: border-box;
    
  }
  
  /*  margin-left: 12%;*/
  .jbd-login-page-main-img{
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
   margin-top:70px;
   height: 520px;
   width: 650px;
   margin-right:3%;
   background-image: url("../../../assets/images/login/MJ_login0.jpg");
   background-size:100% ;
   background-repeat:no-repeat;
   
  }
</style>
