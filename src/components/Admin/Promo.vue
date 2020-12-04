<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">BERITAKAN KEPADA KAWAN BOBOHO</h3>

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
        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="products" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>

          <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Produk</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
              v-model="form.judul"
              label="judul"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.deskripsi"
              label="deskripsi"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.promoURL"
              label="promoURL"
              required
            ></v-text-field>

          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>

          <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">warning!</span> 
        </v-card-title>

        <v-card-text> Anda yakin ingin menghapus produk ini?  </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false">
            Cancel
          </v-btn>

          <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
        
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

 <script>
export default {
  name: "List",
  data() {
    return {
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        {
          text: "Nama produk",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "judul", value: "judul" },
        { text: "deskripsi", value: "deskripsi" },
        { text: "promoURL", value: "promoURL" },
        { text: "Actions", value: "actions" },
      ],
      product: new FormData(),
      products: [],
      form: {
        id: null,
        judul: null,
        deskripsi: null,
        promoURL: null,
      },
      deleteId: "",
      editId: "",
    };
  },

  methods: {
    setForm() {
      if (this.inputType === "Tambah") {
        this.save();
      } else {
        this.update();
      }
    },
    //read data product
    readData() {
      var url = this.$api + "/promo";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        })
        .then((response) => {
          this.products = response.data.data;
        });
    },

    //simpan data produk
    save() {
      this.product.append("namaItem", this.form.judul);
      this.product.append("kategori", this.form.deskripsi);
      this.product.append("satuan", this.form.promoURL);

      var url = this.$api + "/promo";
      this.load = true;
      this.$http
        .post(url, this.product, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //mengambil data
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    //ubah data produk
    update() {
      let newData = {
        judul: this.form.judul,
        deskripsi: this.form.deskripsi,
        promoURL: this.form.promoURL,
      };
      var url = this.$api + "/promo/" + this.editId;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //mengambil data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    //hapus data produk
    deleteData() {
      //mengahapus data
      var url = this.$api + "/promo/" + this.deleteId;
      //data dihapus berdasarkan id
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //mengambil data
          this.resetForm();
          this.dialogConfirm = false;
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.form.editId = item.id;
      this.form.judul = item.judul,
      this.form.deskripsi= item.deskripsi,
      this.form.promoURL= item.promoURL,
      this.dialog = true;
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        judul: null,
        deskripsi: null,
        promoURL: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>