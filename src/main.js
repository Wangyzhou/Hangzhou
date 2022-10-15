import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import './utils/dialogDrag.js'
import {Layer} from './static/js/Layer.js'
import {LayerManager} from './static/js/LayerManager.js'
import "leaflet";
import "leaflet/dist/leaflet.css";
import router from '../src/router/index.js'
import './style/index.css'
import global from './components/global.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

var cesium = require('cesium/Cesium');
var widgets= require('cesium/Widgets/widgets.css');
 
Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets
Vue.prototype.GLOBAL = global

new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
