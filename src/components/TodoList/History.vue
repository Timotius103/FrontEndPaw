<template>
  <v-main class="list-UGD">
    <h3 class="text-h3 font-weight-medium mb-5">History</h3>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search">
      </v-data-table>
    </v-card>

    <v-snackbar v-model="snackbar" :color="color" timeout="10000" bottom>
        {{error_message}}
    </v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      load:false,
      search: null,
      items:[],
      orders:[],
      snackbar:false,
      error_message: '',
      color:'',
      headers: [
        {
          text: "Category",
          align: "start",
          sortable: true,
          value: "kategori",
        },
        { text: "Paper", value: "namaItem" },
        { text: "Color", value: "jenisWarna" },
        { text: "Service", value: "jenisServis" },
        { text: "Amount", value: "jumlah" },
        { text: "Price", value: "total" },
        { text: "Status", value: "statusPesan" },
      ],

      
    };
  },
  methods: {
    readData(){
        var url = this.$api + '/orderFinished/' + localStorage.getItem('id')
        this.$http.get(url, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.orders = response.data.data
        })
    },
  },

  mounted(){
    this.readData();
    },
};
</script>