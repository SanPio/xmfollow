<template>
    <div id="box">
     
        <mt-navbar v-model="selected" :fixed='fixed'>
            <mt-tab-item id="not_use">未使用（{{ notUse }}）</mt-tab-item>
            <mt-tab-item id="already_use">已使用（{{ alreadyUse }}）</mt-tab-item>
        </mt-navbar>
         <mt-tab-container v-model="selected">
             <!-- 未使用 -->
            <mt-tab-container-item id="not_use">
                <div style="height: .9rem;background:#fff"></div>
                <div class="header">
                    优惠券不可叠加，每次只能使用一张
                </div>
                <div class="contant" style="padding-top:0">
                    <!-- <p class="nav">
                        <input type="number" v-model="invitCode">
                        <button>
                            兑换
                        </button>
                    </p> -->
                    <ul class="card_box" v-if="notUseList.length">
                        <li v-for="(item, index) in notUseList" :key="index">
                                <!-- 打折即将失效 -->
                            <div class="card" v-if="item.type == 2 && item.status == 4 ">
                                <img :src="disWill" alt="">
                                <p class="card_left">
                                    <span class="discount_num" > 
                                        {{ item.value * 10 }}
                                    </span>
                                    <span class="discount_text"> 
                                        折 
                                    </span>
                                </p>
                                <div class="card_right">
                                    <p class="card_type">
                                        VIP折扣券
                                    </p>
                                    <p class="use_card">
                                        <button @click="toVip">
                                            去使用
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>  
                                <!-- 满减即将失效 --> 
                            <div class="card" v-if="item.type == 1 && item.status == 4 ">
                                <img :src="fullWill" alt="">
                                <p class="card_left">
                                    <span class="discount_text"> 
                                        ￥
                                    </span>
                                    <span class="discount_num"> 
                                        {{ item.value }}
                                    </span>   
                                </p>
                                <div class="full_card_right">
                                    <p class="full_card_type">
                                        VIP满减券
                                    </p>
                                    <p class="full_card_num">
                                        满 {{ item.minMoneyLimit }} 元使用
                                    </p>
                                    <p class="full_use_card">
                                        <button @click="toVip">
                                            去使用
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div> 
                                <!-- 打折未使用 -->   
                            <div class="card" v-if="item.type == 2 && item.status == 1 ">
                                <img :src="discountNotUse" alt="">
                                <p class="card_left">
                                    <span class="discount_num"> 
                                        {{ item.value * 10 }}
                                    </span>
                                    <span class="discount_text"> 
                                        折 
                                    </span>
                                </p>
                                <div class="card_right">
                                    <p class="card_type">
                                        VIP折扣券
                                    </p>
                                    <p class="use_card">
                                        <button @click="toVip">
                                            去使用
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>   
                                <!-- 满减未使用--> 
                            <div class="card" v-if="item.type == 1 && item.status == 1 ">
                                <img :src="fullNotUse" alt="">
                                <p class="card_left">
                                    <span class="discount_text"> 
                                        ￥
                                    </span>
                                    <span class="discount_num"> 
                                        {{ item.value }}
                                    </span>   
                                </p>
                                <div class="full_card_right">
                                    <p class="full_card_type">
                                        VIP满减券
                                    </p>
                                    <p class="full_card_num">
                                        满 {{ item.minMoneyLimit }} 元使用
                                    </p>
                                    <p class="full_use_card">
                                        <button @click="toVip">
                                            去使用
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>   
                            <!-- 打折已过期 -->  
                            <div class="card" v-if="item.type == 2 && item.status == 3 ">
                                <img :src="expired" alt="">
                                <p class="card_left">
                                    <span class="discount_num"> 
                                        {{ item.value * 10 }}
                                    </span>
                                    <span class="discount_text"> 
                                        折 
                                    </span>
                                </p>
                                <div class="card_right">
                                    <p class="card_type">
                                        VIP折扣券
                                    </p>
                                    <p class="use_card">
                                        <button>
                                            很遗憾
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>  
                            <!-- 满减已过期 -->   
                            <div class="card" v-if="item.type == 1 && item.status == 3 ">
                                <img :src="expired" alt="">
                                <p class="card_left">
                                    <span class="discount_text"> 
                                        ￥
                                    </span>
                                    <span class="discount_num"> 
                                        {{ item.value }}
                                    </span>   
                                </p>
                                <div class="full_card_right">
                                    <p class="full_card_type">
                                        VIP满减券
                                    </p>
                                    <p class="full_card_num">
                                        满 {{ item.minMoneyLimit }} 元使用
                                    </p>
                                    <p class="full_use_card">
                                        <button>
                                            很遗憾
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>    
                        </li>
                    </ul>
                </div>      
            </mt-tab-container-item>
            
            <!-- 已经使用 -->
            <mt-tab-container-item id="already_use">
                    <!-- 占位 -->
                <div style="height: .9rem;background:#fff"></div>
                    <!-- 标题 -->
                <div class="header">
                    优惠券每次只能使用一张，不与其他优惠方式相同
                </div>
                    
                <div class="contant" style="padding-top:0">     
                    <ul class="card_box" v-if="alreadyList.length">
                        <li v-for="(item, index) in alreadyList" :key="index" >
                            <!-- 打折已使用 --> 
                            <div class="card" v-if="item.type == 2">
                                <img :src="discountAlready" alt="">
                                <p class="card_left">
                                    <span class="discount_num"> 
                                        {{ item.value * 10 }}
                                    </span>
                                    <span class="discount_text"> 
                                        折 
                                    </span>
                                </p>
                                <div class="card_right">
                                    <p class="card_type">
                                        VIP折扣券
                                    </p>
                                    <p class="use_card">
                                        <button>
                                            已使用
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>  
                            <!-- 满减已使用 -->   
                            <div class="card" v-if="item.type == 1">
                                <img :src="fullAlready" alt="">
                                <p class="card_left">
                                    <span class="discount_text"> 
                                        ￥
                                    </span>
                                    <span class="discount_num"> 
                                        {{ item.value }}
                                    </span>   
                                </p>
                                <div class="full_card_right">
                                    <p class="full_card_type">
                                        VIP满减券
                                    </p>
                                    <p class="full_card_num">
                                        满 {{ item.minMoneyLimit }} 元使用
                                    </p>
                                    <p class="full_use_card">
                                        <button>
                                            已使用
                                        </button>
                                    </p>
                                </div>
                                <p class="card_foot">
                                    有效期至：{{ item.endTime }}
                                </p>
                            </div>    
                        </li>
                      
                    </ul>
                </div>
              
            </mt-tab-container-item>
        </mt-tab-container>
        
    </div>
