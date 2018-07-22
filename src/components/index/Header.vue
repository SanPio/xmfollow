<template>
    <div>
        <ul id="title" class="clearfix">
          <li @click="timeshow">
            <span>{{time}}</span>
            <img :src="timebln ? upSrc : downSrc" alt="">
            <img src="../../assets/transaction-Division@2x.png" alt="" class="division">
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
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      time : "近一周有交易",
      ability : '交易员能力由高到低',
      leftList : ["最近一周有交易","最近两周有交易","最近一月有交易"],
      rightList : ['交易员能力值','交易单数/日','近一周盈亏点数','交易周期','平均持仓时间','粉丝人数'],
      btnnormal : true,
      btnblueleft : false,
      btnblueright :false,
      timebln:false,
      abilitybln : false,
      actLeft:0,
      actRight:-2,
      upSrc : require('../../assets/Myhomepage-Arrow@2x.png'),
      downSrc :  require('../../assets/transaction-Arrow@2x.png')
  
    }
  },
  methods:{
    timeshow(){
      this.timebln = !this.timebln;
      this.abilitybln = false;
    },
    abilityshow(){
      this.abilitybln = !this.abilitybln;
      this.timebln = false
    },
    timeChoose(ind){
      this.time = this.leftList[ind];
      this.timebln = false
    },
    btnClickLeft(ind){
      this.actLeft =ind;
      this.actRight = -1;
      if(ind==0){
        this.ability = "交易员能力由高到低";
      }else if(ind==1){
        this.ability = "交易单数由高到低";
      }else if(ind==2){
        this.ability = "近一周盈亏点数由高到低";
      }else if(ind==3){
        this.ability = "交易周期由高到低";
      }else if(ind==4){
        this.ability = "平均持仓时间由高到低";
      }else if(ind==5){
        this.ability = "粉丝人数由高到低";
      }
      this.abilitybln = false
    },
    btnClickRight(ind){
      this.actRight =ind;
      this.actLeft = -1;
      if(ind==0){
        this.ability = "交易员能力由低到高";
      }else if(ind==1){
        this.ability = "交易单数由低到高";
      }else if(ind==2){
        this.ability = "近一周盈亏点数由低到高";
      }else if(ind==3){
        this.ability = "交易周期由低到高";
      }else if(ind==4){
        this.ability = "平均持仓时间由低到高";
      }else if(ind==5){
        this.ability = "粉丝人数由低到高";
      }
      this.abilitybln = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
#title{
  padding:0 .24rem;
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid#e5e5e5;
  display: flex;
  justify-content:space-around;
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
</style>