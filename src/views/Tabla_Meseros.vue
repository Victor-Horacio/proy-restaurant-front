<template>
  <v-container>
    <!-- Creacion de la Tabla de Meseros -->
    <v-data-table
      :headers="headers"
      :items="meseros"
      :items-per-page="5"
      class="elevation-1"
    >
    
    <!-- Barra para el Titulo de la Tabla y para el boton Nuevo Mesero -->
    <!-- Se incluye el formulario para insertar un nuevo mesero a traves de un dialog -->
    <template v-slot:top>
      <v-toolbar flat>
        <!-- Titulo de la Tabla -->
        <v-toolbar-title>Meseros</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Creacion del Dialog para el formulario -->
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <!-- Boton Nuevo Mesero -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#FF6F00"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Mesero
            </v-btn>
          </template>

          <!-- Formulario para insertar un nuevo mesero -->
          <v-card>
            <v-card-title>
              <span class="headline">Nuevo Mesero</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- Caja de Texto para ingresar el nombre -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="nuevo_mesero.MES_Nombre"
                      color="#FF6F00"
                      label="Nombre*"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- Caja de Texto para ingresar el apellido paterno -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="nuevo_mesero.MES_ApePat"
                      color="#FF6F00"
                      label="Apellido Paterno*"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- Caja de Texto para ingresar el apellido materno -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="nuevo_mesero.MES_ApeMat"
                      color="#FF6F00"
                      label="Apellido Materno*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Campos Requeridos</small>
            </v-card-text>

            <!-- Botones de acciones -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Boton de Cancelar -->
              <v-btn
                color="red"
                dark
                @click="cancelar()"
              >
                Cancelar
              </v-btn>

              <!-- Boton de Agregar -->
              <!-- Agregar las acciones para este boton -->
              <v-btn
                color="green"
                dark
                @click="agregar()"
              >
                Agregar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
  v-model="AM_modal"
  persistent :overlay="false"
  max-width="500px"
  transition="dialog-transition"
>
  <v-card>
    <v-card-title>
      Actualizar Datos
    </v-card-title>
   <template>
    <v-form>
       <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="actualizar_meseros.MES_Nombre"
              actualizar_meseros.MES_ApePat
              label="Nombre*"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="actualizar_meseros.MES_ApePat"
              color="#FF6F00"
              label="Apellido Paterno*"
              type = 'text'
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="actualizar_meseros.MES_ApeMat"
              color="#FF6F00"
              label="Apellido Materno*"
              type = 'text'
              required
            ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
    </v-card>
    <v-btn color = "success" @click="update_meseros(actualizar_meseros.MES_id.MES_ID2)">Agregar</v-btn>
    <v-btn color = "error" @click="cancelar_update()">Cancelar</v-btn>
  </v-dialog>


      </v-toolbar>
    </template>

    <!-- Boton de Borrar Registro -->
    <template v-slot:[`item.actions`]="{item}">
      <v-icon small @click="eliminar_mesero(item)" class="mr-4">
        fas fa-trash
      </v-icon>
      <v-icon small @click="AM_modal = true; get_item(item)">
       fas fa-pencil-alt
      </v-icon>
    </template>

    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Identificador', sortable: true, value: 'MES_id' },
          { text: 'Nombre', sortable: true, value: 'MES_Nombre' },
          { text: 'Apellido Paterno', sortable: true, value: 'MES_ApePat' },
          { text: 'Apellido Materno', sortable: true, value: 'MES_ApeMat' },
          { text: 'Acciones', value: 'actions' },
        ],
        meseros: [],
        dialog: false,
        AM_modal: false,
        nuevo_mesero:{
          MES_Nombre: '',
          MES_ApePat: '',
          MES_ApeMat: '',
        },
        actualizar_meseros:{
            MES_id: '',
            MES_Nombre: '',
            MES_ApePat: '',
            MES_ApeMat: ''
          },
      }
    },
    // Descomentar lineas cuando vayan a usar los datos.
    created(){
       this.llenar_meseros()
    },
    methods:{
      async llenar_meseros(){
        const api_data = await this.axios.get('/meseros/obtener-meseros');
        this.meseros = api_data.data;
      },

      async eliminar_mesero(item){
        const body = {
          MES_id: item.MES_id
        }
        await this.axios.post('/meseros/eliminar-meseros', body)

        this.llenar_meseros()
      },

      cancelar(){
        this.nuevo_mesero = {}
        this.dialog = false
      },

      async agregar(){
        await this.axios.post('/meseros/agregar-meseros', this.nuevo_mesero)
        this.llenar_meseros();
        this.cancelar();
      },

      cancelar_update(){
        this.actualizar_alimentos = {};
        this.AM_modal = false;
      },
      async update_meseros(item){
        const body = {CXM_ID: item.CXM_ID};
        await this.axios.post('/meseros/modificar_meseros', this.actualizar_meseros);
         this.llenar_meseros();
        this.cancelar_update();
      },

      get_item(item){
         const body = {
          MES_ID2: item.MES_id
        }
        this.actualizar_meseros.MES_id = body; 
      },

    },
  }
</script>