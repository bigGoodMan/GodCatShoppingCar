<template>
  <header class="hhf-header hhf-clear">
<div class="hhf-header-left"  v-if="leftTitle!==undefined||leftIcon!==undefined"><span v-if="leftIcon!==undefined" class="iconfont" :class="leftIcon"></span>{{leftTitle}}</div>
<div class="hhf-header-title"><slot></slot></div>
<div class="hhf-header-right" v-if="rightTitle!==undefined||rightIcon!==undefined">{{rightTitle}}<span v-if="rightIcon!==undefined" class="iconfont" :class="rightIcon"></span></div>
  </header>
</template>

<script>
//import { Vue } from 'vue/types/vue';
export default {
  name:'BuyCar_header',
  props:['middle-title','left-icon','left-title','right-icon','right-title'],//父级传值给子级 标题名字  左边符号 左边标题  右边符号 右边标题
  methods:{//放置方法

  },
  create(){
  },
  mounted(){
  },
  data(){
return{

}
  }
}

</script>

<style scoped>
.hhf-header{
  /* flex布局 行内元素 inline-flex  */
  display: flex;
/*主轴排列方向 row 往右| row-reverse 往左| column 往下| column-reverse;往上 */
  flex-direction:row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;  
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content:center;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(to bottom,#000,#888888);
text-align: center;
  color:#fff;
  min-height: .8rem;
}
.hhf-header-left{
  /* width: 1.2rem; */
  display: inline-flex;
  justify-content:center;
            align-items:center;
  flex-grow: 1;
}
.hhf-header-left .iconfont{
  padding-right: .2rem;
}
.hhf-header-left .jiantouyou::before{
  transform: rotate(180deg);
  display: inline-block;
}
.hhf-header-title{
  flex-grow: 8;
  display: inline-flex;
  justify-content:center;
            align-items:center;
/* width: 4rem; */
/* display: table;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: absolute;
  height: 100%; */
}
.hhf-header-title-content{
  /* display: table-cell;
  vertical-align: middle; */
}
.hhf-header-right{
  flex-grow: 1;
  /* width: 1.2rem; */
  display: inline-flex;
  justify-content:center;
            align-items:center;
  /* float: right;
  padding:.2rem 0;  */
}
.hhf-header-right .iconfont{
  padding-left: .2rem;
}
</style>
