<template>
    <div v-if="boxShow">
        <div class="accHistory">
            <div class="left fl">
                <div class="left-icon" v-if="info">${{info.orderprofits | numPuls }}</div>
                <div class="left-icon" v-else>0</div>
                <p>总收益</p>
            </div>
            <div class="center fl">
                <div class="center-icon" v-if="info.optionidnum">{{info.optionidnum | numPuls }}人</div>
                <div class="center-icon" v-if="!info.optionidnum">0人</div>
                <p>正在跟随</p>
            </div>
            <div class="right fl">
                <div class="right-icon" v-if="info.nowprofits">${{info.nowprofits | numPuls }}</div>
                <div class="right-icon" v-if="!info.nowprofits">0</div>
                <p>浮动收益</p>
            </div>
            
        </div>
        <ul>                                                                                   
            <li><a>累计交易笔数</a><span v-if="info">{{info.orderscount | numPuls }}笔</span><span v-else>0笔</span></li>
            <li><a>累计交易手数</a><span v-if="info">{{info.orderslots | numPuls }}标准手</span><span v-else>0标准手</span></li>
            <li><a>交易时间</a><span>{{info.weeks | numPuls }}周</span></li>
        </ul>
        <button @click="tofollow(ind)">查看跟随</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            boxShow:false,
            urlTitle:'',
            opthionId:'',
            accountid:'',
            userid:'',
            info:[],
            // infos:[],
            re:[]
            
        }
    },

    created(){
        let haveiss = sessionStorage.getItem('iss');
        if(haveiss==1){
            document.title='账号历程(模拟)';
            this.iss = haveiss
        }else{
            document.title = '账号历程';
            this.iss = ''
        }

        var a = this.GetRequest();
        this.opthionId = a['optionId'] ? a['optionId'] : 0;
        this.urlTitle = localStorage.getItem('urlTitle');
        this.accountId = localStorage.getItem('accountId');
        this.userId = localStorage.getItem('userId');
        // console.log(this.accountId)
        // console.log(this.userId)

        //初始化数据请求
        this.$http.get(this.urlTitle+'wx/member/accountHistory',{
            params : {
                accountId : this.accountId,
                userId : this.userId,
                optionId : this.optionId,
            }
        }).then((res)=>{
            console.log(res)
            this.info = res.data.data
            // this.info = res.data.data.accountHistoryReponse
            // this.infos = res.data.data.userOrderDetailsReponse
            this.boxShow = true
            
        }).catch((err)=>{
            console.log(err)
        })


        
    },
    filters: {
        numPuls(val){
            if( parseFloat( val ) >=1000000000 || parseFloat( val ) <= -1000000000 ){
                return parseInt( val / 10000000 ) / 100 + 'B'
            }else if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                return parseInt( val / 10000 ) / 100 + 'M'
            }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                return parseInt( val / 10 ) / 100 + 'K'
            }else{
                return val
            }    
        }
    },
    methods:{
        //跳转到跟随管理页面
        tofollow(ind){   
            
            window.location.href=`followmange.html?accountsid=${localStorage.accountId}`;
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
    *{
        margin: 0;
        padding: 0;
        font-family: "微软雅黑";
        
    }
    a{
        text-decoration: none;
    }
    .fl{
        float: left;
    }
    .accHistory{
        margin-top: 0.48rem;
        overflow: hidden;
        p{
            font-size: 0.3rem;
            color: #666666;
        }
    }
    .left,.center,.right{
        width: 33.33%;
        height: 2.1rem;
    }
    .left-icon{
        width: 1.7rem;
        height: 1.71rem;
        font-size: 0.32rem;
        color: white;
        line-height: 1.71rem;
        background: url("./assets/course-icon1.png");
        background-size: 100%;
        margin-left: 0.4rem;
        background-repeat: no-repeat;
    }
    .center-icon{
        width: 1.7rem;
        height: 1.71rem;
        font-size: 0.32rem;
        color: white;
        line-height: 1.71rem;
        background: url("./assets/course-icon2.png");
        background-size: 100%;
        margin-left: 0.4rem;
        background-repeat: no-repeat;
    }
    .right-icon{
        width: 1.7rem;
        height: 1.71rem;
        font-size: 0.32rem;
        color: white;
        line-height: 1.71rem;
        background: url("./assets/course-icon3.png");
        background-size: 100%;
        margin-left: 0.4rem;
        background-repeat: no-repeat;
    }
    ul{
        margin-top: 0.8rem;
        li{
            border-bottom: 1px solid #c9c9c9;
            width: 100%;
            height: 0.72rem;
            line-height: 0.72rem;
            overflow: hidden;
            a{
                display: block;
                text-align: left;
                float: left;
                padding: 0 0 0 0.56rem;
                color: #333333;
                font-size: 0.26rem;
                width: 2.36rem;
                height: 0.32rem;
                line-height: 0.32rem;
                margin-top: 0.2rem;
                border-right:0.01rem solid #c9c9c9; 
            }
            span{
                display: block;
                text-align: right;
                float: right;
                padding: 0 0.56rem 0 0;
                font-size: 0.24rem;
                color: #333333;
                // color: #1c1c1c;
                font-weight: bold;
            }
        }
    }
    button{
        width: 1.8rem;
        height: 0.64rem;
        border: 1px solid #4fa2fe;
        background-color: white;
        color: #4fa2fe;
        font-size: 0.28rem;
        margin-top: 0.4rem;
        font-weight: bold;
        border-radius: 0.1rem;
    }
    
</style>


