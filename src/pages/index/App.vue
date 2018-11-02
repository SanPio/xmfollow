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
      <div class="buyVip" ref="back">
          <div class="buy">
              <h2>提示</h2>
              <p v-if="stat == 1">您的跟随权限不够,将跳转到V认证购买页面</p>
              <p v-if="stat == 2">您的跟随权限不够,将跳转到购买vip购买页面</p>
              <p v-if="stat == 3">您的跟随权限不够，将跳转到五星购买页面</p>
              <p v-if="stat == 4">您还没有账号，将跳转到绑定账号页面</p>
              <p v-if="stat == 5">模拟账号不能跟随五星信号源</p>
              <button @click="sure">确定</button><button @click="cancel">取消</button>
          </div>
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
                  <dt> {{item.signalName}} </dt>
                  <!-- <dd>{{item.signalIntroduce}}</dd> -->
                  <dd> 
                    <img v-for="val in Number(item.star) " :key="val" :src="starImg">
                    <span  v-if="item.status == 1" class="orange">警告</span>
                    <span  v-if="item.status == 2" class="red">收尾</span>
                    <!-- <span v-if="item.memberorder==1">V认证</span>
                    <span v-if="item.memberorder==2">VIP</span> -->
                  </dd>
                </dl>
              </div>
              <div class="tit-right">
                <!-- <button class="flow-set" v-if="item.followed" @click.stop="toFollowSetting(ind)">跟随设置</button> -->
                <!-- <button class="flow-btn" v-if="!item.followed && (item.memberorder=1 && item.star<4)" @click.stop="followMe(ind)">跟随</button> -->
                <!-- <button class="flow-btn" v-if="item.memberorder>=1 && item.star>=4" @click.stop="followMe(ind)" style="background-color: #e5e5e5;color:#fcfcfc;border:none;">跟随</button> -->
                <!-- <button class="flow-btn" v-if="item.memberorder!=1 || item.memberorder!=2" @click.stop="followMe(ind)" style="background-color: #e5e5e5;color:#fcfcfc;border:none;">跟随</button> -->
                <button class="flow-btn" v-if="item.memberorder!=1 && item.memberorder!=2" @click.stop="followMe(ind)" style="background-color: #e5e5e5;color:#fcfcfc;border:none;">跟随</button>
                <button class="flow-btn" v-if="item.memberorder==1 && item.star>=4" @click.stop="followMe(ind)" style="background-color: #e5e5e5;color:#fcfcfc;border:none;">跟随</button>
                <button class="flow-btn" v-if="item.memberorder==1 && item.star<4 && !item.followed" @click.stop="followMe(ind)">跟随</button>
                <button class="flow-set" v-if="item.memberorder==1 && item.star<4 && item.followed" @click.stop="toFollowSetting(ind)">跟随设置</button>
                <button class="flow-btn" v-if="item.memberorder==2 && item.star<=4 && !item.followed" @click.stop="followMe(ind)">跟随</button>                
                <button class="flow-set" v-if="item.memberorder==2 && item.star<=4 && item.followed" @click.stop="toFollowSetting(ind)">跟随设置</button>
                <!-- 五星信号源 memberorder = 3 -->
                <!-- <button class="flow-btn" v-if="item.memberorder==3 && item.star<=5 && !item.followed" @click.stop="followMe(ind)">跟随</button>                
                <button class="flow-set" v-if="item.memberorder==3 && item.star<=5 && item.followed" @click.stop="toFollowSetting(ind)">跟随设置</button> -->
                <!-- <button class="flow-btn" v-else  @click.stop="followMe(ind)">跟随</button> -->
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
                  <dt > 最大回撤 </dt>
                  <dd> {{item.maxHuicheRatio + "%"}} </dd>
                </dl>
                <dl class="balance">
                  <dt> 余额 </dt>
                  <dd> ${{item.money | plus}} </dd>
                </dl>
                <dl>
                  <dt> 起始资金 </dt>
                  <dd> ${{ item.initFunds | plus}} </dd>
                </dl>
                <dl>
                  <dt> 跟随人数 </dt>
                  <!-- <dd v-if="item.optionId == 9 "> {{item.followerNumber}} </dd> -->
                  <dd v-if="item.optionId == 8 "> {{item.followerNumber + 100}} </dd>
                  <dd v-if="item.optionId == 1 "> {{item.followerNumber + 70}} </dd>
                  <dd v-if="item.optionId == 2 "> {{item.followerNumber + 10}} </dd>
                  <dd v-if="item.optionId == 3 "> {{item.followerNumber + 60}} </dd>
                  <dd v-if="item.optionId == 5 "> {{item.followerNumber + 67}} </dd>
                  <dd v-if="item.optionId == 6 "> {{item.followerNumber + 20}} </dd>
                  <dd v-if="item.optionId == 7 "> {{item.followerNumber + 31}} </dd>
                  <dd v-if="item.optionId != 1 && item.optionId != 2 && item.optionId != 3&& item.optionId != 5 && item.optionId != 6 && item.optionId != 7&& item.optionId != 8 " >{{ item.followerNumber }} </dd>
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
      starImg: require('./assets/xing.png'),
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
      urlTitle:"http://192.168.1.12:8080/",//丹峰
      // urlTitle:"http://192.168.1.19:8080/",  //大潘
      // urlTitle:"http://www.myjrq.cn/app/",//域名
      // urlTitle:"http://121.196.208.147:80/",//另一台
      // urlTitle:"http://wxtest.myjrq.cn/app/",//测试公众号 
      allLoaded: false,
      setFollowType:8,
      // 购买弹框
      // bntBuy:true
      stat:''
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

    this.accountId = localStorage.getItem('accountId');
    this.userId = localStorage.getItem('userId');

    
      //储存域名端口
      localStorage.setItem('urlTitle', this.urlTitle);
    //初始化数据请求   
       
    },
    mounted(){
      this.clickrequest(7,1,10,'',1,this.userId);

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
        userId: userId,
        accountId: this.accountId
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
        userId: userId,
        accountId: this.accountId
      });
      this.$http({
          method: 'post',
          url: this.urlTitle+'wx/index/list',
          data:postData
      }).then((res)=>{
        console.log(res.data.data)
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
      //  console.log(this.optionId)
       this.$http.get(this.urlTitle+'wx/order/trader/follow',{ 
            params : {
              userid: this.userId,
              optionid: this.optionId[ind] ,
              accountsid: this.accountId
            }   
        }).then((res) => { 
          // console.log(res)
          this.stat = res.data.status
          if( res.data.status == 0 ){

              //跟随设置
              window.location.href=`followsetting.html?optionId=${this.optionId[ind]}`;
          }else if( res.data.status == 1 ){
              //认证会员
              this.$refs.back.style.display='block';
              // window.location.href=`authentication.html`;
          }else if( res.data.status == 2 ){
              //购买VIP
              this.$refs.back.style.display='block';             
              // window.location.href=`vip.html`;
          }else if( res.data.status == 3 ){
              //购买五星
              this.$refs.back.style.display='block';
              // window.location.href=`fivestar.html?optionId=${this.optionId[ind]}&name=${this.boxItem[ind].signalName}`;
          }else if( res.data.status == 4 ){
              //绑定账号
              this.$refs.back.style.display='block';
              // window.location.href=`accountmanage.html`;
          }else if( res.data.status == 5 ){
              //模拟账号不能跟随五星
              this.$refs.back.style.display='block';
              // MessageBox('提示', '模拟账号不能跟随五星信号源');
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
    },
    
    // 判断是否需要跳转
    // 确定
    sure(){
      console.log(this.stat)
      if(this.stat==1){
        // 认证会员
        window.location.href=`authentication.html`;
      }else if(this.stat==2){
        // 购买会员
        window.location.href=`vip.html`;
      }else if(this.stat==3){
        // 购买五星会员
        window.location.href=`fivestar.html?optionId=${this.optionId[ind]}&name=${this.boxItem[ind].signalName}`;
      }else if(this.stat==4){
        // 绑定账号
        window.location.href=`accountmanage.html`;
      }else if(this.stat==5){
        // 模拟账号不能跟随五星
        this.$refs.back.style.display='block';
      }
    },
    // 取消
    cancel(){
      this.$refs.back.style.display="none";
    }
  }
}
</script>

<style lang="scss" scoped>
// 购买会员弹框样式
.buyVip{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display:none;
}
.box{
  position: relative;;
}
.buy{
  width: 6.2rem;
  height: 3.06rem;
  position: fixed;
  left: 8%;
  top: 26.4%;
  background-color: white;
  border-radius: 0.2rem; 
  h2{
    font-size: 0.32rem;
    border-bottom: 1px solid #c9c9c9;
    padding: 0.2rem 0 0.2rem 0; 
  }
  p{
    font-size: 0.28rem;
    color: #666666;
    text-align: center;
    padding: 0.38rem 0 0.48rem 0;
  }
  button:nth-of-type(1){
    width: 1.8rem;
    height: 0.66rem;
    background-color: #4fa2fe;
    color: white;
    border: none;
    font-size: 0.28rem;
    border-radius: 0.1rem;
  }
  button:nth-of-type(2){
    width: 1.8rem;
    height: 0.66rem;
    border:1px solid #4fa2fe;
    color: #4fa2fe;
    background-color: white;
    margin-left: 0.7rem;
    font-size: 0.28rem;
    border-radius: 0.1rem;
  }
}

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
        img{
          width: .26rem;
          height: .26rem;
        }
        span{
          font-size: .22rem;
          margin-left: .2rem;
          line-height: .22rem;
        }
        .blue{
          color: #4fa2fe;
        }
        .orange{
          color: #ff7c2b
        }
        .red{
          color: red;
        }
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
      line-height: .52rem;
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