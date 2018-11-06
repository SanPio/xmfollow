<template>
    <div>
        <div class="buy">
            <div class="nav">
                
                <ul>
                    <li v-for="item in nav" :key="item">{{item}}</li>
                </ul>
            </div>
            <div style="overflow-y: scroll;">
                <mt-loadmore 
                    :bottom-method="loadBottom" 
                    :bottom-all-loaded="infoAllLoaded"
                    :autoFill="false" ref="loadmores">
                    <ul>
                        <li v-for="(item,index) in list" :key="index">
                            <p>{{ item.modifyTime }}</p>

                            <!-- 优惠 -->
                            <p v-if="item.discountType==1">满减</p>
                            <p v-if="item.discountType==2">{{ (item.discountValue)*10 }}折</p>
                            <p v-if="item.discountType==3">兑换</p>

                            <p>{{ item.time }}个月</p>
                            <p>{{ item.originalPrice }}元</p>
                            <p>{{ item.value }}元</p>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            nav:["购买时间","优惠","购买时长","原价","实付"],
            infoAllLoaded: false,
            userId : '',
            urlTitle : '',
            list:'',
            pageNum : 1,
            pageSize: 20
        }
    },
    created(){
        this.urlTitle = localStorage.getItem('urlTitle');
        this.userId = localStorage.getItem('userId');
        // 初始化数据
        let postData = this.$qs.stringify({
            userId:  this.userId,
            pageNum: 1,
            pageSize : 20
        });
        // console.log(postData)
        this.$http({
            method: "post",
            url: this.urlTitle +'wx/userinfo/payRecord',
            data: postData
        }).then((res)=>{
            console.log(res)
            this.list = res.data.data.data.list
            if( res.data.data.data.total <= 20 ){
                this.infoAllLoaded = true
            }
        })
    },
    methods:{
        loadBottom(){
            this.pageNum ++ ;
            var params = new URLSearchParams();
            params.append("pageNum",this.pageNum)
            params.append("pageSize",20)
            params.append("userId",this.userId)
            this.$http.post(this.urlTitle + 'wx/userinfo/payRecord',params).then((res)=>{
                console.log(res)
                this.$refs.loadmores.onBottomLoaded();
                if(res.data.data.data.total <= this.pageNum * 20){
                    this.infoAllLoaded = true;
                }
                
                // this.list=res.data.data.data.list
                for(let i=0; i< res.data.data.data.list.length;i++){
                    this.list.push(res.data.data.data.list[i])
                }
                

            }).catch((err)=>{
                console.log(err)
            })
            
            // this.infoAllLoaded = true;// 若数据已全部获取完毕
            // this.$refs.loadmore.onBottomLoaded();
        }
    },
    filters: {
        price(val){
            if ( parseFloat( val ) >=1000000 || parseFloat( val ) <= -1000000 ){
                return parseInt( val / 10000 ) / 100 + 'M'
            }else if ( parseFloat( val ) >=1000 || parseFloat( val ) <= -1000 ){
                return parseInt( val / 10 ) / 100 + 'K'
            }else{
                return val
            }    
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
            margin-top: 0.24rem;
            li{
                overflow: hidden;
                p{
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
    }
    
</style>



