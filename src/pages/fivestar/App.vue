<template>
    <div>
        <div id="header">
            <p>
                {{ name }}
            </p>
            <p>
                跟单资格
            </p>
        </div>
        <ul id="center">
            <li class="time">
                <span>
                    付费时长
                </span>
                <input maxlength = 3 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" v-model="time">
                <span>
                    月
                </span>
            </li>
            <!-- <li class="card" v-if="!dis"> -->
                <li class="card" v-if="cardshow">
                <span>
                    优惠
                </span>
                <button :class="{'blue':blueColor}" :disabled="dis"  @click="cardClick">
                    满 {{ fullSubtractionMin }} 减 {{ fullSubtractionValue }}
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
            dis: true,
            cardshow:false,
            time: 1,
            msgbox: 1,
            pay: 998,
            money : 998,
            fullSubtractionId: '',
            optionId: '',
            name: '',
            fullSubtractionMin: '',
            fullSubtractionValue: '',
            price: ''
        }
    },
    watch : {
        time : function(val){
            this.pay = val * this.price;
            this.money = val * this.price; 
            if( this.money >= this.fullSubtractionMin ){
                this.dis = false;
            }else{
                this.dis = true;
            }
        }
    },
    created(){
        var a=this.GetRequest();
        var index_1=a['optionId'];
        var index_2=a['name'];
        this.name = index_2;
        this.optionId = index_1;
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        this.$http.get(this.urlTitle+'wx/member/selectOptionPrice',{ 
            params : { 
                optionId:this.optionId  
            }
        }).then((res) => { 
            console.log( res.data.data.memberprice);
            this.price = res.data.data.memberpric;
            this.pay = res.data.data.memberprice;
            this.money = res.data.data.memberprice;
        }).catch( (err) => {
            console.log(err)
        })
        this.$http.get(this.urlTitle+'wx/member/selectDiscount',{ 
            params : { 
                userId : this.userId,
                optionId:this.optionId  
            }
        }).then((res) => { 
            if ( res.data.data.fullSubtraction == "TRUE" ) {
                this.dis = false;
                this.cardshow = true;
                this.fullSubtractionId = res.data.data.fullSubtractionId;
                this.fullSubtractionMin = res.data.data.fullSubtractionMin;
                this.fullSubtractionValue = res.data.data.fullSubtractionValue;
            }else{
                this.dis = true;
                this.cardshow = false;
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
                this.pay = this.money - this.fullSubtractionValue
            }else {
                this.pay = this.money
            }
        },   
        //点击购买
        vipPay(){
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
        },
        onBridgeReady(){
            var discountId = '';
            if( this.blueColor == true ){
                discountId = this.fullSubtractionId
            }else{
                discountId = ''
            }
            this.$http.get(this.urlTitle+'wechat/unifiedOrder',{ 
                params : { 
                    //需要支付的钱是paymoney 
                    // paymoney : this.payMoney,
                    userId : this.userId, 
                    optionId: this.optionId,
                    memberType: 3,
                    time: this.time,
                    discountType: 1,
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
                            location.href="index.html";//支付成功跳转到指定页面
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
        }
    }
}
</script>
<style lang="scss" scoped>
    #header{
        font-weight: 900;
        color: #4fa2fe;
        font-size: .44rem;
        margin-bottom: .5rem ;
        margin-top: .8rem;
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
