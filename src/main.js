import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Qrcode from 'qrcode'

Vue.use(ElementUI)
Vue.use(Qrcode)

Vue.config.productionTip = false

Vue.prototype.$axios=axios

Vue.filter("date",(val)=>{
  var date=new Date(val)
  var y=date.getFullYear() 
  var m=date.getMonth()+1
  m>9?m:"0"+m
  var d=date.getDate()
  d>9?d:"0"+d
  return y+"-"+m+"-"+d
})
Vue.filter("datatime",(val)=>{
  var date=new Date(val)
  var y=date.getFullYear() 
  var m=date.getMonth()+1
  m>9?m:"0"+m
  var d=date.getDate()
  d>9?d:"0"+d
  var h=date.getHours()
  h>9?h:"0"+h
  var minute=date.getMinutes()
  minute>9?minute:"0"+minute
  var s=date.getSeconds()
  s>9?s:"0"+s
  return y+"-"+m+"-"+d+" "+h+":"+minute+":"+s
})
Vue.filter("currency",(val)=>{
  return "¥"+val.toFixed(2)
})
Vue.filter("tableStatus",(val)=>{
  return val==1?"空闲":val==2?"预定":val==3?"占用":"其它"
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
