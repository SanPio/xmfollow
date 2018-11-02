<template>
    <div>
        <div id="header">
            <div class="head-left fl">
                <div class="fl">
                    <div class="img"><img :src="userImgSrc" alt="" v-if="userImgSrc"></div>
                    <img src="./assets/img2.jpg" alt="" v-if="!userImgSrc">
                </div>
                <div v-if="uservip" class="uservip">
                    <div class="img"><img src="./assets/title@2x.png" alt=""></div>                   
                    <p>已认证</p>
                </div>
                <div v-if="authentication" class="uservip">
                    <div class="img"></div>  
                    <p>已认证</p>
                </div>
                <dl class="fl">
                    <dt>{{info.nickName}}</dt>
                    <dd>邀请码 : {{info.invitCode}}</dd>
                </dl>
            </div>
            <div class="head-right fr">
                <div class="fl">做任务领积分</div>
                <img src="./assets/zzz1@2x.png" alt="" class="fl">
            </div>
            <div class="info">
                <dl>
                    <dt>{{info.percentUser | numPuls}}</dt>
                    <dd>收益率</dd>
                </dl>
                <dl>
                    <dt>${{info.sumUserprofit | numPuls}}</dt>
                    <dd>历史收益</dd>
                </dl>
                <dl>
                    <dt>${{info.balance | numPuls}}</dt>
                    <dd>当前余额</dd>
                </dl>
            </div>
            <div class="title">
                <dl>
                    <dt>
                        <img :src="numberImgSrc" alt="" @click="toAccount">
                    </dt>
                    <dd @click="toAccount">账号管理</dd>
                </dl>
                <dl>
                    <dt>
                        <img :src="orderImgSrc" alt="" @click="toOrder">
                    </dt>
                    <dd @click="toOrder">订单管理</dd>
                </dl>
                <dl>
                    <dt>
                        <img :src="followImgSrc" alt="" @click="toFollowmangeIs">
                    </dt>
                    <dd  @click="toFollowmangeIs">跟随管理</dd>                
                </dl>
                <dl>
                    <dt>
                        <img :src="cardImgSrc" alt="">
                    </dt>
                    <dd>我的卡包</dd>                
                </dl>
            </div>
        </div>
        <div id="center">
            <!-- 我的特权 -->
            <div class="privilege" v-if="privilege">
                <div>
                    <p class="privilegeLeft fl">我的特权</p>
                    <p class="privilegeRight fr">特权明细>></p>
                </div>
                <ul>
                    <li><img src="./assets/tequan.png" alt=""></li>
                    <li><img src="./assets/tequan.png" alt=""></li>
                    <li><img src="./assets/tequan.png" alt=""></li>
                    <li><img src="./assets/tequan.png" alt=""></li>
                </ul>
            </div>
            <!-- 会员中心 -->
            <div class="memberCenter">
                <div>
                    <p class="fl">会员中心</p>
                </div>
                <div ref='remove'>
                    <ul ref='btnImg' class="btn-move"  
                        @touchstart='touchStart' 
                        @touchmove='touchMove' 
                        @touchend='touchEnd' 
                        :style="slideEffect">
                        <li>
                            <div class="memberCenterTop" @click="toBuyVip">
                                <p class="fr">续费>></p>
                                <div class="date fl">
                                    <span>{{info.vipOverDatetime}}</span>
                                </div>
                                <div class="fl">
                                    <img src="./assets/My-home-page-icon1.jpg" alt="" class="fl">
                                    <p class="fl" style="margin: 0.26rem 0 0 0.1rem;"><span>VIP会员</span></p>
                                </div>
                            </div>
                            <div class="memberCenterBottom">
                                <span @click="toBuyRecord">购买记录>></span><span>查看特权>></span>
                            </div>
                        </li>
                        <li v-if="authentication">
                            <div class="memberCenterTop" @click="toBuyVip">
                                <p class="fr">续费>></p>
                                <div class="date fl">
                                    <span>{{info.authenticationOverDatetime}}</span>
                                </div>
                                <div class="fl">
                                    <img src="./assets/My-home-page-icon1.jpg" alt="" class="fl">
                                    <p class="fl" style="margin: 0.26rem 0 0 0.1rem;"><span>V认证</span></p>
                                </div>
                            </div>
                            <div class="memberCenterBottom">
                                <span @click="toBuyRecord">购买记录>></span><span>查看特权>></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 福利 -->
            <div class="welfare">
                <div>
                    <p class="fl">福利</p>
                </div>
                <!-- <mt-swipe :show-indicators="false" :auto="8000">
                    <mt-swipe-item>
                        <ul>
                            <li @click="changeStyle(index)" v-for="(item,index) in list" :key="index" :class="{active:index==isActive}">
                                <b>新</b>
                                <p style="color:#666666;font-size:0.24rem;margin-top: 0.2rem;">{{item.title}}</p>
                                <p style="color:#333333;font-size:0.3rem;">{{item.content}}</p>
                                <P style="color:#ff852b;font-size:0.24rem;margin-top: 0.2rem;">￥<span style="color:#ff852b;font-size:0.48rem;">{{item.originalPrice | numPuls }}</span></P>
                                <P style="color:#999999;font-size:0.24rem;text-decoration:line-through;">￥<span>{{item.presentPrice | numPuls}}</span></P>
                            </li>
                        </ul>
                    </mt-swipe-item>
                </mt-swipe> -->
                <!-- <mt-swipe :show-indicators="false" :auto="8000">
                    <mt-swipe-item> -->
                    <div class="btns" ref='removes'>
                        <ul ref='btnImgs' class="btn-moves"  
                        @touchstart='touchStarts' 
                        @touchmove='touchMoves' 
                        @touchend='touchEnds' 
                        :style="slideEffects">
                            <li @click="changeStyle(index)" v-for="(item,index) in list" :key="index" :class="{active:index==isActive}">
                                <b v-if="index==0">新</b>
                                <p style="color:#666666;font-size:0.24rem;margin-top: 0.2rem;">{{item.title}}</p>
                                <p style="color:#333333;font-size:0.3rem;">{{item.content}}</p>
                                <P style="color:#ff852b;font-size:0.24rem;margin-top: 0.2rem;">￥<span style="color:#ff852b;font-size:0.48rem;">{{item.originalPrice | numPuls }}</span></P>
                                <P style="color:#999999;font-size:0.24rem;text-decoration:line-through;">￥<span>{{item.presentPrice | numPuls}}</span></P>
                            </li>
                        </ul>
                    </div>
                    <!-- </mt-swipe-item>
                </mt-swipe>                      -->
                <button @click="toVipWelfare">立即获得</button>
            </div>
            <!-- 任务 -->
            <div class="task" v-if="task">
                <div>
                    <p class="fl">任务</p>
                </div>
                <ul>
                    <li>
                        <div class="taskLeft fl">日常</div>
                        <div class="taskCenter fl">
                            <img src="./assets/1414@2x.png" alt="" class="fl">
                            <dl class="fl">
                                <dt>签到领积分</dt>
                                <dd>积分+80</dd>
                            </dl>
                        </div>
                        <div class="taskRight fr">去完成</div>
                    </li>
                    <li><div class="taskLeft fl">成就</div>
                        <div class="taskCenter fl">
                            <img src="./assets/141712@2x.png" alt="" class="fl">
                            <dl class="fl">
                                <dt>绑定真实账号</dt>
                                <dd>积分+80</dd>
                            </dl>
                        </div>
                        <div class="taskRight fr">去完成</div>
                    </li>
                </ul>
                <button>更多</button>
            </div>
            <!-- 关于我们 -->
            <div class="about">
                <ul>
                    <li @click="toAbout">
                        <img src="./assets/about.jpg" alt="" class="fl">
                        <span class="fl">关于我们</span>
                    </li>
                    <li @click="toNewHelp">
                        <img src="./assets/help.jpg" alt="" class="fl">
                        <span class="fl">新手帮助</span>
                    </li>
                    <li v-if="contact">
                        <img src="./assets/contact.jpg" alt="" class="fl">
                        <span class="fl">联系客服(客服微信：xiangming201806)</span>
                    </li>
                </ul>
            </div>
        </div>         
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
    </div>
