<template>
    <div>
        <dl id="header">
            <dt><img :src="userImgSrc" alt=""></dt>
            <dd>{{ userName }}</dd>
        </dl>
        <ul id="info-top">
            <li v-for="(item,ind) in userInfoTopTit" :key="item">
                <p class="info-top-title">
                     {{ item }} 
                </p>
                <p class="info-top-content">
                    <span> {{ userInfoTop[ind] }} </span>
                    <span></span>
                </p>
            </li>
        </ul>






    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
            userImgSrc : require('./assets/img2.jpg'),
            userName : '个人信息',
            userInfoTopTit : ['昵称','手机号','个人简介','交易策略'],
            userInfoTop : ['信息员001号','信息员001号','信息员001号','信息员001号']
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

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    #header{
        // height: 125px;
        background-color: #4fa2fe;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        dt{
            padding: 11px 0;
            img{
                width: 76px;
                height: 76px;
                border-radius: 50%;
            }
        }
        dd{
            line-height: 14px;
            padding-bottom: 10px;
            font-weight: 900;
        }
    }
    #info-top{
        font-size: 13px;
        li{
            display: flex;
            height: 38px;
            line-height: 38px;
            border-bottom: 1px solid #c9c9c9;
            
            
        }
    }



</style>


