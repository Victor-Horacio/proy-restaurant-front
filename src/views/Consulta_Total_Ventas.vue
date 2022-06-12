<template>
  <v-container>
    

      <!-- Barra para el Titulo de la Tabla y para el boton Nueva Orden -->
      <!-- Se incluye el formulario para insertar una nueva orden a traves de un dialog -->
      <template v-slot:top>
        <v-toolbar flat>
          <!-- Titulo de la Tabla -->
          <v-toolbar-title>Total de Ventas del Día</v-toolbar-title>
        </v-toolbar>
      </template>
      
      <!-- Boton para desplegar Detalles -->
      <template v-slot:expanded-item="{headers}">
        <td :colspan="headers.length">
          <!-- Aqui van las comidas y los precios con JS -->
        </td>
      </template>
      
    <v-card>
    <v-card-title>
        Total de ventas del día 
      <v-spacer></v-spacer>

      <!-- Caja de Texto para buscar las ordenes para una fecha -->
      <v-text-field
        v-model="search"
        type = "date"
        append-icon="fas fa-search"
        label="Buscar Fecha"
        single-line
        hide-details
        
      ></v-text-field>
      <v-btn  @click="ventas_dia1(search)"  class="ml-5">
    
        <v-icon small color='success' >
          fas fa-money-bill-alt
        </v-icon>
      </v-btn>
    </v-card-title>

    <!-- Tabla de la Consulta -->
      <div class="ma-2">
          VENTA DEL DIA $: {{ventas_dia.total}}
      </div>
  </v-card>
      <!-- Poner la función JS para mostrar el total -->



  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        expanded: [],
        search: '',
        singleExpand: true,
        headers: [
          { text: 'No. de Orden', sortable: true, value: 'ORD_id' },
          { text: 'No. de Mesa', sortable: true, value: 'ORD_Mesa' },
          { text: 'Fecha', sortable: true, value: 'ORD_Fecha' },
          { text: 'Total', sortable: true, value: 'ORD_CostoTotal' },
        ],
        ordenes: [],
        ventas_dia: {
          total: ''
        },
        
      }
    },
    // Descomentar lineas cuando vayan a usar los datos.
     created(){


     },
    methods:{
      // Hacer los metodos para calcular el total
      async llenar_ordenes(){
        const api_data = await this.axios.get('/orden/obtener-orden');
        this.ordenes = api_data.data;
        
         for(let i = 0; i < this.ordenes.length; ++i){
           let date_in_date = new Date(this.ordenes[i].ORD_Fecha);
           this.ordenes[i].ORD_Fecha = date_in_date;
         }       
            
        
      },

      async ventas_dia1(fecha){
        const body = {
          fechaObj: fecha
        }
        const api_data = await this.axios.post('/orden/obtener-ventas-dia', body);
        this.ventas_dia.total = api_data.data[0].total;
        console.log(this.ventas_dia);
        console.log(body);
      }

    },
  }
</script>