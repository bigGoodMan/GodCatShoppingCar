<template>
<div class="hhf-slider-overflow">
          <dl class="hhf-tableviews-with-swiper" :style="{transform:moveDistanceX,backgroundColor:bgcolor}">
              <dd class="hhf-slider-handle"
               @touchstart="touchStart($event,$event.currentTarget )" 
                 @touchmove="touchMove($event,$event.currentTarget )"
                 @touchend.stop="touchEnd($event,$event.currentTarget )" >
                  <slot></slot>
              </dd>
              <dd class="hhf-slider-right" ref="rightBar">
                <a class="hhf-slider-btn" >移入收藏</a><a class="hhf-slider-delete" @touchend.stop="touchDelete($event,$event.currentTarget)">删除</a>
              </dd>
          </dl>
</div>
</template>
<script>
import { compatible } from "@/assets/js/hhf";
export default {
  name: "ShoppingCar_godCat",
  props: ["routePath", "routeQuery", "hasDrag"], //路由路径  传参数对象键值对  用来还原所有拖曳数据
  watch: {
    hasDrag() {
      //console.log(this.hasDrag, "子");
      if (!this.hasDrag) {
        (this.initX = 0), //默认位置
          (this.moveDirectionX = 0), //手势方向
          (this.moveDistanceX = "translateX(0px)"), //移动距离
          (this.moveRecord = 0), //数字记录移动距离
          (this.touchStartX = 0), //触碰初始位置
          (this.touchEndX = 0), //触碰离开位置
          (this.moveState = true), //是否移动了
          (this.moveState2 = false);
        this.$emit("eventdrag", false);
      }
    }
  },
  data() {
    return {
      bgcolor: "#fff",
      initX: 0, //默认位置
      moveDirectionX: 0, //手势方向
      moveDistanceX: "translateX(0px)", //移动距离
      moveRecord: 0, //数字记录移动距离
      touchStartX: 0, //触碰初始位置
      touchEndX: 0, //触碰离开位置
      rightBarWidth: "", //leftbar的宽度
      moveState: true, //判断是否拖曳过就是触发过touchmove 触发为true（主要用来判断是否跳转）
      moveState2: false //判断当前子组件是否已经拖曳到true最左边
    };
  },
  methods: {
    /**
     * 删除当前购物车
     **/
    touchDelete(e,target){
      this.$emit('delete-car',e,target,this.routeQuery.id)
    },
    touchStart(e, target) {
      this.moveState = false;
      if (this.hasDrag) {
        this.$emit("eventdrag", false);
        //return false;
      }
      this.rightBarWidth = this.$refs.rightBar.offsetWidth;
      this.touchStartX = e.targetTouches[0].pageX;
    },
    touchMove(e, target) {
      this.moveState = true;
      this.moveDirectionX = e.targetTouches[0].pageX - this.touchStartX;
        //表示手势向左
      if (this.moveDirectionX < 0) {
        this.moveRecord = this.moveDirectionX;
        this.moveDistanceX = "translateX(" + this.moveRecord + "px)";
        this.bgcolor = "#" + Math.abs(this.moveRecord);
          //不能大于leftbar宽度
        if (Math.abs(this.moveRecord) > this.rightBarWidth) {
          this.moveRecord = -this.rightBarWidth;
          this.moveDistanceX = "translateX(" + this.moveRecord + "px)";
        }
      }
      
    },
    touchEnd(e, target) {
      // console.log(e,target)
      if (!this.moveState && this.moveRecord === 0) {
        this.$router.push({ path: this.routePath, query: this.routeQuery });
      }
      if (this.moveRecord < 0 && this.moveState2) {
        //初始化
        this.$emit("eventdrag", false);
        return false;
        //   this.moveDirectionX=0;//手势方向
        // this.moveDistanceX='translateX(0px)';//移动距离
        // this.moveRecord=0;
        // this.touchStartX=0;//触碰初始位置
        // this.touchEndX=0;//触碰离开位置
      }
      //this.moveState=false;
      this.touchEndX = e.changedTouches[0].pageX;
      if (Math.abs(this.moveRecord) < this.rightBarWidth / 2) {
        this.moveRecord = 0;
        this.moveDistanceX = "translateX(" + this.moveRecord + "px)";
      } else {
        this.moveRecord = -this.rightBarWidth;
        this.moveDistanceX = "translateX(" + this.moveRecord + "px)";
      }
      this.moveState2 = this.moveRecord < 0;
      if (this.moveRecord < 0) {
        this.$emit("eventdrag", true);
      }
    },
    closeListMenu(e, target) {
      let allHandle = document.querySelectorAll(".hhf-slider-handle");
      for (let i = 0; i < allHandle.length; i++) {
        allHandle[i].parentNode.style.transform = "translateX(" + 0 + "px)";
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.hhf-slider-overflow {
  overflow: hidden;
}
.hhf-tableviews-with-swiper {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  transition: 0.5s cubic-bezier(0, 0, 0.05, 1.05);
}
.hhf-tableviews-with-swiper::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0.5rem;
  height: 1px;
  content: "";
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}
.hhf-tableviews-with-swiper dd:last-child {
  position: absolute;
  right: 0;
  transform: translateX(100%);
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content: center;
}
.hhf-slider-btn,
.hhf-slider-delete {
  padding: 0 0.3rem;
  color: #fff;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.hhf-slider-btn {
  background-color: #f0ad4e;
}
.hhf-slider-delete {
  background-color: #dd524d;
}
.hhf-slider-handle {
  padding: 0.2rem 0.3rem 0.2rem 0;
}
</style>
