import Vue from "vue";
import VueAnalytics from "vue-analytics";
import { router } from "@/setup/vue-router";

const isProd = process.env.NODE_ENV === "production";

Vue.use(VueAnalytics, {
  id: "APP_ID_HERE",
  router,
  autoTracking: {
    exception: true
  },
  debug: {
    enabled: false,
    sendHitTask: isProd
  }
});
