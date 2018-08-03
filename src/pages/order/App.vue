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
                                    <button>
                                        止损
                                    </button>
                                    <button>
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
                        <div ref="mybox">
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
        
        this.calculationHeight()
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






        //订单信息页
            //设定上拉下拉区域为窗口高度
        calculationHeight(){
            let winHeight = 0;
            if (window.innerHeight){
                winHeight = window.innerHeight-80;
            }else if((document.body) && (document.body.clientHeight)){
                winHeight = document.body.clientHeight-80; 
            }
            this.$refs.mybox.style.minHeight=`${winHeight}px`
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
    //Header交易员信息
    #header{
        position: fixed;
        top: 0;
        height: 44px;
        background-color: #53a8fe;
        padding: 0 .24rem;
        width: 7.01rem;
        z-index: 3000;
        img{
            width: 36px;
            height:36px;
            border-radius: 50%;
            margin-top: 4px;
            margin-right: .18rem;
        }
        dl{
            text-align: left;
            color:#fff;
            dt{
                font-size: 12px;
                line-height: 12px;
                font-weight: 900;
                margin-top: 8px;
            }
            dd{
                font-size: 10px;
                line-height: 10px;
                margin-top: 5px;

            }
           
        } 
        button{
            width: 1.38rem;
            height:26px;
            background: #53a8fe;
            color:#fff;
            border-radius: 6px;
            border: 1px solid #fff;
            margin-top: 8px;
            font-weight: bold;
        }
    }





    .colorbtn{
        width: 14px;
        height:14px;
        font-size: 10px;
        line-height: 10px;
        border: none;
        color: #fff;
        border-radius: 2px;
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
        font-size: 10px;
        line-height: 10px;
        color: #999;
        .infotop{
            height: 55px;
            border-bottom: 1px solid #c9c9c9;
            padding: 0 .24rem;
            .left{
                text-align: left;
                p:nth-of-type(1){
                    margin-top: 12px;
                    margin-bottom: 10px;
                    span{
                        font-size: 14px;
                        line-height: 14px;
                        font-weight:bold;
                        color: #000; 
                    } 
                    span:nth-last-of-type(1){
                        font-size: 10px;
                        font-weight: normal;
                        line-height: 10px;
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
                        margin-right: 2px;
                    }
                }

            }
            .right{
                .left{
                    text-align: right;
                    p:nth-of-type(1){
                        font-size: 14px;
                        line-height: 14px;
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
                            font-size: 10px;
                            line-height: 10px;
                            font-weight: bold;
                        }
                        
                    }
                }
                .right{
                    button{
                        line-height: 14px;
                        height: 14px;
                        color: #666;
                        margin-top: 22px;
                        font-weight: bold;
                        margin-left: .2rem;
                        border: none;
                        background-color: #fff;
                    }
                    
                }
            }
        }
        .infocen{
            padding: 8px .24rem ;
            background-color: #f9f9f9;
            li{
                height: 24px;
                line-height: 24px;
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
            padding: 16px .24rem;
            button{
                width: 1.68rem;
                height: 32px;
                left: 32px;
                color: #4fa2fe;
                border: 1px solid #4fa2fe;
                background-color: #f9f9f9;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 900;
            }
        }
    }
</style>
