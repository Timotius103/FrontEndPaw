import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css'
import vueSmoothScroll from 'vue-smooth-scroll'

Vue.use(vueSmoothScroll)
Vue.use(Vuetify)

export default new Vuetify({
    icons: {
      iconfont: 'mdi' || 'fa', // default - only for display purposes
      values: {
        cashier: 'mdi-cash-register',
        support: 'mdi-lifebuoy',
        steam: 'mdi-steam-box',
        pc: 'mdi-desktop-classic',
        xbox: 'mdi-xbox',
        playstation: 'mdi-playstation',
        switch: 'mdi-nintendo-switch',
      },
    },
  })
