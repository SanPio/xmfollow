<template>
    <div>
        <h1 id="header">
            购买V认证
        </h1>
        <ul id="center">
            <li class="time">
                <span>
                    付费时长
                </span>
                <input maxlength = 3 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" v-model="time">
                <span>
                    年
                </span>
            </li>
            <li class="card">
                <span>
                    优惠
                </span>
                <button :class="{'blue':blueColor}" :disabled="dis"  @click="cardClick">
                    V&nbsp;认证兑换券
                </button>
            </li>
            <li class="money">
                <span>
                    应付金额
                </span>
                <span class="paymoney">
                    {{ pay + '.00'}}
                </span>
                <span>
                    元
                </span>
            </li>
            <li class="agreement" v-if="false">
                <img :src="haveClick ? actSrc : befSrc" alt="" @click="imgChange">
                <span>
                    我已经阅读并同意
                </span>
                <span>
                    《小铭跟单注册协议》
                </span>              
            </li>
        </ul>
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
            befSrc: require('./assets/Wrong@2x.png'),
            actSrc: require('./assets/Select@2x.png'),
            haveClick: false,
            blueColor: false,
            dis: false,
            time: 1,
            msgbox: 1,
            pay: 998,
            money : 998,
            discountId: ''
        }
    },
    watch : {
        time : function(val){
            this.pay = val *998;
            this.money = val *998; 
        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
         this.$http.get(this.urlTitle+'wx/member/selectDiscount',{ 
            params : { 
                userId : this.userId,
                
            }
        }).then((res) => { 
                console.log(res)
                if ( res.data.data.exchange == "TRUE" ) {
                    this.dis = false;
                    this.discountId = res.data.data.exchangeId
                }else{
                    this.dis = true;
                }
              
        }).catch((err) => {
            console.log(err)
        })
    },
    methods: {
        imgChange(){
            this.haveClick = !this.haveClick;
        },
        cardClick(){
            this.blueColor = !this.blueColor;
            if(this.blueColor == true){
                this.pay = this.money - 998
            }else {
                this.pay = this.money
            }
        },   
        //点击购买
        vipPay(){
            if( this.pay == 0 ){
                this.$http.get(this.urlTitle+'wechat/certifiedMembers',{ 
                params : { 
                    //需要支付的钱是paymoney 
                    // paymoney : this.payMoney,
                    userId : this.userId, 
 
                    memberType: 1,
                    time: this.time,
                    discountType: 3,
                    discountId: this.discountId


                }
            }).then((res) => {
                console.log(res)
                if( res.data.data.SUCCESS = '"TRUE"'){
                    location.href="mine.html";
                }else {
                    Toast("支付失败")
                }           
             })
            }else{
                if ( this.dis == false && this.msgbox == 1 && this.blueColor==false ) {
                    MessageBox('提示', '你还有兑换券没有使用');
                    this.msgbox++ ;
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

            }
                 
        },
        onBridgeReady(){



            this.$http.get(this.urlTitle+'wechat/unifiedOrder',{ 
                params : { 
                    //需要支付的钱是paymoney 
                    // paymoney : this.payMoney,
                    userId : this.userId, 
 
                    memberType: 1,
                    time: this.time,
                    discountType: 3,
                    discountId: this.discountId


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
                          
                            	location.href="mine.html";//支付成功跳转到指定页面
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
        
        .card,.time{
            border-bottom: 1px solid #c9c9c9;
        }
        li{
            text-align: left;
            padding-left: .4rem;
            height: 1.06rem;
            line-height: 1.06rem;
            span{
                font-size: .3rem;
                margin-right: .52rem;
            }
        }
        .time{
            input{
                width: .8rem;
                height: .5rem;
                text-align: center;
                border: 1px solid #4fa2fe;
                border-radius: .1rem;
                color: #4fa2fe;
                outline: none;
            }
            span:nth-of-type(2){
                font-size: .24rem;
                color: #666;
                margin-left: .18rem;
            }
        }
        .card{
            span{
                margin-right: 1.14rem;
            }
            button{
                padding: .16rem .32rem;
                color: #4fa2fe;
                border : 1px solid #4fa2fe;
                background: none;
                border-radius: .1rem;
                font-weight: bold;
            }
            .blue{
                background-color: #4fa2fe;
                color: #fff;
            }
        }
        .money{
            .paymoney{
                margin-right: 0;
                color: #ff7c2b;   
            }
            
        }
        .agreement{
            height: .8rem;
            line-height: .8rem;
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
        margin-top: 4rem;
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
