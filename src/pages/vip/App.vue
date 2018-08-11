<template>
    <div>
        <h1 id="header">
            购买会员
        </h1>
        <div id="center">
            <div id="banner">
                <img :src="imgSrc" alt="">
            </div>
            <p class="time">
                <button v-for="( item, ind) in timeList" :key="item" @click="choseTimd(ind)" :class="{'blue':timeColor == ind}">
                    {{item}}
                </button>
               
            </p>
            <p class="card">
                <button :class="{'blue':disOnoff}" :disabled="disDisabled" @click="chooseDis">
                    {{ discount }} 折
                </button>
                <button :class="{'blue':reduceOnoff}" :disabled="redDisabled" @click="chooseRed">
                    满 {{ full }}  减  {{ reduce }}
                </button>
                
            </p>
            <p class="paytype">
                <span>
                    付费方式
                </span>
                <button>
                    微信支付
                </button>
            </p>
            <p class="money">
                <span>
                    应付金额
                </span>
                <span>
                    {{ payMoney }}
                </span>
                <span>
                    元
                </span>
            </p>
        </div>
        <p id="bottom">
            <button @click="vipPay">微信支付</button>
        </p>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            urlTitle: '',
            userId: '',
            imgSrc: require('./assets/form.jpg'),
            timeList: ['1个月','3个月','6个月','12个月'],
            timeColor: 0,
            time: 1,
            discount: 8.5,
            full: 1000,
            reduce: 500, 
            money: 598,
            payMoney : 598,
            disOnoff: false,
            reduceOnoff: false,
            disDisabled: true,
            redDisabled: true,

        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
    },
    methods: {
        //时间选择
        choseTimd(ind){
            this.timeColor = ind;
            if ( ind == 0) {
                this.time = 1;
            }else if ( ind == 1) {
                this.time = 3;
            }else if ( ind == 2) {
                this.time = 6;
            }else if ( ind == 3) {
                this.time = 12;
            }
            this.payMoney = this.time * 598;
            this.money = this.time * 598;
        },
        chooseDis(){
            this.disOnoff = !this.disOnoff;
            this.reduceOnoff = false;
            if ( this.disOnoff ){
                this.payMoney = parseInt(this.money * this.discount * 10)/100;
            }else {
                this.payMoney = this.money;
            }   
        },
        chooseRed(){
            this.reduceOnoff = !this.reduceOnoff;
            this.disOnoff = false;
            if ( this.reduceOnoff ) {
                if ( this.money >= this.full ) {
                    this.payMoney = this.money - this.reduce;
                }else {
                    this.payMoney = this.money;
                }
            }else {
                this.payMoney = this.money;
            }
        },
        //点击购买
        vipPay(){
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    console.log(1111111)
                }else if (document.attachEvent){  
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);                 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);             
                }
            }else{
                this.onBridgeReady();
                console.log(45555555)
            }
        },
        onBridgeReady(){
            this.$http.get(this.urlTitle+'wechat/unifiedOrder',{ 
                params : { 
                    //需要支付的钱是paymoney 
                    // paymoney : this.payMoney,
                    userId : this.userId,  
                }
            }).then((res) => { 
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId" : res.data.data.appId,
                        "timeStamp": res.data.data.timeStamp,
                        "nonceStr" : res.data.data.nonceStr,
                        "package" : res.data.data.package,
                        "signType" :  res.data.data.signType,
                        "paySign" : res.data.data.paySign,
                    },function(res){
                        console.log(res.err_msg)
                        if(res.err_msg == "get_brand_wcpay_request:ok"){
                            console.log("支付成功")
                            $("#resId").html("支付成功");
                            //	location.href="weixinPayResult.html";//支付成功跳转到指定页面
                        }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                            console.log("支付取消")
                        }else{
                            console.log("支付失败")
                        }
                    }
                );  
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    #header{
        font-weight: 900;
        color: #4fa2fe;
        font-size: .44rem;
        line-height: 1.24rem;
        height: 1.24rem;
        margin-top: .2rem;
    }
    #center{
        width: 6.9rem;
        padding: 0 .3rem;
        .blue{
            background-color: #4fa2fe;
            color: #fff;
        }
        button{
            font-size: .26rem;
            height: .56rem;
            line-height: .56rem;
            background: #fff;
            color: #4fa2fe;
            border: 1px solid #4fa2fe;
            border-radius: .1rem;
            padding: 0 .38rem;
        }
        #banner{
            img{
                display: block;
                width: 100%;
            }
            
        }
        .time{
            padding: .2rem 0;
            margin-top: .46rem;
            border-bottom: 1px solid #c9c9c9;
            display: flex;
            justify-content: space-between;
        }
        .card{
            padding: .2rem 0;
            border-bottom: 1px solid #c9c9c9;
            display: flex;
            justify-content: space-around;
            button{
                width: 3rem;
                padding: 0;
            }
        }
        .paytype{
            height: .94rem;
            text-align: left;
            span{
                margin-left: .4rem;
                margin-right: .5rem;
                line-height: .94rem;
                font-size: .28rem;
            }
            button{
                border: 1px solid gray;
                color: #000;
            }
        }
        .money{
            height: .66rem;
            line-height: .66rem;
            font-size: .28rem;
            text-align: left;
            span:nth-of-type(1){
                margin-left: .4rem;
                margin-right: .5rem;
            }
            span:nth-of-type(2){
                color: #ff7c2b;
            }
        }
    }
    #bottom{
        margin-top: 2.1rem;
        text-align: center;
        button{
            width: 6.48rem;
            height: 1rem;
            line-height: 1rem;
            background-color: #4fa2fe;
            color:#fff;
            font-size: .44rem;
            font-weight: 900;
            outline: none;
            border-radius: .16rem;
            border: none;
        }
    }
</style>
