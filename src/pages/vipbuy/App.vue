<template>
    <div>
       <p id="title">
           购买会员
       </p>
       <ul id="content">
           <li v-for="(item,ind) in conTitle" :key="item">
                <p class="con-title">
                   {{ item }}
                </p>
                <p v-if="ind==0" class="con-type">
                    <button v-for="(val, index) in btnList" :key="index" :class="{'btn-clicked':index==btnClickedIndex}"  @click="btnClicked(index)">{{ val }}</button>
                </p>
                <p v-if="ind==1" class="con-time">
                    <input type="number" name="" id="" v-model="num"  @keyup="choseNum">
                    <span>{{monOrYear[btnClickedIndex]}}</span>
                </p>
                <p v-if="ind==2" class="con-money">
                    <span class="con-money-num">{{money}}</span>
                    <span>元</span>
                </p>
           </li>
       </ul>
       <p id="bottom">
           <button @click="vipPay">微信购买</button>
       </p>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            conTitle : ['付费模式','付费时长','应付金额'],
            btnList : ['按月付费','按年付费'],
            btnClickedIndex : 0,
            monOrYear : ['月','年'],
            num: 1,
            money : 598,
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
    methods: {
        btnClicked(index){
            //判断当前选择月还是年 
            this.btnClickedIndex = index;
            //切换年和月时初始化num
            this.num = 1;
            this.choseNum()
        },
        //根据付费时长计算应付金额
        choseNum(){
           console.log(this.num)
            if(this.btnClickedIndex==0){
                this.money = this.num * 598;//当选择为月时
            }else if(this.btnClickedIndex==1){
                this.money = this.num * 998;//当选择为年时
            }
        },
        //点击购买
        vipPay(){
            if(this.num != 0){
                //调用微信支付接口
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    #title{
        height: 2.68rem;
        color: #4fa2fe;
        line-height: 2.68rem;
        text-align: center;
        font-size: .44rem;
        font-weight: 900;
    }
    #content{
        font-size: .28rem;
        font-weight: 900;
        color: #333333;
        padding: 0 .5rem;
        li{
            height: .96rem;
            line-height: .96rem;
            padding: 0 .2rem;
            display: flex;
            .con-title{
                margin-right: .52rem;
            }
            .con-type{
                button{
                    width: 1.38rem;
                    height: .52rem;
                    color: #4fa2fe;
                    border: 1px solid #4fa2fe;
                    margin-right: .4rem;
                    background-color: #fff;
                    outline:none;
                    border-radius: .1rem;
                    font-size: .24rem;
                }
                .btn-clicked{
                    color: #fff;
                    background-color:#4fa2fe;
                }
            }
            .con-time{
                input{
                    outline:none;
                    width: 1.38rem;
                    height: .52rem;
                    border: 1px solid #e5e5e5;
                    border-radius: .1rem;
                    text-align: center;
                }
                span{
                    font-size: .24rem;
                    color: #999999;
                    margin-left: .2rem;
                }
            }
            .con-money{
                .con-money-num{
                    color: #ff7c2b;
                }
            }         
        }
        li:nth-of-type(2){
            border-top: 1px solid #c9c9c9;
            border-bottom: 1px solid #c9c9c9;
        }
    }
    #bottom{
        margin-top: 3rem;
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
