<template>
    <div v-if="boxShow" class="box">
        <div class="buy" style="border: 1px solid #f3f3f3;box-shadow: 0 0 0.08rem #f3f3f3;-webkit-box-shadow: 0 0 0.08rem #f3f3f3;">
            <div class="top"></div>
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
                    <ul class="ul">
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
            <div class="foot"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            boxShow:false,
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
            this.boxShow = true
        }).catch((err) => {
            console.log(err)                
        });
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
    body{
        background-color: #fff;
    }
    .top{
        width: 100%;
        height: 0.2rem;
        // background: url("./assets/1@2x_01.jpg");
        // background-size: 100%;
    }
    .foot{
        width: 100%;
        height: 0.2rem;
        // background: url("./assets/1@2x_05.jpg");
        // background-size: 100%;
    }
    .buy{
        width: 7.04rem;
        margin:  0.3rem auto;
        min-height: 7rem;
        border: 1px solid #f3f3f3;
        box-shadow: 0 0 0.08rem #f3f3f3;
        -webkit-box-shadow: 0 0 0.08rem #f3f3f3;
        .nav{
            
            // background: url("./assets/1@2x_03.jpg");
            // background-repeat: repeat-y;  
            // background-size: 100%;
            >ul{
                overflow: hidden;
                height: 0.63rem;
                line-height: 0.63rem;
                border-bottom: 1px solid #c9c9c9;
                width: 6.8rem;
                margin: 0 auto;
                li{
                    float: left;
                    width: 1.36rem;
                    text-align: center;
                    color: #4fa2fe;
                    font-size: 0.26rem;
                }
            }
        }
        .ul{
            overflow: hidden;
            padding: 0.24rem 0 0 0;
            // background: url("./assets/1@2x_03.jpg");
            // background-repeat: repeat-y;  
            // background-size: 100%;
            width: 7.04rem;
            margin: 0 auto;
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



