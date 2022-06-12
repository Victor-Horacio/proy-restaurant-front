import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/es5/locale/es';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        //customProperties: true,
        dark: true
      },
    themes: {
      light: {
        primary: '#f58816',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#ffe085'
      },
      dark: {
        primary: colors.orange.darken4,
        secondary: '#424242',
        accent: colors.pink.darken2,
        error: colors.red.darken4,
        info: colors.blue.darken3,
        success: colors.green.darken2,
        warning: colors.yellow.darken3,
        background: colors.grey.darken3
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'fa' || 'md' || 'mdi' || 'mdiSvg',
  },
});
