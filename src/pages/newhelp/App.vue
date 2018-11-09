<template>
    <div class="content">
        <div>
            <h4>1.选择平台的方式可以通过以下网址：</h4>
            <p><span class="fl">外汇天眼：</span><a href="http://www.fxeye.com/" class="fl">http://www.fxeye.com/</a></p>
            <p><span class="fl">外汇110：</span><a href="http://www.fx110.com/" class="fl">http://www.fx110.com/</a></p>
        </div>
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
        text-decoration: none;
        outline: none;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .content{
        width: 100%;
        height: 129.4rem;
        background: url("./assets/new.jpg");
        background-size: 100%;
        background-repeat: no-repeat;
        div{
            padding: 121rem 0 0 0;
            text-align: left;
            color: #499bff;
            h4{
                padding: 0 0 0 0.3rem;
                font-size: 0.26rem;
                font-weight: normal;
            }
            p{
                padding: 0.1rem 0 0 0.3rem;
                font-size: 0.26rem;
                overflow: hidden;
                font-weight: bold;
                a{
                    color: #499bff;
                    display: block;
                }
                span{
                    display: block;
                }
            }
        }
    }
    
</style>



