<template>
    <div id="box">
        <!-- <div id="header" class="clearfix" >
            <div class="left">
                <img :src="traderImg" alt="">
            </div>
            <dl class="left">
                <dt>
                    信号源
                </dt>
                <dd>
                    杭州信号实业有限公司
                </dd>
            </dl>
            <div class="right">
                <button @click="allClose">
                    一键平仓
                </button>
            </div>
        </div> -->
        <mt-navbar v-model="selected" :fixed='fixed'>
            <mt-tab-item id="info">订单信息</mt-tab-item>
            <mt-tab-item id="history">历史记录</mt-tab-item>
        </mt-navbar>
         <mt-tab-container v-model="selected">
           
            <mt-tab-container-item id="info">
                <div style="height:.92rem"></div>
                <div style="overflow-y: scroll;">
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
                                            <button class="colorbtn buybtn" v-if="item.type==0">
                                                买
                                            </button>
                                            <button class="colorbtn cellbtn" v-if="item.type==1">
                                                卖
                                            </button >
                                            <button class="colorbtn hangbtn" v-if="item.type==2 || item.type==3|| item.type==4">
                                                挂
                                            </button>
                                            <span>
                                                {{ item.lots }}
                                            </span>
                                            <span>
                                                标准手
                                            </span> 
                                            <button class="colorbtn buybtn" v-if="item.type==3">
                                                买
                                            </button>
                                            <button class="colorbtn cellbtn" v-if="item.type==4">
                                                卖
                                            </button >
                                        </p>
                                        <p>
                                            <span>  
                                                {{ item.symbolStr }}
                                            </span>
                                            <span>
                                                0.99380
                                            </span>
                                            <span>
                                                -
                                            </span>
                                            <span>
                                                0.99394
                                            </span>
                                        </p>
                                    </div>
                                    <div class="right clearfix">
                                        <div class="left">
                            
                                            <p :class="colorShow ? 'bulecolor' : 'redcolor' ">
                                                $70.00
                                            </p>
                                            <p>
                                                <span>
                                                    1.40
                                                </span>
                                                <span>
                                                    点
                                                </span>
                                            </p>
                                        </div>
                                        <div class="right">
                                            <button @click.stop="closeThis(ind)">
                                                X
                                            </button>
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
                                                1436925
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                止损
                                            </span>
                                            <span>
                                                0.36925
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                止盈
                                            </span>
                                            <span>
                                                0.99999
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                库存费
                                            </span>
                                            <span>
                                                -0.95
                                            </span>
                                        </li>
                                    </ul>
                                    <ul class="right">
                                        <li>
                                            <span>
                                                跟随
                                            </span>
                                            <span>
                                                信号源001
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                开仓时间
                                            </span>
                                            <span style="margin-left: .24rem;color: #666;font-weight: bold;">
                                                2018/06/05
                                            </span>
                                            <span style="margin-left:0px">
                                                12:08:36
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                手续费
                                            </span>
                                            <span>
                                                0.00
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <p class="infobot" v-if="infoBotShow[ind]">
                                    <button @click="stopLoss(ind)">
                                        止损
                                    </button>
                                    <button @click="targetProfit(ind)">
                                        止盈
                                    </button>
                                </p>
                            </div>
                        </div>
                   </mt-loadmore>
                </div>
            </mt-tab-container-item>




            <mt-tab-container-item id="history">
                <div style="height:.92rem"></div>
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
                                                USD/CHF
                                            </span>
                                            <button class="colorbtn buybtn" v-if="item.type==0">
                                                买
                                            </button>
                                            <button class="colorbtn cellbtn" v-if="item.type==1">
                                                卖
                                            </button >
                                            <button class="colorbtn hangbtn" v-if="item.type==2 || item.type==3|| item.type==4">
                                                挂
                                            </button>
                                            <span>
                                                0.5
                                            </span>
                                            <span>
                                                标准手
                                            </span> 
                                            <button class="colorbtn buybtn" v-if="item.type==3">
                                                买
                                            </button>
                                            <button class="colorbtn cellbtn" v-if="item.type==4">
                                                卖
                                            </button >
                                        </p>
                                        <p>
                                            <span>
                                                美元/瑞郎
                                            </span>
                                            <span>
                                                0.99380
                                            </span>
                                            <span>
                                                -
                                            </span>
                                            <span>
                                                0.99394
                                            </span>
                                        </p>
                                    </div>
                                    <div class="right clearfix">
                                        <div class="left">
                            
                                            <p :class="colorShow ? 'bulecolor' : 'redcolor' ">
                                                $70.00
                                            </p>
                                            <p>
                                                <span>
                                                    1.40
                                                </span>
                                                <span>
                                                    点
                                                </span>
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
                                                1436925
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                止损
                                            </span>
                                            <span>
                                                0.36925
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                止盈
                                            </span>
                                            <span>
                                                0.99999
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                库存费
                                            </span>
                                            <span>
                                                -0.95
                                            </span>
                                        </li>
                                    </ul>
                                    <ul class="right">
                                        <li>
                                            <span>
                                                跟随
                                            </span>
                                            <span>
                                                信号源001
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                开仓时间
                                            </span>
                                            <span style="margin-left: .24rem;color: #666;font-weight: bold;">
                                                2018/06/05
                                            </span>
                                            <span style="margin-left:0px">
                                                12:08:36
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                平仓时间
                                            </span>
                                            <span style="margin-left: .24rem;color: #666;font-weight: bold;">
                                                2018/06/05
                                            </span>
                                            <span style="margin-left:0px">
                                                12:08:36
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                手续费
                                            </span>
                                            <span>
                                                0.00
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
        <!-- 底部返回 -->
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
                        <img :src="rightBtnSrc" alt="" @click="toMine">
                    </dt>
                    <dd  @click="toMine">我的</dd>
                </dl>
            </li>
        </ul>
        <!-- 次div为空，做占位用，返回按钮占56px高度 -->
        <div style="height:1.12rem"></div>

        <!-- 弹窗 -->
        <div ref="back" class="back" ></div>
        <div class="popup" v-if="popUpShow">
            <ul class="poptop">  
                <li class="litop">
                    <span class="pair-en">
                        {{ popInfo.pairEn }}
                    </span>
                    <span class="pair-ch">
                        {{ popInfo.pairCh }}            
                    </span>
                </li>
                <li class="licen">
                    <p>
                        买
                        <span>
                            {{ popInfo.buy }}
                        </span>
                        手
                    
                    <p>
                        开仓价
                        <span>   
                            {{ popInfo.open }}
                        </span>
                    </p>
                    <p>
                        当前价
                        <span class="red">
                            {{ popInfo.now }}
                        </span>
                    </p>
                </li>
                <li class="libot" v-if="!stopLossShow">
                    <p>
                        <span class="bold">
                            止盈
                        </span>
                        <span>
                            &gt;
                            {{ popInfo.now }}
                        </span>
                    </p>
                    
                    <p>
                        <img :src="reduceImg" alt="" @click="targetProfitNumReduce">
                        <!-- <input v-model="targetProfitNum" onblur="b=this.value;b=(b+'').replace(/^0+\./g,'0.');b.match(/^0+[1-9]+/)?b=b.replace(/^0+/g,''):b;this.value=Number(b)?b:0;"> -->
                        <input type="number" v-model="targetProfitNum" @blur="decimal">
                        <img :src="plusImg" alt="" @click="targetProfitNumPlus">
                    </p>
                </li>
                <li class="libot" v-if="stopLossShow">
                    <p >
                        <span class="bold">
                            止损
                        </span>
                        <span>
                            &lt;
                            {{ popInfo.now }}
                        </span>
                    </p>
                    <p>
                        <img :src="reduceImg" alt="" @click="stopLossNumReduce">
                        <!-- <input type="number" v-model="stopLossNum" @blur="decimal"> -->
                         <input v-model="stopLossNum"  type="number">
                        <img :src="plusImg" alt="" @click="stopLossNumPlus">
                        
                    </p>
                </li>
            </ul>
            <div class="popbot">
                <!-- 止损 -->
                <button class="confirm" v-if="stopLossShow" @click="confirmStop">确认</button>
                <!-- 止盈 -->
                <button class="confirm" v-if="!stopLossShow" @click="confirmProfit">确认</button>
                <button @click="cancelBtn">取消</button>
            </div>
        </div>







    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            //Header信号源信息  
            traderImg: require('./assets/img2.jpg'),
            plusImg: require('./assets/plus@2x.png'),
            reduceImg: require('./assets/reduce@2x.png'),
            leftBtnSrc : require('./assets/Navigate-Unclicked.jpg'),
            rightBtnSrc : require('./assets/Myhomepage-Unclicked@2x.png'),
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
            infoPageNum : 1,
            hisPagNum:1,
            pageSize: 10,
            infoArr : [],
            infoBotShow:[ false,false,false,false,false],
            //历史记录页
            historyArr : [
                {
                    name: '哈哈',
                    type: 0
                },
                {
                    name: '哈哈',
                    type: 1
                },
                {
                    name: '哈哈',
                    type: 2
                },
                {
                    name: '哈哈',
                    type: 3
                },
                {
                    name: '哈哈',
                    type: 4
                }
            ],
            popInfo: { 
                pairEn: 'USDCHF',
                pairCh: '美元/瑞郎',
                rate: 1000,
                buy: 0.01,
                open: 15.955,
                now: 15.962,
                
            },
            stopLossNum: 0.001,
            targetProfitNum: 18.02,
            hisBotShow: [ false,false,false,false,false],


            //弹窗
            popUpShow: false,//弹窗是否显示
            stopLossShow: true,//止损按钮是否显示

        }
    },
    created(){
        let haveiss = sessionStorage.getItem('iss');
        if(haveiss == 1){
            document.title = '订单管理(模拟)';
            this.iss = haveiss
        }else{
            document.title = '订单管理';
            this.iss = ''
        }
        var a=this.GetRequest();
        this.optionId=a['optionId'];
   
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        console.log(this.optionId)
        //  初始化数据请求
        this.$http.get(this.urlTitle+'/wx/order/member/holdingOrderList',{ //订单信息
            params : {
                accountsId : 154, 
                userId : this.userId,
                pageNum : 1,
                pageSize: 10,
                optionId : 0,
                ud:0
            }   
        }).then((res) => { 
            console.log(res.data.data)
            this .infoArr = res.data.data;








        }).catch((err) => {
            console.log(err)
        })

        // //  初始化数据请求
        // this.$http.get(this.urlTitle+'/wx/order/member/holdOrderHistoryList',{ //订单记录
        //     params : {
        //         accountsId : 154, 
        //         userId : this.userId,
        //         pageNum : 1,
        //         pageSize: 10,
        //         optionId : 0,
        //         ud: 1
                
        //     }   
        // }).then((res) => { 
        //     console.log(res)
        // }).catch((err) => {
        //     console.log(err)
        // })

    },
    mounted(){
        
        this.calculationHeight();
        this.calculation();
    },
    
    watch : {
        stopLossNum(val){
            // var s= "" + val;
            // s=(s+'').replace(/^0+\./g,'0.');
            // s.match(/^0+[1-9]+/)?s=s.replace(/^0+/g,''):b;
            // this.value=Number(s)?s:0;

            var s= "" + val;
            console.log(s)
            var regex=/^[0]+([1-9]\d*\.\d*|0\.\d*[1-9]\d*$)/
           
            var a=s.replace(regex,"");
            this.stopLossNum = Number(a);
            if(val > this.popInfo.now){
                this.stopLossNum =  this.popInfo.now
            }
        },
        targetProfitNum(val){
            var s= "" + val;
            var regex=/^[0]+/
            var a=s.replace(regex,"");
            this.targetProfitNum = Number(a);
            if(val < this.popInfo.now){
                this.targetProfitNum =  this.popInfo.now
            }
        }
    },
    methods: {
         //一键平仓(平掉所有)
        allClose(){
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '平仓管理',
                message: '您是否确定平掉所有正在持仓？',
                showConfirmButton:true,
                showCancelButton:true
            }).then(action => { 
                //因为按钮布局与原来Mint布局是相反的，所以回调取的也是相反
                if (action == 'cancel') {     //确认的回调
                console.log(1); 
                }
                if (action == 'confirm') {     //确认的回调
                console.log(2); 
                }
            })
        },
        //计算窗口
        calculation(){
            let winWidth = 0;
            let winHeight =0;
            //获取窗口宽度
            if (window.innerWidth){
                winWidth = window.innerWidth;
            }else if ((document.body) && (document.body.clientWidth)){
                winWidth = document.body.clientWidth;
            }
            
            //获取窗口高度
            if (window.innerHeight){
                winHeight = window.innerHeight;
            }else if ((document.body) && (document.body.clientHeight)){
                winHeight = document.body.clientHeight;
            }
            this.$refs.back.style.width=`${winWidth}px`;
            this.$refs.back.style.height=`${winHeight}px`;
        },
        //订单信息页
            //设定上拉下拉区域为窗口高度
        calculationHeight(){
            let winHeight = 0;
            if (window.innerHeight){
                winHeight = window.innerHeight-49;
            }else if((document.body) && (document.body.clientHeight)){
                winHeight = document.body.clientHeight-49; 
            }
            this.$refs.mybox.style.minHeight=`${winHeight}px`;
            this.$refs.myboxes.style.minHeight=`${winHeight}px`
        },
            //点击标题显示内容收缩
        infoBotOnOff(ind){
            for ( let i = 0; i < this.infoBotShow.length; i ++) {
                this.infoBotShow[i] = false;
            }
            this.$set(this.infoBotShow,ind,!this.infoBotShow[ind])
        },

        //关闭单个
        closeThis(ind){
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '清空',
                message: '您是否确定平掉此张订单？',
                showConfirmButton:true,
                showCancelButton:true
            }).then(action => { 
                //因为按钮布局与原来Mint布局是相反的，所以回调取的也是相反
                if (action == 'cancel') {     //确认的回调
                console.log(ind); 
                }
                if (action == 'confirm') {     //确认的回调
                console.log(2); 
                }
            })
        },
            //止损按钮
        stopLoss(ind){
            //显示遮罩
            this.$refs.back.style.zIndex=2;
            this.popUpShow = true;
            this.stopLossShow  = true;
          
        },
        //止盈按钮
        targetProfit(ind){
            this.$refs.back.style.zIndex=2;
            this.popUpShow = true;
            this.stopLossShow  = false;
        },
        //止损确定按钮
        confirmStop(){
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            console.log("止损确定")
        },
        //止盈利确定按钮
        confirmProfit(){
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            console.log("止赢确定")
        },
        //弹窗取消
        cancelBtn(){
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            console.log("取消")
        },

            //上拉加载
        loadBottom(){
            this.infoPageNum ++;
            this.$http.get(this.urlTitle+'wx/order/member/followingList',{ //订单信息
                params : {
                    accountsId : this.accountId, 
                    userId : this.userId,
                    pageNum : 1,
                    pageSize: 10,
                    optionId : this.optionId
                }   
            }).then((res) => { 
                console.log(res)
                this.$refs.loadmores.onBottomLoaded();
                if(res.data.data.countoptionids <= this.infoPageNum *10){
                    this.infoAllLoaded = true;
                }
            }).catch((err) => {
                console.log(err)
            })
            // this.infoArr.push(
            //     {
            //         name: 'USD/CHF',
            //         type: 0
            //     },
            //     {
            //         name: 'USD/CHF',
            //         type: 1
            //     },
            //     {
            //         name: 'USD/CHF',
            //         type: 2
            //     },
            //     {
            //         name: 'USD/CHF',
            //         type: 3
            //     },
            //     {
            //         name: 'USD/CHF',
            //         type: 4
            //     }
            // );
        },
        // 比例跟随数值填写失焦 取两位小数
        decimal(){
            this.followNum = parseInt(this.followNum*100)/100;
        },
        //止损点数加
        stopLossNumPlus(){
            if( this.popInfo.rate == 10 ){
                if( this.stopLossNum > 0){
                    if(  parseInt( this.stopLossNum ) == parseFloat( this.stopLossNum ) ){//判断是否为整数
                        this.stopLossNum  = parseInt(this.stopLossNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.stopLossNum * 10 )  ==  parseFloat(this.stopLossNum * 10)  ){//判断是否为一位小数
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }
                }else{
                    this.stopLossNum = 0.1
                }
            }else if( this.popInfo.rate == 100 ){
                if( this.stopLossNum > 0){
                    if(  parseInt( this.stopLossNum ) == parseFloat( this.stopLossNum ) ){//判断是否为整数
                        this.stopLossNum  = parseInt(this.stopLossNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.stopLossNum * 10 )  ==  parseFloat(this.stopLossNum * 10)  ){//判断是否为一位小数
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else{
                        this.stopLossNum = ( Math.ceil(this.stopLossNum * 100) + 1)/100 // 其他加0.01
                    }
                    
                }else{
                    this.stopLossNum = 0.01
                }
            }else if( this.popInfo.rate == 1000 ){
                if( this.stopLossNum > 0){
                    if(  parseInt( this.stopLossNum ) == parseFloat( this.stopLossNum ) ){//判断是否为整数
                        this.stopLossNum  = parseInt(this.stopLossNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.stopLossNum * 10 )  ==  parseFloat(this.stopLossNum * 10)  ){//判断是否为一位小数
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else if( parseInt( this.stopLossNum * 100 )  ==  parseFloat(this.stopLossNum * 100)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100) + 1)/100 // 其他加0.01
                    }else if( parseInt( this.stopLossNum * 1000 )  ==  parseFloat(this.stopLossNum * 1000)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 1000) + 1)/1000 // 其他加0.01
                    }
                    
                }else{
                    this.stopLossNum = 0.001
                }
                
            }else if( this.popInfo.rate == 10000 ){
                if( this.stopLossNum > 0){
                    if(  parseInt( this.stopLossNum ) == parseFloat( this.stopLossNum ) ){//判断是否为整数
                        this.stopLossNum  = parseInt(this.stopLossNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.stopLossNum * 10 )  ==  parseFloat(this.stopLossNum * 10)  ){//判断是否为一位小数
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else if( parseInt( this.stopLossNum * 100 )  ==  parseFloat(this.stopLossNum * 100)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100) + 1)/100 // 其他加0.01
                    }else if( parseInt( this.stopLossNum * 1000 )  ==  parseFloat(this.stopLossNum * 1000)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 1000) + 1)/1000 // 其他加0.001
                    }else if( parseInt( this.stopLossNum * 10000 )  ==  parseFloat(this.stopLossNum * 10000)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10000) + 1)/10000 // 其他加0.0001
                    }
                    
                }else{
                    this.stopLossNum = 0.0001
                }
            }else if( this.popInfo.rate == 100000 ){
                if( this.stopLossNum > 0){
                    if(  parseInt( this.stopLossNum ) == parseFloat( this.stopLossNum ) ){//判断是否为整数
                        this.stopLossNum  = parseInt(this.stopLossNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.stopLossNum * 10 )  ==  parseFloat(this.stopLossNum * 10)  ){//判断是否为一位小数
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else if( parseInt( this.stopLossNum * 100 )  ==  parseFloat(this.stopLossNum * 100)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100) + 1)/100 // 其他加0.01
                    }else if( parseInt( this.stopLossNum * 1000 )  ==  parseFloat(this.stopLossNum * 1000)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 1000) + 1)/1000 // 其他加0.001
                    }else if( parseInt( this.stopLossNum * 10000 )  ==  parseFloat(this.stopLossNum * 10000)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10000) + 1)/10000 // 其他加0.0001
                    }else if( parseInt( this.stopLossNum * 100000 )  ==  parseFloat(this.stopLossNum * 100000)  ){
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100000) + 1)/100000 // 其他加0.00001
                    }
                    
                }else{
                    this.stopLossNum = 0.00001
                }
            }
        },
         //止盈点数加
        targetProfitNumPlus(){
            if( this.popInfo.rate == 10 ){
                if( this.targetProfitNum > 0){
                    if(  parseInt( this.targetProfitNum ) == parseFloat( this.targetProfitNum ) ){//判断是否为整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.targetProfitNum * 10 )  ==  parseFloat(this.targetProfitNum * 10)  ){//判断是否为一位小数
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }
                }else{
                    this.targetProfitNum = 0.1
                }
            }else if( this.popInfo.rate == 100 ){
                if( this.targetProfitNum > 0){
                    if(  parseInt( this.targetProfitNum ) == parseFloat( this.targetProfitNum ) ){//判断是否为整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.targetProfitNum * 10 )  ==  parseFloat(this.targetProfitNum * 10)  ){//判断是否为一位小数
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else{
                        this.targetProfitNum = ( Math.ceil(this.targetProfitNum * 100) + 1)/100 // 其他加0.01
                    }
                    
                }else{
                    this.targetProfitNum = 0.01
                }
            }else if( this.popInfo.rate == 1000 ){
                if( this.targetProfitNum > 0){
                    if(  parseInt( this.targetProfitNum ) == parseFloat( this.targetProfitNum ) ){//判断是否为整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.targetProfitNum * 10 )  ==  parseFloat(this.targetProfitNum * 10)  ){//判断是否为一位小数
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else if( parseInt( this.targetProfitNum * 100 )  ==  parseFloat(this.targetProfitNum * 100)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100) + 1)/100 // 其他加0.01
                    }else if( parseInt( this.targetProfitNum * 1000 )  ==  parseFloat(this.targetProfitNum * 1000)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 1000) + 1)/1000 // 其他加0.01
                    }
                    
                }else{
                    this.targetProfitNum = 0.001
                }
                
            }else if( this.popInfo.rate == 10000 ){
                if( this.targetProfitNum > 0){
                    if(  parseInt( this.targetProfitNum ) == parseFloat( this.targetProfitNum ) ){//判断是否为整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.targetProfitNum * 10 )  ==  parseFloat(this.targetProfitNum * 10)  ){//判断是否为一位小数
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else if( parseInt( this.targetProfitNum * 100 )  ==  parseFloat(this.targetProfitNum * 100)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100) + 1)/100 // 其他加0.01
                    }else if( parseInt( this.targetProfitNum * 1000 )  ==  parseFloat(this.targetProfitNum * 1000)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 1000) + 1)/1000 // 其他加0.001
                    }else if( parseInt( this.targetProfitNum * 10000 )  ==  parseFloat(this.stopLossNum * 10000)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10000) + 1)/10000 // 其他加0.0001
                    }
                    
                }else{
                    this.targetProfitNum = 0.0001
                }
            }else if( this.popInfo.rate == 100000 ){
                if( this.targetProfitNum > 0){
                    if(  parseInt( this.targetProfitNum ) == parseFloat( this.targetProfitNum ) ){//判断是否为整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) + 1  // 如果为整数 加1
                    }else if( parseInt( this.targetProfitNum * 10 )  ==  parseFloat(this.targetProfitNum * 10)  ){//判断是否为一位小数
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) + 1)/10   //如果为一位小数 加0.1
                    }else if( parseInt( this.targetProfitNum * 100 )  ==  parseFloat(this.targetProfitNum * 100)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100) + 1)/100 // 其他加0.01
                    }else if( parseInt( this.targetProfitNum * 1000 )  ==  parseFloat(this.targetProfitNum * 1000)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 1000) + 1)/1000 // 其他加0.001
                    }else if( parseInt( this.targetProfitNum * 10000 )  ==  parseFloat(this.targetProfitNum * 10000)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10000) + 1)/10000 // 其他加0.0001
                    }else if( parseInt( this.targetProfitNum * 100000 )  ==  parseFloat(this.targetProfitNum * 100000)  ){
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100000) + 1)/100000 // 其他加0.00001
                    }
                    
                }else{
                    this.targetProfitNum = 0.00001
                }
            }
        },
        // 止损点数减
        stopLossNumReduce(){
            if( this.popInfo.rate == 10 ){
                if( this.stopLossNum > 0){ //大于0时执行
                    if(  parseInt( this.stopLossNum ) == parseFloat(this.stopLossNum) && this.stopLossNum > 1 ){//判断是否为大于一的整数
                        this.stopLossNum  = parseInt(this.stopLossNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.stopLossNum * 10 ) == parseFloat(this.stopLossNum * 10) || this.stopLossNum == 1) && this.stopLossNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }
                }else{//如果是负数，赋值为0
                    this.stopLossNum = 0;
                }
            }else if( this.popInfo.rate == 100 ){
                if( this.stopLossNum > 0){ //大于0时执行
                    if(  parseInt( this.stopLossNum ) == parseFloat(this.stopLossNum) && this.stopLossNum > 1 ){//判断是否为大于一的整数
                        this.stopLossNum  = parseInt(this.stopLossNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.stopLossNum * 10 ) == parseFloat(this.stopLossNum * 10) || this.stopLossNum == 1) && this.stopLossNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.stopLossNum = ( Math.floor(this.stopLossNum * 100) - 1)/100 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.stopLossNum = 0;
                }
            }else if( this.popInfo.rate == 1000 ){
                if( this.stopLossNum > 0){ //大于0时执行
                    if(  parseInt( this.stopLossNum ) == parseFloat(this.stopLossNum) && this.stopLossNum > 1 ){//判断是否为大于一的整数
                        this.stopLossNum  = parseInt(this.stopLossNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.stopLossNum * 10 ) == parseFloat(this.stopLossNum * 10) || this.stopLossNum == 1) && this.stopLossNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.stopLossNum * 100 ) == parseFloat(this.stopLossNum * 100) || this.stopLossNum == 1) && this.stopLossNum > 0.01){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100) - 1)/100 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.stopLossNum = ( Math.floor(this.stopLossNum * 1000) - 1)/1000 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.stopLossNum = 0;
                }
            }else if( this.popInfo.rate == 10000 ){
                if( this.stopLossNum > 0){ //大于0时执行
                    if(  parseInt( this.stopLossNum ) == parseFloat(this.stopLossNum) && this.stopLossNum > 1 ){//判断是否为大于一的整数
                        this.stopLossNum  = parseInt(this.stopLossNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.stopLossNum * 10 ) == parseFloat(this.stopLossNum * 10) || this.stopLossNum == 1) && this.stopLossNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.stopLossNum * 100 ) == parseFloat(this.stopLossNum * 100) || this.stopLossNum == 1) && this.stopLossNum > 0.01){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100) - 1)/100 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.stopLossNum * 1000 ) == parseFloat(this.stopLossNum * 1000) || this.stopLossNum == 1) && this.stopLossNum > 0.001){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 1000) - 1)/1000 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.stopLossNum = ( Math.floor(this.stopLossNum * 10000) - 1)/10000 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.stopLossNum = 0;
                }
            }else if( this.popInfo.rate == 100000 ){
                if( this.stopLossNum > 0){ //大于0时执行
                    if(  parseInt( this.stopLossNum ) == parseFloat(this.stopLossNum) && this.stopLossNum > 1 ){//判断是否为大于一的整数
                        this.stopLossNum  = parseInt(this.stopLossNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.stopLossNum * 10 ) == parseFloat(this.stopLossNum * 10) || this.stopLossNum == 1) && this.stopLossNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.stopLossNum * 100 ) == parseFloat(this.stopLossNum * 100) || this.stopLossNum == 1) && this.stopLossNum > 0.01){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 100) - 1)/100 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.stopLossNum * 1000 ) == parseFloat(this.stopLossNum * 1000) || this.stopLossNum == 1) && this.stopLossNum > 0.001){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 1000) - 1)/1000 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.stopLossNum * 10000 ) == parseFloat(this.stopLossNum * 10000) || this.stopLossNum == 1) && this.stopLossNum > 0.0001){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.stopLossNum = ( parseInt(this.stopLossNum * 10000) - 1)/10000 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.stopLossNum = ( Math.floor(this.stopLossNum * 100000) - 1)/100000 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.stopLossNum = 0;
                }
            }
           
        },
        // 止盈点数减
        targetProfitNumReduce(){
            if( this.popInfo.rate == 10 ){
                if( this.targetProfitNum > 0){ //大于0时执行
                    if(  parseInt( this.targetProfitNum ) == parseFloat(this.targetProfitNum) && this.targetProfitNum > 1 ){//判断是否为大于一的整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.targetProfitNum * 10 ) == parseFloat(this.targetProfitNum * 10) || this.targetProfitNum == 1) && this.targetProfitNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }
                }else{//如果是负数，赋值为0
                    this.targetProfitNum = 0;
                }
            }else if( this.popInfo.rate == 100 ){
                if( this.targetProfitNum > 0){ //大于0时执行
                    if(  parseInt( this.targetProfitNum ) == parseFloat(this.targetProfitNum) && this.targetProfitNum > 1 ){//判断是否为大于一的整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.targetProfitNum * 10 ) == parseFloat(this.targetProfitNum * 10) || this.targetProfitNum == 1) && this.targetProfitNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.targetProfitNum = ( Math.floor(this.targetProfitNum * 100) - 1)/100 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.targetProfitNum = 0;
                }
            }else if( this.popInfo.rate == 1000 ){
                if( this.targetProfitNum > 0){ //大于0时执行
                    if(  parseInt( this.targetProfitNum ) == parseFloat(this.targetProfitNum) && this.targetProfitNum > 1 ){//判断是否为大于一的整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.targetProfitNum * 10 ) == parseFloat(this.targetProfitNum * 10) || this.targetProfitNum == 1) && this.targetProfitNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.targetProfitNum * 100 ) == parseFloat(this.targetProfitNum * 100) || this.targetProfitNum == 1) && this.targetProfitNum > 0.01){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100) - 1)/100 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.targetProfitNum = ( Math.floor(this.targetProfitNum * 1000) - 1)/1000 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.targetProfitNum = 0;
                }
            }else if( this.popInfo.rate == 10000 ){
                if( this.targetProfitNum > 0){ //大于0时执行
                    if(  parseInt( this.targetProfitNum ) == parseFloat(this.targetProfitNum) && this.targetProfitNum > 1 ){//判断是否为大于一的整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.targetProfitNum * 10 ) == parseFloat(this.targetProfitNum * 10) || this.targetProfitNum == 1) && this.targetProfitNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.targetProfitNum * 100 ) == parseFloat(this.targetProfitNum * 100) || this.targetProfitNum == 1) && this.targetProfitNum > 0.01){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100) - 1)/100 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.targetProfitNum * 1000 ) == parseFloat(this.targetProfitNum * 1000) || this.targetProfitNum == 1) && this.targetProfitNum > 0.001){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 1000) - 1)/1000 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.targetProfitNum = ( Math.floor(this.targetProfitNum * 10000) - 1)/10000 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.targetProfitNum = 0;
                }
            }else if( this.popInfo.rate == 100000 ){
                if( this.targetProfitNum > 0){ //大于0时执行
                    if(  parseInt( this.targetProfitNum ) == parseFloat(this.targetProfitNum) && this.targetProfitNum > 1 ){//判断是否为大于一的整数
                        this.targetProfitNum  = parseInt(this.targetProfitNum) - 1      //如果为大于一的整数 减1
                    }else if( ( parseInt( this.targetProfitNum * 10 ) == parseFloat(this.targetProfitNum * 10) || this.targetProfitNum == 1) && this.targetProfitNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.targetProfitNum * 100 ) == parseFloat(this.targetProfitNum * 100) || this.targetProfitNum == 1) && this.targetProfitNum > 0.01){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 100) - 1)/100 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.targetProfitNum * 1000 ) == parseFloat(this.targetProfitNum * 1000) || this.targetProfitNum == 1) && this.targetProfitNum > 0.001){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 1000) - 1)/1000 //如果含有一位小数或者为1  减0.1
                    }else if( ( parseInt( this.targetProfitNum * 10000 ) == parseFloat(this.targetProfitNum * 10000) || this.targetProfitNum == 1) && this.targetProfitNum > 0.0001){ //判断是否含有一位小数或者为1 并且大于0.1
                        this.targetProfitNum = ( parseInt(this.targetProfitNum * 10000) - 1)/10000 //如果含有一位小数或者为1  减0.1
                    }else{
                        this.targetProfitNum = ( Math.floor(this.targetProfitNum * 100000) - 1)/100000 // 如果是0.1或者有两位小数 减0.01
                    }
                }else{//如果是负数，赋值为0
                    this.targetProfitNum = 0;
                }
            }
           
        },
        //返回到index主页（交易领航）
        toIndex(){
                window.location.href=`index.html`;
        },
        toMine(){
            window.location.href="mine.html";
        },
        //历史记录页
            //点击标题显示内容收缩
        hisBotOnOff(ind){
            for ( let i = 0; i < this.hisBotShow.length; i ++ ) {
                this.hisBotShow[i] = false;
            };
            this.$set(this.hisBotShow,ind,!this.hisBotShow[ind]);
        },
            //上拉加载
        hisloadBottom(){
            console.log("上拉加载")
        },
        GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var  strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },



    }
}
</script>
<style lang="scss" scoped>
    #box{
        background-color: #fff;
    }
    //Header信号源信息
    #header{
        position: fixed;
        top: 0;
        height: .88rem;
        background-color: #53a8fe;
        padding: 0 .24rem;
        width: 7.01rem;
        z-index: 3000;
        img{
            width: .72rem;
            height:.72rem;
            border-radius: 50%;
            margin-top: .08rem;
            margin-right: .18rem;
        }
        dl{
            text-align: left;
            color:#fff;
            dt{
                font-size: .24rem;
                line-height: .24rem;
                font-weight: 900;
                margin-top: .16rem;
            }
            dd{
                font-size: .2rem;
                line-height: .2rem;
                margin-top: .1rem;

            }
           
        } 
        button{
            width: 1.38rem;
            height: .52rem;
            background: #53a8fe;
            color:#fff;
            border-radius: .12rem;
            border: 1px solid #fff;
            margin-top: .16rem;
            font-weight: bold;
        }
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


    //弹窗
    .back{
        background-color:gray;
        opacity: .5;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -10;
        
    }

    .popup{
        position: absolute;
        left: .65rem;
        top: 1.6rem;
        z-index: 3;
        opacity: 1;
        width: 6.2rem;
        height: 3.6rem;
        background-color: #fff;
        border-radius: .28rem;
        .poptop{
            .litop{
                height: .7rem;
                border-bottom: 1px solid #999;
                .pair-en{
                    font-size: .26rem;
                    font-weight: bold;
                    line-height: .7rem;
                }
                .pair-ch{
                   font-size: .22rem;
                   line-height: .7rem;
                    color: #999;
                    
                }
            }
            .licen{
                display: flex;
                justify-content: center;
                color: #999;
                height: .62rem;
                line-height: .62rem;
                p{
                    margin-right: .2rem;
                }
                span{
                    color: #000;
                }
                .red{
                    color: #fe0000;
                }
            }
            .libot{
                display: flex;
                justify-content: space-around;
                line-height: .9rem;
                height: .9rem;
                color: #999;
                .bold{
                    font-size: .26rem;
                    color: #000;
                    font-weight: bold;
                    margin-right: .1rem;
                }
                input{
                    width: 1.2rem;
                    height: .34rem;
                    line-height: .9rem;
                    border: none;
                    outline: none;
                    text-align: center;
                    vertical-align:middle;
                    color: #000;
                }
                img{
                    width: .34rem;
                    height: .34rem;
                    border-radius: 50%;
                    vertical-align:middle;
                }
                
            }
        }
        .popbot{
            display: flex;
            justify-content: space-around;
            button{
                width: 1.8rem;
                height: .64rem;
                font-size: .32rem;
                font-weight: 900;
                border: 1px solid #4fa2fe;
                border-radius: .12rem;
                color: #4fa2fe;
                margin-top: .4rem;
                margin-bottom: .12rem;
                background: #fff;
            }
            .confirm{
                background: #4fa2fe;
                color: #fff;
                
            }
        }
    }
</style>
