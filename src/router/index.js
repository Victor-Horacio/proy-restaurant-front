import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/consulta-orden-mesero',
    name: 'Consulta_Orden_Mesero',
    component: () => import('../views/Consulta_Orden_Mesero.vue')
  },
  {
    path: '/consulta-orden-mesa',
    name: 'Consulta_Orden_Mesa',
    component: () => import('../views/Consulta_Orden_Mesa.vue')
  },
  {
    path: '/consulta-orden-fecha',
    name: 'Consulta_Orden_Fecha',
    component: () => import('../views/Consulta_Orden_Fecha.vue')
  },
  {
    path: '/consulta-total-ventas',
    name: 'Consulta_Total_Ventas',
    component: () => import('../views/Consulta_Total_Ventas.vue')
  },
  {
    path: '/tabla-meseros',
    name: 'Tabla_Meseros',
    component: () => import('../views/Tabla_Meseros.vue')
  },
  {
    path: '/tabla-ordenes',
    name: 'Tabla_Ordenes',
    component: () => import('../views/Tabla_Ordenes.vue')
  },
  {
    path: '/tabla-comidas-bebidas',
    name: 'Tabla_Comidas_Bebidas',
    component: () => import('../views/Tabla_Comidas_Bebidas.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
