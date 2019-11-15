import Vue from "vue";
import { store } from "@/setup/vuex";
import { router } from "@/setup/vue-router";
import { GlobalEvents } from "@/setup/global-events";
import "@/setup/vue-fontawesome";
import "@/setup/vue-analytics";
import "@/setup/vue-touch";
import "@/registerServiceWorker";
import App from "@/components/App";

Vue.prototype.$events = GlobalEvents;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

export { store, router };
