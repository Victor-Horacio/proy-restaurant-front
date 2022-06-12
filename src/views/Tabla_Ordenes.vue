<template>
  <v-container>
    <!-- Creacion de la Tabla de Ordenes -->
    <v-data-table
      :headers="headers"
      :items="ordenes"
      item-key="ORD_id"
      :items-per-page="5"
      class="elevation-1"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @item-expanded="loadDetails"
      show-expand
    >
    
      <!-- Barra para el Titulo de la Tabla y para el boton Nueva Orden -->
      <!-- Se incluye el formulario para insertar una nueva orden a traves de un dialog -->
      <template v-slot:top>
        <v-toolbar flat>
          <!-- Titulo de la Tabla -->
          <v-toolbar-title>Orden</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Creacion del Dialog para el formulario -->
          <v-dialog
            v-model="dialog"
            persistent
            max-width="500px"
          >
            <!-- Boton Nueva Orden -->
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#FF6F00"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Nueva Orden
              </v-btn>
            </template>

            <!-- Formulario para insertar una nueva orden -->
            <v-card>
              <v-card-title>
                <span class="headline">Nueva Orden</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- Caja de Texto para ingresar la mesa -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <!-- Llenar array de items con JS -->
                      <v-autocomplete
                        v-model="nueva_orden.ORD_Mesa"
                        color="#FF6F00"
                        :items= "nueva_mesa_data"
                        item-text="MESA_id"
                        label="No. de Mesa"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
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
                  @click="agregar(); cancelar()"
                >
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- HERE NEW DIALOG-->
          <v-dialog
            v-model="dialogcomida"
            persistent
            max-width="500px"
          >
            <!-- Formulario para insertar una nueva orden -->
            <v-card>
              <v-card-title>
                <span class="headline">Nueva Comida</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row> 
                      <v-data-table
                        :headers="subheaders"
                        :items="nueva_comida_data"
                        :items-per-page="5"
                        class="elevation-1"
                      >
                      <template v-slot:[`item.actionsxd`]="{item}">
                        <v-icon small @click="; get_id_comida(item); agregar_comida_orden(get_multi())">
                        fas fa-plus-circle
                        </v-icon> 
                      </template>
                      </v-data-table>
                      
                  </v-row>
                  </v-container>
              </v-card-text>

              <!-- Botones de acciones -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Boton de Cancelar -->
                <v-btn
                  color="success"
                  dark
                  @click="cancelar_comida()"
                >
                  Terminar Pedido
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- HERE END DIALOG-->
        </v-toolbar>
      </template>

      <!-- Boton de Borrar Registro -->
      <template v-slot:[`item.actions`]="{item}">
         <!-- <template> -->
            <v-row justify="center">
              <v-icon small @click="del_orden(item)" class="mr-3"> 
                fas fa-trash 
              </v-icon>
              <v-dialog
                v-model="dialog1"
                persistent
                max-width="350"
                :retain-focus="false"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Eliminar datos:
                  </v-card-title>
                  <v-card-text> 
                    ¿Desea eliminar la información relacionada a esta orden?
                  </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-2"
                          text
                          @click="dialog1 = false; de"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="green darken-2"
                          text
                          @click="eliminar_orden(del_orden_data)"
                        >
                          Aceptar
                        </v-btn>
                    </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
        <!-- </template>  -->
        <v-icon small @click="dialogcomida = true; get_item_orden(item)" class="mr-3">
          fas fa-utensils
        </v-icon>
        <v-icon small @click="CostoTotal (item)" class="mr-3">
          fas fa-dollar-sign
        </v-icon>
      </template>

      <!-- Boton para desplegar Detalles -->
      <template v-slot:expanded-item="{ headers}">
        <td  :colspan="headers.length"  >
          <!-- Aqui van las comidas y los precios con JS -->
          <v-container>
              <v-row v-for="(CMX_Nombre, index) in comidas_precio" v-bind:key="index">
              <v-col>
                <v-text-field
                  label="Comidas"
                  v-model = "comidas_precio[index].CXM_Nombre"
                  readonly
                >

                </v-text-field>
                <v-text-field
                  label="Precio"
                  v-model = "comidas_precio[index].CXM_Precio"
                  readonly
                >

                </v-text-field>
              </v-col>
            </v-row>  
            
          </v-container>
        
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>


  