</template>
<script>

import { Toast } from 'mint-ui';
export default {
    name: 'App', 
    data(){
        return {
            discountNotUse: require('./assets/discountNotUse.png'),
            fullNotUse: require('./assets/fullNotUse.png'),
            disWill: require('./assets/disWill.png'),
            fullWill: require('./assets/fullWill.png'),
            expired: require('./assets/expired.png'),
            discountAlready: require('./assets/discountAlready.png'),
            fullAlready: require('./assets/fullAlready.png'),
            selected: 'not_use',
            fixed: true,
            notUse: '',
            alreadyUse: '',
            code: 123456,
            invitCode: '564564',
            userId: '',
            urlTitle: '',
            notUseList: [],
            alreadyList: []
        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        this.request()
    },
    
    filters: {
        numAll(val){
            if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                return parseInt( val / 10000 ) / 100 + 'M'
            }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                return parseInt( val / 10 ) / 100 + 'K'
            }else{
                return val
            }    
        }
    },
    methods: {

        // 数据请求
        request() {
            
            let postData = this.$qs.stringify({   
                userId: this.userId,
            });
            this.$http({
                method: 'post',
                url: this.urlTitle +'wx/member/cardBag',
                data:postData
            }).then( res => {
                    let data = res.data.data.data
                    console.log( data )
                    this.notUse = data.notUsedTotal // 未使用总数
                    this.alreadyUse = data.alreadyUsedTotal // 已使用总数
                    this.notUseList = data.notUsed // 未使用卡片
                    this.alreadyList = data.alreadyUsed// 已使用卡片
            }).catch( err => {
                console.log(err)
            })
        },

         // 跳转VIP购买
        toVip() {
            window.location.href = `vip.html`
        }
     
    }
}
</script>
<style lang="scss" scoped>
    #box{
        font-size: .26rem;
        // background-color: #f9f9f9;
        .header{
            font-size: .26rem;
            color: #666;
            height: .64rem;
            line-height: .64rem;
            background-color: #fff;
            margin-top: .16rem;
        }
        .contant{
            padding: .38rem .83rem;
            
            .nav{
                input{
                    width: 4.16rem;
                    height: .42rem;
                    border: 1px solid #c9c9c9;
                    border-radius: .21rem;
                    outline: none;
                    text-align: center;
                }
                button{
                    width: 1.28rem;
                    height: .42rem;
                    border-radius: .21rem;
                    border: 1px solid #4fa2fe;
                    color: #4fa2fe;
                    font-weight: bold;
                    background-color: #f9f9f9;
                    margin-left: .26rem;
                }
            }
            .card_box{
                // padding: 1.7rem;
                .card{
                    position: relative;
                    width: 5.9rem;
                    height: 2.4rem;
                    margin-top: .4rem;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    .card_left{
                        position: absolute;
                        top: .56rem;
                        left: .56rem;
                        .discount_num{
                            font-size: .88rem;
                            line-height: .88rem;
                            color: #fff;
                            font-weight: 100;
                            font-family: 'ping';
                        }
                        .discount_text{
                            font-size: .46rem;
                            line-height: .46rem;
                            color: #fff;
                            font-weight: 100;
                        }
                    }
                    .card_right{
                        position: absolute;
                        top: .56rem;
                        right: .56rem;
                        .card_type{
                            font-size: .34rem;
                            line-height: .34rem;
                            color: #fff;
                            font-weight: bold;
                        }
                        .use_card{
                            margin-top: .24rem;
                            button{
                                width: 1.36rem;
                                height: .48rem;
                                border: 1px solid #fff;
                                background: none;
                                color: #fff;
                                border-radius: .1rem;
                                font-weight: bold;
                            }
                        }
                    }
                    .card_foot{
                        position: absolute;
                        bottom: .18rem;
                        left: .56rem;
                        color: #999;
                    }
                    .full_card_right{
                        position: absolute;
                        top: .4rem;
                        right: .56rem;
                        .full_card_type{
                            font-size: .34rem;
                            line-height: .34rem;
                            color: #fff;
                            font-weight: bold;
                        }
                        .full_card_num{
                            font-size: .28rem;
                            line-height: .28rem;
                            color: #fff;
                            font-weight: bold;
                            margin: .12rem 0;
                        }
                        .full_use_card{         
                            button{
                                width: 1.36rem;
                                height: .48rem;
                                border: 1px solid #fff;
                                background: none;
                                color: #fff;
                                border-radius: .1rem;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
