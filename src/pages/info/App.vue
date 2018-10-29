<template>
    <div id="box">
        <div id="header">
            <div class="h-title">
                <div class="h-left">
                    <img :src="portraitSrc" alt="">
                </div>
                <dl class="h-right">
                    
                    <dt ><span>{{info.signalName}} </span> <button v-if="detail" @click="detail = !detail">查看详情</button> <button  v-if="!detail" @click="detail = !detail">查看订单</button></dt>
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
        <div v-if="!detail">
        <mt-swipe :auto="0" style="width:100%;height:332px;border-bottom:1px solid #c9c9c9"  >
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
            </mt-swipe-item>  -->
        </mt-swipe> 
        </div>

        <div id="order" v-if="detail" >
            <mt-navbar v-model="selected" >
                <mt-tab-item id="info">订单信息</mt-tab-item>
                <mt-tab-item id="history">历史记录</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
            
                <mt-tab-container-item id="info">
                    
                    <div style="overflow-y: scroll;hieght:6rem" >
                        <mt-loadmore 
                        :bottom-method="loadBottom" 
                        :bottom-all-loaded="infoAllLoaded"
                        :autoFill="false" ref="loadmores">
                            <div ref="mybox">
                                <div class="infolist" v-for="(item, ind) in infoArr" :key="ind">
                                    <div class="infotop clearfix" @click="infoBotOnOff(ind)">
                                        <div class="left">
                                            <p>
                                                <span>
                                                    {{ item.symbol }}
                                                </span>
                                                <button class="colorbtn buybtn" v-if="item.type == 0">
                                                    买
                                                </button>
                                                <button class="colorbtn cellbtn" v-if="item.type == 1">
                                                    卖
                                                </button >
                                                <button class="colorbtn hangbtn" v-if="item.type == 2 || item.type == 3 || item.type == 4 || item.type == 5">
                                                    挂
                                                </button>
                                                <span>
                                                    {{ item.lots }}
                                                </span>
                                                <span>
                                                    标准手
                                                </span> 
                                                <button class="colorbtn buybtn" v-if="item.type == 2 || item.type == 4">
                                                    买
                                                </button>
                                                <button class="colorbtn cellbtn" v-if="item.type == 3 || item.type == 5">
                                                    卖
                                                </button >
                                            </p>
                                            <p>
                                                <span>  
                                                    {{ item.symbolTypeString }}
                                                </span>
                                                
                                                <span v-if="item.type == 0 || item.type == 1">
                                                    {{ item.openPrice}}
                                                </span> 
                                                <span v-if="item.type == 0 || item.type == 1">
                                                    -
                                                </span>
                                            
                                                <span v-if="item.type == 0 || item.type == 1">
                                                    {{ item.nowPrice }}
                                                </span> 
                                            </p>
                                        </div>
                                        <div class="right clearfix">
                                            <div class="left">
                                
                                                <p :class="item.nowProfits >= 0 ? 'bulecolor' : 'redcolor' " v-if="item.type == 0 || item.type == 1 " >
                                                    {{'$'+ item.nowProfits}}   
                                                </p>
                                            
                                                <p class="gua" v-if="item.type == 2 || item.type == 3 || item.type == 4 || item.type == 5 ">
                                                    <span>
                                                        委托
                                                    </span>
                                                    <span>
                                                        {{ item.openPrice}}
                                                    </span>
                                                </p>
                                                <p class="gua" v-if="item.type == 2 || item.type == 3 || item.type == 4 || item.type == 5 ">
                                                    <span>
                                                        当前
                                                    </span>
                                                    <span>
                                                        {{ item.nowPrice}}
                                                    </span>
                                                </p>
                                            </div>                                           
                                        </div>
                                    </div>
                                    
                                    <div class="infocen clearfix" v-if="infoBotShow[ind]">
                                        <ul class="left">
                                            <li>
                                                <span>
                                                    订单号
                                                </span>
                                                <span>
                                                    {{ item.orderId }}
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    止损
                                                </span>
                                                <span>
                                                {{ item.stopLoss }} 
                                                </span>
                                            </li>                                       
                                        </ul>
                                        <ul class="right">
                                            <li>
                                                <span>
                                                    开仓时间
                                                </span>
                                                <span style="margin-left: .24rem;color: #666;font-weight: bold;">
                                                    {{ item.updatetime }}
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    止盈
                                                </span>
                                                <span>
                                                {{ item.takeProfits }} 
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </div>
                                <div v-if="infoArr.length==0" class="noinfo">
                                    此信号源暂时还没有开仓
                                </div>
                            </div>
                    </mt-loadmore>
                    </div>               
                </mt-tab-container-item>
                <mt-tab-container-item id="history">
                
                    <div style="overflow-y: scroll;">
                        <mt-loadmore 
                        :bottom-method="hisloadBottom" 
                        :bottom-all-loaded="hisAllLoaded" 
                        :autoFill="false" ref="loadmore">
                            <div ref="myboxes">
                                <div class="infolist" v-for="(item, ind) in historyArr" :key="ind">
                                    <div class="infotop clearfix" @click="hisBotOnOff(ind)">
                                        <div class="left">
                                            <p>
                                                <span>
                                                    {{ item.symbol }}
                                                </span>
                                                <button class="colorbtn buybtn" v-if="item.type==0">
                                                    买
                                                </button>
                                                <button class="colorbtn cellbtn" v-if="item.type==1">
                                                    卖
                                                </button >
                                                <button class="colorbtn hangbtn" v-if="item.type==2 || item.type==3|| item.type==4|| item.type==5">
                                                    挂
                                                </button>
                                                <span>
                                                    {{ item.lots }}
                                                </span>
                                                <span>
                                                    标准手
                                                </span> 
                                                <button class="colorbtn buybtn" v-if="item.type==2||item.type==4">
                                                    买
                                                </button>
                                                <button class="colorbtn cellbtn" v-if="item.type==3||item.type==5">
                                                    卖
                                                </button >
                                            </p>
                                            <p>
                                                <span>
                                                    {{ item.symbolTypeString }}
                                                </span>
                                                <span >
                                                    {{ item.openPrice}}
                                                </span> 
                                                <span>
                                                    -
                                                </span>
                                                <span>
                                                    {{ item.closePrice }}
                                                </span> 
                                            </p>
                                        </div>
                                        <div class="right clearfix">
                                            <div class="left">
                                                <p :class="item.orderProfit >= 0 ? 'bulecolor' : 'redcolor' " >
                                                {{'$'+ item.orderProfit}}
                                                </p>                                        
                                            </div>     
                                        </div>
                                    </div>
                                    <div class="infocen clearfix" v-if="hisBotShow[ind]">
                                        <ul class="left">
                                            <li>
                                                <span>
                                                    订单号
                                                </span>
                                                <span>
                                                    {{ item.orderId }}
                                                </span>
                                            </li>                                       
                                            <li>
                                                <span>
                                                    库存费
                                                </span>
                                                <span>
                                                    {{ item.swap ? item.swap : 0 }}
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    手续费
                                                </span>
                                                <span>
                                                    {{ item.commission ? item.commission : 0 }}
                                                </span>
                                            </li>
                                        </ul>
                                        <ul class="right">
                                        
                                            <li>
                                                <span>
                                                    开仓时间
                                                </span>
                                                <span style="margin-left: .24rem;color: #666;font-weight: bold;">
                                                    {{ item.orderOpenTime }}
                                                </span>
                                                
                                            </li>
                                            <li>
                                                <span>
                                                    平仓时间
                                                </span>
                                                <span style="margin-left: .24rem;color: #666;font-weight: bold;">
                                                    {{ item.orderCloseTime }}
                                                </span>

                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    </mt-loadmore>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        
        
        </div>
        <div id="footer" >
            
            <button @click="toFollowSetting"> 跟随设置 </button>
        </div>

    </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
