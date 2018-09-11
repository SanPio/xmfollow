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
            <p class="card" >
                <!-- <button :class="{'blue':disOnoff}" :disabled="disDisabled" @click="chooseDis" v-if="!disDisabled">
                    {{ discount }} 折
                </button>
                
                <button :class="{'blue':reduceOnoff}" :disabled="redDisabled" @click="chooseRed" v-if="!redDisabled">
                    满 {{ full }}  减  {{ reduce }}
                </button> -->
           
                <button v-if="eightfive" :class="{'blue':dischoose == 1}" @click="carchoose(1)">
                    8.5 折
                </button>
                <button v-if="eight" :class="{'blue':dischoose == 2}"  @click="carchoose(2)">
                   8 折
                </button>
                <button v-if="sevenfive" :class="{'blue':dischoose == 3}"  @click="carchoose(3)">
                    7.5 折
                </button>
                <button v-if="fullreduction" :disabled="redDisabled" :class="{'blue':dischoose == 4}"  @click="carchoose(4)">
                    满 {{ full }} 减  {{ reduce }}
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
            <p class="agreement" v-if="false">
                <img :src="haveClick ? actSrc : befSrc" alt="" @click="imgChange">
                <span>
                    我已经阅读并同意
                </span>
                <span>
                    《小铭跟单注册协议》
                </span>              
            </p>
        </div>
        <p id="bottom">
            <button @click="vipPay">微信支付</button>
        </p>
        
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            urlTitle: '',
            userId: '',
            accountId: '',
            haveClick: false,
            befSrc: require('./assets/Wrong@2x.png'),
            actSrc: require('./assets/Select@2x.png'),
            imgSrc: require('./assets/form.jpg'),
            timeList: ['1个月','3个月','6个月','12个月'],
            timeColor: 0,
            time: 1,
            discount: 8.5,
            full: '',
            reduce: '', 
            money: 598,
            payMoney : 598,
            disOnoff: false,
            reduceOnoff: false,
            disDisabled: true,
            redDisabled: true,
            discountId: '',
            fullSubtractionId: '',
            msgbox: 1,


            dischoose: '',
            eight: false,
            eightId: '',
            eightfive: false,
            sevenfive: false,
            sevenfiveId: '',
            fullreduction: false
        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        this.accountId = localStorage.getItem('accountId');
        this.$http.get(this.urlTitle+'wx/member/selectDiscount',{ 
            params : { 
                userId : this.userId,
                
            }
        }).then((res) => { 
                console.log(res)
                // 8.5折
                if ( res.data.data.discount == "TRUE" ) {
                    this.eightfive = true;
                    this.discountId = res.data.data.discountId
                }else {
                    this.eightfive = false;
                    this.discountId = '';
                }
                // 8折
                if ( res.data.data.eight == "TRUE" ) {
                    this.eight = true;
                    this.eightId = res.data.data.eightId 
                }else {
                    this.eight = false;
                    this.eightId = '';
                }
                // 7.5折
                if ( res.data.data.sevenFive == "TRUE" ) {
                    this.sevenfive = true;
                    this.sevenfiveId = res.data.data.sevenFiveId
                }else {
                    this.sevenfive = false;
                    this.sevenfiveId = '';
                }
                // 满减
                if ( res.data.data.fullSubtraction == "TRUE" ) {
                    this.fullreduction = true;
                    this.fullSubtractionId = res.data.data.fullSubtractionId;
                    this.full = res.data.data.fullSubtractionMin;
                    this.reduce = res.data.data.fullSubtractionValue;
                }else {
                    this.fullreduction = false;
                    this.fullSubtractionId = ''
                }

        
            
        }).catch((err) => {
            console.log(err)
        })




    },
    watch: {
        money(val){
            if( val >= this.full ) {
                this.redDisabled = false
            }else{
                this.redDisabled = true
            }
        }
    },
    methods: {
        //时间选择
        choseTimd(ind){
            this.timeColor = ind;
            // this.disOnoff = false;
            // this.reduceOnoff = false;
            this.dischoose = '';
            this.msgbox = 1;
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
        imgChange(){
            this.haveClick = !this.haveClick;
        },
 
        carchoose(val){
            if(this.dischoose == val){
                this.dischoose = '';
                this.payMoney = this.money;
            }else{
                this.dischoose = val;
                if( val == 1){
                    this.payMoney = parseInt(this.money * 85 )/100;
                }else if( val == 2){
                    this.payMoney = parseInt(this.money * 80 )/100;
                }else if( val == 3){
                    this.payMoney = parseInt(this.money * 75 )/100;
                }else if( val == 4){
                    this.payMoney = this.money - this.reduce;
                }



            }
            
        },
        //点击购买
 
        vipPay(){
         //   if ( (this.disDisabled == false || this.redDisabled == false)&&( this.disOnoff==false && this.reduceOnoff == false) ) {
            if ( (this.eight == true || this.eightfive == true || this.sevenfive == true || this.redDisabled == false) && this.dischoose == '' && this.msgbox==1) {
                MessageBox('提示', '你还有兑换券没有使用');
                this.msgbox ++ ;
            }else {

                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if (document.attachEvent){  
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);                 
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);             
                    }
                }else{
                    //暂不使用   微信功能 ，后期开放
                    this.onBridgeReady();
                }
            }  
        },
        onBridgeReady(){
            var discountType = '';
            var discountId = '';
         
            if ( this.dischoose == 4 ) {
                discountType = 1;
                discountId = this.fullSubtractionId
            }else if ( this.dischoose == 3 ) {
                discountType = 2;
                discountId = this.sevenfiveId
            }else if ( this.dischoose == 2 ) {
                discountType = 2;
                discountId = this.eightId
            }else if ( this.dischoose == 1 ) {
                discountType = 2;
                discountId = this.discountId
            }


            this.$http.get(this.urlTitle+'wechat/unifiedOrder',{ 
                params : { 
                    userId : this.userId,  
                    memberType: 2,
                    time: this.time,
                    discountType: discountType,
                    discountId: discountId
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
                                window.location.href=`index.html`;
                            	// location.href="weixinPayResult.html";//支付成功跳转到指定页面
                        }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                            Toast("支付取消")
                        }else{
                            Toast("支付失败")
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
                
                padding: 0 .3rem;
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
        .agreement{
            height: .8rem;
            line-height: .8rem;
            text-align: left;
            padding-left: .4rem;
            img{
                width: .24rem;
                height: .24rem;
                margin-right: .1rem;
            }
            span{
                font-size: .24rem;
                margin-right: 0;
            }
            span:nth-of-type(2){
                color: #4fa2fe;
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
