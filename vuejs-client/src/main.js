import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'ws://192.168.1.49:8081', { reconnection: true, format: 'json'  })

new Vue({
 vuetify,
  render: h => h(App)
}).$mount('#app')
