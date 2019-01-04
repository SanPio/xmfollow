<template>
    <div v-if="boxShow">
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
            <p class="card" v-if="eightfive || eight || sevenfive">
               
                
                <button v-if="eightfive" :class="{'blue':dischoose == 1}" @click="carchoose(1)">
                    8.5 折
                </button>
                <button v-if="eight" :class="{'blue':dischoose == 2}"  @click="carchoose(2)">
                   8 折
                </button>
                <button v-if="sevenfive" :class="{'blue':dischoose == 3}"  @click="carchoose(3)">
                    7.5 折
                </button>   
                
            </p>
            <div style="text-align:center;border-bottom:1px solid #c9c9c9" v-if="fullcard.length">
                
               <button v-for="(item, index) in fullcard" :key="index"  :disabled="fullCardShow[index]" :class="{'blue':fullChoose == index}" style="margin:.2rem .1rem"  @click="carchoose(4,index)" >
                    <span style="">
                         满 {{ item.fullSubtractionMin }} 减  {{ item.fullSubtractionValue }} 
                    </span>
                    <br/>
                    <span style="font-size:.18rem;line-height:.18rem" v-if="item.fullSubtractionEndTime">
                         {{'（有效期'+ item.fullSubtractionEndTime+'）'}}
                    </span>
                   
                </button> 
            </div>
            <div class="quan">
                <ul>
                    <li @click="changeStyle(index)" v-for="(item,index) in userDiscountList" :key="index" :class="{active:index==isActive}" v-if="time==1 && item.value==0.65">
                        <h2>{{item.titile}}</h2>
                        <p>{{item.content}}</p>
                        <span>{{item.endTime}}</span>
                    </li>
                    <li @click="changeStyle(index)" v-for="(item,index) in userDiscountList" :key="index" :class="{active:index==isActive}" v-if="time==3 && item.value==0.5">
                        <h2>{{item.titile}}</h2>
                        <p>{{item.content}}</p>
                        <span>{{item.endTime}}</span>
                    </li>
                    <li @click="changeStyle(index)" v-for="(item,index) in userDiscountList" :key="index" :class="{active:index==isActive}" v-if="time==6 && item.value==0.33">
                        <h2>{{item.titile}}</h2>
                        <p>{{item.content}}</p>
                        <span>{{item.endTime}}</span>
                    </li>
                    <li @click="changeStyle(index)" v-for="(item,index) in userDiscountList" :key="index" :class="{active:index==isActive}" v-if="time==12 && item.value==0.1">
                        <h2>{{item.titile}}</h2>
                        <p>{{item.content}}</p>
                        <span>{{item.endTime}}</span>
                    </li>
                </ul>
                
            </div>
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
                <span style="text-decoration:line-through;font-size:0.28rem;padding:0 0.1rem 0 0;color: #ff7c2b;" v-if="price!=payMoney">
                    {{ price }}元
                </span>
                <span style="color: #ff7c2b;font-size:0.36rem;">{{ payMoney }}</span>
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
            boxShow:false,
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
            price:598,
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
            fullreduction: false,
            
            fullcard:[],
            fullChoose: -1,
            fullCardShow: [],

            limite:[],
            isActive:-1,

            userDiscountList:[],
            limitDiscount:'',
            sixfiveDiscount:[]
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
            
                if ( res.data.data.fullSubtraction.length ) {
                    this.fullcard = res.data.data.fullSubtraction;
                    this.redDisabled = false
                    for(let i = 0; i < this.fullcard.length; i++) {
                        this.fullCardShow.push(true)
                    }
                }else {
                 
                }



                for(let i = 0 ; i < this.fullcard.length; i ++){
                    this.$set(this.fullCardShow,i,true)
                    if (this.money >= Number(this.fullcard[i].fullSubtractionMin) ){
                        this.$set(this.fullCardShow,i,false)
                        
                    }  
                }
            this.boxShow = true
            console.log(res.data.data.userDiscountList)  
            this.userDiscountList = res.data.data.userDiscountList;  
        }).catch((err) => {
            console.log(err)
        })

    },

    watch: {
        money(val){

            for(let i = 0 ; i < this.fullcard.length; i ++){
                this.$set(this.fullCardShow,i,true)
                if (val >= Number(this.fullcard[i].fullSubtractionMin) ){
                    this.$set(this.fullCardShow,i,false)
                    
                }  
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
            this.fullChoose = -1;
            this.msgbox = 1;
            if ( ind == 0) {
                this.time = 1;
                this.isActive = -1;
            }else if ( ind == 1) {
                this.time = 3;
                this.isActive = -1;
            }else if ( ind == 2) {
                this.time = 6;
                this.isActive = -1;
            }else if ( ind == 3) {
                this.time = 12;
                this.isActive = -1;
            }
            this.payMoney = this.time * 598;
            this.money = this.time * 598;
            this.price = this.time * 598;
        },
        changeStyle(index){  
            this.isActive = index                   
            this.limitDiscount = this.userDiscountList[index].value
            if(this.time==1 && this.limitDiscount==0.65){
                this.payMoney = this.time*598*0.65
            }else if(this.time==3 && this.limitDiscount==0.5){
                this.payMoney = this.time*598*0.5
            }else{
                this.payMoney = this.time*598
            }
        },
        
        imgChange(){
            this.haveClick = !this.haveClick;
        },
 
        carchoose(val,ind){
            if(this.dischoose == val && val != 4){
                this.dischoose = '';
                this.payMoney = this.money;
                this.fullChoose = -1
            }else if(this.dischoose != val && val != 4){
                this.dischoose = val;
                this.fullChoose = -1
                if( val == 1){
                    this.payMoney = parseInt(this.money * 85 )/100;
                }else if( val == 2){
                    this.payMoney = parseInt(this.money * 80 )/100;
                }else if( val == 3){
                    this.payMoney = parseInt(this.money * 75 )/100;
                }
                // else if( val == 4){
                //     console.log(ind)
                //     if(this.fullChoose == ind) {
                //         this.fullChoose = -1;
                //         this.payMoney = this.money;
                //         // this.$set(this.fullCardShow,i,false)
                //     }else{
                //         this.fullChoose = ind
                //     this.full = this.fullcard[ind].fullSubtractionMin;
                //     this.reduce = this.fullcard[ind].fullSubtractionValue;
                //     this.fullSubtractionId = this.fullcard[ind].fullSubtractionId;
                //     this.payMoney = this.money - this.reduce;
                //     }
                    
                // }



            }else if( val == 4){
                this.dischoose = '';
                 console.log(ind)
                    if(this.fullChoose == ind) {
                        this.fullChoose = -1;
                        this.payMoney = this.money;
                        // this.$set(this.fullCardShow,i,false)
                    }else{
                        this.fullChoose = ind
                    this.full = this.fullcard[ind].fullSubtractionMin;
                    this.reduce = this.fullcard[ind].fullSubtractionValue;
                    this.fullSubtractionId = this.fullcard[ind].fullSubtractionId;
                    this.payMoney = this.money - this.reduce;
                    }
            }
            
        },
        //点击购买
 
        vipPay(){
         //   if ( (this.disDisabled == false || this.redDisabled == false)&&( this.disOnoff==false && this.reduceOnoff == false) ) {
            if ( (this.eight == true || this.eightfive == true || this.sevenfive == true || this.redDisabled == false) && this.dischoose == '' && this.fullChoose == -1&& this.msgbox==1) {
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
         
            if ( this.dischoose == ""&& this.fullChoose != -1 ) {
                discountType = 1;
                discountId = this.fullcard[this.fullChoose].fullSubtractionId
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

            console.log(discountId)
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
            // height: .56rem;
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
            margin-top: .4rem;
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
        margin-top: 1rem;
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
    .quan{
        width: 100%;
        overflow-x:scroll;
        border-bottom: 1px solid #c9c9c9;
        backface-visibility:hidden;
        perspective:1000;
        white-space:nowrap;
        ul{
            overflow: hidden;
            width: 17rem;
            .active{
                background-color: #4fa2fe;
                width: 3.56rem;
                height: 1.7rem;
                box-sizing: border-box;
                border-radius: 0.1rem;
                margin: 0.2rem 0.2rem 0.2rem 0;
                float: left;
                color: white;
                h2{
                    font-size: 0.44rem;
                    font-weight: normal;
                    padding: 0.08rem 0 0 0;
                }
                p{
                    font-size: 0.28rem;
                }
                span{
                    font-size: 0.24rem;
                    color: #fff;
                }
            }
            li{
                background-color: white;
                width: 3.56rem;
                height: 1.7rem;
                box-sizing: border-box;
                border-radius: 0.1rem;
                margin: 0.2rem 0.2rem 0.2rem 0;
                float: left;
                color: #4fa2fe;
                border: 1px solid #4fa2fe;
                border-radius: 0.1rem;
                h2{
                    font-size: 0.44rem;
                    font-weight: normal;
                    padding: 0.08rem 0 0 0;
                }
                p{
                    font-size: 0.28rem;
                }
                span{
                    font-size: 0.24rem;
                    color: #999999;
                }
            }
        }
    }
</style>
