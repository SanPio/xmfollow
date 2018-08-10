<template>
    <div id="box">
        <div style="overflow:scroll; -webkit-overflow-scrolling: touch;background:#fff;">
            <mt-loadmore 
            :bottom-method="loadBottom" 
            :autoFill="false"
            :bottom-all-loaded="allLoaded"  
            ref="loadmore">
                <div ref="mybox">
                    <div class="acclist clearfix" v-for="(item, ind) in infoArr" :key="ind">
                        <div class="left">
                            <p class="account">
                                <span> {{ item.name}} </span>
                                <img v-if="item.audit==0" :src="correctSrc" alt="" style="width:.24rem">
                                <img v-if="item.audit==2" :src="errorSrc" alt="">
                                <img v-if="item.audit==1" :src="waitSrc" alt="" style="width:.18rem">
                            </p>
                            <p class="platform">
                                {{item.tradesvr}}
                            </p>
                        </div>
                        <div class="right">
                            <button v-if="item.audit==0" @click="toCourse(ind)">账号历程</button>
                            <button :class="{'btnBule':(item.audit==1||item.audit==2)}" @click="updateAccount(ind)" v-if="item.issimulated
==0">更新信息</button>
                            <button @click="relieve(ind)" v-if="item.issimulated==0">解除绑定</button>

                        </div>
                    </div>
                </div>  
            </mt-loadmore>
        </div>
        <div class="bottom">
            <div class="bottop">
                <button @click="addAccount">添加绑定账号</button>
            </div>
            <!-- <div class="botfoot">
                <p class="returnbtn">
                    <img :src="leftSrc" alt="">
                    <img :src="rightSrc" alt="">
                </p>
            </div> -->
        </div>

        <!-- 弹窗遮罩 -->
        <div ref="back" class="back" ></div>
        <!-- 弹窗 -->
        <div class="popup" v-if="popUpShow">
                <ul class="poptop">
                    
                    <li>
                        <span>登录账号</span>
                        <input type="text" placeholder="请输入账号" v-model="account">
                      
                    </li>
                    <li>
                        <span>登录密码</span>
                        <input type="password" placeholder="请输入密码" v-model="password">
                 
                    </li
                    ><li>
                        <span>服&nbsp;务&nbsp;器&nbsp;</span>
                        <input type="text" placeholder="请输入账号所属服务器" v-model="platform">
                        <img :src="downSrcShow?downSrc:upSrc" alt="" @click="pullList" v-if="false">
                        <ul></ul>
                    </li>
                    <!-- <li>
                        <span>账号备注</span>
                        <input type="text" placeholder="请输入备注名称" v-model="remarks">
                
                    </li> -->
                </ul>
                <div class="popbot">
                    <button class="confirm" v-if="confirmShow" @click="confirmBind">确认绑定</button>
                    <button class="confirm" v-if="!confirmShow" @click="confirmUpdate">确认更新</button>
                    <button @click="cancelBtn">取消</button>
                </div>
            </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            urlTitle: '',
            userId : 1,
            correctSrc: require('./assets/Administration-right@2x.png'),
            errorSrc: require('./assets/Administration-error@2x.png'),
            waitSrc: require('./assets/Administration-Toexamine@2x.png'),
            leftSrc: require('./assets/btn-left@2x.png'),
            rightSrc: require('./assets/btn-right@2x.png'),
            //弹窗登录平台下拉按钮
            // upSrc: require('./assets/Myhomepage-Arrow@2x.png'),
            // downSrc: require('./assets/transaction-Arrow@2x.png'),
            updataind: 0,
            platform: '',
            account: '',
            password: '',
            remarks: '',
            confirmShow:true,
            downSrcShow:true,
            popUpShow:false,
            infoArr: [],
            pageNum: 1,
            allLoaded: false,
            bindtype : 1
        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        // this.accountId = Number( JSON.parse(localStorage.getItem('accountId')));
        
        //初始化数据请求
        let postData = this.$qs.stringify({
            userId:this.userId,
            pageNum:1,
            pageSize:10
        });
        this.$http({
          method: 'post',
            url: this.urlTitle+'wx/member/accountList',
            data:postData
        }).then((res)=>{

            console.log(res)

            //结束加载图
            this.$refs.loadmore.onBottomLoaded();
            if(res.data.data.countaccountsid <= this.pageNum*10){
                    this.allLoaded = true;
            }
            var length = res.data.data.userOrderHistoryManageReponseList.length;
            for(let i = 0; i < length; i++){
                if ( res.data.data.userOrderHistoryManageReponseList[i].issimulated == 0) {
                    this.infoArr.push(res.data.data.userOrderHistoryManageReponseList[i])
                }
            }
            // this.infoArr = res.data.data.userOrderHistoryManageReponseList
            console.log(this.infoArr)   
         
        }).catch((err) => {
            console.log(err)
        });
    
    },
    mounted(){
        this.calculationHeight();
        this.calculation();
    },
    methods: {
        //设定上拉下拉区域为窗口高度
        calculationHeight(){
            let winHeight = 0;
            if (window.innerHeight){
                winHeight = window.innerHeight;
            }else if((document.body) && (document.body.clientHeight)){
                winHeight = document.body.clientHeight; 
            }
            this.$refs.mybox.style.minHeight=`${winHeight}px`
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
            this.$refs.back.style.height=`${winHeight}px`;
        },
        //上拉加载
        loadBottom(){
            console.log('上拉加载');
            this.pageNum ++ ;
            let postData = this.$qs.stringify({
                userId: this.userId,
                pageNum: this.pageNum,
                pageSize: 10
            });
            this.$http({
            method: 'post',
                url: this.urlTitle+'wx/member/accountList',
                data:postData
            }).then((res)=>{
                //结束加载图
                this.$refs.loadmore.onBottomLoaded();
                if(res.data.data.countaccountsid <= this.pageNum*10){
                    this.allLoaded = true;
                }
                console.log(res.data.data.userOrderHistoryManageReponseList);
                let resList = res.data.data.userOrderHistoryManageReponseList;
                let len = res.data.data.userOrderHistoryManageReponseList.length;
                
                for(let i = 0; i < len; i ++){
                    if(resList[i].issimulated == 0){
                        this.infoArr.push( resList[i] )
                    }
                    
                }
                //结束加载图
                this.$refs.loadmore.onBottomLoaded();

            }).catch((err) => {
                console.log(err)
            });    

        },
        //跳转到账号历程
        toCourse(ind){
            console.log('跳到账号历程')
        },
        //解除绑定
        relieve(ind){
            console.log("解除绑定 ")
            MessageBox({
                cancelButtonText:'确定',
                confirmButtonText:'取消',
                title: '解除绑定',
                message: '您是否要解除账号绑定',
                showConfirmButton:true,
                showCancelButton:true
            }).then(action => { 
                //因为按钮布局与原来Mint布局是相反的，所以回调取的也是相反
                if (action == 'cancel') {     //确认的回调     
                    let postData = this.$qs.stringify({
                        accountsid:this.infoArr[ind].accountsid,
                        userid:this.userId,
                    });
                    console.log(postData)
                    this.$http({
                    method: 'post',
                        url: this.urlTitle+'wx/member/delBindAccount',
                        data:postData
                    }).then((res)=>{
                        console.log(res)
                        window.location.reload()
                    }).catch((err) => {
                        console.log(err)
                        window.location.reload()
                    });
                    

                }
                if (action == 'confirm') {     //确认的回调
      
                }
            })



        },
        //添加绑定
        addAccount(){
            if( this.infoArr.length){
                for(let i = 0; i < this.infoArr.length; i ++){
                    console.log(this.infoArr[i].audit)
                    if(this.infoArr[i].audit == 0 &&this.infoArr[i].issimulated == 0){
                        MessageBox('提示', '您已有账号');
                        return
                    }else if(this.infoArr[i].audit == 1 &&this.infoArr[i].issimulated == 0){
                        MessageBox('提示', '您的账号正在审核，请稍后');
                        return 
                    }else if( this.infoArr[i].audit == 2 &&this.infoArr[i].issimulated == 0 ){
                        MessageBox('提示', '您的账号审核失败，请直接更新账号信息');  
                        return
                        
                    }else{
                        this.$refs.back.style.zIndex=2;
                        this.popUpShow = true;
                        this.confirmShow = true;
                        return  
                    }
                }      
            }else{
                this.$refs.back.style.zIndex=2;
                this.popUpShow = true;
                this.confirmShow = true;
            }
              
        },
        //更新绑定
        updateAccount(ind){
            //显示遮罩
            this.$refs.back.style.zIndex=2;
            this.popUpShow = true;
            this.confirmShow = false;
            this.updataind = ind;
            this.remarks = this.infoArr[ind].name
            this.platform = this.infoArr[ind].tradesvr
        },
        //弹窗点击下拉菜单
        pullList(){
            this.downSrcShow = !this.downSrcShow;
        },
        //点击弹窗确认绑定
        confirmBind(){
            //隐藏遮罩
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            let postData = this.$qs.stringify({
                userId: this.userId,
                usertradeacts: this.account,
                usertradepsd: this.password,
                usertradesvr: this.platform,
                accountnote: this.remarks
            });


            console.log(postData)
            this.$http({
            method: 'post',
                url: this.urlTitle+'wx/member/insBindAccount',
            
                data:postData
            }).then((res)=>{
                //刷新页面
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            });
        },
        //点击弹窗更新绑定
        confirmUpdate(){
            //隐藏遮罩
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            console.log('更新绑定')
            let postData = this.$qs.stringify({
                accountSid: this.infoArr[this.updataind].accountsid,
                userId: this.userId,
                usertradeacts: this.account,
                usertradepsd: this.password,
                usertradesvr: this.platform,
                accountnote: ''
            });
            this.$http({
            method: 'post',
                url: this.urlTitle+'wx/member/rebindAccount',  
                data:postData
            }).then((res)=>{
                console.log(res)
                //刷新页面
                window.location.reload();

            }).catch((err) => {
                console.log(err)
            });
        },
        //点击弹窗取消按钮
        cancelBtn(){
            //隐藏遮罩
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
        }
    }
}
</script>
<style lang="scss" scoped>
    //列表
    #box{
        background-color: #fff;
    }
    .acclist{
        padding: .28rem .24rem;
        border-bottom: 1px solid #c9c9c9;
        background-color: #fff;
        .left{
            text-align: left;
            .account{
                line-height: .36rem;
                font-size: .28rem;
                font-weight: 900;
                img{
                    width: .2rem;
                }
            }
            .platform{
                color: #4fa2fe;
                font-size: .24rem;
                margin-top: .08rem;
            }
        }
        .right{
            button{
                color: #4fa2fe;
                border:1px solid #4fa2fe;
                border-radius: .1rem;
                background: #fff; 
                padding: .12rem .2rem;
                margin-left: .06rem;
            }
            .btnBule{
                background-color: #4fa2fe;
                color:#fff;
            }
        }
    }
    //底部按钮
    .bottom{
        position: fixed;
        bottom: 0;
        background: #fff;
        width: 100%;
        .bottop{
            height:1.6rem;
            text-align: center;
            border-top: 1px solid #c9c9c9;
            button{
                background-color: #4fa2fe;
                color: #fff;
                font-weight: 900;
                font-size: .44rem;
                border: none;
                padding: .2rem;
                width: 5rem;
                border-radius: .1rem;
                margin-top: .3rem;
            }
            
        }
        .botfoot{
            height: .88rem;
            border-top: 1px solid #dbdbdb;
            p{
                margin-left: 3rem; 
                height: .88rem; 
                width: 2rem;
                display: flex;
                justify-content: space-between;
                img{
                    margin-top: .28rem;
                    height:.32rem;
                }
            }
        }
    }
    //弹窗
    .back{
        background-color:gray;
        opacity: .5;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -10;
        
    }

    .popup{
        position: absolute;
        left: .8rem;
        top: 1.6rem;
        z-index: 3;
        opacity: 1;
        padding: .28rem .3rem;
        background-color: #fff;
        border-radius: .28rem;
        .poptop{
            li{
                text-align: left;
                width: 5.1rem;
                height: .64rem;
                padding: .16rem .2rem;
                border-bottom: 1px solid #c9c9c9;
                span{
                    font-weight: 900;
                    font-size: .26rem;
                    line-height: .64rem;
                    margin-right: .2rem;
                }
                input{
                    width: 3rem;
                    height:.34rem;
                    padding-left: .2rem;
                    border: none;
                    outline: none;
                    border-left: 1px solid #e5e5e5;
                }
                img{
                    width: .32rem;
                }
            }
        }
        .popbot{
            display: flex;
            justify-content: space-around;
            button{
                width: 1.8rem;
                height: .64rem;
                font-size: .26rem;
                font-weight: 900;
                border: 1px solid #4fa2fe;
                border-radius: .1rem;
                color: #4fa2fe;
                margin-top: .4rem;
                margin-bottom: .12rem;
                background: #fff;
            }
            .confirm{
                background: #4fa2fe;
                color: #fff;
            }
        }
    }



















</style>
