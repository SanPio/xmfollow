<template>
    <div>
        <div class="buy">
            <div class="nav">
                
                <ul>
                    <li v-for="item in nav" :key="item">{{item}}</li>
                </ul>
            </div>
            <mt-loadmore 
                :bottom-method="loadBottom" 
                :bottom-all-loaded="infoAllLoaded"
                :autoFill="false" ref="loadmores">
                <ul>
                    <li>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </li>
                    <li>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            nav:["购买时间","优惠","购买时长","原价","实付"],
            infoAllLoaded: false
        }
    },
    created:{
        
    },
    methods:{
        loadBottom(){
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
        }
    }
 
}
</script>
<style lang="scss" scoped>
    .buy{
        width: 7.02rem;
        margin:  0.3rem auto;
        box-shadow: 0 0 8px #f3f3f3;
        .nav{
            border-bottom: 1px solid #c9c9c9;
            ul{
                overflow: hidden;
                height: 0.63rem;
                line-height: 0.63rem;
                li{
                    float: left;
                    width: 1.4rem;
                    text-align: center;
                    color: #4fa2fe;
                    font-size: 0.26rem;
                }
            }
        }
        ul{
            overflow: hidden;
            li p{
                float: left;
                width: 1.4rem;
                height: 0.6rem;
                line-height: 0.6rem;
                text-align: center;
                color: #666666;
                font-size: 0.22rem;
            }
        }
    }
    
</style>



