<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app :color = warna1>
      <v-divider></v-divider>
      <v-list danse nav style="color: #42b983">
        <v-list-item router to="/">
          <v-list-item-action style="color: white">
            <v-icon>mdi-package</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: white">
            <v-list-item-title><h3>Dashboard</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/profile">
          <v-list-item-action style="color: white">
            <v-icon>mdi-account-circle </v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: white">
            <v-list-item-title><h3>Profile</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/order">
          <v-list-item-action style="color: white">
            <v-icon>mdi-cash-usd</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: white">
            <v-list-item-title><h3>Order</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/history">
          <v-list-item-action style="color: white">
            <v-icon>mdi-history</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: white">
            <v-list-item-title><h3>History</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/promo">
          <v-list-item-action style="color: white">
            <v-icon>mdi-check-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color: white">
            <v-list-item-title><h3>Promo</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed height="75px" color="white" light style="opacity: 0.8">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title ><img src="~@/components/TodoList/logo.png" style="width: 40px; height:40px; position: relative; top: 3px;" >
        <font style="position: fixed; top: 15px; opacity: 1 !important " size="5">
          <font color="#D80F6D">Begadang</font>
          <font color="#0D8A9E">Printing</font>
        </font></v-toolbar-title>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router @click="about"><v-icon>mdi-account</v-icon></v-btn>
        <v-btn text router @click="logout"><v-icon>mdi-power</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <div class="fullheight pa-5" :style="{ backgroundImage: 'url(' + require('@/components/background.jpg') + ')', height: '100%', width: '100%', position: 'fixed', top: '0', objectFit: 'cover', backgroundSize: 'cover'} ">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  name: "Dashboard",
  data() {
    return {
      drawer: false,
      group: null,
      warna1: '#0D8A9E',
      svgPath: mdiAccount,
      props:true,
    };
  },
  methods:{
    logout() {
            localStorage.setItem('id', '');
            localStorage.setItem('token', '');

            this.$router.push({
                name: 'Login',
            });
        },

    about() {
          this.$router.push({
            name:'About',
          });
    }
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
  height: 100%;
  width: 100vw;
  position: fixed;
  top: 0;

}
</style>
