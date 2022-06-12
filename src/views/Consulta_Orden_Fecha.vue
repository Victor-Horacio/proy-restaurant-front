<template>
  <v-card>
    <v-card-title>
      Ordenes por Fecha
      <v-spacer></v-spacer>

      <!-- Caja de Texto para buscar las ordenes por fecha -->
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
      :items="ordenes_fecha"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'No. de Orden', sortable: true, value: 'ORD_id' },
          { text: 'No. de Mesa', sortable: true, value: 'ORD_Mesa' },
          { text: 'Fecha', sortable: true, value: 'ORD_Fecha' },
          { text: 'Total', sortable: true, value: 'ORD_CostoTotal' },
        ],
        ordenes_fecha: [],
      }
    },
    created() {
      this.llenar_ordenes();
    },
    methods: {
       async llenar_ordenes(){
        const api_data = await this.axios.get('/orden/obtener-orden')
        this.ordenes_fecha = api_data.data
        for(let i = 0; i < this.ordenes.length; ++i){
           let date_in_date = new Date(this.ordenes[i].ORD_Fecha);
           this.ordenes[i].ORD_Fecha = date_in_date;
         } 
      },
    },
  }
</script>