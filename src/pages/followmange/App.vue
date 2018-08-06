<template>
    <div>
      
        <mt-navbar v-model="selected" :fixed='fixed'>
            <mt-tab-item id="now">正在跟随（{{ nowTotal }}）</mt-tab-item>
            <mt-tab-item id="record">跟随记录（{{ recordTotal }}）</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <!-- 正在跟随 -->
        <mt-tab-container v-model="selected">
            <!-- 标题 -->
            <mt-tab-container-item id="now">
                <div class="clearfix nowtitle">
                        <p class="left">全局控制</p>
                        <p class="right">
                            <button @click="allClose">一键平仓</button>
                            <button v-if="stopOn" @click="stopClick">暂停开仓</button>
                            <button class="openbtn" v-if="!stopOn" @click="goOn">继续开仓</button>
                        </p>
                </div>
                <!-- 正在跟随列表 -->
                <div style="overflow-y: scroll;margin-top:125px;">
                    <mt-loadmore 
                    :bottom-method="loadBottom" 
                    :autoFill="false" ref="loadmores">
                        <div class="nowlist" v-for="(item, ind) in nowArr" :key="ind">

                            <div class="litop clearfix" @click="listShow(ind)">
                                <div class="left lileft">
                                    <img :src="userImgSrc" alt="">
                                </div>
                                <div class="left licenter">
                                    <p class="name">哈哈哈</p>
                                    <p class="flownum">
                                        <span>按比例&nbsp;{{num}}倍</span>
                                    </p>
                                </div>
                                <div class="right liright">
                                    <p >
                                        <span>当前持仓</span>
                                        <span class="hold">13</span>
                                    </p>
                                    <p>
                                        <span>当前获利</span>
                                        <span :class="profit ? 'profit-blue' : 'profit-red' ">$17.85</span>
                                    </p>
                                </div>
                            </div>
                            <p class="libot" v-if="nowOpen[ind]">
                                <button @click="closeThis(ind)">一键平仓</button>
                                <button>订单管理</button>
                                <button @click="toFollowSetting(ind)">跟随设置</button>
                            </p>  
                        </div>
                    </mt-loadmore>
                </div>
            </mt-tab-container-item>
            <!-- 跟随记录 -->
            <mt-tab-container-item id="record">
                <!-- 此div用于占位 -->
                <div style="height:46px"></div>
                 <div style="overflow-y: scroll;">
                    <mt-loadmore 
                    :bottom-method="hisloadBottom" 
                    :autoFill="false" ref="loadmore">


                    <!-- 记录列表 -->
                    <div class="recordlist" v-for="(item, ind) in recordList" :key="ind">


                        <!-- 记录标题 -->
                        <div class="listtop" @click="recordListShow(ind)">
                            <div class="left listleft">
                                <img :src="userImgSrc" alt="">
                            </div>
                            <div class="left listcenter">
                                <p class="name">哈哈哈</p>
                                <p class="flownum">
                                    <span>按比例&nbsp;{{num}}倍</span>
                                </p>
                            </div>
                            <div class="right listright">
                                <p>
                                    <span>累计获利</span>
                                    <span :class="hisProfit ? 'profit-blue' : 'profit-red'">$17.85</span>
                                </p>
                            </div>
                        </div>
                        <!-- 记录内容 -->
                        <div class="listbot clearfix" v-if="recordOpen[ind]">
                            <div class="listbot-left left">
                                <p>
                                    <span>当前跟单数量</span>
                                    <span>13</span>
                                </p>
                                <p>
                                    <span>当前获利</span>
                                    <span>$17.85</span>
                                </p>
                                <p>
                                    <span>开始跟随时间</span>
                                    <span>2018-01-13</span>
                                </p>
                            </div>
                            <div class="listbot-right right">
                                <p>
                                    <span>累计跟单数量</span>
                                    <span>263</span>
                                </p>
                                <p>
                                    <span>累计获利</span>
                                    <span>$17.853</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    </mt-loadmore>
                </div>    
            </mt-tab-container-item>
        </mt-tab-container>

        <!-- 底部返回 -->
        <!-- <div id="footer">
            <div id="foot-center">
                <img :src="returnleftSrc" alt="" >
                <img :src="returnRightSrc" alt="">
            </div>
        </div>        -->
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            selected: 'now',
            fixed:true,
            nowTotal: 18,
            recordTotal: 30,
            num : 0.05,
            userImgSrc: require('./assets/img2.jpg'),
            returnleftSrc : require('./assets/btn-left@2x.png'),
            returnRightSrc : require('./assets/btn-right@2x.png'),
            stopOn: true,
            //正在跟随获利为正
            profit: true,
            nowArr:["a", "b"],
            nowOpen: [false,false],
            // 跟随记录
            hisProfit: false,
            recordList:["a", "b"],
            recordOpen: [false,false],
            
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
    methods: {
     
        //正在跟随上拉加载
        loadBottom(){
            for(let i = 0; i < 4; i ++){
                this.nowArr.push("x");
                this.nowOpen.push(false)
            }
            
            // console.log('上拉加载')

        },
        //跟随记录上拉加载
        hisloadBottom(){
            for(let i = 0; i < 4; i ++){
                this.recordList.push("tt")
                this.recordOpen.push(false)
            }
            
            // console.log('上拉加载')

        },
        //正在跟随点击展开
        listShow(ind){
            this.$set(this.nowOpen,ind,!this.nowOpen[ind])

        },
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
        //暂停开仓
        stopClick(){
            this.stopOn = !this.stopOn;
        },
        //继续开仓
        goOn(){
            this.stopOn = !this.stopOn;
        },
         //平仓(平掉单个)
        closeThis(){
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '清空',
                message: '您是否确定平掉此信号员的持仓？',
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
        toFollowSetting(ind){
            window.location.href="followsetting.html";
        },

        //跟随记录
        recordListShow(ind){
            this.$set(this.recordOpen,ind,!this.recordOpen[ind])
        }
    }
}
</script>
<style lang="scss" scoped>

    // 正在跟随
    .nowtitle{
        padding: .48rem .24rem;
        background-color: #f9f9f9;
        position: fixed;
        width: 95%;
        top: .98rem;
        z-index: 2;
        .left{
            line-height: .54rem;
            font-size: .28rem;
            font-weight: 900;
        }
        .right{
            button{
                padding: .14rem .26rem;
                background: none;
                border: 1px solid #4fa2fe;
                border-radius: .1rem;
                color: #4fa2fe;
                font-size: .24rem;
                line-height: .24rem;
                font-weight: 900;
            }
            button:nth-of-type(1){
                margin-right: .4rem;
            }
            .openbtn{
                color:#fff;
                background: #4fa2fe;
            }
        }
    }
    .nowlist{
        
        .litop{
            height: 1.2rem;
            padding: 0 .24rem;
            border-bottom: 1px solid #e5e5e5;
            .lileft{
                margin-right:.16rem;
                margin-top: .2rem;
                img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 50%;
                }
            }
            .licenter{
                text-align: left;
                .name{
                    font-size: .24rem;
                    font-weight: 900;
                    line-height: .28rem;
                    margin-top: .32rem;
                }
                .flownum{
                    font-size: .2rem;
                    margin-top: .08rem;
                    line-height: .2rem;
                }
            }
            .liright{
                p{
                    text-align: left;
                    font-size: .2rem;
                    line-height: .32rem;
                    span:nth-of-type(1){
                        color: #999;  
                        margin-right: .1rem;  
                    }
                    .hold{
                        color: #000;
                        font-weight: 900;
                    }
                    .profit-blue{
                        color: #007aff;
                        font-weight: 900;
                    }
                    .profit-red{
                        color: #fe0000;
                        font-weight: 900;
                    }
                }
                p:nth-of-type(1){
                    margin-top: .32rem;
                }
            }
        }
        .libot{
            background-color: #f9f9f9;
            padding: .18rem .6rem;
            display: flex;
            justify-content: space-between;
            button{
                padding: .14rem .26rem;
                background: none;
                border: 1px solid #4fa2fe;
                border-radius: .12rem;
                color: #4fa2fe;
                font-size: .24rem;
                line-height: .24rem;
            }
        }
        
    }


    // 跟随记录
    .recordlist{
        .listtop{
            height: 1.2rem;
            padding: 0 .24rem;
            border-bottom: 1px solid #e5e5e5;
            background-color: #fff;
            .listleft{
                margin-right:.16rem;
                margin-top: .2rem;
                img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 50%;
                }
            }
            .listcenter{
                text-align: left;
                .name{
                    font-size: .24rem;
                    font-weight: 900;
                    line-height: .28rem;
                    margin-top: .32rem;
                }
                .flownum{
                    font-size: .2rem;
                    margin-top: .08rem;
                    line-height: .2rem;
                }
            }
            .listright{
                p{
                    text-align: left;
                    font-size: .2rem;
                    line-height: .32rem;
                    margin-top: .44rem;
                    span:nth-of-type(1){
                        color: #999;  
                        margin-right: .1rem;  
                    }
                    
                    .profit-blue{
                        color: #007aff;
                        font-weight: 900;
                    }
                    .profit-red{
                        color: #fe0000;
                        font-weight: 900;
                    }
                }
               
            }
        }
        .listbot{
            text-align: left;
            padding: .16rem .4rem;
            background-color: #f9f9f9;
            p{
                height: .52rem;
                line-height: .52rem;
                span:nth-of-type(1){
                    color: #999;
                    margin-right: .1rem;
                }
                span:nth-of-type(2){
                    color: #666;
                    font-weight: 900;
                }
            }
        }

    }








    // 底部导航按钮
    // #footer{
    //     width: 100%;
    //     position: fixed;
    //     background-color: #fff;
    //     bottom: 0;
    //     display: flex;
    //     justify-content: center;
    //     #foot-center{
    //         width: 2rem;
    //         height: .9rem;
    //         display: flex;
    //         justify-content: space-between;
    //         img{
    //             // width: .3rem;
    //             margin-top: .24rem;
    //             height:.56rem;
    //         }
    //     }
    // }




















</style>