</template>
<script>

import {Swipe, SwipeItem} from 'mint-ui'

export default {
    // name: 'App', 
    data(){
        return {
            userImgSrc : "",
            followImgSrc : require('./assets/follow@2x12.png') ,
            orderImgSrc :　require('./assets/14@2x.png'),
            numberImgSrc : require('./assets/@2x.png') ,
            cardImgSrc : require('./assets/cart.png') ,
            leftBtnSrc: require('./assets/Navigate-Unclicked.jpg'),
            rightBtnSrc: require('./assets/Myhomepage-clicked@2x.png'),
            info:[],
            accInfo:'',
            userId:'',
            ind:'',
            // active: true,
            isActive : -1,
            // 联系客服
            contact: false,
            // 我的特权
            privilege: false,
            // 任务
            task: false,
            // vip
            uservip: true,
            // 认证会员
            authentication: false,
            // 福利
            welfareId:'',
            list:[],
            name:"kaishi",
            startX:0,
            moveX:0,
            endX:0,
            disX:0,
            slideEffect:'',
            startW:0,
            moveW:0,
            endW:0,
            disW:0,
            slideEffects:'',
            scroll:''

        }
    },
    
    components:{
        'mt-swipe': Swipe,
        'mt-swipe-item': SwipeItem
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        // 初始化数据
        let postData = this.$qs.stringify({
            userid:  this.userId
        });
        console.log(postData)
        this.$http({
            method: "post",
            url: this.urlTitle +'wx/member/manager',
            data: postData
        }).then((res)=>{
            console.log(res)
            this.info = res.data.data
            console.log(this.info)
            this.userImgSrc = res.data.data.headImg
            this.uservip = res.data.data.vip
            this.authentication = res.data.data.authentication
            this.list = res.data.data.list
            this.accInfo = localStorage.getItem('accountId')
            this.userId = localStorage.getItem('userId')
            // console.log(localStorage.getItem('accountId'))
            

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
    methods:{
        changeStyle(index){ 
            // console.log(index)
            this.isActive=index;
            
        },
        // 跳转到首页
        toIndex(){
            window.location.href=`index.html`;
        },
        // 跳转到账号管理
        toAccount(){
            window.location.href = `accountmanage.html`;
        },
        // 跳转到订单管理
        toOrder(ind){
            window.location.href = `order.html`
        },
        // 跳转到跟随管理
        toFollowmangeIs(ind){
            window.location.href=`followmange.html?accountId=${this.accInfo}`
        },
        // 会员中心续费
        toBuyVip(){
            window.location.href = `vip.html`
        },
        // 通过福利跳转到vip购买页面
        toVipWelfare(){
            // console.log(this.isActive)
            this.welfareId = this.list[this.isActive].id
            console.log(this.welfareId)
            window.location.href = `vip.html?userId=${this.userId}&id=${this.welfareId}`
        },
        // 跳转到购买记录
        toBuyRecord(){
            window.location.href = `buyRecord.html`
        },
        // 跳转到关于我们
        toAbout(){
            window.location.href = `about.html`
        },
        // 跳转到新手帮助
        toNewHelp(){
            window.location.href = `newhelp.html`
        },


        // 滑动事件
        //会员中心
        touchStart:function(ev) {
            ev = ev || event;
            // ev.preventDefault();
            // console.log(ev.targetTouches);
            // console.log(ev.changedTouches);
            if(ev.touches.length == 1) {    
                this.startX = ev.touches[0].clientX; 
            }
        },
        touchMove:function(ev) {
            ev = ev || event;
            // console.log(ev)
            // ev.preventDefault();
            let btnWidth = this.$refs.remove.offsetWidth;  
            let btnImg = this.$refs.btnImg.offsetWidth;

            // console.log(ev.targetTouches);
            // console.log(ev.changedTouches);
            if(ev.touches.length == 1) {
                
                this.moveX = ev.touches[0].clientX;

                
                this.disX = this.moveX-this.startX;
                if(this.disX<0 || this.disX == 0) {
                    this.slideEffect = 'transform:translateX('+this.disX+'px)';

                }else if(this.disX>0){
                    this.slideEffect = 'transform:translateX(0px)';

                    if(this.disX>=btnWidth) {
                        this.slideEffect = 'transform:translateX('+(btnWidth-btnImg)+'px)';
                    }
                }
                // console.log(this.slideEffect)
            }
        },
        touchEnd:function(ev){
            ev = ev || event;
            // ev.preventDefault();
            let btnWidth = this.$refs.remove.offsetWidth;
            let btnImg = this.$refs.btnImg.offsetWidth;
//          console.log(ev.changedTouches);
            if(ev.changedTouches.length == 1) {
                let endX = ev.changedTouches[0].clientX;
                this.disX = endX-this.startX;
                // console.log(this.disX,'this.disX')
                // console.log((btnWidth/2),'btnWidth/2');
                if(this.disX < (btnWidth/2)) {
                    this.slideEffect = 'transform:translateX("+(btnWidth-btnImg)+ "px)';
                }else {
                    this.slideEffect = "transform:translateX(0px)";
                }
            }
        },
        // 福利
        touchStarts:function(ev) {
            ev = ev || event;
            // ev.preventDefault();

            if(ev.touches.length == 1) {    
                this.startW = ev.touches[0].clientX; 
            }
        },
        touchMoves:function(ev) {
            ev = ev || event;
            // ev.preventDefault();
            let btnWidths = this.$refs.removes.offsetWidth;  
            let btnImgs = this.$refs.btnImgs.offsetWidth;

            if(ev.touches.length == 1) {
                
                this.moveW = ev.touches[0].clientX;

                
                this.disW = this.moveW-this.startW;
                if(this.disW<0 || this.disW == 0) {
                    this.slideEffects = 'transform:translateX('+this.disW+'px)';

                }else if(this.disW>0){
                    this.slideEffects = 'transform:translateX(0px)';

                    if(this.disW>=btnWidths) {
                        this.slideEffects = 'transform:translateX('+(btnWidths-btnImgs)+'px)';
                    }
                }
            }
        },
        touchEnds:function(ev){
            ev = ev || event;
            // ev.preventDefault();
            let btnWidths = this.$refs.removes.offsetWidth;
            let btnImgs = this.$refs.btnImgs.offsetWidth;
            if(ev.changedTouches.length == 1) {
                let endW = ev.changedTouches[0].clientX;
                this.disW = endW-this.startW;

                if(this.disW < (btnWidths/2)) {
                    this.slideEffects = 'transform:translateX("+(btnWidths-btnImgs)+ "px)';
                }else {
                    this.slideEffects = "transform:translateX(0px)";
                }
            }
        }
        // 滑动事件结束
    }
 
}
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: "微软雅黑"; 
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    body{
        background-color: pink;
    }
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
    .title{
        width: 6rem;
        // height: 1.64rem;
        background-color: white;
        margin: 0.2rem auto;
        font-size: .24rem;
        display: flex;
        padding: .33rem 0 .48rem 0;
        border-radius: 0.08rem; 
        dl{
            width: 33%;
            height: .88rem;
            text-align: center;
            img{
                width: .66rem;
                height: .66rem;
            }
            dd{
                margin-top: .14rem;
                color: #666666;
            }
        }
    }
    #header{
        height: 5.1rem;
        background: url("./assets/mine.jpg");
        background-size: 100% 100%;
        overflow: hidden;
        .head-left{
            overflow: hidden;
            padding: 0.5rem 0 0 0.24rem;
            color: white;
            position: relative;
            div{
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    display: block;
                    border-radius: 50%;
                }
            }
            dl{
                margin: 0.3rem 0 0 0.2rem;
                text-align: left;
                dt{
                    font-size: 0.32rem;
                }
                dd{
                    font-size: 0.24rem;
                }
            }
            
            .uservip{
                    position: absolute;
                    left: 0.28rem;
                    top: 0.2rem;
                    width: 1.2rem;
                    border-bottom-right-radius: 0.6rem;
                    border-bottom-left-radius: 0.6rem;
                    overflow: hidden;
                    margin-left: -0.04rem;
                .img{
                    width: 0.5rem;
                    height: 0.44rem;
                    img{
                        display: block;
                        width: 0.5rem;
                        height: 0.44rem;
                    }
                }               
                p{
                    width: 1.1rem;
                    height: 0.36rem;
                    line-height: 0.35rem;
                    color: white;
                    background-color: #ffa300;
                    margin: 0.7rem 0 0 0.04rem;
                    font-size: 0.22rem;
                }
                
            }
        } 
        .head-right{
            overflow: hidden;
            margin: 0.85rem 0.2rem 0 0;
            div{
                width: 1.74rem;
                height: 0.5rem;
                border: 1px solid #fff;
                border-radius: 0.25rem;
                color: white;
                line-height: 0.5rem;
                margin-right: 0.36rem;
                letter-spacing: 0.02rem;
                font-size: 0.2rem;
            }
            img{
                display: block;
                width: 0.5rem;
                height: 0.5rem;
            }
        }
        .info{
            width: 84%;
            height: 1.4rem;
            margin: 1.7rem auto 0;
            dl{
                margin-top: 0.4rem;
                float: left;
                width: 33.33%;
                color: white;
                dt{
                    font-size: 0.36rem;
                }
                dd{
                    font-size: 0.16rem;
                    margin-top: 0.08rem;
                }

            }
        }
    }
    #center{
        width: 100%;
        min-height: 4rem;
        background-color: #f4f4f4;
        overflow: hidden;
        .privilege{
            width: 100%;
            background-color: white;
            margin-top: 0.3rem;
            >div:nth-of-type(1){
                width: 7.02rem;
                height: 0.7rem;
                margin: 0 auto;
                line-height: 0.7rem;
                .privilegeLeft{
                    font-size: 0.28rem;
                    color: #333333;
                }
                .privilegeRight{
                    font-size: 0.24rem;
                    color: #5fa9fe;
                }
            }
            ul{
                overflow: hidden;
                margin-left: 0.04rem;
                li{
                    float: left;
                    padding: 0.21rem 0 0.28rem 0.6rem;
                    img{
                        width: 0.66rem;
                        height: 0.64rem;
                        display: block;
                    }
                }
            }
        }
        .memberCenter{
            width: 100%;
            background-color: white;
            margin-top: 0.2rem;
            padding: 0 0 0.4rem 0;
            >div:nth-of-type(1){
                font-size: 0.28rem;
                width: 7.02rem;
                height: 0.7rem;
                margin: 0 auto;
                line-height: 0.7rem;
            }
            ul{
                color: white;
                margin-left: 0.64rem;
                overflow: hidden;
                width: 10rem;
                li{
                    width: 3.9rem;
                    height: 1.8rem;
                    float: left;
                    background-color: #4fa2fe;
                    border-radius: 0.08rem;
                    margin-right: 1rem;
                    .memberCenterTop{
                        width: 3.52rem;
                        height: 1.16rem;
                        margin: 0 auto;
                        box-sizing: border-box;
                        >p{
                            width: 100%;
                            line-height: 0.36rem;
                            font-size: 0.22rem;
                            text-align: right;
                        }
                        >div{
                            width: 50%;
                            box-sizing: border-box;
                            font-size: 0.24rem;
                            img{
                                width: 0.64rem;
                                height: 0.50rem;
                                padding: 0.2rem 0 0 0.1rem;
                                
                            }
                        }
                        .date{
                            border-right: 1px solid white;
                            padding: 0.1rem 0 0 0;
                            span{
                                font-size: 0.5rem;
                            }
                        }
                    }
                    .memberCenterBottom{
                        margin-top: 0.1rem;
                        span{
                            padding: 0.3rem;
                        }
                    }
                }
            }
            .mint-swipe {
                height: 1.8rem;
            }
        }
        .welfare{
            width: 100%;
            background-color: white;
            margin-top: 0.2rem;
            >div:nth-of-type(1){
                font-size: 0.28rem;
                width: 7.02rem;
                height: 0.7rem;
                margin: 0 auto;
                line-height: 0.7rem;
            }
            ul{
                width: 100rem;
                overflow: hidden;
                padding: 0.2rem 0 0 0;
                li{
                    float: left;
                    width: 1.8rem;
                    height: 2.4rem;
                    border: 1px solid #d3d3d3;
                    border-radius: 0.06rem;
                    margin-left: 0.5rem;
                    position: relative;
                    b{
                        position: absolute;
                        top: -0.15rem;
                        right: -0.15rem;
                        line-height: 0.3rem;
                        width: 0.3rem;
                        background-color: #ff852b;
                        color: white;
                        font-size: 0.22rem;
                        border-radius: 0.04rem;
                    }
                }
                .active{
                    float: left;
                    width: 1.8rem;
                    height: 2.4rem;
                    border: 1px solid #ff852b;
                    background-color: #ffeee1;
                    border-radius: 0.06rem;
                    margin-left: 0.5rem;
                    position: relative;
                    b{
                        position: absolute;
                        top: -0.15rem;
                        right: -0.15rem;
                        line-height: 0.3rem;
                        width: 0.3rem;
                        background-color: #ff852b;
                        color: white;
                        font-size: 0.22rem;
                    }
                }
                
            }
            button{
                width: 3rem;
                height: 0.56rem;
                line-height: 0.56rem;
                background-color: #4fa2fe;
                color: white;
                border: none;
                font-size: 0.28rem;
                margin: 0.4rem auto;
                border-radius: 0.08rem;
            }
            .mint-swipe {
                height: 2.7rem;
            }
            
        }
        .task{
            width: 100%;
            background-color: white;
            margin-top: 0.2rem; 
            >div{
                font-size: 0.28rem;
                width: 7.02rem;
                height: 0.7rem;
                margin: 0 auto;
                line-height: 0.7rem;
            }
            ul{
                width: 7.02rem;
                margin: 0 auto;
                li{
                    overflow: hidden;
                    margin-top: 0.1rem;
                    .taskLeft{
                        color: #555555;
                        font-size: 0.24rem;
                        margin-top: 0.05rem;
                    }
                    .taskCenter{
                        margin-left: 0.6rem;
                        overflow: hidden;
                        img{
                            width: 0.44rem;
                            height: 0.44rem;
                            display: block;
                        }
                        dl{
                            margin: 0.05rem 0 0 0.2rem;
                            dt{
                                font-size: 0.24rem;
                                color: #666666;
                            }
                            dd{
                                font-size: 0.22rem;
                                color: #999999;
                                text-align: left;
                            }
                        }
                    }
                    .taskRight{
                        width: 1.2rem;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        border: 1px solid #4fa2fe;
                        border-radius: 0.2rem;
                        color:  #4fa2fe;
                        font-size: 0.22rem;
                    }
                }
            }
            button{
                width: 3rem;
                height: 0.56rem;
                line-height: 0.56rem;
                background-color: #4fa2fe;
                color: white;
                border: none;
                font-size: 0.28rem;
                margin: 0.4rem auto;
                border-radius: 0.08rem;
            }
        }
        .about{
            width: 100%;           
            margin-top: 0.2rem;
            margin-bottom: 1.5rem;
            ul{
                overflow: hidden;
                background-color: white;
                li{
                    width: 7.02rem;
                    height: 0.75rem;
                    line-height: 0.75rem;
                    margin: 0.01rem auto 0;
                    overflow: hidden;
                    border-bottom: 1px solid #d6d6d6;
                    font-size: 0.22rem;
                    color: #696969;
                    img{
                        width: 0.45rem;
                        height: 0.45rem;
                        line-height: 0.75rem;
                        padding: 0.16rem 0.2rem 0 0;
                    }
                }
            }
        }
    }
    #container{
        width: 100rem;
    }
    
</style>