<script>
  export default {
    data () {
      return {
        expanded: [],
        singleExpand: true,
        headers: [
          { text: 'No. de Orden', sortable: true, value: 'ORD_id' },
          { text: 'No. de Mesa', sortable: true, value: 'ORD_Mesa' },
          { text: 'Fecha', sortable: true, value: 'ORD_Fecha' },
          { text: 'Total', sortable: true, value: 'ORD_CostoTotal' },
          { text: 'Acciones', value: 'actions' },
        ],
        ordenes: [],
        dialog: false,
        dialog1: false,
        singleSelect: false,
        dialogcomida: false,
        selected: [],
        del_orden_data:{
          ORD_id:'',
          ORD_Mesa:'',
          ORD_Fecha:'',
          ORD_CostoTotal:''
        },
        subheaders: [
          { text: 'Nombre', sortable: true, value: 'CXM_Nombre' },
          { text: 'Precio', sortable: true, value: 'CXM_Precio' },
          { text: 'Acciones', value: 'actionsxd' }
        ],
        // Aqui iran todos los datos sacados del Form
        nueva_orden:{
          ORD_Mesa: '',
          ORD_CostoTotal: '',
        },

        nueva_orden_comidas:{
          ORD_id: '',
          CXM_ID: '',
        },

        TOTAL: [],

        comidas_precio: [] , 

        nueva_comida_data: [],

        nueva_mesa_data: []
      }
    },
    // Descomentar lineas cuando vayan a usar los datos.
     created(){
      this.llenar_ordenes()
      this.llenar_comidas()
      this.llenar_mesas()
    },
    methods:{
      async CostoTotal (item){
        const api_data = await this.axios.post('/orden/obtener-total-orden', item);
          this.TOTAL= api_data.data[0].total;

          const body = {
            total: this.TOTAL,
            ORD_ID1: item.ORD_id
          }
          const data = await this.axios.post('/orden/guardar-total-en-db', body);
          this.llenar_ordenes()
      },

      async loadDetails({item}) {
        const api_data = await this.axios.post('/orden/obtener-comidas-de-orden', item);
        
        this.comidas_precio = api_data.data; 
      },

      async llenar_ordenes(){
        const api_data = await this.axios.get('/orden/obtener-orden')
        this.ordenes = api_data.data
        for(let i = 0; i < this.ordenes.length; ++i){
           let date_in_date = new Date(this.ordenes[i].ORD_Fecha);
           this.ordenes[i].ORD_Fecha = date_in_date;
         } 
      },

      async eliminar_orden(item){
        const body = {
          ORD_id: item.ORD_id
        }
        await this.axios.post('/orden/eliminar-orden', body);

        this.llenar_ordenes()
        this.dialog1 = false
      },

      cancelar(){
        this.nueva_orden = {}
        this.dialog = false
      },
      
      cancelar_comida(){
        this.nueva_orden_comidas = {}
        this.dialogcomida = false
      },

      async agregar(){
        
        await this.axios.post('/orden/agregar-orden', this.nueva_orden)
        this.llenar_ordenes()
        this.cancelar()
      },

      async agregar_comida_orden( array ){
        const body = {ORD_id: array[0].ORD_id, CXM_ID: array[1].CXM_ID}
        await this.axios.post('/ordenespec/agregar_orden_spec', this.nueva_orden_comidas)

      },

      async llenar_comidas(){
       const api_data = await this.axios.get('/comidaxbebida/obtener-comidaxbebida')
       this.nueva_comida_data = api_data.data
      },

      async llenar_mesas(){
        const data_mesas = await this.axios.get('/mesa/obtener-mesas');
        this.nueva_mesa_data = data_mesas.data
          
      },


      get_item_orden(item){
          const body = {
            ORD_id2: item.ORD_id
          }
          this.nueva_orden_comidas.ORD_id = body;
          return body.ORD_id2;

      },

      get_id_comida(item){
        const body = {
          CXM_ID2: item.CXM_ID
        }
        this.nueva_orden_comidas.CXM_ID = body;
        return body.CXM_ID2;
      },

      get_multi(){
        const elements = [this.nueva_orden_comidas.ORD_id, this.nueva_orden_comidas.CXM_ID ]
        return elements;
      },

      del_orden(item){
        this.del_orden_data=item
        this.dialog1 = true
      }

    },
  }
</script>