<template>
    <div>
        <div class="content">
            <div>
                <p>客服电话 0571-85178711</p>
                <p>微信客服 xiaoming201806</p>
            </div>
            
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
    .content{
        width: 100%;
        height: 26rem;
        background: url("./assets/about.jpg");
        background-size: 100%;
        background-repeat: no-repeat;
        >div{
            padding: 24.66rem 0 0 0;
            width: 100%;
            text-align: left;
            color: #4694f6;
            font-size: .24rem;
            p{
                padding: 0.1rem 0 0 0.4rem;
            }
        }
    }
    
</style>



