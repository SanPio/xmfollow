<template>
    <div class="box">
      <v-header></v-header>
      
      <div style="overflow-y: scroll;">
         <mt-loadmore :top-method="loadTop"
          :bottom-method="loadBottom" :autoFill="false" ref="loadmore">
          <div v-for = "(item,ind) in boxItem" :key="ind" @click="jump">
            <div class="title">
              <div class="tlt-left">
                <div class="logo">
                  <img src="../../assets/Myhomepage-Arrow@2x.png" alt="">
                </div>
                <dl>
                  <dt>司金校尉</dt>
                  <dd>精准计算公司</dd>
                </dl>
              </div>
              <div class="tit-right">
                <button class="flow-set">跟随设置</button>
                <button class="flow-btn">跟随</button>
              </div>
            </div>
            <div class="content">
              <div class="con-left" :id="ind" ></div>
              <div class="con-right">
                <dl v-for="(item,ind) in dlArr" :key="item.dd + ind" :class="{'balance':ind == 0||3,'pro-loss':ind==2}">
                  <dt> {{item.dt}}</dt>
                  <dd> {{item.dd}} </dd>
                </dl>
              </div>


            </div>
          </div>
        </mt-loadmore>
      </div>
      <ul class="footer">
        <li class="foot-left">
          <dl>
            <dt><img src="../../assets/Navigate-click.jpg" alt=""></dt>
            <dd class="foot-click">投资领航</dd>
          </dl>
        </li>
        <li class="foot-right">
           <dl>
            <dt><img src="../../assets/Myhomepage-Unclicked@2x.png" alt=""></dt>
            <dd @click="jumpToMine">我的</dd>
          </dl>
        </li>
      </ul>
        
    </div>
    
</template>
<script>

import Header from '@/components/index/Header'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
export default {
  name: 'App',
  components : {
    "v-header" : Header,
  
  },
  data () {
    return {
      boxItem:4,
      bottomDistance:2,
      autoFill:false,
      dlArr : [
        {"dt":"操盘经验","dd":"84"},
        {"dt":"交易收益率","dd":"84"},
        {"dt":"近一周盈亏点数","dd":"84"},
        {"dt":"余额","dd":"84"},
        {"dt":"起始资金","dd":"84"},
        {"dt":"跟随人数","dd":"84"},
      ],
      option:{

      }
    
    }
  },
   mounted(){
      // 基于准备好的dom，初始化echarts实例
      for(let i = 0; i < this.boxItem; i++ ){
        let myChart = echarts.init(document.getElementById(''+ i))
      // 绘制图表
        myChart.setOption({
          animation: false,
          xAxis: {
              type: 'category',
              show:false
              // boundaryGap: false,
              // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {  
              show:false
          },
          grid : {
            left:0,
            right:0,
            top : 0,
            bottom : 0
          },
          series: [{
              data: [20,16,30],
              type: 'line',
              areaStyle: {},
              symbol:'none',  //这句就是去掉点的    
              smooth:true,  //这句就是让曲线变平滑的 
          }]
        });
      }
      
  },
  methods:{
    //下拉刷新
    loadTop() {
      // 加载更多数据
      console.log("下拉刷新")

    },
    //上拉加载
    loadBottom(){
    
      console.log("上拉加载");
      this.boxItem = this.boxItem + 4

    },
    jump(){
      window.location.href="info.html";
      // window.location.href="https://www.baidu.com";
     
    },
    jumpToMine(){
      window.location.href="mine.html";
    }
    
    
  }
}
</script>

<style lang="scss" scoped>

.clearfix::after {
  content: ".";
  clear: both;
  display: block;
  overflow: hidden;
  font-size: 0;
  height: 0;
}
.clearfix {
  zoom: 1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
.box{
  font-size: 13px;
}
.title{
  height: 56px;
  border-bottom: 1px solid #e5e5e5;
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  font-size: 13px;
  padding: 0 .24rem;
  .tlt-left{
    display: -webkit-flex;
    display: flex;
    justify-content:space-between;
    margin-top: 8px;
    dl{
      margin-left: .2rem;
      text-align: left;
      dt{
        font-weight: 900;
        margin-top: 2px;
      }
      dd{
        margin-top: 2px;
        color: #4fa2fe;
        font-size: 12px;
      }
    }
    img{
      width: .74rem;
      height: .74rem;
      border:1px solid red;
      border-radius: 50%;

    }
  }
  .tit-right{
    button{
      margin-top:16px;
      width: 1.46rem;
      height: 26px;
      border:1px solid #4fa2fe;
      background: none;
      border-radius: 6px;
      color: #4fa2fe;
    }
    .flow-btn{
      color: #ffffff;
      background-color: #4fa2fe;
    }
  }
}
.content{
  font-size: 12px;
  line-height: 12px;
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  padding: 20px .24rem;
  .con-left{
    width: 1.14rem;
    height: 60px;
    
  }
  .con-right{
    width: 5.3rem;
    height:74px ;
    dl{
      float: left;
      width: 1.7rem;
      text-align: left;
      margin:0 .24rem 8px 0;
      dt{
        color: #999999;
        margin-bottom: 8px;
      }
      dd{
        font-weight: 900;
      }
    }
    .balance{
      width: 1.3rem;

    }
    .pro-loss{
      width: 1.8rem;
      dd{
        color:#ff7c2b;
      }
    }
  }
}
.footer{
  width: 100%;
  height:50px;
  background-color:#ffffff;
  position: fixed;
  bottom:0;
  display: flex;
  justify-content: space-around;
  font-size: 10px;
  dl{
    width: 1rem;
    text-align: center;
    color:#999999;
    .foot-click{
      color:#4fa2fe;
    }
  }
  img{
    width: .44rem;
    height: .44rem;
    margin-bottom: 2px;
  }
}
</style>