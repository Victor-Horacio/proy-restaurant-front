<template>
  <v-container>
    <!-- Creacion de la Tabla de Comidas y Bebidas -->
    <v-data-table
      :headers="headers"
      :items="comidasbebidas"
      :items-per-page="5"
      class="elevation-1"
    >
    
    <!-- Barra para el Titulo de la Tabla y para el boton Nuevo Platillo/Bebida -->
    <!-- Se incluye el formulario para insertar un nuevo platillo/bebida a traves de un dialog -->
    <template v-slot:top>
      <v-toolbar flat>
        <!-- Titulo de la Tabla -->
        <v-toolbar-title>Comidas y Bebidas</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-container>
            

        </v-container>

        <!-- Creacion del Dialog para el formulario -->

        <v-dialog
          v-model="dialog"
          persistent
          max-width="500px"
        >
          <!-- Boton Nuevo Platillo/Bebida -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#FF6F00"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Platillo/Bebida
            </v-btn>
          </template>

          <!-- Formulario para insertar un nuevo platillo/bebida -->
          <v-card>
            <v-card-title>
              <span class="headline">Nuevo Platillo/Bebida</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- Caja de Texto para ingresar el nombre -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      v-model="nuevo_platillo.CXM_Nombre"
                      color="#FF6F00"
                      label="Nombre*"
                      required
                    ></v-text-field>
                  </v-col>

                  <!-- Caja/Barra para elegir la categoria -->
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <!-- Agregar categorias en items si agregaron mas -->
                    <v-autocomplete
                      v-model="nuevo_platillo.CXM_Categoria"
                      color="#FF6F00"
                      :items="['Entradas','Desayunos','Alcoholicas','Jugos','Refrescos','Té','Malteadas','Aguas',
                               'Carnes Rojas','Carnes Blancas','Sopas','Estofados','Pan','Cremas']"
                      label="Categoria"
                    ></v-autocomplete>
                  </v-col>

                  <!-- Caja de Texto para ingresar el precio -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="nuevo_platillo.CXM_Precio"
                      color="#FF6F00"
                      label="Precio*"
                      type="number"
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
  v-model="AC_modal"
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
              v-model="actualizar_alimentos.CXM_Nombre"
              color="#FF6F00"
              label="Alimento*"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-autocomplete
                      v-model="actualizar_alimentos.CXM_Categoria"
                      color="#FF6F00"
                      :items="['Entradas','Desayunos','Alcoholicas','Jugos','Refrescos','Té','Malteadas','Aguas',
                               'Carnes Rojas','Carnes Blancas','Sopas','Estofados','Pan','Cremas']"
                      label="Categoria*"
                    ></v-autocomplete>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="actualizar_alimentos.CXM_Precio"
              color="#FF6F00"
              label="Precio*"
              type = 'Number'
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </template>
  </v-card>
  <v-btn color = "success" @click="update_alimento(actualizar_alimentos.CXM_ID.CXM_ID2)">Agregar</v-btn>
  <v-btn color = "error" @click="cancelar_update()">Cancelar</v-btn>
</v-dialog>


      </v-toolbar>

    </template>

    <!-- Boton de Borrar Registro y editar -->
    <template v-slot:[`item.actions`]="{item}">
      <v-icon small @click="eliminar_platillo(item)" class="mr-4">
        fas fa-trash
      </v-icon>
      <v-icon small @click="AC_modal = true; get_item(item)">
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
          { text: 'Identificador', sortable: true, value: 'CXM_ID' },
          { text: 'Nombre', sortable: true, value: 'CXM_Nombre' },
          { text: 'Categoría', sortable: true, value: 'CXM_Categoria' },
          { text: 'Precio', sortable: true, value: 'CXM_Precio' },
          { text: 'Acciones', value: 'actions' },
        ],
        comidasbebidas: [],
        dialog: false,
        AC_modal:false,
        nuevo_platillo:{
          CXM_Nombre: '',
          CXM_Categoria: '',
          CXM_Precio: '',
        },
        actualizar_alimentos:{
            CXM_ID: '',
            CXM_Nombre: '',
            CXM_Categoria: '',
            CXM_Precio: ''
          },
      }
    },
    // Descomentar lineas cuando vayan a usar los datos.
     created(){
       this.llenar_platillos()
     },
    methods:{
      async llenar_platillos(){
        const api_data = await this.axios.get('/comidaxbebida/obtener-comidaxbebida');
        this.comidasbebidas = api_data.data;
      },

      async eliminar_platillo(item){
        const body = {
          CXM_ID: item.CXM_ID
        }
        await this.axios.post('/comidaxbebida/eliminar-comidaxbebida', body);

        this.llenar_platillos();
      },

      cancelar(){
        this.nuevo_platillo = {}
        this.dialog = false
      },

      async agregar(){
        await this.axios.post('/comidaxbebida/agregar-comidaxbebida', this.nuevo_platillo);
        this.llenar_platillos();
        this.cancelar();
      },
      cancelar_update(){
        this.actualizar_alimentos = {};
        this.AC_modal = false;
      },
      async update_alimento(item){
        const body = {CXM_ID: item.CXM_ID};
        await this.axios.post('/comidaxbebida/modificar_comidaxbebida', this.actualizar_alimentos);
        this.llenar_platillos();
        this.cancelar_update();
      },

      get_item(item){
         const body = {
          CXM_ID2: item.CXM_ID
        }
        this.actualizar_alimentos.CXM_ID = body 
      },
    },
  }
</script>