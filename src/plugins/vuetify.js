import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    primary: colors.purple.darken3,
    dark: true,
    themes: {
      light: {
      },
      dark: {
      }
    }
  }
});
