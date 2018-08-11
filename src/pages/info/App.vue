<template>
    <div id="box">
        <div id="header">
            <div class="h-title">
                <div class="h-left">
                    <img :src="portraitSrc" alt="">
                </div>
                <dl class="h-right">
                    <dt>{{info.signalName}}</dt>
                </dl>
            </div> 
            <p class="h-center" :class="{'ellipsis':ellShow}">
                <span class="h-c-left">交易策略：</span>
                <span class="h-c-right" @click="ellIfShow">{{info.signalTactics}}</span>
            </p>
            <p class="h-footer">
                <span class="h-f-left">个人简介：</span>
                <span class="h-f-right">{{info.signalIntroduce}}</span>
            </p>   
        </div>
        <mt-swipe :auto="0" style="width:100%;height:332px;border-bottom:1px solid #c9c9c9">
            <!-- <mt-swipe-item>
                <p class="swip-title">
                    持仓信息
                </p>
                <div class="swip-content">
                    <ul class="hold-info">
               
                        <li v-for="(item,ind) in holdArr" :key="ind">
                            <p class="hold-info-left">
                                <span class="tit"> {{ item.symbol }} </span>
                                <button class="buybtn" v-if="item.type==0">买</button>
                                <button class="cellbtn" v-if="item.type==1">卖</button>
                                <button class="hangbtn" v-if="item.type==2||item.type==3||item.type==4||item.type==5">挂</button>
                                <span class="num" >{{ item.lots }}</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="hold-info-right">
                                <span class="money" :class="{'redcolor':(item.profit<0 )} " >${{ item.profit }}</span>
                                <span class="spot">{{ item.spreads }}点</span>
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
                        <li v-for="(item,ind) in hisArr" :key="ind">
                            <p class="history-left">
                                <span class="tit"> {{ item.symbol }} </span>
                                <button class="buybtn" v-if="item.type==0">买</button>
                                <button class="cellbtn" v-if="item.type==1">卖</button>
                                <button class="hangbtn" v-if="item.type==2||item.type==3||item.type==4||item.type==5">挂</button>
                                <span class="num" >{{ item.lots }}</span>
                                <span class="standard">标准手</span>
                            </p>
                            <p class="history-right">
                                <span class="money" :class="{'redcolor':(item.profit<0 )} ">${{ item.profit }}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </mt-swipe-item> -->
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
            <!-- <mt-swipe-item>
                <p class="swip-title">
                    周期变化表
                </p>
                <div class="swip-content">
                    <p class="table-title"><img :src="tableTitleSrc" alt=""></p>
                    <div id="cycle">
                        
                    </div>
                </div>
            </mt-swipe-item> -->
        </mt-swipe> 
        <div id="footer">
            
            <button @click="toFollowSetting"> 跟随设置 </button>
        </div>
        <!-- <div id="bottom">
            <div id="bot-center">
                <img :src="returnleftSrc" alt="" @click="returnBtn">
                <img :src="returnRightSrc" alt="">
            </div>
        </div>      -->
    </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
