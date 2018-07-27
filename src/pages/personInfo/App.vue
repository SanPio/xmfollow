<template>
    <div id="box">
        <dl id="header">
            <dt><img :src="userImgSrc" alt=""></dt>
            <dd>{{ userName }}</dd>
        </dl>
        <ul id="info-top">
            <li v-for="(item,ind) in userInfoTopTit" :key="item">
                <p class="info-top-title">
                    {{ item }} 
                </p>
                <p class="info-top-content" @click="toPhoneNum(ind)">
                    <span :class="{'grayColor':userInfoTop[ind]=='无'}"> {{ userInfoTop[ind] }} </span>
                    <!-- 手机号绑定更改业务先不做 -->
                    <!-- <img src="./assets/Personalinformation-icon@3x.png" alt="" v-if="ind==1"> -->
                </p>
            </li>
        </ul>
        <div style="height:16px;background:#f9f9f9;"></div>
        <ul id="info-bot">
            <li v-for="(item,ind) in userInfoTopBot" :key="ind">
                <p class="info-bot-title">
                    {{ item }} 
                </p>
                <p class="info-bot-content">
                    <span :class="{'grayColor':userInfoBot[ind]=='无'}" @click="clickfunction(ind)"> {{ userInfoBot[ind] }} </span>
                    <button v-if="ind==5&&invitBtnType==0" class="invit">邀请</button>
                    <button v-if="ind==5&&invitBtnType==1" class="receive">领取</button>
                    <button v-if="ind==5&&invitBtnType==2" class="received">已领取</button>
                </p>
               
            </li>
        </ul>
        <!-- 生日选择组件 -->
        <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="pickerValue"
            @confirm="handleConfirm">
        </mt-datetime-picker>






    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            userImgSrc : require('./assets/img2.jpg'),
            userName : '个人信息',
            userInfoTopTit : ['昵称','手机号','个人简介','交易策略'],
            userInfoTop : ['信息员001号','12345678987','信息员001号','信息员001号'],
            userInfoTopBot : ['性别','生日','血型','星座','推荐我的','我推荐的'],
            userInfoBot : ['男','1990-01-01','A型','金牛座','无','每推荐X个人就可获得VIP月卡'],
            invitBtnType : 2,// 0为邀请，1为领取，2为已领取
            pickerValue : ''
        }
    },
    // created(){
    //     //初始化数据请求
    //     this.$http.post('',{    
    //         name:"virus"  
    //     }).then(function(res){
    //         // console.log(res)
    //     }).catch(function(err){
        
    //         // console.log(err)
    //     })
    // },
    mounted(){

    },
    methods: {
        //点击手机号码
        toPhoneNum(ind){
            if(ind==1){
                if(this.userInfoTop[ind] != "无"){
                    window.location.href="replacephone.html";//手机号不为空，跳转到更换页
                }else {
                    window.location.href="bindphone.html";//手机号为空，跳转到绑定页
                }
            }  
        },
        clickfunction(ind){
            if(ind == 1){
                this.openPicker()
            }
        },
        //选择生日
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(){
            console.log(this.pickerValue)
        }
    }
}
</script>
<style lang="scss" scoped>
    #header{
        // height: 125px;
        background-color: #4fa2fe;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        dt{
            padding: 8px 0;
            img{
                width: 76px;
                height: 76px;
                border-radius: 50%;
            }
        }
        dd{
            line-height: 14px;
            padding-bottom: 10px;
            font-weight: 900;
        }
    }
    #info-top,#info-bot{
        font-size: 13px;
        margin-top: 6px;
        li{
            display: flex;
            height: 38px;
            line-height: 38px;
            border-bottom: 1px solid #c9c9c9;   
        }
        .info-top-title,.info-bot-title{
            padding-left: .4rem;
            width: 1.73rem;
            color: #333333;
        }
        .info-top-content,.info-bot-title{
            img{
                height:11px;
                margin-left: 3.3rem;
            }
        }
    }
    #info-bot{
        .info-bot-content{
            .grayColor{
                color: #c9c9c9;
            }
            button{
                width: 1.4rem;
                height: 28px; 
                outline: none;
                border: none;
                border-radius: 6px;
                margin-left: .2rem;
            }
            .invit,.receive{
                background-color: #4fa2fe;
                color: #ffffff;
            }
            .received{
                background:none;
                color: #999999;
                border:1px solid #e5e5e5;
            }
            
        } 
    }
    
    


</style>


