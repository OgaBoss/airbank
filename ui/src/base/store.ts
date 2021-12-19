import Vue from "vue";
import Vuex from "vuex";
import Transaction from "@/transaction/store";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Transaction,
  },
});
