<template>
    <div id="box">
        <div id="header" class="clearfix" >
            <div class="left">
                <img :src="traderImg" alt="">
            </div>
            <dl class="left">
                <dt>
                    信号员
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
        </div>
        <mt-navbar v-model="selected" :fixed='fixed'>
            <mt-tab-item id="info">订单信息</mt-tab-item>
            <mt-tab-item id="history">历史记录</mt-tab-item>
        </mt-navbar>
         <mt-tab-container v-model="selected">
           
            <mt-tab-container-item id="info">
                <div style="height:92px"></div>
                <div style="overflow-y: scroll;">
                    <mt-loadmore 
                    :bottom-method="loadBottom" 
                    :autoFill="false" ref="loadmores">
                        <div ref="mybox">
                            <div class="infolist" v-for="(item, ind) in infoArr" :key="ind">
                                <div class="infotop clearfix" @click="infoBotOnOff(ind)">
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
                                                信号员001
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
                <div style="height:92px"></div>
                <div style="overflow-y: scroll;">
                    <mt-loadmore 
                    :bottom-method="hisloadBottom" 
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
                                                信号员001
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


        <!-- 弹窗 -->
        <div ref="back" class="back" ></div>
        <div class="popup" v-if="popUpShow">
            <ul class="poptop">
                <li>
                    <span>登录平台</span>
                    <input type="text" placeholder="请输入账号" >
                   
                    <ul></ul>
                </li>
                <li>
                    <span>登录账号</span>
                    <input type="text" placeholder="请输入账号">
                    
                </li>
                <li>
                    <span>登录密码</span>
                    <input type="password" placeholder="请输入密码">
                
                </li>
                <li>
                    <span>账号备注</span>
                    <input type="text" placeholder="请输入备注名称">
            
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
            //Header交易员信息  
            traderImg: require('./assets/img2.jpg'),

            selected: 'history',
            fixed: true,
            //订单信息页
            colorShow: true,//数字蓝色还是红色
            infoArr : [
                {
                    name: 'USD/CHF',
                    type: 0
                },
                {
                    name: 'USD/CHF',
                    type: 1
                },
                {
                    name: 'USD/CHF',
                    type: 2
                },
                {
                    name: 'USD/CHF',
                    type: 3
                },
                {
                    name: 'USD/CHF',
                    type: 4
                }
            ],
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
            hisBotShow:[ false,false,false,false,false],


            //弹窗
            popUpShow:false,//弹窗是否显示
            stopLossShow:true,//止损按钮是否显示




        }
    },
    // created(){
    //     // if(headerShow){
    //     //     this.$refs.title.style.top='44'
    //     // }
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
        
        this.calculationHeight();
        this.calculation();
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
                winHeight = window.innerHeight-80;
            }else if((document.body) && (document.body.clientHeight)){
                winHeight = document.body.clientHeight-80; 
            }
            this.$refs.mybox.style.minHeight=`${winHeight}px`;
            this.$refs.myboxes.style.minHeight=`${winHeight}px`
        },
            //点击标题显示内容收缩
        infoBotOnOff(ind){
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
          
        },
        //止损按钮
        targetProfit(ind){
            this.$refs.back.style.zIndex=2;
            this.popUpShow = true;
        },
        //止损确定按钮
        confirmStop(){
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            console.log("止损确定")
        },
        //止盈利确定按钮
        confirmStop(){
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
            console.log('上拉加载');
            this.infoArr.push(
                {
                    name: 'USD/CHF',
                    type: 0
                },
                {
                    name: 'USD/CHF',
                    type: 1
                },
                {
                    name: 'USD/CHF',
                    type: 2
                },
                {
                    name: 'USD/CHF',
                    type: 3
                },
                {
                    name: 'USD/CHF',
                    type: 4
                }
            );
        },




        //历史记录页
            //点击标题显示内容收缩
        hisBotOnOff(ind){
            this.$set(this.hisBotShow,ind,!this.hisBotShow[ind])
        },
            //上拉加载
        hisloadBottom(){
            console.log("上拉加载")
        }



    }
}
</script>
<style lang="scss" scoped>
    #box{
        background-color: #fff;
    }
    //Header交易员信息
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
        left: .8rem;
        top: 1.6rem;
        z-index: 3;
        opacity: 1;
        padding: .28rem .3rem;
        background-color: #fff;
        border-radius: .28rem;
        .poptop{
            li{
                text-align: left;
                width: 5.1rem;
                height: .64rem;
                padding: .16rem .2rem;
                border-bottom: 1px solid #c9c9c9;
                span{
                    font-weight: 900;
                    font-size: .26rem;
                    line-height: .26rem;
                    margin-right: .2rem;
                }
                input{
                    width: 3rem;
                    height: .34rem;
                    padding-left: .2rem;
                    border: none;
                    outline: none;
                    border-left: 1px solid #e5e5e5;
                }
                img{
                    width: .32rem;
                }
            }
        }
        .popbot{
            display: flex;
            justify-content: space-around;
            button{
                width: 1.8rem;
                height: .64rem;
                font-size: .64rem;
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
