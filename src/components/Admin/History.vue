<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">Transaction History</h3>

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

      <v-data-table :headers="headers" :items="products" :search="search">

      </v-data-table>
    </v-card>

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
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Tanggal Transaksi", value: "created_at" },
        { text: "Nama Item", value: "namaItem" },
        { text: "Jumlah", value: "jumlah" },
        // { text: "Total Harga", value: "total" },
        { text: "harga", value: "jenisWarna" },
        { text: "Status", value: "statusPesan" },
        { text: "harga", value: "jenisServis" },
        
      ],
      product: new FormData(),
      products: [],
      form: {
        id: null,
        namaItem: null,
        created_at:null,
        jumlah: null,
        total: null,
        stok: null,
        statusPesan: null,
        jenisWarna: null,
        jenisServis: null,
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
      var url = this.$api + "/orderFinishedInAdmin";
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
    // save() {
    //   this.product.append("namaItem", this.form.namaItem);
    //   this.product.append("jumlah", this.form.jumlah);
    //   this.product.append("total", this.form.total);
    //   this.product.append("statusPesan", this.form.statusPesan);
    //   this.product.append("jenisWarna", this.form.jenisWarna);
    //   this.product.append("jenisServis", this.form.jenisServis);
    //   var url = this.$api + "/item";
    //   this.load = true;
    //   this.$http
    //     .post(url, this.product, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       this.error_message = response.data.message;
    //       this.color = "green";
    //       this.snackbar = true;
    //       this.load = false;
    //       this.close();
    //       this.readData(); //mengambil data
    //       this.resetForm();
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //     });
    // },
    //ubah data produk
    update() {
      let newData = {
        namaItem: this.form.namaItem,
        kategori: this.form.jumlah,
        satuan: this.form.total,
        stok: this.form.statusPesan,
        jenisWarna: this.form.jenisWarna,
        jenisServis: this.form.jenisServis,
      };
      var url = this.$api + "/order/" + this.editId;
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
      var url = this.$api + "/order/" + this.deleteId;
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