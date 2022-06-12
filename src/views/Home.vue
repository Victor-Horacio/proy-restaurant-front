<template>
    <v-card flat>
    <v-toolbar flat height="75">
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="Protección contra el fondo claro"
        inset
        label="Modo oscuro"
        persistent-hint
      ></v-switch>
    </v-toolbar>
  <v-container>
    <v-row align="center" justify="center">
      <!-- Logo del Restaurant -->
      <v-col cols="12">
        <v-img
          alt="Restaurant Logo"
          class="shrink mx-auto"
          contain
          src="@/assets/restaurant_logo.png"
          transition="scale-transition"
          width="300"
        />
      </v-col>
    </v-row>

    <br/>
    <h1 align="center">¡Bienvenido al Restaurant "El Delicioso"!</h1>
    <br/>

    <!-- Seccion de Consultas -->
    <h2 align="center">Consultas</h2>
    <p align="center">Elija una de las opciones.</p>
    <v-row align="center" justify="center">
      <!-- Opcion de Ordenes por Mesero para una Fecha -->
      <v-col cols="12" sm="6">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :to="{name: 'Consulta_Orden_Mesero'}"
            class="mx-auto"
            height="250"
            max-width="250"
            color="background"
          >
            <!-- Titulo de la Opcion -->
            <v-card-text class="my-4 text-center title">
              Consulta de Ordenes
            </v-card-text>

            <!-- Imagen de la Opcion -->
            <v-img
              alt="Consulta Ordenes por Mesero"
              class="shrink mx-auto"
              contain
              src="@/assets/restaurant-MeserosFecha.png"
              transition="scale-transition"
              width="125"
            />
          </v-card>
        </v-hover>
      </v-col>
      <!-- Opcion de Total de Ventas del Dia -->
      <v-col cols="12" sm="6">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :to="{name: 'Consulta_Total_Ventas'}"
            class="mx-auto"
            height="250"
            max-width="250"
            color="background"
          >
            <!-- Titulo de la Opcion -->
            <v-card-text class="my-4 text-center title">
              Total de Ventas del Día
            </v-card-text>

            <!-- Imagen de la Opcion -->
            <v-img
              alt="Consulta Total de Ventas"
              class="shrink mx-auto"
              contain
              src="@/assets/restaurant-Dinero.png"
              transition="scale-transition"
              width="100"
            />
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <br/>

    <!-- Seccion de Tablas -->
    <h2 align="center">Tablas</h2>
    <p align="center">Elija una de las opciones.</p>
    <v-row align="center" justify="center">
      <!-- Opcion de Tabla de Meseros -->
      <v-col cols="12" sm="6">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :to="{name: 'Tabla_Meseros'}"
            class="mx-auto"
            height="250"
            max-width="250"
            color="background"
          >
            <!-- Titulo de la Opcion -->
            <v-card-text class="my-4 text-center title">
              Meseros
            </v-card-text>
            
            <!-- Imagen de la Opcion -->
            <v-img
              alt="Tabla Meseros"
              class="shrink mx-auto"
              contain
              src="@/assets/restaurant-Mesero.png"
              transition="scale-transition"
              width="85"
            />
          </v-card>
        </v-hover>
      </v-col>

      <!-- Opcion de Tabla de Ordenes -->
      <v-col cols="12" sm="6">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :to="{name: 'Tabla_Ordenes'}"
            class="mx-auto"
            height="250"
            max-width="250"
            color="background"
          >
            <!-- Titulo de la Opcion -->
            <v-card-text class="my-4 text-center title">
              Ordenes
            </v-card-text>

            <!-- Imagen de la Opcion -->
            <v-img
              alt="Tabla Meseros"
              class="shrink mx-auto"
              contain
              src="@/assets/restaurant-Ordenes.png"
              transition="scale-transition"
              width="150"
            />
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <!-- Opcion de Tabla de Comidas y Bebidas -->
      <v-col cols="12" sm="6">
        <v-hover
          v-slot="{ hover }"
        >
          <v-card
            :elevation="hover ? 12 : 2"
            :to="{name: 'Tabla_Comidas_Bebidas'}"
            class="mx-auto"
            height="250"
            max-width="250"
            color="background"
          >
            <!-- Titulo de la Opcion -->
            <v-card-text class="my-4 text-center title">
              Comidas y Bebidas
            </v-card-text>
            
            <!-- Imagen de la Opcion -->
            <v-img
              alt="Tabla Comidas y Bebidas"
              class="shrink mx-auto"
              contain
              src="@/assets/restaurant-ComidasBebidas.png"
              transition="scale-transition"
              width="150"
            />
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
    </v-card>
</template>

<style scoped>
  .v-card.v-sheet.theme--light {
    border: 2px solid #ff8b00 !important
  }
  .v-card.v-sheet.theme--dark {
  border: 2px solid #ff8b00 !important
  }
</style>

<!-- No se ocupa esta parte por el momento -->
<script>
export default {
  name: 'Home',
  data(){
    return{

    }
  },
  methods: {

  },

}
</script>