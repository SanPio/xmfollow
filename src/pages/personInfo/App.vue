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
                <p class="info-top-content" >
                    <input type="text" v-if="ind==0" v-model="nickName">
                    <input type="number" v-if="ind==1" v-model="phone" @blur="upperCase" oninput="if(value.length>11)value=value.slice(0,11)">
                    <input type="text" v-if="ind==2" v-model="brief">
                    <input type="text" v-if="ind==3" v-model="strategy">
                    <!-- <span :class="{'grayColor':userInfoTop[ind]=='无'}"> {{ userInfoTop[ind] }} </span> -->
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
                    <!-- <span :class="{'grayColor':userInfoBot[ind]=='无'}" @click="clickfunction(ind)"> {{ userInfoBot[ind] }} </span> -->
                    <span v-if="ind==0" :class="{'grayColor':sex==''}" @click="sheetVisible = !sheetVisible">{{ sex }}</span>
                    <span v-if="ind==1" :class="{'grayColor':birthday==''}" @click="openPicker">{{ birthday }}</span>
                    <span v-if="ind==2" :class="{'grayColor':bloodType==''}" @click="bloodTypeVisible = !bloodTypeVisible">{{ bloodType }}</span>
                    <span v-if="ind==3" :class="{'grayColor':constellation==''}"  @click="constellationVisible = !constellationVisible">{{ constellation }}</span>
                    <span v-if="ind==4" :class="{'grayColor':recommendMe=='无'}" >{{ recommendMe }}</span>
                    <span v-if="ind==5" :class="{'grayColor':iRecommend==''}" >{{ iRecommend }}</span>
                    <button v-if="ind==5&&invitBtnType==0" class="invit">邀请</button>
                    <button v-if="ind==5&&invitBtnType==1" class="receive">领取</button>
                    <button v-if="ind==5&&invitBtnType==2" class="received">已领取</button>
                </p>
               
            </li>
        </ul>
        <div id="footer">
            <button id="push">保存</button>
        </div>
        
        
        <!-- 性别选择控件 -->
        <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet>
        <!-- 血型选择控件 -->
        <mt-actionsheet
        :actions="bloodTypeActions"
        v-model="bloodTypeVisible">
        </mt-actionsheet>
        <!-- 星座选择控件 -->
        <mt-actionsheet
        :actions="constellationActions"
        cancelText=''
        v-model="constellationVisible">
        </mt-actionsheet>
