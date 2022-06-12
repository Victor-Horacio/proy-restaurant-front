<template>
  <v-app>
    <!-- Barra Principal -->
    <v-app-bar app color="primary" dark flat> 
      <div class="d-flex align-center">
        <!-- Imagen del Nombre del Restaurant -->
        <v-img
          alt="Restaurant Nombre"
          class="shrink mr-2"
          contain
          src="@/assets/restaurant_letras_blanco.png"
          transition="scale-transition"
          width="115"
        />
      </div>

      <v-spacer></v-spacer>
      
      <!-- Imagen del Eslogan del Restaurant -->
      <div class="d-flex align-center">
        <v-img
          alt="Restaurant Nombre"
          class="shrink mr-2"
          contain
          src="@/assets/restaurant-eslogan-blanco.png"
          transition="scale-transition"
          width="450"
        />
      </div>
    </v-app-bar>

    <!-- Cuerpo de la Pagina -->
    <v-main class="background">
      <v-container>
        <v-row>
          <!-- Menu de Acceso Rapido -->
          <v-col cols="3">
            <v-sheet rounded="lg">
              <!-- Creacion de la lista para las opciones del Acceso Rapido -->
              <v-list color="transparent">
                <!-- Link al Inicio -->
                <router-link style="text-decoration: none" :to="{name: 'Home'}">
                  <!-- Item del Inicio -->
                  <v-list-item>
                    <!-- Icono del Inicio -->
                    <v-list-item-icon>
                      <v-icon>fas fa-home</v-icon>
                    </v-list-item-icon>
                    <!-- Titulo del Item -->
                    <v-list-item-title>Inicio</v-list-item-title>
                  </v-list-item>
                </router-link>

                <!-- Creacion de un grupo de Items dentro de los Items principales de la lista -->
                <v-list-group
                   color="primary"
                  v-for="item in items"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
                >
                  <!-- "Contenedor" de los Items principales de la lista -->
                  <template v-slot:activator>
                    <v-list-item-content>
                      <!-- Titulo de los Items principales de la lista -->
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <!-- Creacion de los Items secundarios de la lista -->
                  <v-list-item
                    v-for="child in item.items"
                    :key="child.title"
                    class="px-3 py-1 mx-lg-auto"
                    :to="child.link"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="child.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-sheet>
          </v-col>

          <!-- Contenedor Principal de las Views -->
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!-- Enlace para los diferentes Views -->
              <router-view></router-view>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Pie de Pagina -->
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-5 amber primary white--text text-center">
          <v-icon size="16px">far fa-copyright</v-icon> {{ new Date().getFullYear() }} — <strong>Restaurant El Delicioso</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    // Informacion de los Items del Acesso Rapido
    // action -> Iconos
    // title -> Texto del Item
    // link -> Enlace a las diferentes Views
    items: [
      {
        action: 'fas fa-search',
        active: true,
        items: [
          { title: 'Consulta de Ordenes',
            link: {name: 'Consulta_Orden_Mesero'}
          },
          { title: 'Total de Ventas del Día',
            link: {name: 'Consulta_Total_Ventas'}
          },
        ],
        title: 'Consultas',
      },
      {
        action: 'fas fa-table',
        active: true,
        items: [
          { title: 'Meseros',
            link: {name: 'Tabla_Meseros'}
          },
          { title: 'Ordenes',
            link: {name: 'Tabla_Ordenes'}
          },
          { title: 'Comidas y Bebidas',
            link: {name: 'Tabla_Comidas_Bebidas'}
          },
        ],
        title: 'Tablas',
      },
    ],
  }),
};
</script>