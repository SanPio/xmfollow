<template>
    <div>
        <div class="accHistory">
            <dl>
                <dt>总收益</dt>
                <dd>${{info.orderprofits}}</dd>
            </dl>
            <dl>
                <dt><!-- 当前获利点数 -->待添加</dt>
                <dd>{{info.kong}}</dd>
            </dl>
            <dl>
                <dt>正在跟随</dt>
                <dd>{{infos.optionidnum}}</dd>
            </dl>
            <dl>
                <dt>浮动收益</dt>
                <dd>${{infos.nowprofits}}</dd>
            </dl>
        </div>
        <ul>                                                                                   
            <li><a>累计盈亏点数</a><span>{{info.ordersgrandpoints}}k</span></li>
            <li><a>平均获利点数</a><span>{{info.avggrandpoint}}点</span></li>
            <li><a>累计交易笔数</a><span>{{info.orderscount}}笔</span></li>
            <li><a>累计交易手数</a><span>{{info.orderslots}}标准手</span></li>
            <li><a>交易时间</a><span>{{re.weeks}}周</span></li>
        </ul>
        <button @click="tofollow(ind)">查看跟随</button>
        <!-- <div class="footer">
            
        </div> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            urlTitle:'',
            opthionId:'',
            accountid:'',
            userid:'',
            info:[],
            infos:[],
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

        var that = this
        //初始化数据请求
        this.$http.get(this.urlTitle+'wx/member/accountHistory',{
            params : {
                accountId : this.accountId,
                userId : this.userId,
                optionId : this.optionId,
            }
        }).then((res)=>{
            console.log(res)
            that.re = res.data.data
            that.info = res.data.data.accountHistoryReponse
            that.infos = res.data.data.userOrderDetailsReponse

            // console.log(info)
            if(that.info.orderprofits == null){
                that.info.orderprofits =0
            }
            if(that.info.kong == null){
                that.info.kong =0
            }
            if(that.infos.optionidnum == null){
                that.infos.optionidnum =0
            }
            if(that.infos.nowprofits == null){
                that.infos.nowprofits =0
            }
            if(that.info.ordersgrandpoints == null){
                that.info.ordersgrandpoints =0
            }
            if(that.info.orderscount == null){
                that.info.orderscount =0
            }
            if(that.info.orderslots == null){
                that.info.orderslots =0
            }
            if(that.info.avggrandpoint == null){
                that.info.avggrandpoint =0
            }
            
        }).catch((err)=>{
            console.log(err)
        })
    },
    methods:{
        //跳转到跟随设置页面
        tofollow(ind){   
            window.location.href="followmange.html";
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
    .accHistory{
        width: 7rem;
        height: 3.16rem;
        background: url("./assets/course-bg.png");
        background-size: 100% 100%;
        margin: 0.58rem auto 0;
        
        dl:nth-of-type(1){
            width: 3.37rem;
            height: 1.45rem;
            float: left;
            padding: 0.06rem 0 0 0.06rem;
            dt{
                color: white;
                font-size: 0.3rem;
                margin-top: 0.3rem;
            }
            dd{
               color: white; 
               font-size: 0.36rem;
               margin-top: 0.1rem;
            }
        }
        dl:nth-of-type(2){
            width: 3.37rem;
            height: 1.45rem;
            float: left;
            padding: 0.06rem 0 0 0.06rem;
            dt{
                color: white;
                font-size: 0.3rem;
                margin-top: 0.3rem;
            }
            dd{
               color: white; 
               font-size: 0.36rem;
               margin-top: 0.1rem;
            }
        }
        dl:nth-of-type(3){
            width: 3.37rem;
            height: 1.45rem;
            float: left;
            padding: 0 0 0.06rem 0.06rem;
            dt{
                color: white;
                font-size: 0.3rem;
                margin-top: 0.3rem;
            }
            dd{
               color: white; 
               font-size: 0.36rem;
               margin-top: 0.1rem;
            }
        }
        dl:nth-of-type(4){
            width: 3.37rem;
            height: 1.45rem;
            float: left;
            padding: 0 0 0 0.06rem;
            dt{
                color: white;
                font-size: 0.3rem;
                margin-top: 0.3rem;
            }
            dd{
               color: white;
               font-size: 0.36rem; 
               margin-top: 0.1rem;
            }
        }
        
    }
    ul{
        margin-top: 0.66rem;
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
    .footer{
        width: 100%;
        height: 0.88rem;
        margin-top: 3.8rem;
        border-top:0.01rem solid  #c9c9c9;
    }
</style>


