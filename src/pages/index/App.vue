<template>
    <div class="box">
      <div id="header">
        <ul id="title" class="clearfix">
          <li @click="timeshow">
            <span>{{time}}</span>
            <img :src="timebln ? upSrc : downSrc" alt="">
            <img :src="imgSrc1" alt="" class="division">
          </li>
          <li @click="abilityshow">
            <span>{{ability}}</span>
            <img :src="abilitybln ? upSrc : downSrc" alt="">
          </li>
        </ul>

        <ul id="tran-time" v-if="timebln">
          <li v-for="(item,ind) in leftList" :key="ind" @click="timeChoose(ind)">{{item}}</li>
        </ul>
        <ul id="sort" v-if="abilitybln">
          <li v-for="(item,ind) in rightList" :key="ind" class="sort-list">
            <ul>
              <li class="sort-item">{{item}}</li>
              <li class="btnbox">
                <p @click="btnClickLeft(ind)" class="btn-left " :class="{'btnblue':ind==actLeft}" >
                  高 → 低
                </p>
                <p  @click="btnClickRight(ind)" class="btn-right " :class="{'btnblue':ind==actRight}">
                  低  →  高
                </p>
              </li>
            </ul>
          </li>
        </ul>
    </div>
      
      <div style="overflow-y: scroll;">
         <mt-loadmore 
          :bottom-method="loadBottom" :autoFill="false" ref="loadmore">
          <div v-for = "(item,ind) in boxItem" :key="ind" @click="jump(ind)">
            <div class="title">
              <div class="tlt-left">
                <div class="logo">
                  <img :src="imgSrc2" alt="">
                </div>
                <dl>
                  <dt> {{item.signalName}} <span> {{ item.star }}</span></dt>
                  <dd>{{item.signalIntroduce}}</dd>
                </dl>
              </div>
              <div class="tit-right">
                <button class="flow-set" v-if="item.followed" @click.stop="toFollowSetting">跟随设置</button>
                <button class="flow-btn" v-if="!item.followed">跟随</button>
              </div>
            </div>
            <div class="content">
              <div class="con-left" :id="ind" ></div>
              <div class="con-right">
               
          
                <dl class="balance">
                  <dt> 操盘经验 </dt>
                  <dd> {{item.experience}} </dd>
                </dl>
                <dl>
                  <dt> 交易收益率</dt>
                  <dd> {{item.yield}} </dd>
                </dl>
                <dl class="pro-loss">
                  <dt> 近一周盈亏点数 </dt>
                  <dd> {{item.profitNo}} </dd>
                </dl>
                <dl class="balance">
                  <dt> 余额 </dt>
                  <dd> {{item.money}} </dd>
                </dl>
                <dl>
                  <dt> 起始资金 </dt>
                  <dd> {{item.initFunds}} </dd>
                </dl>
                <dl>
                  <dt> 跟随人数 </dt>
                  <dd> {{item.followerNumber}} </dd>
                </dl>
              </div>


            </div>
          </div>
        </mt-loadmore>
      </div>
      <ul class="footer">
        <li class="foot-left">
          <dl>
            <dt><img :src="imgSrc3" alt=""></dt>
            <dd class="foot-click">投资领航</dd>
          </dl>
        </li>
        <li class="foot-right">
           <dl @click="toMine">
            <dt><img :src="imgSrc4" alt=""></dt>
            <dd >我的</dd>
          </dl>
        </li>
      </ul>
      <!-- 次div为空，做占位用，返回按钮占56px高度 -->
      <div style="height:56px"></div>
        
    </div>
    
</template>
<script>


// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入线形图
require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
export default {
  name: 'App',
  
  data () {
    return {
      time : "近一周有交易",
      ability : '操盘经验由高到低',
      leftList : ["最近一周有交易","最近两周有交易","最近一月有交易"],
      rightList : ['操盘经验','收益率','盈亏点数','余额','起始资金','跟随人数'],
      btnnormal : true,
      btnblueleft : false,
      btnblueright :false,
      timebln:false,
      abilitybln : false,
      actLeft:0,
      actRight:-2,
      upSrc : require('./assets/Myhomepage-Arrow@2x.png'),
      downSrc :  require('./assets/transaction-Arrow@2x.png'),
      imgSrc1: require('./assets/transaction-Division@2x.png'),
      imgSrc2: require('./assets/Myhomepage-Arrow@2x.png'),
      imgSrc3: require('./assets/Navigate-click.jpg'),
      imgSrc4: require('./assets/Myhomepage-Unclicked@2x.png'),
     
      boxItem:[],
      bottomDistance:2,
      autoFill:false,
      echartArr:[],
      nearTime:7,
      pageNum:1,
      pageSize:4,
      sortField:'',
      sortType:1,
      userId:1,
      optionId: [],
      len:8
    }
  },
  created(){
    //初始化数据请求
   
    this.clickrequest(7,1,4,'',1,1)
       
       
    },
   mounted(){
     
        
      //   // 基于准备好的dom，初始化echarts实例
      // for(let i = 0; i < this.len; i++ ){
      //     let myChart = echarts.init(document.getElementById('' +i));
      //   // 绘制图表
      //     console.log(656445665)
      //     console.log(this.echartArr[i])
      //     myChart.setOption({
      //       animation: false,
      //       xAxis: {
      //           type: 'category',
      //           show:false
      //           // boundaryGap: false,
      //           // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //       },
      //       yAxis: {  
      //           show:false
      //       },
      //       grid : {
      //         left:0,
      //         right:0,
      //         top : 0,
      //         bottom : 0
      //       },
      //       series: [{
      //           data: [10,20],
      //           type: 'line',
      //           areaStyle: {},
      //           symbol:'none',  //这句就是去掉点的    
      //           smooth:true,  //这句就是让曲线变平滑的 
      //       }]
      //     });
      // }
      // this.forFuntion()
  },
  methods:{
    //加载请求

    request(nearTime,pageNum,pageSize,sortField,sortType,userId){
      let postData = this.$qs.stringify({
        nearTime: nearTime,
        pageNum: pageNum ,
        pageSize: pageSize,
        sortField: sortField,
        sortType: sortType,
        userId: userId
      });
      console.log(postData)
      this.$http({
          method: 'post',
          url:'/wx/index/list',
          data:postData
      }).then((res)=>{
          this.len  = res.data.data.list.length
          for(let j=0; j<res.data.data.list.length; j++){
            this.boxItem.push(res.data.data.list[j]);
            this.optionId.push(res.data.data.list[j].optionId) ;
          }
          
          for(let i = 0; i < res.data.data.list.length; i++){
            
            var arr = [];
            for(let j = 0; j < res.data.data.list[i].profit.length; j++){
              arr.push(res.data.data.list[i].profit[j].profitNo)
            }
            this.echartArr.push(arr)
            
          }
          console.log(this.boxItem)
          console.log(this.optionId)
          //结束加载图
          this.$refs.loadmore.onBottomLoaded();
          
      }).catch((err)=>{  
          //结束加载图
          this.$refs.loadmore.onBottomLoaded();
      })
    },


      //点击请求
     clickrequest(nearTime,pageNum,pageSize,sortField,sortType,userId){
      let postData = this.$qs.stringify({
        nearTime: nearTime,
        pageNum: pageNum ,
        pageSize: pageSize,
        sortField: sortField,
        sortType: sortType,
        userId: userId
      });
      console.log(postData)
      this.$http({
          method: 'post',
          url:'/wx/index/list',
          data:postData
      }).then((res)=>{
          
          this.boxItem = res.data.data.list;
          this.echartArr = [];
          this.optionId = [];
          for(let i = 0; i < res.data.data.list.length; i++){
            
            this.optionId.push(res.data.data.list[i].optionId)
            var arr = [];
            for(let j = 0; j < res.data.data.list[i].profit.length; j++){
              arr.push(res.data.data.list[i].profit[j].profitNo)
            }
            // this.echartArr.push(arr)
            this.$set(this.echartArr,i,arr)
          
          }
          console.log(this.echartArr)
          //结束加载图
          this.$refs.loadmore.onBottomLoaded();
          
      }).catch((err)=>{  
          //结束加载图
          this.$refs.loadmore.onBottomLoaded();
      })
    },







  //echarts会表

  forFuntion(){
        // 基于准备好的dom，初始化echarts实例
      for(let i = 0; i < this.echartArr.length; i++ ){
          let myChart = echarts.init(document.getElementById('' +i));
        // 绘制图表
          console.log(656445665)
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
                data: this.echartArr[i],
                type: 'line',
                areaStyle: {},
                symbol:'none',  //这句就是去掉点的    
                smooth:true,  //这句就是让曲线变平滑的 
            }]
          });
      }

  },









    timeshow(){
      this.timebln = !this.timebln;
      this.abilitybln = false;
      
    },
    abilityshow(){
      this.abilitybln = !this.abilitybln;
      this.timebln = false
    },
    //选择时间
    timeChoose(ind){
      this.time = this.leftList[ind];
      this.timebln = false;
      if( ind==0){
        this.nearTime=7;
      }else if(ind == 1){
        this.nearTime=14;
      }else if(ind == 2){
        this.nearTime=30;
      }
    


      //按时间请求
      this.clickrequest(this.nearTime,1,4,this.sortField,this.sortType,this.userId)

    },
  
    btnClickLeft(ind){
      this.actLeft =ind;
      this.actRight = -1;
      if(ind==0){
        this.ability = "操盘经验由高到低";
        this.sortField = 'experience';
        this.sortType = 1;
      }else if(ind==1){
        this.ability = "收益率由高到低";
        this.sortField = 'yield';
        this.sortType = 1;
      }else if(ind==2){
        this.ability = "盈亏点数由高到低";
        this.sortField = 'profitNo';
        this.sortType = 1;
      }else if(ind==3){
        this.ability = "余额由高到低";
        this.sortField = 'money';
        this.sortType = 1;
      }else if(ind==4){
        this.ability = "起始资金由高到低";
        this.sortField = 'initFunds';
        this.sortType = 1;
      }else if(ind==5){
        this.ability = "跟随人数由高到低";
        this.sortField = 'followerNumber';
        this.sortType = 1;
      }
      this.abilitybln = false;
      this.clickrequest(this.nearTime,1,4,this.sortField,this.sortType,this.userId)
    },
    btnClickRight(ind){
      this.actRight =ind;
      this.actLeft = -1;
      if(ind==0){
        this.ability = "操盘经验由低到高";
        this.sortField = 'experience';
        this.sortType = 2;
      }else if(ind==1){
        this.ability = "收益率由低到高";
        this.sortField = 'yield';
        this.sortType = 2;
      }else if(ind==2){
        this.ability = "盈亏点数由低到高";
        this.sortField = 'profitNo';
        this.sortType = 2;
      }else if(ind==3){
        this.ability = "余额由低到高";
        this.sortField = 'money';
        this.sortType = 2;
      }else if(ind==4){
        this.ability = "起始资金由低到高";
        this.sortField = 'initFunds';
        this.sortType = 2;
      }else if(ind==5){
        this.ability = "跟随人数由低到高";
        this.sortField = 'followerNumber';
        this.sortType = 2;
      }
      this.abilitybln = false;
      this.clickrequest(this.nearTime,1,4,this.sortField,this.sortType,this.userId)
    },

    //上拉加载
    loadBottom(){
      this.pageNum = this.pageNum +1
      
      this.request(this.nearTime,this.pageNum,4,this.sortField,this.sortType,this.userId)

    },
    jump(ind){
       
      window.location.href=`info.html?optionId=${this.optionId[ind]}`;
     
    },
    //跳转到mine（我的）页面
    toMine(){
      window.location.href="mine.html";
    },
    //到跟随设置页面
    toFollowSetting(){
      window.location.href=`followsetting.html?optionId=${this.optionId[ind]}`;
    }
    
    
  }
}
</script>

