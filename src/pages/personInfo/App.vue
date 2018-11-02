<template>
    <div id="box">
        <header class="clearfix">
            <p class="left">
                <img :src="userImgSrc?userImgSrc:userDefImg" >
                <span> 邀请码： {{ invitCode }}&nbsp;</span>
            </p>
            <p class="right">
                <button @click="preservation">保存</button>
                
            </p>
        </header>
        <ul class="top">
            <li class="clearfix">
                <p class="left">
                    <span>
                        昵称
                    </span>
                </p>
                <p class="right">
                    <input type="text" v-model="nickName">
                </p>
            </li>
            <li class="clearfix">
                <p class="left">
                    <span>
                        手机号
                    </span>    
                </p>
                <p class="right">
                   <!-- <input type="number" v-model="phone" @blur="upperCase" oninput="if(value.length>11)value=value.slice(0,11)"> -->
                    <span>
                        {{ phone | disPhone }}
                    </span>
                    <img :src="riImg" alt="" style="width:.12rem;heigt:.8rem;margin-left:.2rem">
                </p>
            </li>
            <li class="clearfix">
                <p class="left">
                    <span>
                        个人简介
                    </span>
                </p>
                <p class="right">
                   <input   v-model="brief" type="text" maxlength="16"  >
                </p>
            </li>
            <li class="clearfix">
                <p class="left">
                    <span>
                        最高收益/单
                    </span>
                </p>
                <p class="right">
                   <span>
                       <!-- filter  -->
                      ${{ maxProfit }}
                   </span>
                </p>
            </li>
        </ul>
        <ul class="bot">
            <li class="clearfix">
                <p class="left">
                    <span>
                        性别
                    </span>
                </p>
                <p class="right" @click="sheetVisible = !sheetVisible" style="width:5rem;text-align:right">
                    <span :class="{'grayColor':sex==''}" >
                        {{ sex }}
                    </span>
                </p>
            </li>
            <li class="clearfix">
                <p class="left">
                    <span>
                        生日
                    </span>
                </p>
                <p class="right" @click="openPicker" style="width:5rem;text-align:right">
                    <span  :class="{'grayColor':birthday==''}" >
                        {{ birthday }}
                    </span>
                </p>
            </li>
            <li class="clearfix">
                <p class="left">
                    <span>
                        引荐人
                    </span>
                </p>
                <p class="right">
                    <span>
                        {{ referrer }}
                    </span>
                </p>
            </li>
        </ul>

        <div>
            <button @click="toCard">到卡包 </button>
        </div>
        <!-- 性别选择控件 -->
        <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet>

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
import { MessageBox } from 'mint-ui'
export default {
    name: 'App', 
    data(){
        return {
            userId: '',
            urlTitle: '',
            riImg : require('./assets/Personalinformation-icon@2x.png'),
            userDefImg : require('./assets/img2.jpg'),
            userImgSrc: '',
            invitCode : '',
            maxProfit: '',
            nickName :'',
            phone :'',
            brief :'',
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
            sex : "",
            birthday:'',     
            referrer : '无',
            birthdayYear : 1990,
            birthdayYear : 1,
            birthdayMonth : 1,
            pickerValue : ''
        }
    },

    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        //初始化数据请求
        let postData = this.$qs.stringify({
            userId : this.userId,        
        });

        this.$http({
            method: 'post',
            url: this.urlTitle +'/wx/member/info',
            data:postData
        }).then( res => {
            console.log( res.data.data )
            let data = res.data.data;       
            this.userImgSrc =  data.wxHeadImg // 头像
            this.nickName = data.wxNickname // 昵称
            this.maxProfit = data.maxProfit // 最高收益
            this.invitCode = data.invitationCode // 邀请码
            this.phone = data.phone // 手机号
            if( data.introduce ){// 个人简介
                this.brief = data.introduce 
            }else{
                this.brief = '我自潇洒任鱼来'
            }
            if( data.inviterName ){// 引荐人
                this.referrer = data.inviterName 
            }
            if( data.sex ) { // 性别
                this.sex = data.sex
            }else{
                this.sex = '男'
            }
            if( data.birthday ){
                this.birthday = data.birthday.substr(0, 10)
            }else{
                this.birthday = '1980-01-01'
            }
            
        }).catch( req => {
            console.log( req )

        })
    },
    filters: {
        disPhone( val ){
            if( val ){
                val += ''
                return val.substr(0,4) + '****' + val.substr(7,4)
            }
        }
    },

    watch: {
        brief( val ){
            if ( val.length > 15 ){
                this.brief = val.substr( 0, 12 )
            }
        },
        nickName( val ){
            if ( val.length > 15 ){
                this.nickName = val.substr( 0, 12 )
            }
        },
    },
    methods: {
        // 到卡包页面
        toCard() {
            window.location.href="cardBag.html";
        },
        showMan(){
            this.sex ="男";
        },
        showWoman(){
            this.sex ="女";
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
        // 保存
        preservation(){
            let postData = this.$qs.stringify({
                wx_nickname: this.nickName, 
                introduce: this.brief, 
                sex: this.sex, 
                birthday: this.birthday, 
                userId : this.userId,        
            });
            this.$http({
                method: 'post',
                url: this.urlTitle +'/wx/member/updateUserInfo',
                data:postData
            }).then( res => {

                let msg = res.data.message
                if( res.data.code ==1 ){ 
                    MessageBox.alert(msg).then(action => {
                        window.location.href="mine.html";
                    });
                }else{
                    MessageBox('提示', msg);
                }         
            }).catch( req => {
                console.log( req )
            })
        }
    }
}
</script>
<style lang="scss" scoped>

    #box{
        background-color: #f9f9f9;
        header{
            padding: 0 .22rem;
            height: 1.2rem;
            background-color: #fff;
            img{
                width: .9rem;
                height: .9rem;
                border: 1px solid #d7d7d7;
                border-radius: 50%;
                vertical-align: middle;
                margin: .15rem 0;
            }
            span{
                margin-left: .2rem;
                vertical-align: middle;
                font-weight: bold;
                line-height: 1.2rem;
            }
            button{
                width: 1.4rem;
                height: .52rem;
                border: 1px solid #4fa2fe;
                color:#4fa2fe;
                font-weight: bold;
                margin-top: .32rem;
                border-radius: .1rem;
                background: none;
            }
        }
        .top,.bot{
            margin-top: .2rem;
            background-color: #fff;
            li{
                padding: 0 .22rem;
                height: .86rem;
                line-height: .86rem;
                font-weight: bold;
                border-bottom: 1px solid #ececec;
                p{
                    font-size: .26rem;
                }
                input{
                   font-weight: bold; 
                   text-align: right;
                   border: none;
                   outline: none;
                   color: #999;
                }
            }
            .right{
                color: #999;
            }
        }
       
    }

</style>


