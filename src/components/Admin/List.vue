<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">Item List</h3>

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
              v-model="form.namaItem"
              label="Nama item"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.kategori"
              label="Kategori"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.satuan"
              label="Satuan"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.stok"
              label="Stok"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.harga"
              label="Harga jual"
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
          text: "Item ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Item Name", value: "namaItem" },
        { text: "Category", value: "kategori" },
        { text: "Satuan", value: "satuan" },
        { text: "stok", value: "stok" },
        { text: "harga", value: "harga" },
        { text: "Actions", value: "actions" },
      ],
      product: new FormData(),
      products: [],
      form: {
        id: null,
        namaItem: null,
        kategori: null,
        satuan: null,
        stok: null,
        harga: null,
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
      var url = this.$api + "/item";
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
      this.product.append("namaItem", this.form.namaItem);
      this.product.append("kategori", this.form.kategori);
      this.product.append("satuan", this.form.satuan);
      this.product.append("stok", this.form.stok);
      this.product.append("harga", this.form.harga);

      var url = this.$api + "/item";
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
        namaItem: this.form.namaItem,
        kategori: this.form.kategori,
        satuan: this.form.satuan,
        stok: this.form.stok,
        harga: this.form.harga,
      };
      var url = this.$api + "/item/" + this.editId;
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
      var url = this.$api + "/item/" + this.deleteId;
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
      this.form.namaItem = item.namaItem,
      this.form.kategori= item.kategori,
      this.form.satuan= item.satuan,
      this.form.stok= item.stok,
      this.form.harga= item.harga,
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
        nama_produk: null,
        satuan: null,
        harga_jual: null,
        stok: null,
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