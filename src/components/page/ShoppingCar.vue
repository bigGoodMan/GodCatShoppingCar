<template>
  <div>
<buy-car-header class="shopping-car-header" left-icon="jiantouyou" left-title="返回" right-icon="ziyuan" right-title="分类">{{carArr}}
</buy-car-header>
<!-- <div>
            <input type="checkbox" id="JSPang" value="JSPang" v-model="web_Names">
            <input type="checkbox" id="Panda" value="Panda" v-model="web_Names">
            <input type="checkbox" id="PanPan" value="PanPan" v-model="web_Names">
            <p>{{web_Names}}</p>
       </div> -->
<div class="shopping-car-content">
  <shopping-car-god-cat
   v-for="item in substrText"
    :routePath="'/'"  
    :key="item.id"
     :hasDrag="hasDrag" 
     @eventdrag="restoreDrag" 
     :routeQuery="{id:item.id,pid:item.pid}"  
     @delete-car="deleteList"
     >
<div class="car-list">
  <hhf-checkbox name="subscribe" :value="item.id" :contentLength="contentArr" label="CSS"  v-model="carArr"></hhf-checkbox>
  <div><img :src="item.img" alt=""></div>
  <div>
    <p>{{item.describe}}</p>
    <p>{{item.spec}}</p>
  </div>
  <div>
    <p>￥{{item.price}}</p>
    <p>×{{item.num}}</p>
  </div>
  </div>
  </shopping-car-god-cat></div>
  <dl class="settlement">
    <dt class="settlement-all-check">
      <hhf-checkbox name="subscribe"  label="ALL" :contentLength="contentArr"  v-model="carArr"><span style="padding-left:0.2rem;color:#333;">全选</span></hhf-checkbox>
    </dt>
    <dd class="settlement-price">
    <div>合计：<span>￥{{totalPrice}}</span></div>
    </dd>
    <dd class="settlement-button">结算({{carArr.length}})</dd>
  </dl>
  </div>
</template>

<script>
import BuyCar_header from "@/components/mode/BuyCar_header";
import ShoppingCar_godCat from "@/components/assembly/ShoppingCar_godCat";
import BuyCar_checkBox from "@/components/assembly/BuyCar_checkBox";
import {myGlobalClass} from "@/assets/js/common";
export default {
  name: "BuyCar",
  components: {
    "buy-car-header": BuyCar_header,
    "shopping-car-god-cat": ShoppingCar_godCat,
    "hhf-checkbox": BuyCar_checkBox
  },
  watch: {
    // foo(){
    //   console.log(this.foo)
    // }
  },
  computed: {
    //计算选中产品价格总和
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.carArr.length; i++) {
        for (let j = 0; j < this.items.length; j++) {
          let parintCarId = parseInt(this.carArr[i]),
            parintItemid = parseInt(this.items[j].id);
          if (parintCarId === parintItemid) {
            total = total + this.items[j].price * 1;
          }
        }
      }
      return total;
    },
    //返回经过计算的购物车数据（这里只是对描述进行了处理）该数据随时等待改变
    substrText(){
      return this.items.map((v,i)=>{
        v.describe=myGlobalClass.substrText(v.describe,this.textLength)
        v.id=v.id.toString()
        return v
      })
    }
  },
  methods: {
    /**
     * 单个删除
     * @param {Object} e
     * @param {Object} target
     * @param {Object} id  删除id
     * */
    deleteList(e,target,id){
      //删除购物车某条id数据
if(this.contentArr.includes(id)){
  this.contentArr.splice(this.contentArr.indexOf(id),1)
}
//删除购物车选中
if(this.carArr.includes(id)){
  this.carArr.splice(this.carArr.indexOf(id),1)
}else{
  //监控着carArr让它触发一下
  this.carArr=this.carArr.join(',').split(',')
}
  this.items = this.items.filter((v, i) => v.id!==id )
    },
    restoreDrag(check) {
      //是否还原方法必填（把所有侧滑归位）
      this.hasDrag = check;
    }
  },
  mounted() {},
  data() {
    return {
      textLength:20,//截取字体长度
      items: [//数据
        {
          id: 1,
          pid: 2,
          spec: "黑色/41码",
          img:
            require("@/assets/images/b80a043c57da31ca37f99c22b53511e3_121_121.jpg"),
          describe:
            "天猫 - 专业线上综合购物平台，全球消费者挚爱的品质购物之城！商品涵盖服饰箱包、美妆个护、家电数码、母婴玩具、美食酒水、家装家居等各大品类，旨在引领中国消费者第一时间发现和体验全球化、更优质的生活方式，提前开启趋势中的理想生活！理想生活，上天猫！",
          price: "50",
          num:1
        },
        {
          id: 3,
          pid: 4,
          spec: "白色/L",
          img:
            require("@/assets/images/u=1849554781,868805578&fm=58&bpow=0&bpoh=0.jpg"),
          describe:
            "淘宝网是亚太地区较大的网络零售、商圈，由阿里巴巴集团在2003年5月创立。淘宝网是中国深受欢迎的网购零售平台，拥有近5亿的注册用户数，每天有超过6000万的固定访客，同时每天的在线商品数已经超过了8亿件，平均每分钟售出4.8万件商品",
          price: "51",
          num:2
        },
        {
          id: 5,
          pid: 6,
          spec: "蓝色/180",
          img:
            require("@/assets/images/299c55e31d7f50ae4dc85faa90d6f445_121_121.jpg"),
          describe:
            "京东JD.COM-专业综合网上购物商城，销售超数万品牌、4020万种商品，囊括家电、手机、电脑、服装、居家、母婴、个护、食品、旅游等13大品类。京东PLUS会员，免费体验30天。秉承客户为先的理念，京东所售商品100％正品行货、全国联保、机打发票。提供专业配送、售后服务！",
          price: "23",
          num:3
        },
        {
          id: 7,
          pid: 8,
          spec: "红色/31码",
          img:
            require("@/assets/images/596dcc03554a7df640fdbb60f40a4dcd_121_121.jpg"),
          describe:
            "【今日特卖大牌】唯品会 - 全球精选，正品特卖！都是傲娇的品牌，只卖呆萌的价格！商品囊括了时尚女装、童装、美妆、美鞋、男装、居家、母婴、配饰、皮具、香水等。每天10点上新，精选100+个品牌授权特卖，100%正品保证，限量抢购，支持货到付款，7天无条件退货！",
          price: "43",
          num:5
        },
        {
          id: 9,
          pid: 10,
          spec: "灰色",
          img:
            require("@/assets/images/ac825a3ea39dba045c4943a00a013010_121_121.jpg"),
          describe:
            "亚马逊中国(Z.CN)-全球著名购物平台的中国站点,汇聚了千万国际品牌好货,【图书满150折上7折】,囊括鞋靴、母婴、厨具、美妆等32大品类,品质可靠.【亚马逊海外购】纯正海外货,美亚、英亚、日亚、德亚直邮,加入【亚马逊Prime会员】海外购商品跨境免邮,立即免费试享30天!",
          price: "33",
          num:10
        }
      ],
      contentArr: ['1', '3', '5', '7', '9'],//把所有的id取出来放在一起（用来做复选框判断用）（不要忘记删除的时候这边也要变化）
      carArr:[], //[1, 3],//用来判断储存选中项（这里默认选中了1,3）（不要忘记删除的时候这边也要变化）
      hasDrag: false //用来还原所有的拖曳（true：当前列表菜单已经拖曳到最左边）false默认状态即未拖动时 必填
    };
  }
};
// Vue.commont('left-div',{
//   template:'<div>123</div>'
// })
</script>