<style lang="scss" scoped>
// 头部
#title{
  padding:0 .24rem;
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid#e5e5e5;
  display: flex;
  justify-content:space-between;
  li{
   
    font-size: 14px;
    font-weight: 900;
    .division{
      width: 1px;
      height: 14px;
      margin: 0 .6rem 0 .8rem;
    }
  }
  img{
    width:0.28rem;
  }
}
#tran-time{
  position: absolute;
  background-color: #fff;
  top:39px;
  width: 100%;
  z-index: 2;
  li{
    padding:0 .24rem;
    font-size: 13px;
    font-weight: normal;
    text-align: left;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #e5e5e5;
  }
}
#sort{
  background-color: #fff;
  width: 100%;
  font-size: 13px;
  position: absolute;
  top:39px;
  z-index: 2;
  .sort-list{
    ul{
      display: -webkit-flex;
      display: flex;
      justify-content:space-between;
      border-bottom: 1px solid #e5e5e5;
      li{
        padding:0 .24rem;
        height: 35px;
        line-height: 35px;
        
      }
      .btnbox{
        display: -webkit-flex;
        display: flex;
        img{
          width: .22rem;
        }
        p{
          height: 24px;
          border: 1px solid #999999;
          border-radius: .08rem;
          margin-top: 5.5px;
          line-height: 24px;
          padding: 0 .26rem; 
        }
        .btnblue{
          color: #4fa2fe;
          border: 1px solid #4fa2fe;
        }
        .btn-right{
          margin-left:.4rem ;
        }
      }
    }
    ul:hover{
      .sort-item{
        color:#4fa2fe;
      }
    }
   
  }
}
// 列表
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
        line-height: 18px;
        margin-top: 2px;
        span{
          font-size: 10px;
          line-height: 10px;
          color:#ff7c2b;
          margin-left: .2rem;
        }
      }
      dd{
        margin-top: 2px;
        color: #4fa2fe;
        font-size: 12px;
      }
    }
    img{
      width: 37px;
      height: 37px;
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
      margin:0 .1rem 8px 0;

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
      margin-right: 0;

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
  padding-top: 6px;
  background-color:#ffffff;
  position: fixed;
  bottom:0;
  display: flex;
  justify-content: space-around;
  font-size: 10px;
  dl{
    width: 1.6rem;
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