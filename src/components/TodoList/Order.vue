<template>
  <v-main class="list-UGD">
    <h3 class="text-h3 font-weight-medium mb-5">Order List</h3>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" dark @click="dialog = true">
          Tambah
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search">

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="info" class="mr-2" @click="editHandler(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="error" @click="deleteHandler(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="650px">
      <v-card>
        <v-card-title>
          <span class="headline">Order Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>

             <v-select
              v-model="formTodo.kategori"
              :items="['Brochure', 'Book', 'Card']"
              label="Kategori"
              required
            ></v-select>

            <v-select
              v-model="formTodo.namaItem"
              :items="namaItemss"
              label="Paper"
              required
            >
            </v-select>

            <!--<v-select
              v-model="formTodo.namaItem"
              :items="['Kertas A4', 'Kertas F4']"
              label="Paper"
              required
            ></v-select>-->

             <v-select
              v-model="formTodo.jenisWarna"
              :items="['Colored', 'Black and White']"
              label="Color"
              required
            ></v-select>

             <v-select
              v-model="formTodo.jenisServis"
              :items="['Delivery', 'Take Away']"
              label="Service"
              required
            ></v-select>

            <v-text-field
              v-model="formTodo.jumlah"
              label="Amount"
              required
            ></v-text-field>

            <!--<v-file-input
                @change="onFileSelected"
                color="deep-purple accent-4"
                label="File input"
                placeholder="Select your files"
                outlined>
            </v-file-input>-->
            <input type="file" @change="onFileSelected">

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="setForm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">
          Yakin ingin menghapus?
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelDelete">
            Tidak
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteData">
            Ya
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      inputType:'Tambah',
      search: null,
      dialog: false,
      dialogDelete: false,
      items:[],
      orders:[],
      selectedFile:null,
      masukin: new FormData,
      ngeupdate: new FormData,
      snackbar:false,
      error_message: '',
      color:'',
      deleteId: '',
      editId: '',
      dasarPath: 'http://localhost:8000/storage/fileUser/',
      namaItemss:[],
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
        { text: "Actions", value: "actions" },
      ],

      formTodo: {
          kategori: null,
          namaItem: null,
          jenisWarna: null,
          jenisServis: null,
          jumlah: null,
      },
    };
  },
  methods: {
    setForm(){
        if(this.inputType === 'Tambah'){
            this.save()
        }else{
            this.update()
        }
    },
    save(){
        this.masukin.append('idPelanggan', localStorage.getItem('id'));
        this.masukin.append('kategori', this.formTodo.kategori);
        this.masukin.append('namaItem', this.formTodo.namaItem);
        this.masukin.append('jenisWarna', this.formTodo.jenisWarna);
        this.masukin.append('jenisServis', this.formTodo.jenisServis);
        this.masukin.append('jumlah', this.formTodo.jumlah);
        this.masukin.append('filePesan', this.selectedFile);

        var url = this.$api + '/order/'
        this.load = true
        this.$http.post(url, this.masukin,{
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        }).then(response => {
            this.error_message = response.data.message;
            this.color = "green"
            this.snackbar = true;
            this.load = false;
            this.close();
            this.readData(); //mengambil data
            this.resetForm();
        }).catch(error => {
            this.error_message = error.response.data.message;
            this.color = "red"
            this.snackbar = true;
            this.load = false;
        })
        this.dialog=false;
        this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.inputType = 'Tambah';
      this.dialog = false;
    },
    resetForm() {
      this.formTodo = {
         category: null,
          paper: null,
          color: null,
          service: null,
          amount: null,
          price: null,
      };
      this.idEdit = null;
    },

    cancelDelete() {
      this.resetForm();
      this.dialogDelete = false;
    },

    readData(){
        var url = this.$api + '/order/' + localStorage.getItem('id')
        //var url = this.$api + '/orderProcessInAdmin'  //ini buat ngeshow semua pesanan yg msh proses
        this.$http.get(url, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.orders = response.data.data
        })
    },
    onFileSelected(event){
        this.selectedFile = event.target.files[0]
    },
    deleteData(){
        //menghapus data
        var url = this.$api + '/order/' + this.deleteId;
        //data dihapus berdasarkan id
        this.$http.delete(url, {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            this.error_message = response.data.message;
            this.color="green"
            this.snackbar=true;
            this.load = false;
            this.close();
            this.readData(); //mengambil data
            this.resetForm();
            this.inputType = 'Tambah';
        }).catch(error => {
            this.error_message = error.response.data.message;
            this.color="red"
            this.snackbar=true;
            this.load = false;
        })
    },
    editHandler(item){
        this.inputType = 'Ubah';
        this.editId = item.id;
        this.formTodo.kategori = item.kategori;
        this.formTodo.namaItem = item.namaItem;
        this.formTodo.jenisWarna = item.jenisWarna;
        this.formTodo.jenisServis = item.jenisServis;
        this.formTodo.jumlah = item.jumlah;
        this.dialog = true;
    },
    deleteHandler(id){
        this.deleteId = id;
        this.dialogDelete = true;
    },
    update(){
        //this.ngeupdate.append('idPelanggan', localStorage.getItem('id'));
        this.ngeupdate.append('kategori',this.formTodo.kategori);
        this.ngeupdate.append('namaItem', this.formTodo.namaItem)
        this.ngeupdate.append('jenisWarna', this.formTodo.jenisWarna);
        this.ngeupdate.append('jenisServis', this.formTodo.jenisServis);
        this.ngeupdate.append('jumlah', this.formTodo.jumlah);

        if(this.selectedFile!=null){
            this.ngeupdate.append('filePesan', this.selectedFile);
        }

        var url = this.$api + '/order/' + this.editId + '?_method=PUT';
        this.load = true
        this.$http.post(url,this.ngeupdate,{
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        }).then(response => {
            this.error_message = response.data.message;
            this.color="green"
            this.snackbar=true;
            this.load = false;
            this.close();
            this.readData(); //mengambil data
            this.resetForm();
            this.inputType = 'Tambah';
        }).catch(error => {
            this.error_message = error.response.data.message;
            this.color = "red"
            this.snackbar = true;
            this.load = false;
        })
    },
    readNamaItem(){
        var url = this.$api + '/itemByName';
        this.$http.get(url, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.namaItemss = response.data.data;
        })
    },
  },


  mounted(){
    this.readData();
    this.readNamaItem();
    },
};
</script>
