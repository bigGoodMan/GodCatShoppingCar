<template>
  <div>
<buy-car-header left-icon="jiantouyou" left-title="返回" right-icon="ziyuan" right-title="分类">{{carArr}}
</buy-car-header>
<!-- <div>
            <input type="checkbox" id="JSPang" value="JSPang" v-model="web_Names">
            <input type="checkbox" id="Panda" value="Panda" v-model="web_Names">
            <input type="checkbox" id="PanPan" value="PanPan" v-model="web_Names">
            <p>{{web_Names}}</p>
       </div> -->
<buy-car-sliding-list v-for="(item,index) in items" :routePath="'/'" :key="index" :routeQuery="{id:item.id,pid:item.pid}">
<div class="car-list">
  <hhf-checkbox name="subscribe" :value="item.id" label="CSS" :falseValue="index==0"  v-model="carArr"></hhf-checkbox>
  <div><img :src="item.img" alt=""></div>
  <div>
    <p>{{item.describe}}</p>
    <p>{{item.spec}}</p>
  </div>
  </div>
  </buy-car-sliding-list>
  </div>
</template>

<script>
import BuyCar_header from "@/components/mode/BuyCar_header";
import BuyCar_slidingList from "@/components/assembly/BuyCar_slidingList";
import BuyCar_checkBox from "@/components/assembly/BuyCar_checkBox";
export default {
  name: "BuyCar",
  components: {
    "buy-car-header": BuyCar_header,
    "buy-car-sliding-list": BuyCar_slidingList,
    "hhf-checkbox": BuyCar_checkBox
  },
  watch: {
    // foo(){
    //   console.log(this.foo)
    // }
  },
  methods: {},
  mounted() {},
  data() {
    return {
      items: [
        {
          id: 1,
          pid: 2,
          spec:'黑色/41码',
          img:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/b80a043c57da31ca37f99c22b53511e3_121_121.jpg",
          describe:
            "天猫 - 专业线上综合购物平台，全球消费者挚爱的品质购物之城！商品涵盖服饰箱包、美妆个护、家电数码、母婴玩具、美食酒水、家装家居等各大品类，旨在引领中国消费者第一时间发现和体验全球化、更优质的生活方式，提前开启趋势中的理想生活！理想生活，上天猫！"
        },
        {
          id: 3,
          pid: 4,
          spec:'白色/L',
          img:
            "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1849554781,868805578&fm=58&bpow=0&bpoh=0",
          describe:
            "淘宝网是亚太地区较大的网络零售、商圈，由阿里巴巴集团在2003年5月创立。淘宝网是中国深受欢迎的网购零售平台，拥有近5亿的注册用户数，每天有超过6000万的固定访客，同时每天的在线商品数已经超过了8亿件，平均每分钟售出4.8万件商品"
        },
        {
          id: 5,
          pid: 6,
          spec:'蓝色/180',
          img:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/299c55e31d7f50ae4dc85faa90d6f445_121_121.jpg",
          describe:
            "京东JD.COM-专业综合网上购物商城，销售超数万品牌、4020万种商品，囊括家电、手机、电脑、服装、居家、母婴、个护、食品、旅游等13大品类。京东PLUS会员，免费体验30天。秉承客户为先的理念，京东所售商品100％正品行货、全国联保、机打发票。提供专业配送、售后服务！"
        },
        {
          id: 7,
          pid: 8,
          spec:'红色/31码',
          img:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/596dcc03554a7df640fdbb60f40a4dcd_121_121.jpg",
          describe:
            "【今日特卖大牌】唯品会 - 全球精选，正品特卖！都是傲娇的品牌，只卖呆萌的价格！商品囊括了时尚女装、童装、美妆、美鞋、男装、居家、母婴、配饰、皮具、香水等。每天10点上新，精选100+个品牌授权特卖，100%正品保证，限量抢购，支持货到付款，7天无条件退货！"
        },
        {
          id: 9,
          pid: 10,
          spec:'灰色',
          img:
            "https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/ac825a3ea39dba045c4943a00a013010_121_121.jpg",
          describe:
            "亚马逊中国(Z.CN)-全球著名购物平台的中国站点,汇聚了千万国际品牌好货,【图书满150折上7折】,囊括鞋靴、母婴、厨具、美妆等32大品类,品质可靠.【亚马逊海外购】纯正海外货,美亚、英亚、日亚、德亚直邮,加入【亚马逊Prime会员】海外购商品跨境免邮,立即免费试享30天!"
        }
      ],
      carArr: [],
      foo: []
    };
  }
};
// Vue.commont('left-div',{
//   template:'<div>123</div>'
// })
</script>

<style scoped>
.car-list {
  display: flex;
  flex-direction: row;
  /* nowrap不换行 | wrap换行第一行在上方 | wrap-reverse;换行第一行在下方 */
  flex-wrap: nowrap;
  /* flex-flow: <flex-direction> || <flex-wrap>;简写 */
  /* 项目对齐方向flex-start左对齐 | flex-end右对齐 | center居中 | space-between 两端对齐，项目之间的间隔相等| space-around;每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍 */
  justify-content: center;
}
.car-list div:first-of-type{  
    width: 20%;
}
.car-list div:first-of-type img{
max-width: 100%;
}
.car-list div:last-child{
  font-size: .28rem;
  padding: 0 .1rem;
  color: #000;
  display: inline-flex;
    flex-grow: 1;
  width: 50%;
  flex-direction: column;

}
.car-list div:last-child :first-child{
  color: #333;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2; 
height: .8rem;
overflow: hidden; 
}
.car-list div:last-child :last-child{
  color: #999999;
  font-size: .24rem;
}
</style>

