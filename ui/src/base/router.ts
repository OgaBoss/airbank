import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Transactions from "@/transaction/pages/Transactions.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Transactions,
  },
  {
    path: "/transactions/:id",
    name: "transaction",
    component: () =>
      import(/* webpackChunkName: "about" */ "../transaction/pages/Transaction.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
