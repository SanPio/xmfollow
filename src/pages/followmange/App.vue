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
                            <button>一键平仓</button>
                            <button>暂停平仓</button>
                        </p>
                </div>
                <!-- 正在跟随列表 -->
                <div style="overflow-y: scroll;margin-top:122px">
                    <mt-loadmore 
                    :bottom-method="loadBottom" :autoFill="false" ref="loadmore">
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
                                <button>一键平仓</button>
                                <button>订单管理</button>
                                <button>跟随设置</button>
                            </p>
                            
                        </div>








                    </mt-loadmore>
                </div>

   <!-- 底部返回 -->
                <!-- <div id="footer">
                    <div id="foot-center">
                        <img :src="returnleftSrc" alt="" >
                        <img :src="returnRightSrc" alt="">
                    </div>
                </div> -->


             
                
                <!-- <mt-cell v-for="n in 10" :title="'内容 ' + n" :key="n"/> -->
            </mt-tab-container-item>
            <mt-tab-container-item id="record">
                <!-- <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n" /> -->
                22222
            </mt-tab-container-item>
        </mt-tab-container>



    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            selected: 'now',
            nowTotal: 18,
            recordTotal: 30,
            num : 0.05,
            userImgSrc: require('./assets/img2.jpg'),
            returnleftSrc : require('./assets/btn-left@2x.png'),
            returnRightSrc : require('./assets/btn-right@2x.png'),
            //获利为正
            profit: true,
            nowArr:["a", "b"],
            nowOpen: [false,false],
            fixed:true
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
     
        //上拉加载
        loadBottom(){
            for(let i = 0; i < 4; i ++){
                this.nowArr.push("x");
                this.nowOpen.push(false)
            }
            
            // console.log('上拉加载')

        },
        //点击展开
        listShow(ind){
            this.$set(this.nowOpen,ind,!this.nowOpen[ind])

        }
    }
}
</script>
<style lang="scss" scoped>

    // 正在跟随
    .nowtitle{
        padding: 24px .24rem;
        background-color: #f9f9f9;
        position: fixed;
        width: 7.02rem;
        top: 46px;
        z-index: 3000;
        .left{
            line-height: 27px;
            font-size: 14px;
            font-weight: 900;
        }
        .right{
            button{
                padding: 7px .26rem;
                background: none;
                border: 1px solid #4fa2fe;
                border-radius: 6px;
                color: #4fa2fe;
                font-size: 12px;
                line-height: 12px;
                font-weight: 900;
            }
            button:nth-of-type(1){
                margin-right: .4rem;
            }
        }
    }
    .nowlist{
        
        .litop{
            height: 60px;
            padding: 0 .24rem;
            border-bottom: 1px solid #e5e5e5;
            .lileft{
                margin-right:.16rem;
                margin-top: 10px;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
            }
            .licenter{
                text-align: left;
                .name{
                    font-size: 12px;
                    font-weight: 900;
                    line-height: 14px;
                    margin-top: 16px;
                }
                .flownum{
                    font-size: 10px;
                    margin-top: 4px;
                    line-height: 10px;
                }
            }
            .liright{
                p{
                    text-align: left;
                    font-size: 10px;
                    line-height: 16px;
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
                    margin-top: 16px;
                }
            }
        }
        .libot{
            padding: 9px .6rem;
            display: flex;
            justify-content: space-between;
            button{
                padding: 7px .26rem;
                background: none;
                border: 1px solid #4fa2fe;
                border-radius: 6px;
                color: #4fa2fe;
                font-size: 12px;
                line-height: 12px;
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
    //         height: 45px;
    //         display: flex;
    //         justify-content: space-between;
    //         img{
    //             // width: .3rem;
    //             margin-top: 12px;
    //             height:28px;
    //         }
    //     }
    // }




















</style>