// 引入线形图
require('echarts/lib/chart/line');
export default {
    name: 'App',
    data(){
        return {
            optionId:1,
            userId : 1,
            accountId: 1,
            tableTitleSrc : require('../../assets/table-title.png'),
            portraitSrc : require('./assets/Head-portrait.jpg'),
            returnleftSrc : require('./assets/btn-left@2x.png'),
            returnRightSrc : require('./assets/btn-right@2x.png'),
            holdBtnShow : [true,false,true,false,true,false],
            historyBtnShow : [true,false,true,false,true,false],
            buyShow : true,
            ellShow : true,
            redcolor:true,
            mianInfoTitle : ["操盘经验","余额","收益率","起始资金","盈亏点数","跟随人数","第一单"],
            mianInfo : [],
            secInfoTitle : ["平均持仓时间","最大盈利点数","最大亏损点数","最大手数","最小手数"],
            secInfo : [],
            principleTitle : ["杠杆比例","预期回报","最大回撤","平均点差"],
            principle : [],
            info : {},
            hisArr : [],
            holdArr:[],
            urlTitle:""
        }
    },
    created(){
        var v = this.parseUrl();//解析所有参数
        this.optionId = v['optionId'];
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        this.accountId = localStorage.getItem('accountId');
        //初始化数据请求
        this.$http.post(this.urlTitle+'wx/index/'+ this.optionId +'/info',{    
         
        }).then((res) => {
            this.info = res.data.data;
            //主要信息
            this.mianInfo.push(res.data.data.experience);
            this.mianInfo.push('$' + res.data.data.money);
            this.mianInfo.push(res.data.data.yield);
            if(res.data.data.initFunds){
                this.mianInfo.push( '$' + res.data.data.initFunds);
            }else{
                this.mianInfo.push(0)
            }
            
            this.mianInfo.push(res.data.data.profitNo);
            this.mianInfo.push(res.data.data.followerNumber);
            this.mianInfo.push(res.data.data.firstOrder);
            //次要信息
            this.secInfo.push(res.data.data.avgHandleTime);
            this.secInfo.push(res.data.data.maxWinNo);
            this.secInfo.push(res.data.data.maxFailNo);
            this.secInfo.push(res.data.data.maxLots + '标准手');
            this.secInfo.push(res.data.data.minLots + '标准手');
            //交易原则
            this.principle.push(res.data.data.signalLeverage);
            this.principle.push(res.data.data.signalExpects);
            this.principle.push(res.data.data.signalDrawDown);
            this.principle.push(res.data.data.signalSpread);
        }).catch((err) => {
            console.log(err)
        });

        //     //历史记录
        // this.$http.get(this.urlTitle+'wx/order/trader/'+ v['optionId'] +'/history',{  
        //     params : { 
        //         pageNum  : 1,
        //         pageSize : 6,
        //         optionId : this.optionId,
        //         userId : this.userId 
        //     }      
        // }).then((res) => {
          
        //     this.hisArr = res.data.data.list;
           
            
        // }).catch((err) => {
        //     console.log(err)
        // });
        // //持仓信息

        // this.$http.get(this.urlTitle+'wx/order/trader/'+this.optionId+'/traderNowOrders',{  
        //     params : { 
        //         pageNum  : 1,
        //         pageSize : 6,
        //         optionId : this.optionId,
        //         userId : this.userId 
        //     }      
        // }).then((res) => {
        //      this.holdArr = res.data.data.list;  
            
        // }).catch((err) => {
        //     console.log(err)
        // });



        // //周期变化表
        // let postData = this.$qs.stringify({
        //     optionid : this.optionId,

        // });
        // this.$http({
        //     method: 'post',
        //     url: this.urlTitle+'wx/index/selectSlt',
        //     data:postData
        // }).then((res)=>{
        //     console.log(res)




 

        // }).catch((err) => {
        //     console.log(err)
        // });


    },
    mounted(){
        // let myChart = echarts.init(document.getElementById('cycle'));
        // myChart.setOption({
        //     tooltip : {
        //         trigger: 'axis'
        //     },
        //     legend: {
        //         data:['充值','消费']
        //     },
        //     calculable : true,
        //     xAxis : [
        //         {
        //             axisLabel:{
        //                 //x轴字体倾斜
        //                 // rotate: 30,
        //                 interval:0
        //             },
        //             axisLine:{
        //                 lineStyle :{
        //                     color: '#000000'
        //                 }
        //             },
        //             type : 'category',
        //             boundaryGap : false,
        //             data :["2.1","2.2","2.3","2.4","2.5","2.6","2.7"]
        //         }
        //     ],
        //     yAxis : [
        //         {
        //             type : 'value',
        //             axisLine:{
        //                 lineStyle :{
        //                     color: '#000000'
        //                 }
        //             }
        //         }
        //     ],
        //     series : [
        //         {
        //             name:'充值',
        //             type:'line',
        //             symbol:'none',
        //             smooth: 0.2,
        //             color:['#44abfa'],
        //             data:[20,10,30,50,500]
        //         },
        //         {
        //             name:'消费',
        //             type:'line',
        //             symbol:'none',
        //             smooth: 0.2,
        //             color:['#ff7c2b'],
        //             data:[5,9,80,60,42]
        //         }
        //     ],
        //     grid : {
        //         top : '20px'
        //     }
        // })
    },
    methods: {
        //接受交易领航跳转参数
        parseUrl(){
            var url=location.href;
            var i=url.indexOf('?');
            if(i==-1)return;
            var querystr=url.substr(i+1);
            var arr1=querystr.split('&');
            var arr2=new Object();
            for  (i in arr1){
                var ta=arr1[i].split('=');
                arr2[ta[0]]=ta[1];
            }
            return arr2;
        },
 




        //
        ellIfShow(){
            this.ellShow = !this.ellShow
        },
        //到跟随设置页面
        toFollowSetting(){            
            // window.location.href=`followsetting.html?optionId=${this.optionId}`;
           
    
                        this.$http.get(this.urlTitle+'wx/order/trader/follow',{ 
                                params : {
                                    userid: this.userId,
                                    optionid: this.optionId,
                                    accountsid: this.accountId,    
                                }   
                            }).then((res) => { 
                            // console.log(res)
                            if( res.data.status == 0 ){
                                //跟随设置
                                window.location.href=`followsetting.html?optionId=${this.optionId}`;
                            }else if( res.data.status == 1 ){
                                //购买会员
                                window.location.href=`vip.html`;
                            }else if( res.data.status == 2 ){
                                //绑定
                                window.location.href=`accountmanage.html`;
                            }
                            console.log(res)
                            }).catch((err)=>{
                            console.log(err)
                            })

        },
        returnBtn(){
            window.location.href="index.html";
        }
        //
    }
}
</script>
<style lang="scss" scoped>
    #header{
        width: 100;
        background-color: #44aafa;
        color: #ffffff;
        padding: .24rem .32rem .3rem .22rem;
        font-size: .28rem;
        .h-title{
            display: flex;
            padding-bottom: .28rem;
            .h-left{
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                }
            }
            .h-right{
                padding: .12rem 0 0 .2rem;
                dt{
                    font-size: .36rem;
                    font-weight: 900;
                    margin-top: .2rem;
                } 
            }
        }
        .h-center .h-c-left,.h-footer .h-f-left{
      
            font-size: .28rem;
            font-weight: 700;
        }
        .h-center .h-c-right,.h-footer .h-f-right{
          
            font-size: .26rem;
            font-weight: normal;
        }
        .h-footer,.h-center{
            text-align: left;
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
        font-size: .3rem;
        color:#50a8fd;
        text-align: center;
        font-weight: 900;
        margin-top: .2rem;
        line-height: .64rem;
    }
    .swip-content{
        width: 6.98rem;
        height: 5rem;
        border:1px solid #eeeeee;
        margin-left: 0.22rem;
        border-radius: .12rem;
        //持仓信息、 历史记录
        .hold-info,.history{
             font-size: .28rem;
            li{
                height:.76rem;
                border-bottom: 1px solid #c9c9c9;  
                line-height: .76rem;
                padding:0 .22rem;
                display: flex;
                justify-content: space-between;
                .buybtn{
                   color: #ffffff;
                   background-color: #007aff;
                   border: none;
                   padding: .02rem;
                   outline: none;
                }
                .cellbtn{
                    padding: .02rem;
                    color: #ffffff;
                    background-color: #fe0000;
                    border: none;
                    outline: none;
                }
                .hangbtn{
                    padding: .02rem;
                    color: #ffffff;
                    background-color: #ff7c2b;
                    border: none;
                    outline: none;
                }
                .tit,.num{
                    font-size: .28rem; 
                }
                .standard{
                    font-size: .24rem;
                    color: #999999;
                }
                .money{
                    color: #007aff;
                    font-weight: 900;
                }
                .redcolor{
                    color: red;
                }
                .spot{
                    color: #666666;
                    font-size: .24rem;
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
            font-size: .26rem;
            padding: 0 .4rem;
            li{ 
                display: flex;
                justify-content: space-between;
                height: .68rem;
                line-height: .68rem;
            }
        }
        //周期变化表
        #cycle{
            width: 7rem;
            height:4.8rem;
            font-size: .26rem;
            // background-color: yellow;

        }
        .table-title{
            display: flex;
            justify-content: flex-end;
            padding-top: .28rem;
            img{
                width: 2.2rem;
                height:0.2rem;
            }
        }
        
        
    }
    #footer{
        margin-top: 2rem;
        height: 1rem;
        text-align: center;
        
        font-size: .36rem;
        line-height: 1rem;
        font-weight: 900;
        button{
           color: #fff; 
           background-color: #4fa2fe;
           width: 5rem;
           padding: .2rem;
           outline: none;
           border:none;
           border-radius: .1rem;
        }
        // border-bottom: 1px solid #dbdbdb;
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
            height: .9rem;
            display: flex;
            justify-content: space-between;
            img{
                // width: .3rem;
                margin-top: .24rem;
                height:.56rem;
            }
        }
    }


</style>



  