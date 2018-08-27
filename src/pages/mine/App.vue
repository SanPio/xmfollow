<template>
    <div>
        <!-- Header 部分 -->
        <div :id="headerOnOff ? headerOn : headerOff" class="hahaa">
            <!-- 账号名称 -->
            <div class="head-left">
                <div>
                    <!-- 点击编辑个人信息功能1.0不上线 -->
                    <!-- <img :src="userImgSrc" alt="" @click="toPersonInfo"> -->
                    <img :src="userImgSrc" alt="" >
                </div>
                <dl>
                    <dt style="text-align: left;"> 
                        <!-- 点击编辑个人信息功能1.0不上线 -->
                        <!-- <span @click="toPersonInfo"> {{info.name}}</span> -->
                        <span > {{info.name}}</span>
                    </dt>
                    <dd>
                        <span v-if="info.meeber==1">认证会员</span>
                        <span v-if="info.meeber==2">VIP会员</span>
                        <span v-if="info.meeber==0"> 非会员</span>
                        <span v-if="info.meeber==1 || info.meeber==2">（剩余{{day}}天）</span>
                    </dd>
                </dl>
            </div>
            <!-- 会员设置，邀请好友 -->
            <div class="head-right">
                <img :src="invitImgSrc" alt="">
                <img :src="acth?memberImgSrcYellow:memberImgSrc " alt="" @click="toauthentication">
                <img :src="setImgSrc" alt="">
            </div>
        </div>
        <!-- Title部分，收益总览 -->
        <div id="title" v-if="headerOnOff">
            <dl v-for="(item,ind) in titleArr" :key="item">
                <dt>{{item}}</dt>
                <dd v-if="ind==0&&titleInfo.length" >{{ '$' +titleInfo[0]}}</dd>
                <dd v-if="ind==1&&titleInfo.length"  >{{titleInfo[1]}}</dd>
                <dd v-if="ind==2&&titleInfo.length"  >{{ '$' + titleInfo[2]}}</dd>
            </dl>
        </div>
        <!--Center 跳转部分 -->
        <div id="center">
            <dl >
                <dt>
                    <img :src="numberImgSrc" alt="" @click="toAccount">
                </dt>
                <dd @click="toAccount">账号管理</dd>
            </dl>
             <dl style="border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;">
                <dt>
                    <img :src="orderImgSrc" alt="">
                </dt>
                <dd @click="toOrder">订单管理</dd>
            </dl>
             <dl>
                <dt>
                    <img :src="followImgSrc" alt="" @click="toFollowmangeIs">
                </dt>
                <dd  @click="toFollowmangeIs">跟随管理</dd>
                
            </dl>
        </div>
        
        <!-- Content各账号详细内容 -->
        <ul id="content" v-if="contentShow" >
            <li v-for="(item,ind) in accInfo" :key="ind" v-if="item.isSimulated!=2">
                <!-- 账号标题 -->
                <div class="con-tit"  @click="conboxOpenClose(ind)">
                    <p class="con-tit-left"> 
                   <span>{{ item.accountName}}</span>
                    </p>
                    <p class="con-tit-right">
                        <img :src="accNumArr[ind] ? upSrc : downSrc" alt="">
                    </p>
                </div>
                <!-- 详细内容 -->
                <ul v-if="accNumArr[ind]" class="con-box">
                    <!-- 账号资产 -->
                    <li class="con-box-account">
                        <p class="con-box-head" >账号资产</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>历史收益</dt>
                                <dd>${{ item.bigDecimal | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>收益率</dt>
                                <dd>{{ item.percent }}</dd>
                            </dl>
                            <dl>
                                <dt>当前余额</dt>
                                <dd>${{ item.bigDecimalyu | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>已用保证金</dt>
                                <dd>${{ item.margin | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>可用保证金</dt>
                                <dd>${{ item.free_margin | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn">账号历程&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                    <!-- 订单信息 -->
                    <li class="con-box-order">
                        <p class="con-box-head">订单信息</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>持仓单量</dt>
                                <dd>{{ item.countOrderid }}</dd>
                            </dl>
                            <dl>
                                <dt>持仓手数</dt>
                                <dd>{{ item.sumlots }}</dd>
                            </dl>
                            <dl>
                                <dt>持仓浮亏</dt>
                                <dd>${{ item.sumprofitli | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>上周获利点数</dt> 
                                <dd>{{ item.zhousymbol | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>上月获利点数</dt>
                                <dd>{{ item.yuesymbol | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn">订单管理&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                    <!-- 跟随播报 -->
                    <li class="con-box-follow">
                        <p class="con-box-head">跟随播报</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>累计跟随</dt>
                                <dd>{{ item.countoption | numPuls}}</dd>
                            </dl>
                            <dl>
                                <dt>盈利单数</dt>
                                <dd>{{ item.countorder | numPuls}}</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn" @click="toFollowmange(ind)">跟随管理&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- ******************* -->
         <!-- ******************* -->
          <!-- ******************* -->

        <!-- 模拟状态 -->
        <ul id="isscontent" v-if="iss">
            <li v-for="(item,ind) in issAccInfo" :key="ind">
                <!-- 账号标题 -->
                <div class="con-tit"  @click="issConboxOpenClose">
                    <p class="con-tit-left"> 
                   <span>{{ item.accountName}}</span>
                    </p>
                    <p class="con-tit-right">
                        <img :src="issaccNumArr ? upSrc : downSrc" alt="">
                    </p>
                </div>
                <!-- 详细内容 -->
                <ul v-if="issaccNumArr" class="con-box">
                    <!-- 账号资产 -->
                    <li class="con-box-account">
                        <p class="con-box-head" >账号资产</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>历史收益</dt>
                                <dd>${{ item.bigDecimal | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>收益率</dt>
                                <dd>{{ item.percent }}</dd>
                            </dl>
                            <dl>
                                <dt>当前余额</dt>
                                <dd>${{ item.bigDecimalyu | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>已用保证金</dt>
                                <dd>${{ item.margin | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>可用保证金</dt>
                                <dd>${{ item.free_margin | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn">账号历程&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                    <!-- 订单信息 -->
                    <li class="con-box-order">
                        <p class="con-box-head">订单信息</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>持仓单量</dt>
                                <dd>{{ item.countOrderid | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>持仓手数</dt>
                                <dd>{{ item.sumlots | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>持仓浮亏</dt>
                                <dd>${{ item.sumprofitli | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>上周获利点数</dt> 
                                <dd>{{ item.zhousymbol | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt>上月获利点数</dt>
                                <dd>{{ item.yuesymbol | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn">订单管理&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                    <!-- 跟随播报 -->
                    <li class="con-box-follow">
                        <p class="con-box-head">跟随播报</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>累计跟随</dt>
                                <dd>{{ item.countoption | numPuls}}</dd>
                            </dl>
                            <dl>
                                <dt>盈利单数</dt>
                                <dd>{{ item.countorder | numPuls }}</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn" @click="toFollowmangeIss">跟随管理&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="switch clearfix" >
                <p class="left sw-le" v-if="swi">
                    <span class="">
                        当前状态：
                    </span>
                    <span class="blue">
                        模拟账号
                    </span>
                </p>
                <p class="left sw-cen" @click="swiChange">
                    <span class="blue" >
                        点击切换
                    </span>
                </p>
                <p class="left sw-ri" v-if="!swi">
                    <span>
                        当前状态：
                    </span>
                    <span class="blue">
                        真实账号
                    </span>
                </p>
        </div>
        <!-- Footer组件 底部返回按钮 -->
        <ul class="footer">
                <li class="foot-left">
                    <dl @click="toIndex">
                        <dt>
                            <img :src="leftBtnSrc" alt="">
                        </dt>
                        <dd >投资领航</dd>
                    </dl>
                </li>
            <li class="foot-right">
                <dl>
                    <dt>
                        <img :src="rightBtnSrc" alt="">
                    </dt>
                    <dd class="foot-click">我的</dd>
                </dl>
            </li>
        </ul>
        <!-- 次div为空，做占位用，返回按钮占56px高度 -->
        <div style="height:2rem"></div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            invitImgSrc : require('./assets/Invitation.jpg'),
            userImgSrc : '',
            memberImgSrc : require('./assets/My-home-page-icon1.jpg') ,
            memberImgSrcYellow : require('./assets/Myhomepage-icon1@2x.png') ,
            setImgSrc :　require('./assets/Set-up.jpg'),
             numberImgSrc : require('./assets/Accountnumber@2x.png') ,
            orderImgSrc :　require('./assets/Order@2x.png'),
            followImgSrc : require('./assets/follow@2x.png') ,
            leftBtnSrc : require('./assets/Navigate-Unclicked.jpg') ,
            rightBtnSrc : require('./assets/Myhomepage-clicked@2x.png') ,
            //header滚动
            headerOnOff :true,
            acth:false,
            headerOn : "header",
            headerOff : "header-scroll",
            //上下按钮图标
            upSrc : require('../../assets/Myhomepage-Arrow@2x.png'),
            downSrc :  require('../../assets/transaction-Arrow@2x.png'),
            titleArr : ['历史收益','收益率','当前余额'],
            titleInfo : [],
            //content区域
            contentShow : true,
            iss: false,
            urlTitle:"",
            userId : '',
            //box循环测试
            accNumArr : [true],
            info:{},
            accInfo:[],
            issAccInfo: [],
            day : 0,
            accountId: '',
            swi: false,
            issaccNumArr: true,
        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        // this.accountId = localStorage.getItem('accountId');
         let haveiss = sessionStorage.getItem('iss');
        if(haveiss == 1){
            this.contentShow = false;
            this.iss = true;
            this.swi = true;
        }else{
            this.contentShow = true;
            this.iss = false;
            this.swi = false;
        }
        //初始化数据请求
        let postData = this.$qs.stringify({
            userid:  this.userId
        });
        console.log(postData)
        this.$http({
            method: 'post',
            url: this.urlTitle +'wx/member/manager',
            data:postData
        }).then((res)=>{
            console.log(res)
            this.info = res.data.data;
            this.accInfo = res.data.data.account;
            this.issAccInfo = res.data.data.accountsmoni;
            console.log(this.accInfo)
            localStorage.setItem('accountId', this.accInfo[0].accountid);
            this.accountid = this.accInfo[0].accountid
            if(res.data.data.meeber==1 ||res.data.data.meeber==2 ){
                this.dateMinus(res.data.data.overDatetime)
                this.acth = true;
            }
            this.userImgSrc = res.data.data.image;
            if ( res.data.data.sumUserprofit > 1000 || res.data.data.sumUserprofit <= -1000 ) {
                this.titleInfo.push( parseInt( res.data.data.sumUserprofit/10 )/100 + 'K')
            }else {
                this.titleInfo.push(res.data.data.sumUserprofit);
            }
            this.titleInfo.push(res.data.data.percentUser);
            if ( res.data.data.sumUserprofitYu > 1000 || res.data.data.sumUserprofitYu <= -1000 ) {
                this.titleInfo.push( parseInt( res.data.data.sumUserprofitYu/10 )/100 + 'K' )
            }else {
                this.titleInfo.push(res.data.data.sumUserprofitYu);
            }
            for(let i = 0; i < res.data.data.account.length-1; i++){
                this.accNumArr.push(false)
                // this.$set(this.accNumArr,i,false)
            }

            // console.log(this.accNumArr)

        }).catch((err) => {
            console.log(err)
        })



    },
    filters: {
        numPuls(val){
            if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                return parseInt( val / 10000 ) / 100 + 'M'
            }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                return parseInt( val / 10 ) / 100 + 'K'
            }else{
                return val
            }
            
        }
    },
    mounted(){
    //     //Header组件缩放
    //     var _this =this; //改变指针，将Vue实例传到闭包
    //     window.addEventListener('scroll',function(){
    //         var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//监听滚动高度
    //         if(scrollTop>14){
    //             _this.headerOnOff = false; //Header收缩
    //         }else{
    //             _this.headerOnOff = true; //Header展开
    //         }
    //    })
        
    },
    methods: {
        toauthentication(){
            if(this.acth == false){
                 window.location.href=`authentication.html`;
            }
           
        },
        //账号列表内容展开收缩控制
        conboxOpenClose(ind){
            // this.accNumArr[ind] = !this.accNumArr[ind];
            this.$set(this.accNumArr,ind,!this.accNumArr[ind])
        },
        issConboxOpenClose(){
            this.issaccNumArr = !this.issaccNumArr
        },
        //返回到index主页（交易领航）
        toIndex(){
            let haveiss = sessionStorage.getItem('iss');
            if( haveiss == 1){
                window.location.href=`index.html`;
            }else{
                window.location.href=`index.html`; 
            }

        },
        //跳转到个人信息页
        toPersonInfo(){
            window.location.href="personInfo.html";
        },
      
        //跳转到账号管理
        toAccount(){  
               window.location.href="accountmanage.html";         
        },

        toFollowmangeIs(){
           let haveiss = sessionStorage.getItem('iss');
            if( haveiss == 1){
                window.location.href=`followmange.html?accountsid=${this.issAccInfo[0].accountid}`;
            }else if(this.accInfo[0].isSimulated != 2){
                window.location.href=`followmange.html?accountsid=${this.accInfo[0].accountid}`; 
            }
        },
        //跳转到跟随管理
        toFollowmange(ind){
            window.location.href=`followmange.html?accountsid=${this.accInfo[ind].accountid}`;
        },
        toFollowmangeIss(){
             window.location.href=`followmange.html?accountsid=${this.issAccInfo[0].accountid}`;
        },
        //跳转到订单管理
        toOrder(ind){   
          MessageBox('提示', '建设中');
        // window.location.href="vip.html";
        },

        //计算会员到期时间
        
        dateMinus(sDate){
            var sdate = new Date(sDate.replace(/-/g, "/"));
            var now = new Date();
            var days = sdate.getTime() - now.getTime();
            var day = parseInt(days / (1000 * 60 * 60 * 24));
            this.day = day + 1;
        },

        //切换状态
        swiChange(){
            if ( sessionStorage.getItem('iss') != 1 &&this.issAccInfo[0].endStatus == 0) {
                MessageBox('提示', '您的模拟账号已到期');
            }else {
                    this.swi = !this.swi;
                    if(this.swi == true){
                        sessionStorage.setItem('iss', 1);
                        this.contentShow = false;
                        this.iss = true;
                        localStorage.setItem('accountId', this.issAccInfo[0].accountid);
                        this.accountid = this.issAccInfo[0].accountid

                    } 
                    if( this.swi == false ){
                        sessionStorage.removeItem('iss');
                        this.contentShow = true;
                        this.iss = false;
                        localStorage.setItem('accountId', this.accInfo[0].accountid);
                        this.accountid = this.accInfo[0].accountid
                    }
            }
            
        }
        














    }       
}
</script>
<style lang="scss" scoped>
    //Header上拉后效果
    // #header-scroll{
        
    //     position: fixed;
    //     top:0;
    //     width: 7.1rem;
    //     font-size: .26rem;
    //     height: .88rem;
    //     background-color: #4fa2fe;
    //     color: #ffffff;
    //     padding: 0 .22rem;
    //     display: flex;
    //     justify-content: space-between;
    //     .head-left{
    //         display: flex;
    //         img{
    //             width: .72rem;
    //             height: .72rem;
    //             border-radius: 50%;
    //             margin: .08rem .2rem 0 0;
    //         }
    //         dt{
    //             font-weight: 900;
    //             font-size: .28rem;
    //             line-height: .48rem;
    //         }
    //         dd{
    //             font-size: .2rem;
    //             line-height: .2rem;
    //         }
    //     }
    //     .head-right{
    //         width: 2rem;
    //         display: flex;
    //         justify-content: space-between;
    //         img{
    //             margin-top: .24rem;
    //             width: .36rem;
    //             height: .36rem;
    //         }
    //     } 
    // }
    //Header上拉前效果
    #header{
        font-size: .26rem;
        height: 1.56rem;
        background-color: #4fa2fe;
        color: #ffffff;
        padding: 0 .22rem;
        display: flex;
        justify-content: space-between;
        .head-left{
            display: flex;
            img{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
                margin: .26rem .24rem 0 0;
            }
            dt{
                font-weight: 900;
                font-size: .3rem;
                margin-top: .48rem;
                margin-bottom: .08rem;
            }
            dd{
                font-size: .24rem;
                // line-height: 10px;
            }
        }
        .head-right{
            width: 2.12rem;
            display: flex;
            justify-content: space-between;
            img{
                margin-top: .24rem;
                width: .44rem;
                height: .44rem;
            }
        } 
    }
    // 收益总览
    #title{
        padding: 0 .22rem;
        display: flex;
        justify-content: space-between;
        height: 1.56rem;
        background-color: #4fa2fe;
        color : #ffffff;
        text-align: center;
        dt{
            font-size: .24rem;
            line-height: .24rem;
            margin-top: .32rem;
            margin-bottom: .18rem;
        }
        dd{
            font-size: .4rem;
            line-height: .36rem;
        }
    }
    //导航按钮
    #center{
        font-size: .24rem;
        display: flex;
        padding: .24rem 0 .48rem 0;
        dl{
            width: 33%;
            height: .88rem;
            text-align: center;
            img{
                width: .64rem;
                height: .64rem;
            }
            dd{
                margin-top: .14rem;
                color: #666666;
            }
        }
    }
    //账号信息展示
    #content,#isscontent{
        margin-top: .56rem;
        padding: 0 .22rem;
        color: #ffffff;
        li{
            //账号标题
            .con-tit{
                height: .68rem;
                line-height: .68rem;
                // background-color: pink;
                font-size: .24rem;
                color: #666666;
                border-bottom: 1px solid #c9c9c9;
                display: flex;
                justify-content: space-between;
                img{
                    width: .26rem;
                }
            }
            //账号内容 展示
            .con-box{
                font-size: .26rem;
                text-align: center;
                padding: 0 .2rem;
                .con-box-account{
                    background-color: #4fa2fe;
                }
                .con-box-order{
                    background-color: #ffa544;
                }
                .con-box-follow{
                    background-color: #ff884e;
                    margin-bottom: .4rem;
                }
                li{
                    border-radius: .2rem; 
                    margin-top: .28rem;
                    padding-bottom: .28rem;
                    .con-box-head{
                        font-size: .32rem;
                        line-height: .8rem;
                        font-weight: 900;
                        height: .8rem;
                    }
                    .con-box-bot{
                        dl{
                            float: left;
                            width: 33%;
                            .con-box-bot-btn{
                                font-size: .28rem;
                                line-height: .8rem;
                                font-weight: 900;
                            }
                            dt{
                                font-size: .22rem;
                                line-height: .4rem;
                                height: .4rem;
                            }
                            dd{
                                font-size: .28rem;
                                font-weight: 900;
                                line-height: .6rem;
                                height: .6rem;
                            }
                        }
                    }
                }
                
            }
        }
    }

    //状态切换

    .switch{
        width: 100%;
        height: .98rem;
        padding: 0;
        position: fixed;
        bottom: 1.12rem;
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
        line-height: .98rem;
        color: #666;
        font-size: .3rem;
        font-weight: bold;
        background-color: #fff;
        .sw-le{
            width: 4.8rem;
            border-right: .01rem solid #c9c9c9;
        }
        .sw-cen{
            width: 2.66rem;
        }
        .sw-ri{
            width: 4.8rem;
            border-left: .01rem solid #c9c9c9;
        }
        .blue{
            color: #4fa2fe;
        }
    }


























    //底部导航按钮
    .footer{
        width: 100%;
        height: 1rem;
        padding-top: .12rem;
        background-color:#ffffff;
        position: fixed;
        bottom:0;
        display: flex;
        justify-content: space-around;
        font-size: .2rem;
        dl{
            width: 1rem;
            text-align: center;
            color:#999999;
            .foot-click{
            color:#4fa2fe;
            }
        }
        img{
            width: .44rem;
            height: .44rem;
            margin-bottom: .04rem;
        }
    }
</style>



