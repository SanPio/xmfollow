<template>
    <div id="box">
        <div id="header" class="padding clearfix">
            <div class="left clearfix">
                <div class="left">
                    <img :src="userImgSrc" alt="">
                </div>
                <dl class="right">
                    <dt>哈哈哈</dt>
                    <dd>
                        <span>按比例&nbsp;{{proportion}}倍</span>
                        
                        <span class="incomeTitle">跟随收益</span>
                        <span class="income"> ${{income}} </span>
                    </dd>
                </dl>
            </div>
            <div class="right">
                <button class="cancel">取消跟随</button>
            </div>
        </div>
        <div class="content padding clearfix follow-on">
            <span class="con-title left ">跟单开关</span>
                <mt-switch v-model="followOnOff" class="right"></mt-switch>
        </div>
        <p class="content padding clearfix close-position">
            <span class="con-title left">一键平仓</span>
            <button class="con-btn right">点击平仓</button>
        </p>
        <p class="content padding clearfix order-mange">
            <span class="con-title left">订单管理</span>
            <button class="con-btn right">点击管理</button>
        </p>
        <p class="content padding clearfix follow-type">
            <span class="con-title left">跟单方式</span>
            <button class="con-btn right fixedbtn" :class="{'clickbtn':!clickBtn}" @click="btnClick">固定跟随</button>
            <button class="con-btn right " :class="{'clickbtn':clickBtn}" @click="btnClick">比例跟随</button>
        </p>
        <p class="proportions">
            <span v-if="clickBtn">比例跟随：您下单的手数=交易员下单的手数*跟随比例</span>
            <span v-if="!clickBtn">固定跟随：您下单的</span>
        </p>
        <div class="clearfix follow-num" style="border-bottom:1px solid #e5e5e5">
            <p class="left">跟随数值</p>
            <p class="right">
                <button @click="followNumReduce">-</button>
                <input type="number" v-model="followNum ">
                <button @click="followNumPlus">+</button>
                <span v-if="clickBtn">倍</span>
                <span v-if="!clickBtn">手</span>
            </p>
        </div>
        <div class="content padding clearfix follow-on">
            <span class="con-title left ">反向跟随</span>
                <mt-switch v-model="reverseOnOff" class="right"></mt-switch>
        </div>
        <p class="proportions">
            <span v-if="reverseOnOff">开启后将执行与交易员信号相反的交易</span>
            <span v-if="!reverseOnOff">固定跟随：您下单的</span>
        </p>
        <p class="content padding clearfix target-profit ">
            <span class="left con-title">止盈</span>
            <span class="right" style="font-size:10px;color:#999;">点</span>
            <input type="number" class="right">
        </p>
        <p class="proportions">
            <span >当盈利达到止盈点数时自动平仓</span>
           
        </p>
        <p class="content padding clearfix target-profit">
            <span class="left con-title">止损</span>
            <span class="right" style="font-size:10px;color:#999;">点</span>
            <input type="number" class="right">
        </p>
        <p class="proportions">
            <span >当损失达到止损点数时自动平仓</span> 
        </p>




        <p class="title">精密设置</p>
        <div class="content padding clearfix pre-set">
            <p class="left ">最小手数</p>
            <p class="right">
                <!-- <button :class="{'btn-click':handsOne}">1</button>
                <button :class="{'btn-click':handsZero}">0.1</button> -->
                <button v-for="(item,ind) in handsNumArr" :key="item" :class="{'btn-click':handsNum==ind}" @click="handsNum=ind">{{item}}</button>
                <span>标准手</span>  
            </p>
        </div>
        <p class="abandon padding clearfix">
            <span class="left">开仓手数精度大于最小手数</span>
            
            <button class="right" :class="{'btn-chose':!abandonShow}" @click="abandonBtn">四舍五入</button>
            <button class="right" :class="{'btn-chose':abandonShow}" @click="abandonBtn">舍弃尾数</button>
        </p>

















    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
          userImgSrc: require('./assets/img2.jpg'),
          proportion: 0.50,
          income: 34.02,
          followNum : 0.05,
          clickBtn: true,
          followOnOff: true,
          reverseOnOff :true,
          handsNumArr:["1","0.1","0.01"],
          handsNum:0,
          abandonShow:true
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

    },
    methods: {
        //比例跟随和固定跟随切换
        btnClick(){
            this.clickBtn = !this.clickBtn;
        },
        //跟随比例加
        followNumPlus(){
            this.followNum = parseInt(this.followNum*100+1)/100;
        },
        //跟随比例减
        followNumReduce(){
            this.followNum -= 0.01;
        },
      
        //四舍五入
        abandonBtn(){
            this.abandonShow = !this.abandonShow;
        }
        
    }
}
</script>
<style lang="scss" scoped>
    .padding{
        padding: 0 .24rem;
        border-bottom: 1px solid #e5e5e5;
    }
    #header{
        height: 60px;
        img{
            margin-top: 10px;
            margin-right: .2rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        dl{
            font-size: 9px;
            margin-top: 14px;
            text-align: left;
            dt{
                font-weight: 900;
            }
            .incomeTitle{
                margin-left: .2rem;
            }
            .income{
                color: #4fa2fe;
            }
        }
        .cancel{
            padding: 5px .2rem;
            color: #4fa2fe;
            border: 1px solid #4fa2fe;
            border-radius: 6px;
            background: none;
            margin-top: 16px;
            outline: none;
        }
        
    }
    .content{
        .con-title{
            font-size: 13px;
            font-weight: 900;
            color: #666666;
        }
        
    }
    .follow-on{
        height: 37px;
        line-height: 37px;
    }
    .close-position,.order-mange{
        height: 56px;
        line-height: 56px;
        button{
            padding: 5px .2rem;
            color: #4fa2fe;
            border: 1px solid #4fa2fe;
            border-radius: 6px;
            background: none;
            margin-top: 16px;
            outline: none; 
        }
    }
    
    .follow-type{
        height: 60px;
        line-height: 60px;
        button{
            padding: 5px .2rem;
            color: #999;
            border: 1px solid #e5e5e5;
            border-radius: 6px;
            background: none;
            margin-top: 16px;
            outline: none; 
        }
        .fixedbtn{
            margin-left: .4rem;
        }
        .clickbtn{
            color: #fff;
            border: 1px solid #4fa2fe;
            border-radius: 6px;
            background: #4fa2fe;;
        }
    }
    .proportions{
        text-align: left;
        padding-left: .24rem;
        font-size: 10px;
        height: 20;
        line-height: 20px;
        color: #999;
        // background-color: pink;
    }
    .follow-num{
        height: 50px;
        line-height: 50px;
        padding: 0 .24rem;
        .left{
            color: #666;
            font-size: 13px;
            font-weight: 900;
        }
        .right{
            button{
                width: 17px;
                height:17px;
                line-height: 17px;
                border: 1px solid #e6e6e6;
                border-radius: 50%;
                font-size: 16px;
                background: none;
                // font-weight: 900;
                outline: none; 
            }
            input{
                // outline: none; 
                width: 1rem;
                text-align: center;
                outline: none;
                border:none;
            }
            span{
                color: #999;
                
            }
        }
    }
    .target-profit{
        height :54px;
        line-height: 54px;
        input{
            width: 1.38rem;
            border:1px solid #e5e5e5;
            height: 26px;
            margin-top: 14px;
            outline: none;
            margin-right: .3rem;
        }
    }
    .title{
        font-size: 14px;
        line-height: 34px;
        margin-top: 20px;
        border: 1px solid #e6e6e6;
    }
    .pre-set{
        height:94px;
        line-height: 94px;
        .left{
            color: #666;
            font-size: 13px;
            font-weight: 900; 
        }
        span{
            color: #999;
        }
        button{
            width: 1rem;
            height: 26px;
            border: 1px solid #e8e8e8;
            color: #999;
            background: none;
            text-align: center;
            border-radius: 6px;
            margin-right: .3rem;
            outline: none;
        }
        .btn-click{
            border: 1px solid #4fa2fe;
            color: #fff;
            background: #4fa2fe;
        }
    
    }
    .abandon{
        height: 50px;
        line-height: 50px;
        span{
            font-size: 13px;
            color: #666;
        }
        button{
            padding: 6px .2rem;
            background: none;
            border: none;
            outline: none;
            color: #999;
            margin-top: 10px;
            border-radius: 6px;

        }
        .btn-chose{
            background-color: #4fa2fe;
            color: #fff;
        }
    }
</style>
