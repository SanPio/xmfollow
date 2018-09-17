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
                            <!-- <button @click="allClose">一键平仓</button>
                            <button v-if="stopOn" @click="stopClick">暂停开仓</button>
                            <button class="openbtn" v-if="!stopOn" @click="goOn">继续开仓</button> -->
                            <button @click="closeThis(-1)">一键平仓</button>
                            <button v-if="stopOn" @click="boxMsg">暂停开仓</button>
                            <button class="openbtn" v-if="!stopOn" @click="boxMsg">继续开仓</button>
                        </p>
                </div>
                <!-- 正在跟随列表 -->
                <div style="overflow:scroll; -webkit-overflow-scrolling: touch;margin-top:125px;">
                    <mt-loadmore 
                    :bottom-method="loadBottom" 
                    :bottom-all-loaded="nowallLoaded"
                    :autoFill="false" ref="loadmores">
                        <div class="nowlist" v-for="(item, ind) in nowArr" :key="ind">

                            <div class="litop clearfix" @click="listShow(ind)">
                                <div class="left lileft">
                                    <!-- <img :src="item.headImg" alt=""> -->
                                    <img :src="userImgSrc" alt="">
                                </div>
                                <div class="left licenter">
                                    <p class="name">
                                         {{ item.signalName }} 
                                    </p>
                                    <p class="flownum">
                                        <span v-if="item.lotsType == 1">按比例&nbsp;{{ item.lots }}倍</span>
                                        <span v-if="item.lotsType == 0">按手数&nbsp;{{ item.lots }}手</span>
                                    </p>
                                </div>
                                <div class="right liright">
                                    <!-- 判断当前持仓是否为0 为0则显示没有持仓 -->
                                    <p v-if="item.optiondetail!=0">
                                        <span>当前持仓</span>
                                        <span class="hold">
                                            {{ item.optiondetail | numPuls}}
                                        </span>
                                    </p>
                                    <p v-else>
                                        <span>当前持仓</span>
                                        <span class="hold">
                                            没有持仓
                                        </span>
                                    </p>
                                    <p  v-if="item.nowProfits!=0">
                                        <span>当前浮亏</span>
                                        <span :class="item.nowProfits >= 0 ? 'profit-blue' : 'profit-red' ">
                                            $ {{ item.nowProfits | numPuls}}
                                        </span>
                                    </p>
                                    <p v-else>
                                        <span>当前浮亏</span>
                                        <span :class="item.nowProfits >= 0 ? 'profit-blue' : 'profit-red' ">
                                            没有持仓
                                        </span>
                                    </p>
                                </div>
                                
                            </div>
                            <p class="libot" v-if="nowOpen[ind]">
                                <!-- 1.0版本不用 -->
                                <!-- <button @click="closeThis(ind)">一键平仓</button>
                                <button>订单管理</button>
                                <button @click="toFollowSetting(ind)">跟随设置</button> -->
                                <button @click="closeThis(ind)">一键平仓</button>
                                <button @click="toOrder(ind)">订单管理</button>
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
                 <div style="overflow:scroll; -webkit-overflow-scrolling: touch">
                    <mt-loadmore 
                    :bottom-method="hisloadBottom"
                    :bottom-all-loaded="hisallLoaded" 
                    :autoFill="false" ref="loadmore">


                    <!-- 记录列表 -->
                    <div class="recordlist" v-for="(item, ind) in recordList" :key="ind">


                        <!-- 记录标题 -->
                        <div class="listtop">
                            <div class="left listleft">
                                <img :src="userImgSrc" alt="">
                            </div>
                            <div class="left listcenter">
                                <p class="name">
                                    {{ item.name }}
                                </p>
                                <p class="flownum">
                                    <span v-if="item.lotsType == 1">按比例&nbsp;{{ item.lots }}倍</span>
                                    <span v-if="item.lotsType == 0">按手数&nbsp;{{ item.lots }}手</span>
                                </p>
                            </div>
                            <div class="right listright">
                                <p>
                                    <span>累计获利</span>
                                    <span :class="item.yingli>0 ? 'profit-blue' : 'profit-red'">${{ item.yingli }}</span>
                                </p>
                                <p>
                                    <span>累计跟单数量</span>
                                    <span> {{ item.countlishi }} </span>
                                </p>
                            </div>
                        </div>
                        <!-- 记录内容 -->
                        <!-- <div class="listbot clearfix" v-if="recordOpen[ind]"> -->
                            <!-- <div class="listbot-left left">
                                <p>
                                    <span>当前跟单数量</span>
                                    <span> {{ item.countoptionid }}</span>
                                </p>
                                <p>
                                    <span>当前获利</span>
                                    <span>${{ item.leiji }}</span>
                                </p>
                                <p>
                                    <span>开始跟随时间</span>
                                    <span>2018-01-13</span>
                                </p>
                            </div> -->
                            <!-- <div class="listbot-right right">
                                <p>
                                    <span>累计跟单数量</span>
                                    <span> {{ item.countlishi }} </span>
                                </p>
                                <p>
                                    <span>累计获利</span>
                                    <span>$ {{ item.yingli }} </span>
                                </p>
                            </div>
                        </div> -->
                    </div>
                    </mt-loadmore>
                </div>    
            </mt-tab-container-item>
        </mt-tab-container>

        <!-- 底部返回 -->
        <ul class="footer">
                <li class="foot-left">
                    <dl @click="toIndex">
                        
                        <dt>
                            <img :src="leftBtnSrc" alt="">
                        </dt>
                        <dd >投资领航</dd>
                    </dl>
                </li>
            <li class="foot-right">
                <dl>
                    <dt>
                        <img :src="rightBtnSrc" alt="" @click="toMine">
                    </dt>
                    <dd  @click="toMine">我的</dd>
                </dl>
            </li>
        </ul>
        <!-- 次div为空，做占位用，返回按钮占56px高度 -->
        <div style="height:1.12rem"></div>
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
            nowTotal: 0,
            recordTotal: 0,
            num : 0.05,
            userImgSrc: require('./assets/Head-portrait.jpg'),
            leftBtnSrc : require('./assets/Navigate-Unclicked.jpg') ,
            rightBtnSrc : require('./assets/Myhomepage-Unclicked@2x.png') ,
            stopOn: true,
            //正在跟随获利为正
            profit: true,
            nowArr:[],
            nowOpen: [false,false],
            // 跟随记录
            hisProfit: false,
            recordList:[],
            recordOpen: [false,false],
            urlTitle:"",
            userId: 1,
            accountId: 1,
            nowPageNum: 1,
            hisPageNum: 1,
            nowallLoaded: false,
            hisallLoaded: false,
            iss: ''
        }
    },
    created(){
        let haveiss = sessionStorage.getItem('iss');
        if(haveiss == 1){
            document.title = '跟随管理(模拟)';
            this.iss = haveiss
        }else{
            document.title = '跟随管理';
            this.iss = ''
        }
        var a=this.GetRequest();
        var index_1=a['accountsid'];
        this.accountId = index_1;
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId') ;
        // this.accountId = localStorage.getItem('accountId');
        //初始化数据请求
                //正在跟随初始化
        this.$http.get(this.urlTitle+'wx/order/member/followingList',{ 
            params : {
                accountsId : this.accountId, 
                userId : this.userId,
                pageNum: 1,
                pageSize: 10,
                iss : this.iss
            }   
        }).then((res) => { 
            // console.log(res.data.data.followedReCordRespDtoList)
            // console.log(this.nowArr)
            //结束加载图
            console.log(res)
            this.$refs.loadmores.onBottomLoaded(); 
            if (res.data.data.sumoptionid <= 10) {
                this.nowallLoaded = true;
            } 
            this.nowArr = res.data.data.followedReCordRespDtoList;
      
            console.log(this.nowArr)
            if(res.data.data.sumoptionid){
                this.nowTotal = res.data.data.sumoptionid
            }
            
        }).catch((err) => {
            console.log(err)
        });
        
                //跟随记录初始化
            
        this .$http.get(this.urlTitle+'wx/order/member/followHistoryList',{ 
            params : {
                accountSid : this.accountId, 
                pageNum: 1,
                pageSize: 10,
                userId : this.userId,
                iss : this.iss
            }   
        }).then((res) => { 
            console.log(res)
            //结束加载图
            this.$refs.loadmore.onBottomLoaded();
            if(res.data.data.countoptionids <= 10){
                this.hisallLoaded = true;
            }
            if(res.data.data.countoptionids){
                this.recordTotal = res.data.data.countoptionids
            }
            this.recordList = res.data.data.followedReCordRespDtoList;
        }).catch((err) => {
            console.log(err)
        });
    },
    filters: {
        numPuls(val){
            if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                return parseInt( parseFloat( val ) / 100000 ) / 100 + 'M'
            }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                return parseInt( parseFloat( val ) / 10 ) / 100 + 'K'
            }else{
                return val
            } 
        }
    },
    methods: {
        //1.0版本弹出建设中
        boxMsg(){
            MessageBox('提示', '建设中');
        },
        //正在跟随上拉加载
        loadBottom(){
            this.nowPageNum ++ ;
                   //正在跟随初始化
            this.$http.get(this.urlTitle+'wx/order/member/followingList',{ 
                params : {
                    accountsId : this.accountId, 
                    userId : this.userId,
                    pageNum: this.nowPageNum,
                    pageSize: 10,
                    iss : this.iss
                }   
            }).then((res) => { 
                //结束加载图
                this.$refs.loadmores.onBottomLoaded();
                if (res.data.data.sumoptionid <= this.nowPageNum*10) {
                    this.nowallLoaded = true;
                } 
                this.nowArr = this.nowArr.concat( res.data.data.followedReCordRespDtoList );
            }).catch((err) => {
                console.log(err)
            });
            
            console.log('上拉加载')

        },
        //跟随记录上拉加载
        hisloadBottom(){
            this.hisPageNum ++;
            this.$http.get(this.urlTitle+'wx/order/member/followHistoryList',{ 
            params : {
                accountSid : this.accountId, 
                pageNum: this.hisPageNum,
                pageSize: 10,
                userId : this.userId,
                iss: this.iss
            }   
        }).then((res) => { 
            this.$refs.loadmore.onBottomLoaded();
            if(res.data.data.countoptionids <= this.hisPageNum *10){
                this.hisallLoaded = true;
            }
            this.recordList =this.recordList.concat(  res.data.data.followedReCordRespDtoList );
        }).catch((err) => {
            console.log(err)
        });
            
            // console.log('上拉加载')

        },
        //正在跟随点击展开
        listShow(ind){
            if( this.nowOpen[ind] == true ) {
                this.$set(this.nowOpen,ind,false)
            }else {
                for(var i = 0; i < this.nowOpen.length; i++){
                    this.$set(this.nowOpen,i,false)
                }
                this.$set(this.nowOpen,ind,!this.nowOpen[ind])
            }
        },
        
        //暂停开仓
        stopClick(){
            this.stopOn = !this.stopOn;
        },
        //继续开仓
        goOn(){
            this.stopOn = !this.stopOn;
        },
         //平仓
        closeThis(ind){
            var optionid = '';
            var msg = ''
            if( ind == -1){
                optionid = '';
                msg = '您是否确定平掉所有正在持仓？';
            }else {
                optionid = this.nowArr[ind].optionId;
                msg = '您是否确定平掉此信号源的持仓？';
            }
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '平仓管理',
                message: msg,
                showConfirmButton:true,
                showCancelButton:true
            }).then(action => { 
                //因为按钮布局与原来Mint布局是相反的，所以回调取的也是相反
                if (action == 'cancel') {     //确认的回调
                    let postData = this.$qs.stringify({
                        accountId: this.accountId,
                        optionId: optionid,
                        type : 0,
                        userId : this.userId,
                    });
                    console.log(postData)
                    this.$http({
                        method: 'post',
                        url: this.urlTitle+'wx/order/member/followStop',
                        data:postData
                    }).then((res)=>{
                        console.log(res)
                        console.log(res.data.success)
                        if(res.data.success == true){                            
                            MessageBox('提示', '平仓成功');
                        }else{
                            MessageBox('提示', '平仓失败');
                        }
                    }).catch((err) => {
                    
                    });
                }
                if (action == 'confirm') {     //确认的回调
                console.log(2); 
                }
            })
        },
        toFollowSetting(ind){
            window.location.href=`followsetting.html?optionId=${this.nowArr[ind].optionId}`;
        },
        toOrder(ind){
            window.location.href=`order.html?optionId=${this.nowArr[ind].optionId}`;
        },

        //跟随记录
        recordListShow(ind){
            if ( this.recordOpen[ind] == true ) {
                this.$set(this.recordOpen,ind,false);
            }else {
                for(var i = 0; i < this.recordOpen.length; i++){
                    this.$set(this.recordOpen,i,false);
                }
                this.$set(this.recordOpen,ind,!this.recordOpen[ind]);
            }
            
        },
        //返回到index主页（交易领航）
        toIndex(){
                window.location.href=`index.html`;
        },
        toMine(){
            window.location.href="mine.html";
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
                width: 3rem;
                p{
                    display: flex;
                    justify-content: space-between;
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
                    margin-top: .45rem;
                }
                .flownum{
                    font-size: .2rem;
                    margin-top: .08rem;
                    line-height: .2rem;
                }
            }
            .listright{
                width: 3rem;
                p{
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    font-size: .2rem;
                    line-height: .32rem;
                    margin-top: .2rem;
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
    //底部导航按钮
    .footer{
        width: 100%;
        height: 1rem;
        padding-top: .12rem;
        background-color:#ffffff;
        position: fixed;
        bottom:0;
        display: flex;
        justify-content: space-around;
        font-size: .2rem;
        dl{
            width: 1rem;
            text-align: center;
            color:#999999;
            .foot-click{
            color:#4fa2fe;
            }
        }
        img{
            width: .44rem;
            height: .44rem;
            margin-bottom: .04rem;
        }
    }




















</style>
