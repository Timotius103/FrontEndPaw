<template>
  <v-contentainer fluid fill-height class="posisiku">
    <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="6">
            <v-card class="elevation-12">
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-card-text class="mt-12">
                                    <h2 class="text-center display-2 black--text text--accent-3">Log In</h2>
                                    <h4 class="text-center mlt-4">Ensure your email for registration</h4>
                                    <v-form v-model="valid" ref="form">
                                        <v-text-field label="E-mail" prepend-icon="email" type="text" color="grey accent-3"  v-model="email" :rules="emailRules" required></v-text-field>
                                        <v-text-field label="Password" prepend-icon="lock" type="password" color="grey accent-3" v-model="password" min="8" :rules="passwordRules" counter required></v-text-field>
                                        <div class="text-center mt-3">
                                          <v-btn rounded color="red accent-3" dark @click="submit">Log In</v-btn>
                                      </div>
                                    </v-form>
                                    <!-- <h5 class="text-center mt-3">Forget your password ?</h5> -->
                                </v-card-text>
                            </v-col>
                            <v-col cols="12" md="6" class="blue accent-3">
                                <v-card-text class="white--text mt-12">
                                    <h1 class="text-center display-1">Begadang Printer</h1>
                                    <h5 class="text-center">Enter your personel details and start journey with us</h5>
                                    <h5 class="text-center">Not a member? </h5>
                                    <h5 class="text-center">Create your account by click</h5>
                                </v-card-text>
                                <div class="text-center">
                                    <v-btn rounded outlined="" dark @click="step++">SIGN UP</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-window-item >
                    <v-window-item :value="2">
                        <v-row class="fill-height">
                            <v-col cols="12" md="6" class="blue accent-3">
                                <v-card-text class="white--text mt-12">
                                    <h1 class="text-center display-1">Begadang Printer</h1>
                                    <h5 class="text-center">To keep connected with us please create your account</h5>
                                    <h5 class="text-center">Have an account ?  Login </h5>
                                </v-card-text>
                                <div class="text-center">
                                    <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-card-text class="mt-12">
                                    <h2 class="text--center display-2 black--text text-accent-3">Sign Up</h2>
                                    <h4 class="text-center mt-4">Ensure your email for registration</h4>
                                    <v-form>
                                        <v-text-field label="FullName" prepend-icon="person" type="text" color="teal accent-3" v-model="fullnameRegis" required></v-text-field>
                                        <!-- <v-text-field label="Phone" name="Phone" prepend-icon="phone" type="text" color="teal accent-3"/> -->
                                        <v-text-field label="Email" name="Email" prepend-icon="email" type="text" color="teal accent-3" v-model="emailRegis" required></v-text-field>
                                        <!-- <v-text-field label="Username" name="Username" prepend-icon="name" type="text" color="teal accent-3"/> -->
                                        <v-text-field label="Password" prepend-icon="lock" type="password" color="teal accent-3" v-model="passwordRegis" required></v-text-field>
                                    <br>
                                    <div class="text-center mt-n5">
                                      <v-btn rounded color="red accent-3" dark @click="signup">SIGN UP</v-btn>
                                    </div>
                                    </v-form>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{error_message}}
    </v-snackbar>
    <v-footer dark padless class="posisi">
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">Get connected with us on social networks!</strong>
          <v-spacer></v-spacer>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-2 white--text text-center">
           <strong>Copyright © 2020 BegadangPrinter.com All rights reserved</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-contentainer>
</template>
<style>
.posisiku {
  position: absolute;
  top: 300px;
  left: 0px;
  right: 0px;
}
.posisi{
  margin-top: 465px;
}
</style>
<script>
export default {
    data: () => ({
        step: 1,
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        valid: false,
        password: '',
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
        passwordRules:[
            (v) => !!v || 'Password tidak boleh kosong',
        ],
        email: '',
        emailRules:[
            (v) => !!v || 'E-mail tidak boleh kosong',
        ],
        emailRegis:'',
        passwordRegis:'',
        fullnameRegis:'',
    }),
    props: {
        source: String
    },

    methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek apakah data yang akan dikirim sudah valid
        this.load = true;
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if(response.data.user.status == 'admin'){
                this.error_message = 'Anda login sebagai admin';
                this.color = "red";
                this.snackbar = true;
                this.$router.push({
                    name: "Login",
                });

            }else{
                localStorage.setItem("id", response.data.user.id); //menyimpan id user yang sedang login
                localStorage.setItem("token", response.data.access_token);

                //menyimpan auth token
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.clear();
                this.$router.push({
                    name: "Profile",
                });
            }
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    signup(){
        this.load = true;
        this.$http
          .post(this.$api + "/register", {
            name: this.fullnameRegis,
            email: this.emailRegis,
            password: this.passwordRegis,
          })
          .then((response) => {
              //localStorage.setItem("id", response.data.user.id); //menyimpan id user yang sedang login
              //localStorage.setItem("token", response.data.access_token);

              //menyimpan auth token
              this.error_message = response.data.message;
              this.color = "green";
              this.snackbar = true;
              this.load = false;
              this.clear();
              this.$router.push({
                  name: "LandingPage",
              });

          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
    },
    clear() {
      this.$refs.form.reset(); //Clear form login
    },
  },
};
</script>
