<template>
    <div id="box">
        <div style="overflow-y: scroll;background:#fff;">
            <mt-loadmore 
            :top-method="loadTop"
            :bottom-method="loadBottom" 
            :autoFill="false"  
            ref="loadmore">
                <div ref="mybox">
                    <div class="acclist clearfix" v-for="(item, ind) in infoArr" :key="ind">
                        <div class="left">
                            <p class="account">
                                <span> {{ item.account}} </span>
                                <img v-if="item.state==0" :src="correctSrc" alt="" style="width:12px">
                                <img v-if="item.state==1" :src="errorSrc" alt="">
                                <img v-if="item.state==2" :src="waitSrc" alt="" style="width:9px">
                            </p>
                            <p class="platform">
                                登录交易平台名称
                            </p>
                        </div>
                        <div class="right">
                            <button v-if="item.state==0" @click="toCourse(ind)">账号历程</button>
                            <button :class="{'btnBule':item.state==1||2}" @click="updateAccount(ind)">更新信息</button>
                            <button @click="relieve">解除绑定</button>
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





        <!-- 弹窗 -->
        <div ref="back" class="back" ></div>
            
            
        
        <div class="popup" v-if="popUpShow">
                <ul class="poptop">
                    <li>
                        <span>登录平台</span>
                        <input type="text" placeholder="请输入账号" >
                        <img :src="downSrcShow?downSrc:upSrc" alt="" @click="pullList" v-if="false">
                        <ul></ul>
                    </li>
                    <li>
                        <span>登录账号</span>
                        <input type="text" placeholder="请输入账号">
                      
                    </li>
                    <li>
                        <span>登录密码</span>
                        <input type="password" placeholder="请输入密码">
                 
                    </li>
                    <li>
                        <span>账号备注</span>
                        <input type="text" placeholder="请输入备注名称">
                
                    </li>
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
export default {
    name: 'App', 
    data(){
        return {
            correctSrc: require('./assets/Administration-right@2x.png'),
            errorSrc: require('./assets/Administration-error@2x.png'),
            waitSrc: require('./assets/Administration-Toexamine@2x.png'),
            leftSrc: require('./assets/btn-left@2x.png'),
            rightSrc: require('./assets/btn-right@2x.png'),
            //弹窗登录平台下拉按钮
            // upSrc: require('./assets/Myhomepage-Arrow@2x.png'),
            // downSrc: require('./assets/transaction-Arrow@2x.png'),
            confirmShow:true,
            downSrcShow:true,
            popUpShow:false,
            infoArr: [
                {
                    account: '账号名称001',
                    platform: '登录交易平台名称',
                    state:0
                },
                {
                    account: '账号名称001',
                    platform: '登录交易平台名称',
                    state:1
                },
                {
                    account: '账号名称001',
                    platform: '登录交易平台名称',
                    state:2
                },
                {
                    account: '账号名称001',
                    platform: '登录交易平台名称',
                    state:0
                },
                {
                    account: '账号名称001',
                    platform: '登录交易平台名称',
                    state:1
                },
                {
                    account: '账号名称001',
                    platform: '登录交易平台名称',
                    state:2
                }
            ],
        }
    },
    // created(){
    //     //初始化数据请求
    //     this.$http.post('',{    
    //         name:"virus"  
    //     }).then(function(res){
    //         // console.log(res)
    //     }).catch(function(err){
        
    //         // console.log(err)
    //     })
    // },
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



        //下拉刷新
        loadTop(){
            console.log('下拉刷新')
        },
        //上拉加载
        loadBottom(){
            console.log('上拉加载');
            this.infoArr.push({'account': '账号名称001', 'platform': '登录交易平台名称','state':0})
        },
        //跳转到账号历程
        toCourse(ind){
            console.log('跳到账号历程')
        },
        //解除绑定
        relieve(){
            console.log("解除绑定 ")
        },
        //添加绑定
        addAccount(){
            //显示遮罩
            this.$refs.back.style.zIndex=2;
            this.popUpShow = true;
            this.confirmShow = true;
        },
        //更新绑定
        updateAccount(ind){
            //显示遮罩
            this.$refs.back.style.zIndex=2;
            this.popUpShow = true;
            this.confirmShow = false;
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
            console.log("确认绑定")
        },
        //点击弹窗更新绑定
        confirmUpdate(){
            //隐藏遮罩
            this.$refs.back.style.zIndex=-10;
            this.popUpShow = false;
            console.log('更新绑定')
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
    .acclist{
        padding: 14px .24rem;
        border-bottom: 1px solid #c9c9c9;
        background-color: #fff;
        .left{
            text-align: left;
            .account{
                line-height: 18px;
                font-size: 14px;
                font-weight: 900;
                img{
                    width: 10px;
                }
            }
            .platform{
                color: #4fa2fe;
                font-size: 12px;
                margin-top: 4px;
            }
        }
        .right{
            button{
                color: #4fa2fe;
                border:1px solid #4fa2fe;
                border-radius: 6px;
                background: #fff; 
                padding: 6px .2rem;
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
            height:80px;
            text-align: center;
            border-top: 1px solid #c9c9c9;
            button{
                background-color: #fff;
                color: #4fa2fe;
                font-weight: 900;
                font-size: 22px;
                border: none;
                line-height: 80px;
            }
            
        }
        .botfoot{
            height: 44px;
            border-top: 1px solid #dbdbdb;
            p{
                margin-left: 3rem; 
                height: 44px; 
                width: 2rem;
                display: flex;
                justify-content: space-between;
                img{
                    margin-top: 14px;
                    height:16px;
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
        top: 80px;
        z-index: 3;
        opacity: 1;
        padding: 14px .3rem;
        background-color: #fff;
        border-radius: 14px;
        .poptop{
            li{
                text-align: left;
                width: 5.1rem;
                height: 32px;
                padding: 8px .2rem;
                border-bottom: 1px solid #c9c9c9;
                span{
                    font-weight: 900;
                    font-size: 13px;
                    line-height: 32px;
                    margin-right: .2rem;
                }
                input{
                    width: 3rem;
                    height:17px;
                    padding-left: .2rem;
                    border: none;
                    outline: none;
                    border-left: 1px solid #e5e5e5;
                }
                img{
                    width: 16px;
                }
            }
        }
        .popbot{
            display: flex;
            justify-content: space-around;
            button{
                width: 1.8rem;
                height: 32px;
                font-size: 13px;
                font-weight: 900;
                border: 1px solid #4fa2fe;
                border-radius: 6px;
                color: #4fa2fe;
                margin-top: 20px;
                margin-bottom: 6px;
                background: #fff;
            }
            .confirm{
                background: #4fa2fe;
                color: #fff;
            }
        }
    }



















</style>
