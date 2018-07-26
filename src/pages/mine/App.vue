<template>
    <div>
        <!-- Header 部分 -->
        <div :id="headerOnOff ? headerOn : headerOff" class="hahaa">
            <!-- 账号名称 -->
            <div class="head-left">
                <div>
                    <img :src="userImgSrc" alt="" @click="toPersonInfo">
                </div>
                <dl>
                    <dt >
                        <span @click="toPersonInfo">我的猫</span>
                    </dt>
                    <dd>
                        <span>金牌会员</span>
                        <span>（剩余360天）</span>
                    </dd>
                </dl>
            </div>
            <!-- 会员设置，邀请好友 -->
            <div class="head-right">
                <img :src="invitImgSrc" alt="">
                <img :src="memberImgSrc" alt="" @click="toVIPBuy">
                <img :src="setImgSrc" alt="">
            </div>
        </div>
        <!-- Title部分，收益总览 -->
        <div id="title" v-if="headerOnOff">
            <dl v-for="(item,ind) in titleArr" :key="item">
                <dt>{{item}}</dt>
                <dd>${{titleInfo[ind]}}k</dd>
            </dl>
        </div>
        <!--Center 跳转部分 -->
        <div id="center">
            <dl >
                <dt>
                    <img :src="numberImgSrc" alt="">
                </dt>
                <dd>账号管理</dd>
            </dl>
             <dl style="border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;">
                <dt>
                    <img :src="orderImgSrc" alt="">
                </dt>
                <dd>订单管理</dd>
            </dl>
             <dl>
                <dt>
                    <img :src="followImgSrc" alt="">
                </dt>
                <dd>跟随管理</dd>
            </dl>
        </div>

        <!-- Content各账号详细内容 -->
        <ul id="content" v-if="contentShow">
            <li v-for="(item,ind) in accNumArr" :key="ind">
                <!-- 账号标题 -->
                <div class="con-tit"  @click="conboxOpenClose(ind)">
                    <p class="con-tit-left">
                        <span>001002003</span>
                        <span>账号</span>
                    </p>
                    <p class="con-tit-right">
                        <img :src="item ? upSrc : downSrc" alt="">
                    </p>
                </div>
                <!-- 详细内容 -->
                <ul v-if="item" class="con-box">
                    <!-- 账号资产 -->
                    <li class="con-box-account">
                        <p class="con-box-head" >账号资产</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>历史收益</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>收益率</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>当前余额</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>已用保证金</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>可用保证金</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn">账号管理&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                    <!-- 订单信息 -->
                    <li class="con-box-order">
                        <p class="con-box-head">订单信息</p>
                        <div class="con-box-bot clearfix">
                            <dl>
                                <dt>持仓单量</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>持仓手数</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>获利</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>上周获利点数</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>上月获利点数</dt>
                                <dd>$17.43k</dd>
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
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt>盈利点数</dt>
                                <dd>$17.43k</dd>
                            </dl>
                            <dl>
                                <dt class="con-box-bot-btn">跟随管理&nbsp;>></dt>    
                            </dl>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- Footer组件 底部返回按钮 -->
        <ul class="footer">
                <li class="foot-left">
                    <dl @click="toIndex">
                        <dt>
                            <img src="./assets/Navigate-Unclicked.jpg" alt="">
                        </dt>
                        <dd >投资领航</dd>
                    </dl>
                </li>
            <li class="foot-right">
                <dl>
                    <dt>
                        <img src="./assets/Myhomepage-clicked@2x.png" alt="">
                    </dt>
                    <dd class="foot-click">我的</dd>
                </dl>
            </li>
        </ul>
        <!-- 次div为空，做占位用，返回按钮占56px高度 -->
        <div style="height:56px"></div>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            invitImgSrc : require('./assets/Invitation.jpg'),
            userImgSrc : require('./assets/Myhomepage-clicked@2x.png'),
            memberImgSrc : require('./assets/My-home-page-icon1.jpg') ,
            setImgSrc :　require('./assets/Set-up.jpg'),
            numberImgSrc : require('./assets/Account-number.jpg') ,
            orderImgSrc :　require('./assets/Order.jpg'),
            followImgSrc : require('./assets/follow.jpg') ,
            //header滚动
            headerOnOff :true,
            headerOn : "header",
            headerOff : "header-scroll",
            //上下按钮图标
            upSrc : require('../../assets/Myhomepage-Arrow@2x.png'),
            downSrc :  require('../../assets/transaction-Arrow@2x.png'),
            titleArr : ['历史收益','收益率','当前余额'],
            titleInfo : [17.32,1088,1058],
            //content区域
            contentShow : true,
            //box循环测试
            accNumArr : [true,false,false,false]
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
        //Header组件缩放
        var _this =this; //改变指针，将Vue实例传到闭包
        window.addEventListener('scroll',function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//监听滚动高度
            if(scrollTop>14){
                _this.headerOnOff = false; //Header收缩
            }else{
                _this.headerOnOff = true; //Header展开
            }
       })
        
    },
    methods: {
        //账号列表内容展开收缩控制
        conboxOpenClose(ind){
            // this.accNumArr[ind] = !this.accNumArr[ind];
            this.$set(this.accNumArr,ind,!this.accNumArr[ind])
        },
        //返回到index主页（交易领航）
        toIndex(){
            window.location.href="index.html";
        },
        //跳转到个人信息页
        toPersonInfo(){
            window.location.href="personInfo.html";
        },
        //跳转到会员购买页
        toVIPBuy(){
            window.location.href="vipbuy.html";
        }
    }
}
</script>
<style lang="scss" scoped>
    //Header上拉后效果
    #header-scroll{
        position: fixed;
        top:0;
        width: 7.1rem;
        font-size: 13px;
        height: 44px;
        background-color: #4fa2fe;
        color: #ffffff;
        padding: 0 .22rem;
        display: flex;
        justify-content: space-between;
        .head-left{
            display: flex;
            img{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                margin: 4px .2rem 0 0;
                background-color: red;
            }
            dt{
                font-weight: 900;
                font-size: 14px;
                line-height: 24px;
            }
            dd{
                font-size: 10px;
                line-height: 10px;
            }
        }
        .head-right{
            width: 2rem;
            display: flex;
            justify-content: space-between;
            img{
                margin-top: 12px;
                width: 18px;
                height:18px;
            }
        } 
    }
    //Header上拉前效果
    #header{
        font-size: 13px;
        height: 78px;
        background-color: #4fa2fe;
        color: #ffffff;
        padding: 0 .22rem;
        display: flex;
        justify-content: space-between;
        .head-left{
            display: flex;
            img{
                width: 60px;
                height: 60px;
                background-color: red;
                border-radius: 50%;
                margin: 13px .24rem 0 0;
            }
            dt{
                font-weight: 900;
                font-size: 15px;
                margin-top: 24px;
                margin-bottom: 4px;
            }
            dd{
                font-size: 12px;
                // line-height: 10px;
            }
        }
        .head-right{
            width: 2.12rem;
            display: flex;
            justify-content: space-between;
            img{
                margin-top: 12px;
                width: 22px;
                height:22px;
            }
        } 
    }
    // 收益总览
    #title{
        padding: 0 .22rem;
        display: flex;
        justify-content: space-between;
        height: 78px;
        background-color: #4fa2fe;
        color : #ffffff;
        text-align: center;
        dt{
            font-size: 12px;
            line-height: 12px;
            margin-top: 16px;
            margin-bottom: 9px;
        }
        dd{
            font-size: 20px;
            font-weight: 900;
            line-height: 18px;
        }
    }
    //导航按钮
    #center{
        font-size: 12px;
        display: flex;
        padding:12px 0 24px 0;
        dl{
            width: 33%;
            height:44px;
            text-align: center;
            img{
                width: 32px;
                height:32px;
            }
            dd{
                margin-top: 7px;
                color: #666666;
            }
        }
    }
    //账号信息展示
    #content{
        margin-top: 28px;
        padding: 0 .22rem;
        color: #ffffff;
        li{
            //账号标题
            .con-tit{
                height:34px;
                line-height: 34px;
                // background-color: pink;
                font-size: 12px;
                color: #666666;
                border-bottom: 1px solid #c9c9c9;
                display: flex;
                justify-content: space-between;
                img{
                    width: 13px;
                }
            }
            //账号内容 展示
            .con-box{
                font-size: 13px;
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
                }
                li{
                    border-radius: 10px; 
                    margin-top: 14px;
                    padding-bottom: 14px;
                    .con-box-head{
                        font-size: 16px;
                        line-height: 40px;
                        font-weight: 900;
                        height: 40px;
                    }
                    .con-box-bot{
                        dl{
                            float: left;
                            width: 33%;
                            .con-box-bot-btn{
                                font-size: 14px;
                                line-height: 40px;
                                font-weight: 900;
                            }
                            dt{
                                font-size: 11px;
                                line-height: 20px;
                                height: 20px;
                            }
                            dd{
                                font-size: 14px;
                                font-weight: 900;
                                line-height: 30px;
                                height: 30px;
                            }
                        }
                    }
                }
                
            }
        }
    }
    //底部导航按钮
    .footer{
        width: 100%;
        height:50px;
        padding-top: 6px;
        background-color:#ffffff;
        position: fixed;
        bottom:0;
        display: flex;
        justify-content: space-around;
        font-size: 10px;
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
            margin-bottom: 2px;
        }
    }
</style>



