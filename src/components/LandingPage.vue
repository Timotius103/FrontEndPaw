
<template>
  <div>
    <v-container id="scroll-target" style="max-height: 500px" class="overflow-y-auto">
        <!-- Buat Navbar -->
        <v-app-bar app fixed height="75px" color="white" light style="opacity: 0.8">
          <v-toolbar-title ><img src="../components/TodoList/logo.png" style="width: 40px; height:40px; position: relative; top: 3px;" >
            <font style="position: fixed; top: 15px; opacity: 1 !important " size="5">
              <font color="#D80F6D">Begadang</font>
              <font color="#0D8A9E">Printing</font>
            </font></v-toolbar-title>
          <v-spacer></v-spacer>
<!--          <v-btn text router ><h2><a href="#div-id" v-smooth-scroll="{ duration: 1000, offset: 0 }">About</a></h2></v-btn>-->
          <v-btn text router href="#div-id" v-smooth-scroll="{ duration: 3000, offset: 0 }" ><h2>About</h2></v-btn>
          <v-btn text router href="#contact" v-smooth-scroll="{ duration: 3000, offset: 0 }"><h2>Contact</h2></v-btn>
          <v-btn text router @click="login"><h2>Login</h2></v-btn>
        </v-app-bar>
    </v-container>
    <div>
      <v-carousel cycle height="100%" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" width="100%">
          <v-overlay absolute>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-4">
                <h2>WELCOME TO </h2>
                <P></P>
                <p class="text-lg-h1">BEGADANG PRINTER</p>
                <p></p>
                <p class="text-lg-h2">Reliable | Flexible | Expert | Comprehensive</p>
              </div>
            </v-row>
          </v-overlay>
        </v-carousel-item>
      </v-carousel>
    </div>
    <!-- carousel -->
    <div id="div-id">
        <v-card class="mx-auto" max-width="100%" height="500px" color="#1abc9c" dark>
          <v-row no-gutters style="height: 400px" align="center" justify="center">
            <v-col cols="9">
              <v-card-text class="pa-5 display-1" outlined tile>
                <h1>ABOUT</h1>
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text class="pa-5 display-1 text-right" outlined tile>
                A Platform that connect user with Begadang Printer to answer your document printing needs
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text class="pa-5 display-1 text-left" outlined tile>
                You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
    </div>
    <div id="contact">
      <v-card class="mx-auto" max-width="100%" height="600px" color="white" dark>
        <v-row no-gutters style="height: 550px" align="center" justify="center">
          <v-col cols="12">
            <v-card-text class="pa-5 display-2 text-center" outlined tile style="color: #2c3e50">
              <h1>CONTACT US</h1>
              <br><br>
              <div>
                <h6>Timotius Ferdinand Wijayanta / 180709845</h6>
                <h6>Chanadya Yustia Purnamawati / 180709844</h6>
                <h6>Jonathan Robertus / 180709646</h6>
                <h6>CTheodore Aldo Wijaya / 180709607</h6>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="alamat">
      <v-card class="mx-auto" max-width="100%" height="500px" color="#2c3e50" dark>
        <v-row no-gutters style="height: 400px" align="center" justify="center">
          <v-col cols="3">
            <v-card-text class="pa-5 display-1 text-center" outlined tile>
              <h3>LOCATION</h3>
              <p></p>
              <p class="text-md-h6">99999 Jalan Dark, Arkam Knight</p>
            </v-card-text>
          </v-col>
          <v-col cols="3">
            <v-card-text class="pa-5 display-1 text-center" outlined tile>
              <h3>AROUND THE WEB</h3>
              <p></p>
              <v-btn class="mx-4" dark icon href="https://www.instagram.com/">
                <v-icon size="24px">
                  mdi-instagram
                </v-icon>
              </v-btn>
              <v-btn class="mx-4" dark icon href="https://www.facebook.com/">
                <v-icon size="24px">
                  mdi-facebook
                </v-icon>
              </v-btn>
              <v-btn class="mx-4" dark icon href="https://twitter.com/twitter">
                <v-icon size="24px">
                  mdi-twitter
                </v-icon>
              </v-btn>
              <v-btn class="mx-4" dark icon href="https://id.linkedin.com/">
                <v-icon size="24px">
                  mdi-linkedin
                </v-icon>
              </v-btn>
            </v-card-text>
          </v-col>
          <v-col cols="3">
            <v-card-text class="pa-5 display-1 text-center" outlined tile>
              <h3>ABOUT BEGADANGPRINTING</h3>
              <p></p>
              <p class="text-md-h6">BegadangPrinting is the best printing center. Lest Join With Us Now! Start BegadangPrinting.</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div>
      <v-footer dark padless height="100px">
        <v-card-text class="py-2 white--text text-center">
          <h4>Copyright © 2020 BegadangPrinter.com All rights reserved</h4>
        </v-card-text>
      </v-footer>
    </div>
  </div>
</template>
<style>

</style>
<script>

  export default {
    data () {
      return {
        abouthal:false,
        slide: [
          'WELCOME',
          'HALLO',
          'HAI',
        ],
        items: [
          {
            src: require("./landingpage.jpg"),
          },
          {
            src: require("./landingpage2.jpg"),
          },
          {
            src: require("./landingpage3.jpg"),
          },
        ],
      }
    },
    methods: {
      login() {
          this.$router.push({
              name: 'Login',
          })
      },
      about() {
          this.$router.push({
              name:'About',
          })
      }
    }
  }
</script>
