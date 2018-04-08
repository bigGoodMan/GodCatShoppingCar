<template> 
<label class="check" @touchstart.stop="stopFalse($event,$event.target)"> 
  <input ref="thisCheck" class="check-box" type="checkbox" v-model="checked" :value="value" @change.stop="updateInput"> 
  <span class="check-circle"></span>
  <slot></slot>
   </label> 
  </template> 
  <script>
export default {
  model: { prop: "modelValue", event: "change" },
  props: {
    value: { type: String | Number },
    modelValue: { default: false },
    label: { type: String, required: true },
    contentLength: { type: Array },
    // 我们将 `true-value` 和 `false-value` 设置为 true 和 false
    // 我们可以随时使用它们，而不用检查它们是否被设置。
    // 也可以在这里使用驼峰命名，但要用连字符分隔属性名称
    // 使用组件时仍然有效
    trueValue: { default: true },
    falseValue: { default: false },
  },
  data() {
    return {
      checked: this.falseValue,
      content:[]
    };
  },
  watch:{
modelValue(){
  //if(this.modelValue.includes(this.value)){
    if(this.modelValue.length===this.contentLength.length&&this.contentLength.length!==0){
      this.checked=this.trueValue;
 }else if(this.modelValue.includes(this.value)){
    this.checked=this.trueValue;
 }else{
   this.checked=this.falseValue;
  // setTimeout(()=>{console.log('我不信');this.$refs.thisCheck.checked=this.falseValue},0)
 }
 }
  },
  computed: {
    // shouldBeChecked() {
    //   if (this.modelValue instanceof Array) {
    //      return this.modelValue.includes(this.value);
    //   }
    //   // 请注意，"true-value" 和 "false-value" 是 JS 中的驼峰命名
    //   return this.modelValue === this.trueValue;
    // }
  },
  methods: {
    updateInput(event) {
      let isChecked = this.checked;
      if (this.modelValue instanceof Array) {
        if (this.label === "ALL") {
          if (isChecked&&this.contentLength.length!==0) {
            this.content = [...this.contentLength];
          } else {
            this.content = [];
          }
        } else {
        this.content=this.modelValue;
          if (isChecked) {
            this.content.push(this.value);
          } else {
            this.content.splice(this.content.indexOf(this.value), 1);
          }
        }
        this.$emit("change", this.content);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
    },
    initInput() {
      if (this.modelValue instanceof Array) {
        if (this.modelValue.includes(this.value)) {
          this.checked = this.trueValue;
        }
      }
    },
    stopFalse(e, target) {
      // console.log(this.checked)
      // console.log(this.modelValue)
      // console.log(this.$refs.thisCheck.checked)
    }
  },
  created() {},
  mounted() {
    this.initInput();
  }
};
</script>

<style scoped>
.check {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.check-circle {
  display: inline-block;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.check-box {
  display: none;
}
.check-box:checked + .check-circle {
  background-color: #26a2ff;
  border-color: #26a2ff;
}
.check-box:checked + .check-circle::after {
  border-color: #fff;
  transform: rotate(45deg) scale(1);
}
.check-circle::after {
  border: 2px solid transparent;
  border-left: 0;
  border-top: 0;
  content: "";
  top: 3px;
  left: 6px;
  position: absolute;
  width: 4px;
  height: 8px;
  transform: rotate(45deg) scale(0);
  transition: transform 0.2s;
}
</style>
