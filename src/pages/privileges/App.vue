<template>
    <div>
        <ul>
            <li>
                <div class="title">
                    <img src="./assets/tequan.png" alt="" class="fl">
                    <p class="fl">真实账号跟单</p>
                    <span class="fl">已获得</span>
                </div>
                <!-- <div class="titles">
                    <img src="./assets/tequan.png" alt="" class="fl">
                    <p class="fl">真实账号跟单</p>
                    <span class="fl">去获得>></span>
                </div> -->
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    name: 'App', 
    data(){
        return {
            
        }
    },
    created:{
        
    },
    methods:{

    }
 
}
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    ul{
        width: 7.02rem;
        margin: 0 auto;
        li{
            margin-top: 0.4rem;
            .title{
                overflow: hidden;
                img{
                    display: block;
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-left: 0.2rem;
                }
                p{
                    font-size: 0.28rem;
                    color: #333333;
                    line-height: 0.6rem;
                    margin-left: 0.2rem;
                }
                span{
                    font-size: 0.24rem;
                    color: #666666;
                    line-height: 0.6rem;
                    margin-left: 0.2rem;
                }
            }
            .titles{
                overflow: hidden;
                img{
                    display: block;
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-left: 0.2rem;
                }
                p{
                    font-size: 0.28rem;
                    color: #848484;
                    line-height: 0.6rem;
                    margin-left: 0.2rem;
                }
                span{
                    font-size: 0.24rem;
                    color: #4fa2fe;
                    line-height: 0.6rem;
                    margin-left: 0.2rem;
                }
            }
        }
    }
    
</style>