<!-- birthdayYear : 1990,
            birthdayYear : 1,
            birthdayMonth : 1, -->
        <!-- 生日选择组件 -->
        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="pickerValue"
            :startDate="startDate"
            :endDate="endDate"
            @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    name: 'App', 
    data(){
        return {
            userImgSrc : require('./assets/img2.jpg'),
            userName : '个人信息',
            userInfoTopTit : ['昵称','手机号','个人简介','交易策略'],
            nickName :'信息员001号',
            phone :13188889999,
            brief :'我自己潇洒等鱼来',
            strategy :'很稳，很抓钱',
            sheetVisible:false,
            bloodTypeVisible :false,
            constellationVisible :false,
            startDate:new Date(1930,1,1),
            endDate:new Date(),
            actions:[
                {
                    'name' : "男",
                    'method' : this.showMan
                
                },
                {
                    'name' : "女",
                    'method' : this.showWoman
                
                },
            ],
            bloodTypeActions : [
                {
                    'name' : 'A型',
                    'method' : this.bloodTypeA
                
                },
                {
                    'name' : 'B型',
                    'method' : this.bloodTypeB
                
                },
                {
                    'name' : 'AB型',
                    'method' : this.bloodTypeAB
                
                },
                {
                    'name' : 'O型',
                    'method' : this.bloodTypeO
                
                },
            ],
            constellationActions : [
                {
                    'name' : '白羊座',
                    'method' : this.constellationA
                
                },
                {
                    'name' : '金牛座',
                    'method' : this.constellationB
                
                },
                {
                    'name' : '双子座',
                    'method' : this.constellationC
                
                },
                {
                    'name' : '巨蟹座',
                    'method' : this.constellationD
                
                },
                {
                    'name' : '狮子座',
                    'method' : this.constellationE
                
                },
                {
                    'name' : '处女座',
                    'method' : this.constellationF
                
                },
                {
                    'name' : '天秤座',
                    'method' : this.constellationG
                
                },
                {
                    'name' : '天蝎座',
                    'method' : this.constellationH
                
                },
                {
                    'name' : '射手座',
                    'method' : this.constellationI
                
                },
                {
                    'name' : '魔羯座',
                    'method' : this.constellationJ
                
                },
                {
                    'name' : '水瓶座',
                    'method' : this.constellationK
                
                },
                {
                    'name' : '双鱼座',
                    'method' : this.constellationL
                
                }
            ],
            
            sex : "男",
            birthday:'1990-05-06',
            bloodType : "A型",
            constellation : '白羊座',
            recommendMe : '无',
            iRecommend : '每推荐X个人就可获得VIP月卡',
            userInfoTopBot : ['性别','生日','血型','星座','推荐我的','我推荐的'],
            birthdayYear : 1990,
            birthdayYear : 1,
            birthdayMonth : 1,
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
        // clickfunction(ind){
        //     if(ind == 1){
        //         this.openPicker()
        //     }
        // },
        upperCase(){
            console.log(this.phone)
            if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
                Toast({
                    message: '手机号号码有误会',
                    duration: 3000
                });
                return false; 
            } 
        },
        //选择生日
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(){
            this.birthdayYear = this.pickerValue.getFullYear();
            this.birthdayMonth = this.pickerValue.getMonth()+1<10 ? "0" + (this.pickerValue.getMonth()+1) :this.pickerValue.getMonth();
            this.birthdayDate = this.pickerValue.getDate()<10 ? "0" + this.pickerValue.getDate() : this.pickerValue.getDate();
            this.birthday = this.birthdayYear  +'-' + this.birthdayMonth + '-' + this.birthdayDate
            

        },
        showMan(){
            this.sex ="男";
        },
        showWoman(){
            this.sex ="女";
        },
        bloodTypeA(){
            this.bloodType = "A型";
        },
        bloodTypeB(){
            this.bloodType = "B型";
        },
        bloodTypeAB(){
            this.bloodType = "AB型";
        },
        bloodTypeO(){
            this.bloodType = "O型";
        },
        constellationA(){
            this.constellation = '白羊座';
        },
        constellationB(){
            this.constellation = '金牛座';
        },
        constellationC(){
            this.constellation = '双子座';
        },
        constellationD(){
            this.constellation = '巨蟹座';
        },
        constellationE(){
            this.constellation = '狮子座';
        },
        constellationF(){
            this.constellation = '处女座';
        },
        constellationG(){
            this.constellation = '天秤座';
        },
        constellationH(){
            this.constellation = '天蝎座';
        },
        constellationI(){
            this.constellation = '射手座';
        },
        constellationJ(){
            this.constellation = '魔羯座';
        },
        constellationK(){
            this.constellation = '水瓶座';
        },
        constellationL(){
            this.constellation = '双鱼座';
        },
        
    }
}
</script>
<style lang="scss" scoped>
    #header{
        // height: 125px;
        background-color: #4fa2fe;
        color: #ffffff;
        font-size: .28rem;
        text-align: center;
        dt{
            padding: .16rem 0;
            img{
                width: 1.52rem;
                height: 1.52rem;
                border-radius: 50%;
            }
        }
        dd{
            line-height: .28rem;
            padding-bottom: .2rem;
            font-weight: 900;
        }
    }
    #info-top,#info-bot{
        font-size: .26rem;
        margin-top: .12rem;
        li{
            display: flex;
            height: .76rem;
            line-height: .76rem;
            border-bottom: 1px solid #c9c9c9;   
        }
        .info-top-title,.info-bot-title{
            padding-left: .4rem;
            width: 1.73rem;
            color: #333333;
        }
        .info-top-content,.info-bot-title{
            img{
                height: .22rem;
                margin-left: 3.3rem;
            }
        }
        .info-top-content{
            input{
                width: 5rem;
                outline: none;
                border:none;
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
                height: .56rem; 
                outline: none;
                border: none;
                border-radius: .12rem;
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
    #footer{
        padding: 0;
        text-align: center;
        position: relative;
        #push{
            position:absolute;
            left: 3.5rem;
            top: .28rem;
            font-size: .32rem;
            font-weight: 900;
            border: none;
            outline: none;
            background: none;
            color:#4fa2fe;
        }
    }



</style>


