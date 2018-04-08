import Vue from "vue";

export class compatible{
    constructor() { }
    stopFunc(e) { e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true; }
    passiveSupported(){
        let supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function() {
              supportsPassive = true;
            }
          });
          window.addEventListener("test", null, opts);
        } catch (e) {}
        return supportsPassive
    }
};
(function(){
    Vue.component('hhf-header-title',{
        template:'<div class="container"><sort></sort></div>'
    });
    Vue.component('app-header',{
        template:'<div class="header" slot="header">this is header</div>'
    });
    Vue.component('app-content',{
        template:'<div class="content">this is content</div>'
    });
    Vue.component('app-footer',{
        template:'<div class="footer">this is footer</div>'
    });
})(window,document,Vue)