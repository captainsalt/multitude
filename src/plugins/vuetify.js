import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#9147ff"
      },
      dark: {
        primary: "#9147ff"
      }
    }
  }
});
