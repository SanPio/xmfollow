<template>
    <div>
        <ul id="content">
            <li v-for="(item,ind) in contentTitle" :key="item">
                <p class="con-left">{{ item }}</p>
                <p class="con-right">
                    <span v-if="ind==0"> {{ oldPhone|phoneNum }} </span>
                    <input name="phonenum" id="" maxlength="10" type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-if="ind==1" v-model="newPhone" class="phonenum">
                    <button v-if="ind==1&&btnShow==0" @click="setCode">获取验证码</button>
                    <button v-if="ind==1&&btnShow==1" class="time">{{time}}&nbsp;s </button>
                    <input type="number" name="code" id="" oninput="if(value.length>6)value=value.slice(0,6)" v-if="ind==2" v-model="code" class="code" >
                </p>
            </li>
        </ul>
        {{code}}
        <!-- <button disabled="disabled"></button> -->
        <div id="bottom">
            <button>确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){
        return {
           contentTitle : ['原手机号','新手机号','验证码'],
           oldPhone:'13677778888',
           newPhone:'',
           btnShow : 0,
           time: 120,
           code:''

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
    filters: {  
        // 过滤手机号
        phoneNum: function (value) {  
            return value.substr(0,3) + "****" +  value.substr(7,4)
        }  
    },
    methods: {
        //过滤原手机号
        //点击获取验证码
        setCode(){
            this.btnShow = 1;
            var that = this;
            var timer = setInterval(function(){
                that.time = that.time -1;
                if(that.time == 0 ){
                    that.btnShow = 0;
                    window.clearInterval(timer);
                    that.time = 120;

                }
            },1000)
        }
    }
}
</script>
<style lang="scss" scoped>
    #content{
        font-size: 14px;
        padding: 0 .5rem;
        margin-top: 20px;
        li{
            input{
                width: 1.8rem;
            }
            display: flex;
            height: 49px;
            border-bottom: 1px solid #c9c9c9;
            .con-left{
                width: 1.48rem;
                height: 16px;
                line-height: 16px;
                padding: 0 .18rem;
                margin-top: 18px;
                border-right: 1px solid #e5e5e5;
            }
            .con-right{
                margin-left: .3rem;
                span{
                    line-height: 50px;
                    margin-left: 4px;
                }
                .phonenum,.code{
                    font-size: 14px;
                    line-height: 14px;
                    padding: 4px;
                    margin-top: 14px;
                    outline: none;
                    border: none
                }
                button{
                    width: 1.6rem;
                    height: 28px;
                    margin-left: .2rem;
                    border: 1px solid #4fa2fe;
                    background-color: #fff;
                    outline: none;
                    font-size: 12px;
                    color: #4fa2fe;
                    border-radius: 20px;
                }
                .time{
                    border: 1px solid #999999;
                    color: #999999;
                }
            }
        }
    }
    #bottom{
        text-align: center;
        button{
            margin-top: 50px;
            width: 6.5rem;
            height: 50px;
            font-size: 22px;
            font-weight: 900;
            color: #fff;
            background-color: #4fa2fe;
            border: none;
            outline: none;
            border-radius: 10px;
        }
    }
      
</style>