// 引入线形图
require('echarts/lib/chart/line');
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
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
            mianInfoTitle : ["交易时间","余额","收益率","起始资金","最大回撤","跟随人数","第一单"],
            mianInfo : [],
            secInfoTitle : ["平均持仓时间","最大盈利点数","最大亏损点数","最大手数","最小手数"],
            secInfo : [],
            principleTitle : ["杠杆比例","预期回报","预期回撤","平均点差"],
            principle : [],
            info : {},
            hisArr : [],
            holdArr:[],
            urlTitle:"",
            iss: '',
            


            detail: true,
            infoAllLoaded: false,
            hisAllLoaded: false,
            iss: '',
            selected: 'info',
            fixed: true,
            //订单信息页
            colorShow: true,//数字蓝色还是红色
            urlTitle: '',
            userId: '',
            optionId: '',
            accountId: '',
            infoPageNum : 1,
            hisPagNum:1,
            pageSize: 10,
            infoArr : [],
            infoBotShow:[],
            //历史记录页
            historyArr : [],  
            popInfo: { },      
            stopLossNum: 0.001,
            targetProfitNum: 18.02,
            hisBotShow: [],
            //弹窗
            popUpShow: false,//弹窗是否显示
            stopLossShow: true,//止损按钮是否显示

        }
    },
    created(){
        let haveiss = sessionStorage.getItem('iss');
        if(haveiss == 1){
            document.title = '信号源信息(模拟)';
            this.iss = haveiss
        }else{
            document.title = '信号源信息';
            this.iss = ''
        }
        var v = this.parseUrl();//解析所有参数
        this.optionId = v['optionId'];
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        this.accountId = localStorage.getItem('accountId');
    
        
        //  初始化数据请求
        this.$http.get(this.urlTitle+'wx/order/member/orderDetailsList',{ //订单信息
            params : { 
                pageNum : 1,
                pageSize: 10,
                optionId:this.optionId
            }   
        }).then((res) => { 
            console.log(res)
            if(res.data.code <= 10){
                this.infoAllLoaded = true;
            }
            
            for (let i = 0; i < this.infoArr.length; i ++) {
                this.infoBotShow.push(false);
               
            }
            if(res.data.code != 0){
                this.infoArr = res.data.data
            }
            
            // if(res.data.success==false){
            //     console.log("暂未开仓")
            // }

        }).catch((err) => {
            console.log(err)
        })
     
        //  初始化数据请求
        this.$http.get(this.urlTitle+'wx/order/member/orderHistoryList',{ //订单信息
            params : { 
                pageNum : 1,
                pageSize: 10,
                optionId:this.optionId
            }   
        }).then((res) => { 

            this.historyArr = res.data.data
            if(res.data.code<= 10){
                this.infoAllLoaded = true;
            }
            for (let i = 0; i < this.historyArr.length; i ++) {
                this.hisBotShow.push(false);
            }
           
        }).catch((err) => {
            console.log(err)
        })
        //初始化数据请求
        this.$http.post(this.urlTitle+'wx/index/'+ this.optionId +'/info',{    
         
        }).then((res) => {
            console.log(res)
            this.info = res.data.data;
            //主要信息
            this.mianInfo.push(res.data.data.experience);
            if( res.data.data.money >= 1000 || res.data.data.money <= -1000){
              this.mianInfo.push('$' + parseInt( parseFloat(res.data.data.money)/10 )/ 100 + "K")
            }else{
                this.mianInfo.push('$' + res.data.data.money);
            }
            this.mianInfo.push( parseInt( parseFloat( res.data.data.yield ) * 100 ) / 100 + '%' );
            if(res.data.data.initFunds){
                // this.mianInfo.push( '$' + res.data.data.initFunds);
                    // parseFloat( res.data.data.initFunds )
                if( parseFloat( res.data.data.initFunds ) >= 1000 || parseFloat( res.data.data.initFunds ) <= -1000){
                    this.mianInfo.push('$' + parseInt( parseFloat( res.data.data.initFunds )/10 )/ 100 + "K")
                }else{
                    this.mianInfo.push('$' + res.data.data.initFunds );
                }
            }else{
                this.mianInfo.push(0)
            }
            //改成最大回撤
            // if( parseFloat( res.data.data.profitNo ) >= 1000 || parseFloat( res.data.data.profitNo ) <= -1000){
            //     this.mianInfo.push( parseInt( parseFloat( res.data.data.profitNo )/10 )/ 100 + "K")
            // }else{
            //     this.mianInfo.push( res.data.data.initFunds );
            // }
            // //改成最大回撤
            if( res.data.data.maxHuicheRatio == 0 ){
                this.mianInfo.push( '0' );
                // this.mianInfo.push( parseInt( parseFloat( res.data.data.profitNo )/10 )/ 100 + "K")
            }else{
                this.mianInfo.push( res.data.data.maxHuicheRatio  + '%');
                // this.mianInfo.push( parseInt(res.data.data.maxHuicheRatio *10000 ) /100  + '%');
            }
            
            if(  res.data.data.followerNumber ){
                var followNum = parseInt( res.data.data.followerNumber ) 
                if(res.data.data.optionId == 8){
                    followNum += 100
                }else if(res.data.data.optionId == 1){
                    followNum += 70
                }else if(res.data.data.optionId == 2){
                    followNum += 10
                }else if(res.data.data.optionId == 3){
                    followNum += 60
                }else if(res.data.data.optionId == 5){
                    followNum += 67
                }else if(res.data.data.optionId == 6){
                    followNum += 20
                }else if(res.data.data.optionId == 7){
                    followNum += 31
                }


                if( followNum >= 1000){
                    this.mianInfo.push( parseInt( followNum / 10 ) / 100 + "K")
                }else{
                    this.mianInfo.push( followNum );
                }
            }else{
                this.mianInfo.push( 0 );
            }
            this.mianInfo.push(res.data.data.firstOrder);
            //次要信息
            this.secInfo.push( res.data.data.avgHandleTime + ' 小时 ' );
            if( parseFloat( res.data.data.maxWinNo ) >= 1000 || parseFloat( res.data.data.maxWinNo ) <= -1000){
                this.secInfo.push( parseInt( parseFloat( res.data.data.maxWinNo )/10 )/ 100 + "K")
            }else{
                this.secInfo.push( res.data.data.maxWinNo );
            }
            if( parseFloat( res.data.data.maxFailNo ) >= 1000 || parseFloat( res.data.data.maxFailNo ) <= -1000){
                this.secInfo.push( parseInt( parseFloat( res.data.data.maxFailNo )/10 )/ 100 + "K")
            }else{
                this.secInfo.push( res.data.data.maxFailNo );
            }
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
    // filters: {
    //     numInt
    // },
    mounted(){
        if(this.infoArr.length == 0 ){
                // this.$refs.footer.style.marginTop = "7rem"
        }
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
                            console.log(res)
                             if( res.data.status == 0 ){
                                //跟随设置
                                window.location.href=`followsetting.html?optionId=${this.optionId}`;

                            }else if( res.data.status == 1 ){
                                //购买会员
                                window.location.href=`authentication.html`;
                            }else if( res.data.status == 2 ){
                                //绑定
                                window.location.href=`vip.html`;
                            }else if( res.data.status == 3 ){
                                //绑定
                                window.location.href=`fivestar.html?optionId=${this.optionId}&name=${this.info.signalName}`;
                            }else if( res.data.status == 4 ){
                                //绑定
                                window.location.href=`accountmanage.html`;
                            }else if( res.data.status == 5 ){
                                //模拟账号不能跟随五星
                                MessageBox('提示', '模拟账号不能跟随五星信号源');
                            }
                            
                            console.log(res)
                            }).catch((err)=>{
                            console.log(err)
                            })

        },
        returnBtn(){
            window.location.href="index.html";
        },
       


             //上拉加载
        loadBottom(){
            this.infoPageNum ++;
            this.$http.get(this.urlTitle+'wx/order/member/orderDetailsList',{ //订单信息
            params : {
                pageNum : this.infoPageNum,
                pageSize: 10,
                optionId:this.optionId
            }   
        }).then((res) => { 
                console.log(res)
                this.$refs.loadmores.onBottomLoaded();
                if(res.data.code <= this.infoPageNum * 10){
                    this.infoAllLoaded = true;
                }
                for (let i = 0; i < res.data.data.length; i ++) {
                    this.infoArr.push( res.data.data[i]  )
                    this.infoBotShow.push(false);
                }
            }).catch((err) => {
                console.log(err)
            })
           
        },
             //上拉加载
        hisloadBottom(){
            this.hisPagNum ++ ;
           this.$http.get(this.urlTitle+'wx/order/member/orderHistoryList',{ //订单信息
            params : { 
                pageNum : this.hisPagNum,
                pageSize: 10,
                optionId:this.optionId
            }   
        }).then((res) => { 
              
            console.log(res)
            this.$refs.loadmore.onBottomLoaded();
            if(res.data.code<= this.hisPagNum * 10){
                this.hisAllLoaded = true;
            }
            for (let i = 0; i < res.data.data.length; i ++) {
                this.historyArr.push(res.data.data[i])
                this.hisBotShow.push(false);
            }
        }).catch((err) => {
            console.log(err)
        })
        },
            //点击标题显示内容收缩
        infoBotOnOff(ind){
            if(this.infoBotShow[ind] == true){
                this.$set(this.infoBotShow,ind,!this.infoBotShow[ind])
            }else{
                for ( let i = 0; i < this.infoBotShow.length; i ++) {
                    this.infoBotShow[i] = false;
                }
                this.$set(this.infoBotShow,ind,!this.infoBotShow[ind])
            }
            
        },
               //点击标题显示内容收缩
        hisBotOnOff(ind){
            if (  this.hisBotShow[ind] == true ) {
                this.$set(this.hisBotShow,ind,!this.hisBotShow[ind]);
            }else {
                for ( let i = 0; i < this.hisBotShow.length; i ++ ) {
                    this.hisBotShow[i] = false;
                };
                this.$set(this.hisBotShow,ind,!this.hisBotShow[ind]);
            }          
        },
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
                    button{
                        padding: .1rem .2rem;
                        color: #fff;
                        border-radius: .16rem;
                        outline: none;
                        font-size: .2rem;
                        background-color: #44aafa;
                        border: 1px solid #fff;
                        margin-left: 1.6rem;
                    }
                    
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
        margin-top: 1.4rem;
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

    #order{
        // height: 6.5rem;
       
        .colorbtn{
            width: .28rem;
            height: .28rem;
            font-size: .2rem;
            line-height: .2rem;
            border: none;
            color: #fff;
            border-radius: .04rem;
        }
        .buybtn{
            background-color: #007aff;
        }
        .cellbtn{
            background-color: #fe0000;
        }
        .hangbtn{
            background-color: #ff7c2b;
        }
        .infolist{
            font-size: .2rem;
            line-height: .2rem;
            color: #999;
            .infotop{
                height: 1.1rem;
                border-bottom: 1px solid #c9c9c9;
                padding: 0 .24rem;
                .left{
                    text-align: left;
                    p:nth-of-type(1){
                        margin-top: .24rem;
                        margin-bottom: .2rem;
                        span{
                            font-size: .28rem;
                            line-height: .28rem;
                            font-weight:bold;
                            color: #000; 
                        } 
                        span:nth-last-of-type(1){
                            font-size: .2rem;
                            font-weight: normal;
                            line-height: .2rem;
                            color: #999;
                        }
                    }
                    p:nth-of-type(2){
                        span{
                            font-weight:bold;
                            color: #000;  
                        }
                        span:nth-of-type(1){
                            font-weight: normal;
                            color: #999;
                            margin-right: .04rem;
                        }
                    }

                }
                .right{
                    .left{
                        text-align: right;
                        p:nth-of-type(1){
                            font-size: .28rem;
                            line-height: .28rem;
                            font-weight: bold;
                            
                        }
                        .bulecolor{
                            color: #007aff;
                            line-height:.6rem
                        }
                        .redcolor{
                            color: #fe0000;
                            line-height:.6rem
                        }
                        p:nth-of-type(2){
                            span{
                                color: #666;
                                font-size: .2rem;
                                line-height: .2rem;
                                font-weight: bold;
                            }
                            
                        }
                        .gua{
                            span{
                                color: #666;
                                font-size: .2rem;
                                line-height: .2rem;
                                font-weight: bold;
                            }
                        }
                    }
                    .right{
                        button{
                            line-height: .28rem;
                            height: .28rem;
                            color: #666;
                            margin-top: .44rem;
                            font-weight: bold;
                            margin-left: .2rem;
                            border: none;
                            background-color: #fff;
                        }
                        
                    }
                }
            }
            .infocen{
                padding: .16rem .24rem ;
                background-color: #f9f9f9;
                li{
                    height: .48rem;
                    line-height: .48rem;
                    text-align: left;
                    span:nth-last-of-type(1){
                        margin-left: .24rem;
                        color: #666;
                        font-weight: bold;
                    }
                }
            }
            .infobot{
                background-color: #f9f9f9;
                display: flex;
                justify-content: space-around;
                padding: .32rem .24rem;
                button{
                    width: 1.68rem;
                    height: .64rem;
                    left: .64rem;
                    color: #4fa2fe;
                    border: 1px solid #4fa2fe;
                    background-color: #f9f9f9;
                    border-radius: .12rem;
                    font-size: .28rem;
                    font-weight: 900;
                }
            }
        }
    }







    #order{
         #box{
        background-color: #fff;
    }
    .colorbtn{
        width: .28rem;
        height: .28rem;
        font-size: .2rem;
        line-height: .2rem;
        border: none;
        color: #fff;
        border-radius: .04rem;
    }
    .buybtn{
        background-color: #007aff;
    }
    .cellbtn{
        background-color: #fe0000;
    }
    .hangbtn{
        background-color: #ff7c2b;
    }
    .infolist{
        font-size: .2rem;
        line-height: .2rem;
        color: #999;
        .infotop{
            height: 1.1rem;
            border-bottom: 1px solid #c9c9c9;
            padding: 0 .24rem;
            .left{
                text-align: left;
                p:nth-of-type(1){
                    margin-top: .24rem;
                    margin-bottom: .2rem;
                    span{
                        font-size: .28rem;
                        line-height: .28rem;
                        font-weight:bold;
                        color: #000; 
                    } 
                    span:nth-last-of-type(1){
                        font-size: .2rem;
                        font-weight: normal;
                        line-height: .2rem;
                        color: #999;
                    }
                }
                p:nth-of-type(2){
                    span{
                        font-weight:bold;
                        color: #000;  
                    }
                    span:nth-of-type(1){
                        font-weight: normal;
                        color: #999;
                        margin-right: .04rem;
                    }
                }

            }
            .right{
                .left{
                    text-align: right;
                    p:nth-of-type(1){
                        font-size: .28rem;
                        line-height: .28rem;
                        font-weight: bold;
                        
                    }
                    .bulecolor{
                        color: #007aff;
                    }
                    .redcolor{
                        color: #fe0000;
                    }
                    p:nth-of-type(2){
                        span{
                            color: #666;
                            font-size: .2rem;
                            line-height: .2rem;
                            font-weight: bold;
                        }
                        
                    }
                    .gua{
                        span{
                            color: #666;
                            font-size: .2rem;
                            line-height: .2rem;
                            font-weight: bold;
                        }
                    }
                }
                .right{
                    button{
                        line-height: .28rem;
                        height: .28rem;
                        color: #666;
                        margin-top: .44rem;
                        font-weight: bold;
                        margin-left: .2rem;
                        border: none;
                        background-color: #fff;
                    }
                    
                }
            }
        }
        .infocen{
            padding: .16rem .24rem ;
            background-color: #f9f9f9;
            li{
                height: .48rem;
                line-height: .48rem;
                text-align: left;
                span:nth-last-of-type(1){
                    margin-left: .24rem;
                    color: #666;
                    font-weight: bold;
                }
            }
        }
        .infobot{
            background-color: #f9f9f9;
            display: flex;
            justify-content: space-around;
            padding: .32rem .24rem;
            button{
                width: 1.68rem;
                height: .64rem;
                left: .64rem;
                color: #4fa2fe;
                border: 1px solid #4fa2fe;
                background-color: #f9f9f9;
                border-radius: .12rem;
                font-size: .28rem;
                font-weight: 900;
            }
        }
    }
    }
    // 信号源未开仓时提示
    .noinfo{
        font-size: 0.4rem;
        line-height: 5rem;
        color: #ffa544;
    }
</style>



  