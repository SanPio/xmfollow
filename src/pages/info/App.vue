<template>
    <div id="box">
        <div id="header">
            <div class="h-title">
                <div class="h-left">
                    <img :src="portraitSrc" alt="">
                </div>
                <dl class="h-right">
                    <dt>信号员001</dt>
                    <dd>杭州信号事业有限公司</dd>
                </dl>
            </div> 
            <p class="h-center" :class="{'ellipsis':ellShow}">
                <span class="h-c-left">交易策略：</span>
                <span class="h-c-right" @click="ellIfShow">品种品种品种品种品种品种品种品种品种品种品种品种种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品种品品种品种</span>
            </p>
            <p class="h-footer">
                <span class="h-f-left">个人简介：</span>
                <span class="h-f-right">任由任由任由任由任由任由任由</span>
            </p>   
        </div>
       
        <mt-swipe :auto="0" style="width:100%;height:332px;background:pink;border-bottom:1px solid #c9c9c9">
            <mt-swipe-item>
                <p class="swip-title">
                    持仓信息
                </p>
                <div class="swip-content">
                    <ul class="hold-info">
               
                        <li>
                            <p class="hold-info-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="holdBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!holdBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money">$70.00</span>
                                <span class="spot">1.40点</span>
                            </p>
                        </li>
                         <li>
                            <p class="hold-info-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="holdBtnShow[1]">买</button>
                                <button class="cellbtn" v-if="!holdBtnShow[1]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money">$70.00</span>
                                <span class="spot">1.40点</span>
                            </p>
                        </li>
                         <li>
                            <p class="hold-info-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="holdBtnShow[2]">买</button>
                                <button class="cellbtn" v-if="!holdBtnShow[2]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money">$70.00</span>
                                <span class="spot">1.40点</span>
                            </p>
                        </li>
                         <li>
                            <p class="hold-info-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="holdBtnShow[3]">买</button>
                                <button class="cellbtn" v-if="!holdBtnShow[3]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money">$70.00</span>
                                <span class="spot">1.40点</span>
                            </p>
                        </li>
                         <li>
                            <p class="hold-info-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="holdBtnShow[4]">买</button>
                                <button class="cellbtn" v-if="!holdBtnShow[4]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money">$70.00</span>
                                <span class="spot">1.40点</span>
                            </p>
                        </li>
                         <li>
                            <p class="hold-info-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="holdBtnShow[5]">买</button>
                                <button class="cellbtn" v-if="!holdBtnShow[5]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money">$70.00</span>
                                <span class="spot">1.40点</span>
                            </p>
                        </li>    
                    </ul>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <p class="swip-title">
                    历史记录
                </p>
                <div class="swip-content">
                    <ul class="history">
                        <li>
                            <p class="history-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="historyBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!historyBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money">$70.00</span>
                            </p>
                        </li>
                       <li>
                            <p class="history-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="historyBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!historyBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money">$70.00</span>
                            </p>
                        </li>
                        <li>
                            <p class="history-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="historyBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!historyBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money">$70.00</span>
                            </p>
                        </li>
                        <li>
                            <p class="history-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="historyBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!historyBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money">$70.00</span>
                            </p>
                        </li>
                        <li>
                            <p class="history-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="historyBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!historyBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money">$70.00</span>
                            </p>
                        </li>
                        <li>
                            <p class="history-left">
                                <span class="tit">USD/CHF</span>
                                <button class="buybtn" v-if="historyBtnShow[0]">买</button>
                                <button class="cellbtn" v-if="!historyBtnShow[0]">卖</button>
                                <span class="num" >0.5</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money">$70.00</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <p class="swip-title">
                    主要信息
                </p>
                <div class="swip-content">
                    <ul class="mian-info">
                        <li v-for="(item,ind) in mianInfoTitle" :key="item">
                            <p class="info-left">
                                {{item}}
                            </p>
                            <p class="info-right">
                                {{mianInfo[ind]}}
                            </p>
                        </li>
                    </ul>
                </div>

            </mt-swipe-item>
            <mt-swipe-item>
                <p class="swip-title">
                    次要信息
                </p>
                <div class="swip-content">
                    <ul class="sec-info">
                        <li v-for="(item,ind) in secInfoTitle" :key="item">
                            <p class="info-left">
                                {{item}}
                            </p>
                            <p class="info-right">
                                {{secInfo[ind]}}
                            </p>
                        </li>
                    </ul>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <p class="swip-title">
                    交易原则
                </p>
                <div class="swip-content">
                    <ul class="principle">
                        <li v-for="(item,ind) in principleTitle" :key="item">
                            <p class="info-left">
                                {{item}}
                            </p>
                            <p class="info-right">
                                {{principle[ind]}}
                            </p>
                        </li>
                    </ul>
                </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <p class="swip-title">
                    周期变化表
                </p>
            </mt-swipe-item>
        </mt-swipe> 
        <div id="footer">
            <span @click="jumpToSet">跟随设置</span>
        </div>
        <div id="bottom">
            <div id="bot-center">
                <img src="../../assets/btn-left@2x.png" alt="" @click="returnBtn">
                <img src="../../assets/btn-right@2x.png" alt="">
            </div>
        </div>     
    </div>
