<template>
  <v-card>
    <v-card-title>
      Ordenes por Mesero por Fecha
      <v-spacer></v-spacer>

      <!-- Caja de Texto para buscar las ordenes para una fecha -->
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Buscar Fecha"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <!-- Tabla de la Consulta -->
    <v-data-table
      :headers="headers"
      :items="ordenes_mesero_fecha"
      :search="search"
      group-by="MES_Nombre"
      show-group-by
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'No. de Orden', sortable: true, value: 'ORD_id', groupable: false },
          { text: 'No. de Mesa', sortable: true, value: 'ORD_Mesa' },
          { text: 'Nombre de Mesero', sortable: true, value: 'MES_Nombre' },
          { text: 'Apellido Paterno', sortable: true, value: 'MES_ApePat' },
          { text: 'Apellido Materno', sortable: true, value: 'MES_ApeMat' },
          { text: 'Fecha', sortable: true, value: 'ORD_Fecha' },
          { text: 'Total', sortable: true, value: 'ORD_CostoTotal' },
        ],
        ordenes_mesero_fecha: [],
      }
    },
    created() {
      this.llenar_meseros_fecha()
    },
    methods: {
      async llenar_meseros_fecha(){
        const api_data = await this.axios.get('/meseros/obtener_meseros_fecha');
        this.ordenes_mesero_fecha = api_data.data;
        for(let i = 0; i < this.ordenes_mesero_fecha.length; ++i){
           let date_in_date = new Date(this.ordenes_mesero_fecha[i].ORD_Fecha);
           this.ordenes_mesero_fecha[i].ORD_Fecha = date_in_date;
         } 
        
      },
    },
  }
</script>