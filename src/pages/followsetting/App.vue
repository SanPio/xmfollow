<template>
    <div id="box" ref="box">
        <!-- 头部 -->
        <div id="header" class="padding clearfix">
            <div class="left clearfix">
                <div class="left">
                    <img :src="userImgSrc" alt="">
                </div>
                <dl class="right">
                    <dt> {{ followInfo.signalName }} </dt>
                    <dd v-if="followInfo.qubie != 1">
                        <span> {{ followInfo.lotsTypeStr }}&nbsp;{{followInfo.lots}}</span>
                        <span v-if="followInfo.lotsTypeStr=='按比例'">倍</span>
                        <span v-if="followInfo.lotsTypeStr=='按手数'">手</span>
                        <!-- <span class="incomeTitle">跟随收益</span>
                        <span class="income" :class="{'redcolor':redcolor}" v-if="followInfo.profitTotal"> {{"$" + followInfo.profitTotal}} </span> -->
                    </dd>
                </dl>
            </div>
            <div class="right">
                <button class="cancel" @click="cancelFollo">取消跟随</button>
            </div>
        </div>
        <!-- 跟单开关 -->
        <div class="content padding clearfix follow-on">
            <span class="con-title left ">跟单开关</span>
            <mt-switch v-model="followOnOff" class="right"></mt-switch>
        </div>
        <!-- 一键平仓 -->
        <p class="content padding clearfix close-position">
            <span class="con-title left">一键平仓</span>
            <button class="con-btn right" @click="closePosition">点击平仓</button>
        </p>
        <!-- 订单管理 -->
        <p class="content padding clearfix order-mange">
            <span class="con-title left">订单管理</span>
            <button class="con-btn right">点击管理</button>
        </p>
        <!-- 跟单方式 -->
        <p class="content padding clearfix follow-type">
            <span class="con-title left">跟单方式</span>
            <button class="con-btn right fixedbtn" :class="{'clickbtn':!clickBtn}" :disabled="!clickBtn"   @click="btnClick">固定跟随</button>
            <button class="con-btn right " :class="{'clickbtn':clickBtn}"  :disabled="clickBtn"   @click="btnClick">比例跟随</button>
        </p>
        <!-- 跟单方式下提示语 -->
        <p class="proportions" style="height:.6rem">
            <span v-if="clickBtn">比例跟随：您下单的手数=交易员下单手数*跟随比例，若下单手数小于最小操作手数，则按最小操作手数下单，敬请注意！</span>
            <span v-if="!clickBtn">固定跟随：下单的手数=设定的手数，与信号源手数无关</span>
        </p>
        <!-- 跟随数值 -->
        <div class="clearfix follow-num" style="border-bottom:1px solid #e5e5e5">
            <p class="left">跟随数值</p>
            <p class="right">
                <button @click="followNumReduce">-</button>
                <input type="number" v-model="followNum " @blur="decimal(1)">
                <button @click="followNumPlus">+</button>
                <span v-if="clickBtn">倍</span>
                <span v-if="!clickBtn">手</span>
            </p>
        </div>
        <!-- 反向跟随 -->
        <div class="content padding clearfix follow-on">
            <span class="con-title left ">反向跟随</span>
                <mt-switch v-model="reverseOnOff" class="right"></mt-switch>
        </div>
        <!-- 反向跟随提示语 -->
        <p class="proportions">
            <span >开启后将执行与信号源相反的交易</span>
        </p>
        <!-- 止盈 -->
        <p class="content padding clearfix target-profit ">
            <span class="left con-title">止盈</span>
            <span class="right" style="font-size:10px;color:#999;">点</span>
            <input type="number" class="right" v-model="takeProfits" @blur="decimal(3)">
        </p>
        <p class="proportions">
            <span >当盈利达到止盈点数时自动平仓</span>
           
        </p>
        <!-- 止损 -->
        <p class="content padding clearfix target-profit">
            <span class="left con-title">止损</span>
            <span class="right" style="font-size:10px;color:#999;">点</span>
            <input type="number" class="right" v-model="stopLoss" @blur="decimal(2)">
        </p>
        <p class="proportions">
            <span >当损失达到止损点数时自动平仓</span> 
        </p>



        <!-- 精密设置 -->
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
        <!-- 四舍五入选择 -->
        <p class="abandon padding clearfix">
            <span class="left">开仓手数精度大于最小手数</span>
            
            <button class="right" :class="{'btn-chose':!abandonShow}" :disabled="!abandonShow"  @click="abandonBtn">四舍五入</button>
            <button class="right" :class="{'btn-chose':abandonShow}" :disabled="abandonShow" @click="abandonBtn">舍弃尾数</button>
        </p>
        <!-- 四舍五入指示图 -->
        <div class="bottom">
            <img :src="showImgSrc" alt="">
        </div>
        <!-- 底部保存按钮 -->
        <p class="preservation">
            <button @click="popShow">保存</button>
        </p>
        
         <!-- 弹窗 -->
        <div ref="back" class="back" ></div>
        <div class="popup" v-if="popUpShow">
            <p class="poptop">
                设置清单
            </p>
            <p class="poptitle">
                
               请结合您的账户资金、信号源账户资金
               <br/>
               及交易特征，合理设置您的跟单配置。
            </p>
            
            <ul class="popcontant">
                <li class="clearfix">
                    <span class="left">
                        跟单方式
                    </span>
                    <span class="right" v-if="clickBtn">
                        比例跟随
                    </span>
                    <span class="right" v-if="!clickBtn">
                        固定跟随
                    </span>
                </li>
                <li class="clearfix">
                    <span class="left">
                        跟随数值
                    </span>
                    <span class="right" v-if="clickBtn">
                        {{ followNum }} 倍
                    </span>
                    <span class="right" v-if="!clickBtn">
                        {{ followNum }} 手
                    </span>
                </li>
                <li class="clearfix">
                    <span class="left">
                        反向跟随
                    </span>
                    <span class="right" v-if="reverseOnOff">
                        开
                    </span>
                    <span class="right" v-if="!reverseOnOff">
                        关
                    </span>
                </li>
                <li class="clearfix">
                    <span class="left">
                        止盈
                    </span>
                    <span class="right">
                        {{ takeProfits }} 点
                    </span>
                </li>
                <li class="clearfix">
                    <span class="left">
                        止损
                    </span>
                    <span class="right">
                        {{ stopLoss }} 点
                    </span>
                </li>
                <li style="height:.8rem;line-height:.8rem;font-size:.2rem;font-weight:bold;color:#000;">
                    <p style="text-align:left">
                        精密设置
                    </p>
                </li>
                <li class="clearfix" style="border:none;">
                    <span class="left">
                        最小操作手数
                    </span>
                    <span class="right" v-if="handsNum == 0">
                        1 标准手
                    </span>
                    <span class="right" v-if="handsNum == 1">
                        0.1 标准手
                    </span>
                    <span class="right" v-if="handsNum == 2">
                        0.01 标准手
                    </span>
                </li>
                 <li class="clearfix" style="border:none;">
                    <span class="left">
                        尾数设置
                    </span>
                    <span class="right" v-if="abandonShow">
                        舍弃尾数
                    </span>
                    <span class="right" v-if="!abandonShow">
                        四舍五入
                    </span>
                </li>
            </ul>
            <div class="popbot">
                <button class="confirm" @click="preserv">
                    确定
                </button>
                <button class="cancel" @click="cancelBtn">
                    取消
                </button>
            </div>
        </div>
       


    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            optionId:1,
            userId: 1,
            accountId: 1,
            userImgSrc: require('./assets/Head-portrait.jpg'),
            showImgSrc: require('./assets/setting-img.jpg'),
            returnleftSrc : require('./assets/btn-left@2x.png'),
            returnRightSrc : require('./assets/btn-right@2x.png'),
            proportion: 0.50,
            income: 34.02,
            followNum : 0.01,
            clickBtn: true,
            followOnOff: true,
            reverseOnOff : false,
            handsNumArr: ["1","0.1","0.01"],
            handsNum: 0,
            abandonShow: true,
            redcolor:false,
            holdState: true, //持仓状态，点击取消跟随时查询
            //获取回来的信息
            followInfo:{},
            signalName: '',
            lotsType: '',
            stopLoss:0,//止损点
            takeProfits: 0,//止盈点
            urlTitle:"",
            iss: '' ,
            popUpShow: false
        }
    },
    created(){
        let haveiss = sessionStorage.getItem('iss');
        if(haveiss == 1){
            document.title = '跟随设置(模拟)';
            this.iss = haveiss
        }else{
            document.title = '跟随设置';
            this.iss = ''
        }
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        this.accountId = localStorage.getItem('accountId');
        var v = this.parseUrl();//解析所有参数
        this.optionId = v['optionId'];
        //初始化数据请求
        this.$http.get(this.urlTitle+'wx/order/member/followSettingInfo',{ 
            params : {
                accountId : this.accountId, 
                optionId : this.optionId,
                userId : this.userId
            }   
        }).then((res) => { 
            console.log(res.data.data);
            this.followInfo  = res.data.data;
            this.signalName = res.data.data.signalName;
            this.lotsType = res.data.data.lotsType;
            this.takeProfits = res.data.data.takeProfits;
            this.stopLoss = res.data.data.stopLoss;
            this.followNum = res.data.data.lots;
            //固定跟随还是手数跟随
            if(res.data.data.lotsTypeStr == "按比例"){
                this.clickBtn = true;
            }else if(res.data.data.lotsTypeStr == "按手数"){
                this.clickBtn = false;
            }
            //跟随收益是正还是负的
            if(  Number(res.data.data.profitTotal) > 0 ){
                this.redcolor = false;
            }else{
                this.redcolor = true;
            }
            //跟单开关
            if(res.data.data.nullity == 0){
                this.followOnOff = true;
            }else if(res.data.data.nullity == 1){
                this.followOnOff = false;
            }
            //反向跟随
            if( res.data.data.opposite == 0 ){
                this.reverseOnOff = false;
            }else if(res.data.data.opposite == 1){
                this.reverseOnOff = true;
            }
            //最小手数
            if( res.data.data.minLotsCount == 1){
                this.handsNum = 0
            }else if(res.data.data.minLotsCount == 0.1){
                this.handsNum = 1;
            }else if(res.data.data.minLotsCount == 0.01){
                this.handsNum = 2;
            }

            //精密设置去大小
            if( res.data.data.broundoff == 0){
                this.abandonShow = true;
            }else if(res.data.data.broundoff == 1){
                this.abandonShow = false;
            }
        }).catch((err) => {console.log(err) })
       
    },
    mounted(){
         
    },
    watch: {
        followOnOff(newval,oldval){  
            if ( newval == false ) {
                MessageBox('警告，请注意', '您现在已经暂停跟随此信号源的开仓操作，如果误操作请恢复选项。');
            }
        },
        followNum(val){
            
            if( this.iss == 1 && val >1){
            //    this.followNum = 1
            }
        },
        // takeProfits(val){
        //     var s= "" + val;
        //     var regex=/^[0]+/
        //     var a=s.replace(regex,"");
        //     this.takeProfits = Number(a)
        // },
        // stopLoss(val){
        //     var s= "" + val;
        //     var regex=/^[0]+/
        //     var a=s.replace(regex,"");
        //     this.stopLoss = Number(a)
        // },
        // followNum(val){
        //     var s= "" + val;
        //     var regex=/^[0]+/
        //     var a=s.replace(regex,"");
        //     this.followNum = Number(a)
        // }


    },
    methods: {
        ////接受跳转参数
        parseUrl(){
            var url=location.href;
            var i=url.indexOf('?');
            if(i==-1)return;
            var querystr=url.substr(i+1);
            var arr1=querystr.split('&');
            var arr2=new Object();
            for  (i in arr1){
                var ta=arr1[i].split('=');
                arr2[ta[0]]=ta[1];
            }
            return arr2;
        },
        //取消跟随
        cancelFollo(){
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '跟随管理',
                message: '您是否确定取消跟随？',
                showConfirmButton:true,
                showCancelButton:true
            }).then(action => { 
                //因为按钮布局与原来Mint布局是相反的，所以回调取的也是相反
                if (action == 'cancel') {     //确认的回调
                    console.log(1); 
                    let postData = this.$qs.stringify({
                        accountId : this.accountId, 
                        optionId : this.optionId,
                        userId : this.userId
                    });
                    console.log(postData)
                    this.$http({
                        method: 'post',
                        url: this.urlTitle+'wx/order/member/cancelFollowing',
                        data:postData
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.success == true){
                            MessageBox({
                                
                                confirmButtonText:'确定',
                                title: '提示',
                                message: '已取消跟随',
                                showConfirmButton:true,
                           
                            }).then(action => { 
                             
                                if (action == 'confirm') {     //确认的回调
                                    window.location.href=`followmange.html?accountsid=${this.accountId}`;
                                }
                            })
                            // MessageBox('提示', '已取消跟随');
                            
                        }else{
                            MessageBox('提示', res.data.message);
                        }
                        
                    }).catch((err) => {
                        
                    });
                }
                if (action == 'confirm') {     //确认的回调
                   
                }
            })
        },
         //一键平仓
        closePosition(){
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '一键平仓',
                message: '您是否确定平掉此信号源的持仓？',
                showConfirmButton:true,
                showCancelButton:true
            }).then(action => { 
                //因为按钮布局与原来Mint布局是相反的，所以回调取的也是相反
                if (action == 'cancel') {     //确认的回调     
                    let postData = this.$qs.stringify({
                        accountId: this.accountId,
                        optionId: this.optionId,
                        type : 0,
                        userId : this.userId,
                    });
                    console.log(postData)
                    this.$http({
                        method: 'post',
                        url: this.urlTitle+'wx/order/member/followStop',
                        data:postData
                    }).then((res)=>{
                        console.log(res.data.success)
                        if(res.data.success == true){
                            MessageBox('提示', '持仓已全平');
                        }else{
                            MessageBox('提示', '平仓失败');
                        }
                    }).catch((err) => {
                    
                    });

                }
                if (action == 'confirm') {     //确认的回调
      
                }
            })
        },
        //比例跟随和固定跟随切换
        btnClick(){
            this.clickBtn = !this.clickBtn;
        },
        // 比例跟随数值填写失焦 取两位小数
    
        decimal(val){
           if(val ==1){
                var s= "" + this.followNum;
                if(s.indexOf('.') == -1){
                    var regex=/^[0]+/
                    var a=s.replace(regex,"");
                    this.followNum = Number(a)
                }else if ( s.indexOf('.') == 0 ){
                    this.followNum = Number( '0' + s ) 
                }else{
                    var index = s.indexOf('.')
                    var arr = s.split(".")
                    var regex=/^[0]+/
                    var a=arr[0].replace(regex,"");
                    this.followNum = Number(a + '.' + arr[1]) 
                }
                // if(this.followNum < ){
                //     this.followNum = 0.01
                // } 
                this.followNum = parseInt(this.followNum*100)/100;  
           }else if(val == 2){

                var s= "" + this.stopLoss;
                if(s.indexOf('.') == -1){
                    var regex=/^[0]+/
                    var a=s.replace(regex,"");
                    this.stopLoss = Number(a)
                }else if ( s.indexOf('.') == 0 ){
                    this.stopLoss = Number( '0' + s ) 
                }else{
                    var index = s.indexOf('.')
                    var arr = s.split(".")
                    var regex=/^[0]+/
                    var a=arr[0].replace(regex,"");
                    this.stopLoss = Number(a) 
                }
               
           }else if ( val == 3 ) {
                var s= "" + this.takeProfits;
                if(s.indexOf('.') == -1){
                    var regex=/^[0]+/
                    var a=s.replace(regex,"");
                    this.takeProfits = Number(a)
                }else if ( s.indexOf('.') == 0 ){
                    this.takeProfits = Number( '0' + s ) 
                }else{
                    var index = s.indexOf('.')
                    var arr = s.split(".")
                    var regex=/^[0]+/
                    var a=arr[0].replace(regex,"");
                    this.takeProfits = Number(a) 
                }  
           }
            
        },
       
        //跟随比例加
        followNumPlus(){
            if( this.followNum > 0){
                if(  parseInt( this.followNum ) == parseFloat(this.followNum) ){//判断是否为整数
                    this.followNum  = parseInt(this.followNum) + 1  // 如果为整数 加1
                }else if( parseInt( this.followNum * 10 )  ==  parseFloat(this.followNum * 10)  ){//判断是否为一位小数
                    this.followNum = ( parseInt(this.followNum * 10) + 1)/10   //如果为一位小数 加0.1
                }else{
                    this.followNum = ( Math.ceil(this.followNum * 100) + 1)/100 // 其他加0.01
                }
            }else{
                this.followNum = 0.01
            }
        },
        //跟随比例减
        followNumReduce(){
            if( this.followNum > 0.01){ //大于0时执行
                if(  parseInt( this.followNum ) == parseFloat(this.followNum) && this.followNum > 1 ){//判断是否为大于一的整数
                    this.followNum  = parseInt(this.followNum) - 1      //如果为大于一的整数 减1
                }else if( ( parseInt( this.followNum * 10 ) == parseFloat(this.followNum * 10) || this.followNum == 1) && this.followNum > 0.1){ //判断是否含有一位小数或者为1 并且大于0.1
                    this.followNum = ( parseInt(this.followNum * 10) - 1)/10 //如果含有一位小数或者为1  减0.1
                }else{
                    this.followNum = ( Math.floor(this.followNum * 100) - 1)/100 // 如果是0.1或者有两位小数 减0.01
                }
            }else{//如果是负数，赋值为0
                this.followNum = 0.01;
            }
        },
        //四舍五入
        abandonBtn(){
            this.abandonShow = !this.abandonShow;
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
        },
        //保存
        preserv(){
            
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            //精密设置
            var broundoff = 0;
            if( this.abandonShow == true ){
                broundoff = 0;
            }else if( this.abandonShow == false ){
                broundoff = 1;
            }
            //跟随数值
            var lots = this.followNum;
            //跟随方式
            var lotsType = 1;
            if( this.clickBtn == true){
                lotsType =1
            }else if(this.clickBtn == false){
                lotsType = 0
            }
            //最小手数
            var minLotsCount = 0.01;
            if( this.handsNum == 0){
                minLotsCount = 1
            }else if(this.handsNum == 1 ){
                minLotsCount = 0.1
            }else if(this.handsNum == 2 ){
                minLotsCount = 0.01
            }
            //跟单开关
            var nullity = 0;
            if(this.followOnOff == true){
                nullity = 0
            }else if(this.followOnOff == false){
                nullity = 1
            }
            //反向跟随
            var opposite = 0;
            if( this.reverseOnOff ==false ){
                opposite = 0;
            }else if(  this.reverseOnOff = true ){
                opposite = 1;
            }
            let postData = this.$qs.stringify({
                accountId:  this.accountId,
                optionId : this.optionId,
                userId : this.userId,
                broundoff: broundoff,
                lots : lots,
                lotsType : lotsType,
                minLotsCount: minLotsCount,
                nullity : nullity,
                opposite: opposite,
                stopLoss: this.stopLoss,
                takeProfits : this.takeProfits,
            });
            console.log(postData)
            this.$http({
                method: 'post',
                url: this.urlTitle+'wx/order/member/followSetting',
                data:postData
            }).then((res)=>{
                console.log(res)
                if(res.data.code == 1){
                    //   1.0版本以后跳转到跟随管理
                    window.location.href=`followmange.html?accountsid=${this.accountId}`;
                    // //   1.0版本回到主页
                    // window.location.href=`index.html?accountsid=${this.accountId}&userid=${this.userId}`;
                }else{
                    MessageBox('提示', '保存失败');
                }
            }).catch((err) => {
                console.log(err)
            });
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
            this.$refs.back.style.height=' 100%';
        },
        popShow(){
            if( this.followNum <= 0 ){
                 MessageBox('提示', '您设置的数值有误请重新输入')
            }else{
                this.calculation();
                this.$refs.back.style.zIndex=2;
                this.popUpShow = true;
            }
           
        },
  
        //弹窗取消
        cancelBtn(){
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
        },

        
    }
}
</script>
<style lang="scss" scoped>
    #box{
        position: relative;
        background-color: #fff;
    }
    .padding{
        padding: 0 .24rem;
        border-bottom: 1px solid #e5e5e5;
    }
    #header{
        height: 1.2rem;
        img{
            margin-top: .2rem;
            margin-right: .2rem;
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
        }
        dl{
            font-size: .2rem;
            margin-top: .28rem;
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
            .redcolor{
                color:red;
            }
        }
        .cancel{
            padding: .1rem .2rem;
            color: #4fa2fe;
            border: 1px solid #4fa2fe;
            border-radius: .12rem;
            background: none;
            margin-top: .32rem;
            outline: none;
        }
        
    }
    .content{
        .con-title{
            font-size: .26rem;
            font-weight: 900;
            color: #666666;
        }
        
    }
    .follow-on{
        height: .74rem;
        line-height: .74rem;
    }
    .close-position,.order-mange{
        height: 1.12rem;
        line-height: 1.12rem;
        button{
            padding: .1rem .2rem;
            color: #4fa2fe;
            border: 1px solid #4fa2fe;
            border-radius: .12rem;
            background: none;
            margin-top: .32rem;
            outline: none; 
        }
    }  
    .follow-type{
        height: 1.2rem;
        line-height: 1.2rem;
        button{
            padding: .1rem .2rem;
            color: #999;
            border: 1px solid #e5e5e5;
            border-radius: .12rem;
            background: none;
            margin-top: .32rem;
            outline: none; 
        }
        .fixedbtn{
            margin-left: .4rem;
        }
        .clickbtn{
            color: #fff;
            border: 1px solid #4fa2fe;
            border-radius: .12rem;
            background: #4fa2fe;;
        }
    }
    .proportions{
        text-align: left;
        padding: .24rem;
        font-size: .2rem;
        height: .4rem;
        line-height: .4rem;
        color: #999;
        // background-color: pink;
    }
    .follow-num{
        height: 1rem;
        line-height: 1rem;
        padding: 0 .24rem;
        .left{
            color: #666;
            font-size: .26rem;
            font-weight: 900;
        }
        .right{
            button{
                width: .34rem;
                height: .34rem;
                line-height: .34rem;
                border: 1px solid #e6e6e6;
                border-radius: 50%;
                font-size: .32rem;
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
        height :1.08rem;
        line-height: 1.08rem;
        input{
            width: 1.38rem;
            border:1px solid #e5e5e5;
            height: .52rem;
            margin-top: .28rem;
            outline: none;
            margin-right: .3rem;
            text-align: center;
        }
    }
    .title{
        font-size: .28rem;
        line-height: .68rem;
        margin-top: .4rem;
        border: 1px solid #e6e6e6;
    }
    .pre-set{
        height:1.88rem;
        line-height: 1.88rem;
        .left{
            color: #666;
            font-size: .26rem;
            font-weight: 900; 
        }
        span{
            color: #999;
        }
        button{
            width: 1rem;
            height: .52rem;
            border: 1px solid #e8e8e8;
            color: #999;
            background: none;
            text-align: center;
            border-radius: .12rem;
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
        height: 1rem;
        line-height: 1rem;
        span{
            font-size: .26rem;
            color: #666;
        }
        button{
            padding: .12rem .2rem;
            background: none;
            border: none;
            outline: none;
            color: #999;
            margin-top: .2rem;
            border-radius: .12rem;

        }
        .btn-chose{
            background-color: #4fa2fe;
            color: #fff;
        }
    }
    .bottom{
        img{
            width: 100%;
        }
    }
    .preservation{
        border-bottom: 1px solid #dbdbdb;
        button{
            width: 6.5rem;
            height: 1rem;
            border: none;
            outline: none;
            font-weight: 900;
            background-color: #4fa2fe;
            color: #fff;
            font-size: .44rem;
            border-radius: .16rem;
            margin: .48rem 0;
        }
    }
    #footer{
        width: 100%;
        
        display: flex;
        justify-content: center;
        #foot-center{
            width: 2rem;
            height: .9rem;
            display: flex;
            justify-content: space-between;
            img{
                // width: .3rem;
                margin-top: .24rem;
                height: .56rem;
            }
        }
    }
    //弹窗
    .back{
        background-color:gray;
        opacity: .7;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -10;
        
    }
    .popup{
        position: fixed;
        left: .65rem;
        top: .6rem;
        z-index: 3;
        opacity: 1;
        width: 6rem;
        height: 9.6rem;
        background-color: #fff;
        border-radius: .28rem;
        .poptop{
            height: .7rem;
            font-size: .3rem;
            line-height: .7rem;
            border-bottom: 1px solid #c9c9c9;
            font-weight: bold;
        }
        .poptitle{
            height: .5rem;
            padding-top: .3rem;
            line-height: .3rem;
            color: #ff3838;
            font-size: .24rem;
        }
        .popcontant{
            width: 4.8rem;
            margin-left: .6rem;
            margin-top: .4rem;
            background-color: #f8f8f8;
            li{
                height: .7rem;
                line-height: .7rem;
                border-bottom: 1px solid #e5e5e5;
                font-size: .16rem;
                color: #666;
                padding: 0 .2rem;
            }
        }
        .popbot{
            margin-top: .6rem;
            display: flex;
            justify-content: space-around;
            button{
                width: 1.78rem;
                height: .64rem;
                border: 1px solid #4fa2fe;
                border-radius: .16rem;
                font-weight: bold;
            }
            .confirm{
                background-color: #fff;
                color: #4fa2fe;

            }
            .cancel{
                background-color: #4fa2fe;
                color: #fff;
            }
        }
          
    }
</style>
