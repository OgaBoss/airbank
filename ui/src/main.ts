import Vue from "vue";
import App from "./App.vue";
import router from "./base/router";
import store from "./base/store";
import { createProvider } from "./vue-apollo";
import Vcalendar from "v-calendar";
import "./assets/index.css";

Vue.use(Vcalendar);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
