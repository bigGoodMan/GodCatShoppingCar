<template>
<div class="hhf-slider-overflow">
          <dl class="hhf-tableviews-with-swiper" >
              <dd class="hhf-slider-handle" @touchmove.passive="touchMove" @touchend="touchEnd"  @touchstart="leftMove($event,$event.currentTarget)" >
                  <slot></slot>
              </dd>
              <dd class="hhf-slider-right">
                <a class="hhf-slider-btn" @>移入收藏</a><a class="hhf-slider-delete">删除</a>
              </dd>
          </dl>
</div>
</template>
<script>
import {compatible} from  "@/assets/js/hhf";
export default {
  name: "BuyCar_slidingList",
  props:['routePath','routeQuery'],//路由路径  传参数对象键值对
  methods: {
    touchMove(){},
    touchEnd(){},
    //放置方法
    leftMove(e, target) {
      let //slider_handle = target.querySelector(".hhf-slider-handle"),
      slider_right = target.parentNode.querySelector(".hhf-slider-right");
      let lock = true; //是否跳转
      let allHandle = document.querySelectorAll(".hhf-slider-handle");
      for (let i = 0; i < allHandle.length; i++) {
        let _translateX =
          allHandle[i].parentNode.style.transform
            .replace(/translateX\(/g, "")
            .replace(/px\)/g, "") * 1;
            if(_translateX!==0){
                allHandle[i].parentNode.style.transform = "translateX(" + 0 + "px)";
                return;
            }
      }
      // console.log(e.targetTouches[0]);
      let initX, //初始x轴触碰初始位置
        moveEndX, //偏移最后位置
        moveDistanceX = 0, //偏移的距离
        objX = 0; //当前对象的translate
      // target.style.transition="initial";
      //记录触碰时的x轴
      initX = e.targetTouches[0].pageX;
      //把当前滑块translate距离取出来
      objX =
        target.parentNode.style.transform
          .replace(/translateX\(/g, "")
          .replace(/px\)/g, "") * 1;
      if (objX === 0) {
        //如果滑块是初始状态
        target.addEventListener("touchmove", function(event) {
            lock=false;
          //偏移最后的位置
          moveEndX = event.targetTouches[0].pageX;
          //偏移的距离
          moveDistanceX = moveEndX - initX;
          if (moveDistanceX > 0) {
            //向右滑动
            target.parentNode.style.transform = "translateX(" + 0 + "px)";
          } else if (moveDistanceX < 0) {
            //向左滑动
            let l = Math.abs(moveDistanceX);
            if (l > slider_right.offsetWidth) {
              //滑动距离大于菜单大小
              l = slider_right.offsetWidth;
              // target.style.transition = "1s cubic-bezier(0, 0, 0.05, 1.05)";
            }
            target.parentNode.style.transform = "translateX(" + -l + "px)";
          }
        },compatible.passiveSupported?{ passive: true }:false);
      } else if (objX < 0) {
        //滑块已经滑动完成后的状态
        target.addEventListener("touchmove", function(event) {
            lock=false;
          //偏移最后的位置
          moveEndX = event.targetTouches[0].pageX;
          //偏移的距离
          moveDistanceX = moveEndX - initX;
          if (moveDistanceX > 0) {
            //向右滑动
            let r = -slider_right.offsetWidth + Math.abs(moveDistanceX);
            if (r === 0) {
              r = 0;
            }
            target.parentNode.style.transform = "translateX(" + r + "px)";
          } else {
            //向右滑动
            target.parentNode.style.transform =
              "translateX(" + -slider_right.offsetWidth + "px)";
          }
        },compatible.passiveSupported?{ passive: true }:false);
      }
      target.addEventListener("touchend", event=> {
          if(lock&&this.routePath!==undefined&&this.routeQuery!==undefined){//路由跳转
          let _routePath=this.routePath,_routeQuery=this.routeQuery;
             this.$router.push({path: _routePath, query: _routeQuery});
              //return;
          }
        //把当前滑块translate距离取出来
        objX =
          target.parentNode.style.transform
            .replace(/translateX\(/g, "")
            .replace(/px\)/g, "") * 1;
        //target.style.transition = "1s cubic-bezier(0, 0, 0.05, 1.05)";
        if (objX < -(slider_right.offsetWidth / 2)) {
          target.parentNode.style.transform =
            "translateX(" + -slider_right.offsetWidth + "px)";
        } else {
          target.parentNode.style.transform = "translateX(" + 0 + "px)";
        }
      },compatible.passiveSupported?{ passive: true }:false);
    },
    closeListMenu(e, target) {
      let allHandle = document.querySelectorAll(".hhf-slider-handle");
      for (let i = 0; i < allHandle.length; i++) {
        allHandle[i].parentNode.style.transform = "translateX(" + 0 + "px)";
      }
    }
  },
  mounted(){
  },
  data() {
    return {};
  }
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
  flex-direction:row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;  
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content:center;
}
.hhf-slider-btn,
.hhf-slider-delete {
  padding:0 0.3rem;
  color: #fff;
  height: 100%;
  display: inline-flex;
  justify-content:center;
            align-items:center;
  flex-grow: 1;
}
.hhf-slider-btn {
  background-color: #f0ad4e;
}
.hhf-slider-delete {
  background-color: #dd524d;
}
.hhf-slider-handle {
  padding: 0.2rem 0.3rem 0.2rem 0.1rem;
}
</style>