</template>
<script>

export default {
    name: 'App',
    data(){
        return {
            portraitSrc : require('../../assets/Navigate-click.jpg'),
            holdBtnShow : [true,false,true,false,true,false],
            historyBtnShow : [true,false,true,false,true,false],
            buyShow : true,
            ellShow : true,
            mianInfoTitle : ["操盘经验","余额","收益率","起始资金","盈亏点数","跟随人数","第一单"],
            mianInfo : ["3年6月","$511.4","30%","$5644","140.5","384人","2018-5-15"],
            secInfoTitle : ["平均持仓时间","最大盈利点数","最大亏损点数","最大手数","最小手数"],
            secInfo : ["40小时","55.32","15.32","5.05标准手","0.05标准手"],
            principleTitle : ["杠杆比例","预期回报","最大回撤","平均点差"],
            principle : ["1:300","120%","-37.91","1515.44"]
        }
    },
    mounted(){

    },
    methods: {
        ellIfShow(){
            this.ellShow = !this.ellShow
        },
        jumpToSet(){
            console.log("跟随设置")
        },
        returnBtn(){
            window.location.href="index.html";
        }
    }
}
</script>
<style lang="scss" scoped>
    #header{
        width: 100;
        background-color: #44aafa;
        color: #ffffff;
        padding: 12px .32rem 15px .22rem;
        font-size: 14px;
        .h-title{
            display: flex;
            padding-bottom: 14px;
            .h-left{
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                    border:1px solid red;
                }

            }
            .h-right{
                padding: 6px 0 0 .2rem;
                dt{
                    font-size: 18px;
                    font-weight: 900;
                    
                    margin-bottom: 6px;
                }
                
            }
        }
        .h-center .h-c-left,.h-footer .h-f-left{
            font-size: 14px;
            font-weight: 700;
        }
        .h-center .h-c-right,.h-footer .h-f-right{
            font-size: 13px;
            font-weight: normal;
        }
        .ellipsis{
            overflow:hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
        }
    }
    .swip-title{
        font-size: 15px;
        color:#50a8fd;
        text-align: center;
        font-weight: 900;
        margin-top: 10px;
        line-height: 32px;
    }
    .swip-content{
        width: 6.98rem;
        height: 249px;
        border:1px solid #eeeeee;
        margin-left: 0.22rem;
        border-radius: .12rem;
        //持仓信息、 历史记录
        .hold-info,.history{
             font-size: 14px;
            li{
                height:38px;
                border-bottom: 1px solid #c9c9c9;  
                line-height: 38px;
                padding:0 .22rem;
                display: flex;
                justify-content: space-between;
                .buybtn{
                   color: #ffffff;
                   background-color: #007aff;
                   border: none;
                   padding: 1px;
                   outline: none;
                }
                .cellbtn{
                    padding: 1px;
                    color: #ffffff;
                    background-color: #fe0000;
                    border: none;
                    outline: none;
                }
                .tit,.num{
                    font-size: 14px; 
                }
                .standard{
                    font-size: 12px;
                    color: #999999;
                }
                .money{
                    color: #007aff;
                    font-weight: 900;
                }
                .spot{
                    color: #666666;
                    font-size: 12px;
                    font-weight: 900;
                    margin-left: .08rem;
                }
            }
            li:nth-last-child(1){
                border-bottom:none;
            }
           
        }
        //主要信息、次要信息、交易原则
        .mian-info,.sec-info,.principle{
            font-size: 13px;
            padding: 0 .4rem;
            li{ 
                display: flex;
                justify-content: space-between;
                height: 34px;
                line-height: 34px;
            }
        }
        
        
    }
    #footer{
        height:50px;
        text-align: center;
        color: #4fa2fe;
        font-size: 18px;
        line-height: 50px;
        font-weight: 900;
        border-bottom: 1px solid #dbdbdb;
    }
    
    // .mint-swipe .mint-swipe-indicators .mint-swipe-indicators{
    //     bottom:0 ;
    // }
    #bottom{
        width: 100%;
        
        display: flex;
        justify-content: center;
        #bot-center{
            width: 2rem;
            height: 45px;
            display: flex;
            justify-content: space-between;
            img{
                // width: .3rem;
                margin-top: 12px;
                height:28px;
            }
        }
    }


</style>



  