<style scoped>
.shopping-car-header{
  position: relative;
  z-index: 10;
}
.shopping-car-content{
  position: absolute;
  width:100%;
  top: 0;
  left: 0;
  padding: .8rem 0;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  overflow-y: auto;
}
.car-list {
  display: flex;
  flex-direction: row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content: center;
}
.car-list label{
  flex-grow: 1;
}
.car-list div:first-of-type {
  flex-grow: 1;
  width: 13%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.car-list div:first-of-type img {
  max-width: 100%;
  vertical-align: middle;
}
.car-list div:nth-of-type(2) {
  font-size: 0.22rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  color: #000;
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  width: 40%;
}
.car-list div:nth-of-type(2) :first-child {
  color: #333;
  text-align: justify;
  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 0.8rem;
  overflow: hidden; */
}
.car-list div:nth-of-type(2)  :last-child {
  color: #999999;
  font-size: 0.20rem;
}
.car-list div:last-of-type{
  flex-grow: 1;
  text-align: right;
  width: 15%;
}
.car-list div:last-of-type :first-child{
color:#FF5722;
  font-size: 0.22rem;
}
.car-list div:last-of-type :last-child{
  color: #999999;
  font-size: 0.20rem;
}
.settlement{
  display: flex;
  flex-direction: row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #fff;
}
.settlement-all-check{
flex-grow: 0.2;
  display: inline-flex;
   flex-direction: row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content: center;
  height: .8rem;
}
.settlement-all-check,.settlement-price{
  border-top: 1px solid #dddddd;
}
.settlement-all-check label{
  width: 100%;
}
.settlement-price{
  flex-grow: 1;
  text-align: right;
  font-size: 0.2rem;
  line-height: .8rem;
}
.settlement-price span{
padding-right: 0.2rem;
color:#FF5722;
}
.settlement-button{
  flex-grow: 0.5;
  line-height: .8rem;
  background-color: #FF5722;
  text-align: center;
  color:#fff;
}
</style>

