<template>
    <div>



    </div>
</template>
<script>
export default {
    name: 'App', 
    data(){

    },
    created(){
        //初始化数据请求
        this.$http.post('',{    
            name:"virus"  
        }).then(function(res){
            // console.log(res)
        }).catch(function(err){
        
            // console.log(err)
        })
    },
    mounted(){

    },
    methods: {

    }
}
</script>


