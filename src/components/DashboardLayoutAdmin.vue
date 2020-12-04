<template>
  <div class="dashboard">
    
    <v-app-bar color="grey darken-4" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Guided Vuefire</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="logout"><v-icon>mdi-logout</v-icon></v-btn>

    </v-app-bar>
    <!-- -->
    
    <!-- Buat Sidebar -->
    <v-navigation-drawer v-model="drawer" app>
      <!-- Cashier Icon dan nama -->
      <v-list-item>
        <v-list-item-content>
          <v-icon size="70" class="mb-5">$cashier</v-icon>
          <v-list-item-title class="text-h4 font-weight-medium mb-10">
            Cashier
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

       <v-list-item-group
          v-model="group"
          active-class="grey darken-1--text text--accent-4"
        >
      <router-link v-for="route in routes" :key="route.path" :to="route.path" tag="p">
            <v-list-item>
                <v-list-item-icon>
                  <v-icon>{{route.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{route.name}}</v-list-item-title>
            </v-list-item>
          </router-link>
      </v-list-item-group>

    </v-navigation-drawer>
    <!--  -->

    <div class="grey lighten-4 fullheight pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  name: "Dashboard",
  data: () => ({
    drawer: false,
    group: null,
    svgPath: mdiAccount,
    routes: [
              {path: 'dashboardAdmin', name: 'Dashboard', icon: '$cashier'},
              {path: 'item', name: 'Item List', icon: 'mdi-glass-mug'},
              {path: 'order', name: 'Order', icon: 'mdi-card-text-outline'},
              {path: 'history', name: 'Transaction History', icon: 'mdi-glass-mug'},
              {path: 'promo', name: 'Make Promo', icon: 'mdi-card-text-outline'}
            ],
  }),

  methods:{
    logout() {
            localStorage.setItem('idAdmin', '');
            localStorage.setItem('tokenAdmin', '');

            this.$router.push({
                name: 'LoginAdmin',
            });
      },
  },

  computed: {
    platform() {
      return "$" + this.user.platform;
    },
  },
};
</script>

<style scoped>
.fullheight {
  min-height: 100vh !important;
}
</style>