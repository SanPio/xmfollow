
<template>
    <div id="box">
        <div class="img">
            <img src="./assets/share.jpg" alt="">
            <div class="header">
                <h2>小铭跟单</h2>
                <p>跟随交易大咖一起赚</p>
            </div>
            <div class="boxs">
                <div class="title">
                    <div class="img fl" v-if="headImg"><img :src="headImg" alt=""></div>
                    <div class="img fl" v-if="!headImg"><img src="./assets/logo.png" alt=""></div>
                    <div class="name fl">{{info.nickName}}</div>
                </div>
                <p>我在小铭跟单<span>{{info.date}},</span></p>
                <p>历史累计收益<small>{{info.sumProfits | numPuls}}美金，</small></p>
                <p>累计跟随<span>{{info.sumFollow | numPuls}}单，</span></p>
                <!-- <p>历史连续获利<span>{{info.continuousProfit}}单，</span></p> -->
                <p>单笔最大盈利<small>{{info.maxProfit | numPuls}}美金，</small></p>
                <p>——</p>
                <p>简直没有比这更简单的收益了！</p>
            </div>
            <div class="share">
                <div class="coin">
                    <img :src="invitQRCode" alt="">
                    <span>注册送新手大礼包</span>
                    <span>(价值998元)</span>
                </div>
                <p>好东西就要懂得分享！</p>               
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                invitQRCode : "",
                headImg:'',
                info:[]
            }
        },
        created(){
            this.userId = localStorage.getItem('userId');
            this.urlTitle = localStorage.getItem('urlTitle');
            let postData = this.$qs.stringify({
                userId : this.userId
            })
            this.$http({
                method:'post',
                url: this.urlTitle +'wx/userinfo/share',
                data: postData 
            }).then((res)=>{
                console.log(res)
                this.invitQRCode = res.data.data.data.invitQRCode;
                this.headImg = res.data.data.data.headImg;
                this.info = res.data.data.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        filters: {
            numPuls(val){
                if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                    return parseInt( val / 10000 ) / 100 + 'M'
                }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                    return parseInt( val / 10 ) / 100 + 'K'
                }else{
                    return val
                }    
            }
        },
        method:{

        }
    }
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: "黑体";
    }
    html{
        background-color: green;
        width: 100vw;
        height: 100vh;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    #box{
        width: 100%;
        -webkit-width: 100%;
        height: 100%;
        -webkit-height: 100%;
        // background: url("./assets/share.jpg");
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        background-size: 100%;
        -webkit-background-size: 100%;
        overflow: hidden;
        position: relative;
        .header{
            width: 5.9rem;
            margin: 0 auto;
            overflow: hidden;
            position: absolute;
            top: 0.8rem;
            left: 0.9rem;
            color: white;
            h2{
                font-size: 0.48rem;
                font-family: "黑体";
                font-weight: bold;
            }
            p{
                font-size: 0.26rem;
                // font-weight: bold;
                letter-spacing: 0.22rem;
                padding: 0.1rem 0 0 0;
            }
        }
        .boxs{
            width: 5.88rem;
            position: absolute;
            top: 2rem;
            left: 0.8rem;
            .title{
                overflow: hidden;   
                margin-bottom: 0.26rem;             
                .img{
                    width: 0.86rem;
                    height: 0.86rem;
                    background-color: blue;
                    border-radius: 50%;
                    margin-top: 0.4rem;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    font-size: 0.3rem;
                    color: white;
                    line-height: 0.86rem;
                    margin-top: 0.4rem;
                    margin-left: 0.2rem;
                }
            }
            >p{
                color: white;
                text-align: left;
                font-size: 0.24rem;
                padding: 0 0 0 0.16rem;
                line-height: 0.54rem;
                letter-spacing: 0.02rem;
                span{
                    font-size: 0.34rem;
                    padding:  0 0 0 0.15rem;
                }
                small{
                    font-size: 0.56rem;
                    font-family: "黑体";
                    font-weight: bold;
                    padding:  0 0 0 0.15rem;
                }
            }
            >p:nth-of-type(5){
                font-size: 0.34rem;
                font-family: "黑体";
                font-weight: bold;
            }
            >p:nth-of-type(6){
                font-size: 0.34rem;
                font-family: "黑体";
                font-weight: bold;
                letter-spacing: 0.02rem;
            }            
        }
        .share{
            width: 6rem;
            overflow: hidden;
            position: absolute;
            bottom: 0.8rem;
            left: 0.8rem;
            text-align: left;
            .coin{
                width: 2.3rem;
                text-align: center;
                img{
                    display: block;
                    width: 1.36rem;
                    height: 1.36rem;
                    background-color: white;
                    margin: 0 auto;
                }
                span{
                    display: block;
                    color: white;
                    font-size: 0.2rem;
                    line-height: 0.4rem;
                }
            }
            
            p{
                font-size: 0.34rem;
                color: white;
                margin-top: 0.2rem;
                // padding: 0 0 0 0.16rem;
                font-weight: bold;
                letter-spacing: 0.06rem;
            }
        }
    }
    .img{
        width: 100%;
        height: 100%;
        img{
            // width: 100%;
            // height: 100%;
            display: block;
            height: 100vh;
            width: 100vw;
        }
    }
</style>
