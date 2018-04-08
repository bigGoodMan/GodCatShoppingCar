<template>
<div>
  <div class="check"></div>
  <div class="triangle"></div>
  </div>
</template>
<script>
export default {
  name:'test',
data(){
    return{
swiperContent:[]
    }
}
}
</script>

<style scoped>
.check{ 
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid #ccc;
    position: relative;
    width: 100px;
    height: 100px;
    vertical-align: middle;
    background-color: #26a2ff;
    border-color: #26a2ff;
}
.check::after{
    border: 20px solid #fff;
    border-top: 0;
    content:"";
    top: 20px;
    left: 20px;
    position: absolute;
    width: 4px;
    height: 8px;
}
.triangle{
    display: inline-block;
    width: 100px;
    height: 100px;
    position: relative;
}
.triangle::before{
    content:"";
    position: absolute;
    top: 10px;
    left: 10px;
    border: 32px solid transparent;
    border-top-color:#26a2ff;
}
</style>

