<template>
    <div class="box">
      <div id="header" v-if="false">
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
      
      <div style="overflow:scroll; -webkit-overflow-scrolling: touch">
         <mt-loadmore 
          :bottom-method="loadBottom" :autoFill="false" ref="loadmore" :bottom-all-loaded="allLoaded">
          <div v-for = "(item,ind) in boxItem" :key="ind" @click="jump(ind)" style="margin-bottom:.1rem;background:#fff">
            <div class="title">
              <div class="tlt-left">
                <div class="logo">
                  <img :src="imgSrc2" alt="">
                </div>
                <dl>
                  <dt> {{item.signalName}} <span> {{ item.star }}星</span></dt>
                  <dd>{{item.signalIntroduce}}</dd>
                </dl>
              </div>
              <div class="tit-right">
                <button class="flow-set" v-if="item.followed" @click.stop="toFollowSetting(ind)">跟随设置</button>
                <button class="flow-btn" v-if="!item.followed" @click.stop="followMe(ind)" >跟随</button>
              </div>
            </div>
            <div class="content">
              <div class="con-left" :id="ind" ></div>
              <div class="con-right">
               
          
                <dl class="balance">
                  <dt> 交易时间 </dt>
                  <dd> {{item.experience}} </dd>
                </dl>
                <dl>
                  <dt> 交易收益率</dt>
                  <dd> {{item.yield | tonum}}%</dd>
                </dl>
                <dl class="pro-loss">
                  <!-- <dt v-if="nearTime==7"> 近一周盈亏点数 </dt>
                  <dt v-if="nearTime==14"> 近两周盈亏点数 </dt>
                  <dt v-if="nearTime==30"> 近一月盈亏点数 </dt> -->
                  <dt > 盈亏点数 </dt>
                  <dd> {{item.profitNo | plus}} </dd>
                </dl>
                <dl class="balance">
                  <dt> 余额 </dt>
                  <dd> {{item.money | plus}} </dd>
                </dl>
                <dl>
                  <dt> 起始资金 </dt>
                  <dd> {{item.initFunds | plus}} </dd>
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
// Vue.filter('tonum',function(val){
//   parseInt(val*100)/100
// })
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
      imgSrc2: require('./assets/Head-portrait.jpg'),
      imgSrc3: require('./assets/Navigate-click.jpg'),
      imgSrc4: require('./assets/Myhomepage-Unclicked@2x.png'),
      boxItem: [],
      bottomDistance: 2,
      autoFill: false,
      echartArr: [],
      nearTime: 7,
      pageNum: 1,
      pageSize: 4,
      sortField: '',
      sortType: 1,
      optionId: [],
      userId:'',
      accountId:'',
      len: 10,
      // urlTitle:"http://192.168.1.11:8080/",
      // urlTitle:"http://192.168.1.9:80/", 
      // urlTitle:"http://www.0539maj.com/app/",
      urlTitle:"http://132.232.44.112:80/app/",
      // urlTitle:"http://121.196.208.147:80/",
    
      allLoaded: false,
      setFollowType:8
    }
  },
  created(){
    let haveiss = sessionStorage.getItem('iss');
    if(haveiss == 1){
        document.title = '交易领航(模拟)';
        this.iss = haveiss
    }else{
        document.title = '交易领航';
        this.iss = ''
    }
    var a=this.GetRequest();
    var index_1=a['accountsid'];
    var index_2=a['userid']; 
      this.accountId = index_1;
      this.userId = index_2;
      //储存userId
      localStorage.setItem('userId', this.userId);
      //储存accountId
      localStorage.setItem('accountId', this.accountId);
      //储存域名端口
      localStorage.setItem('urlTitle', this.urlTitle);
    //初始化数据请求   
       
    },
    mounted(){
      this.clickrequest(7,1,10,'',1,1);
    },
    // filters:{  
    //   tofixd(value) {  
    //     return   parseInt(value*100) /100
    //   }  
    // }  ,
    filters:{
        tonum(val){
          return parseInt(  Number(val) *100)/100
        },
        plus(val){
           if(val >= 1000 || val <= -1000){
             return parseInt(val/10)/100 + "K"
           }else{
             return parseInt(val * 100 )/100
           }
        }
        
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

      this.$http({
          method: 'post',
          url: this.urlTitle +'wx/index/list',
          data:postData
      }).then((res)=>{

          if(res.data.data.total <= pageNum*pageSize){
             this.allLoaded = true;//数据全部加载完毕
          }
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
       

          this.$nextTick(()=> { //init 你的echarts  
                                 
                // 基于准备好的dom，初始化echarts实例
            for(let i = 0; i <this.echartArr.length ; i++ ){
                let myChart = echarts.init(document.getElementById(i));
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
                      data: this.echartArr[i],
                      type: 'line',
                      areaStyle: {},
                      symbol:'none',  //这句就是去掉点的    
                      smooth:true,  //这句就是让曲线变平滑的 
                  }]
                });
            }
          })
         
          //结束加载图
          this.$refs.loadmore.onBottomLoaded();
          
      }).catch((err)=>{  
          console.log(err)
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
      this.$http({
          method: 'post',
          url: this.urlTitle+'wx/index/list',
          data:postData
      }).then((res)=>{
        console.log(res.data.data)
        console.log(5555555)
          // console.log(res.data.data.listp[0].yield)
          if(res.data.data.total <= pageNum*pageSize){
             this.allLoaded = true;//数据全部加载完毕
          }
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
          this.$nextTick(()=> { //init 你的echarts  
                  
                    // 基于准备好的dom，初始化echarts实例
                for(let i = 0; i < 10; i++ ){
                    let myChart = echarts.init(document.getElementById(i));
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
                          show:false,
                          scale:true,
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
          })
          //结束加载图
          this.$refs.loadmore.onBottomLoaded();
          
      }).catch((err)=>{  
          //结束加载图
          // console.log(err)
          this.$refs.loadmore.onBottomLoaded();
      })
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
    //点击跟随

    followMe(ind){
       console.log(this.optionId)
       this.$http.get(this.urlTitle+'wx/order/trader/follow',{ 
            params : {
                userid: this.userId,
                optionid: this.optionId[ind] ,
                accountsid: this.accountId
            }   
        }).then((res) => { 
          // console.log(res)
          if( res.data.status == 0 ){
              //跟随设置
              window.location.href=`followsetting.html?optionId=${this.optionId[ind]}`;

          }else if( res.data.status == 1 ){
              //购买会员
              window.location.href=`authentication.html`;
          }else if( res.data.status == 2 ){
              //绑定
              window.location.href=`vip.html`;
          }else if( res.data.status == 3 ){
              //绑定
              window.location.href=`fivestar.html?optionId=${this.optionId[ind]}&name=${this.boxItem[ind].signalName}`;
          }
          else if( res.data.status == 4 ){
              //绑定
              window.location.href=`accountmanage.html`;
          }

        console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
    },





    GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
             var  strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },


    //上拉加载
    loadBottom(){
      this.pageNum = this.pageNum +1
      
      this.request(this.nearTime,this.pageNum,6,this.sortField,this.sortType,this.userId)

    },
    jump(ind){
       
      window.location.href=`info.html?optionId=${this.optionId[ind]}`;
     
    },
    //跳转到mine（我的）页面
    toMine(){
      window.location.href="mine.html";
    },
    //到跟随设置页面
    toFollowSetting(ind){
      window.location.href=`followsetting.html?optionId=${this.optionId[ind]}`;
    }   
  }
}
</script>

<style lang="scss" scoped>

// 头部
#title{
  padding:0 .24rem;
  height: .76rem;
  line-height: .76rem;
  border-bottom: 1px solid#e5e5e5;
  display: flex;
  justify-content:space-between;
  li{
   
    font-size: .28rem;
    font-weight: 900;
    .division{
      width: 0.02rem;
      height: .28rem;
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
  top:.78rem;
  width: 100%;
  z-index: 2;
  li{
    padding:0 .24rem;
    font-size: .26rem;
    font-weight: normal;
    text-align: left;
    height: .76rem;
    line-height: .7rem;
    border-bottom: 1px solid #e5e5e5;
  }
}
#sort{
  background-color: #fff;
  width: 100%;
  font-size: .26rem;
  position: absolute;
  top:.78rem;
  z-index: 2;
  .sort-list{
    ul{
      display: -webkit-flex;
      display: flex;
      justify-content:space-between;
      border-bottom: 1px solid #e5e5e5;
      li{
        padding:0 .24rem;
        height: .7rem;
        line-height: .7rem;
        
      }
      .btnbox{
        display: -webkit-flex;
        display: flex;
        img{
          width: .22rem;
        }
        p{
          height: .48rem;
          border: 1px solid #999999;
          border-radius: .08rem;
          margin-top: .1rem;
          line-height: .48rem;
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
  height: 1.12rem;
  border-bottom: 1px solid #e5e5e5;
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  font-size: .26rem;
  padding: 0 .24rem;
  .tlt-left{
    display: -webkit-flex;
    display: flex;
    justify-content:space-between;
    margin-top: .16rem;
    dl{
      margin-left: .2rem;
      text-align: left;
      dt{
        font-weight: 900;
        line-height: .36rem;
        margin-top: .04rem;
        span{
          font-size: .2rem;
          line-height: .2rem;
          color:#ff7c2b;
          margin-left: .2rem;
        }
      }
      dd{
        margin-top: .04rem;
        color: #4fa2fe;
        font-size: .24rem;
      }
    }
    img{
      width: .74rem;
      height: .74rem;
      border-radius: 50%;

    }
  }
  .tit-right{
    button{
      margin-top:.32rem;
      width: 1.46rem;
      height: .52rem;
      border:1px solid #4fa2fe;
      background: none;
      border-radius: .12rem;
      color: #4fa2fe;
    }
    .flow-btn{
      color: #ffffff;
      background-color: #4fa2fe;
    }
  }
}
.content{
  font-size: .24rem;
  line-height: .24rem;
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  padding: .4rem .24rem;
  .con-left{
    width: 1.14rem;
    height: 1.2rem;
    
  }
  .con-right{
    width: 5.3rem;
    height:1.48rem ;
    dl{
      float: left;
      width: 1.7rem;
      text-align: left;
      margin:0 .1rem .16rem 0;

      dt{
        color: #999999;
        margin-bottom: .16rem;
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
  height:1rem;
  padding-top: .12rem;
  background-color:#ffffff;
  position: fixed;
  bottom:0;
  display: flex;
  justify-content: space-around;
  font-size: .2rem;
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
    margin-bottom: .04rem;
  }
}
</style>